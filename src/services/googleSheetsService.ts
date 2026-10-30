import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../firebase';
import { ApprenticeProfile, EvaluationResult } from '../types/induction';

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
];

let cachedAccessToken: string | null = null;
let cachedGoogleUser: User | null = null;

export const getCachedAccessToken = () => cachedAccessToken;
export const getCachedGoogleUser = () => cachedGoogleUser;

export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

/**
 * Sign in instructor with Google and request Google Sheets & Drive scopes.
 */
export const signInWithGoogleWorkspace = async (): Promise<{ user: User; accessToken: string }> => {
  const provider = new GoogleAuthProvider();
  SCOPES.forEach(scope => provider.addScope(scope));
  provider.setCustomParameters({ prompt: 'consent' });

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google Workspace.');
    }

    cachedAccessToken = credential.accessToken;
    cachedGoogleUser = result.user;

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Error al iniciar sesión con Google Workspace:', error);
    throw error;
  }
};

export const logoutGoogleWorkspace = async () => {
  cachedAccessToken = null;
  cachedGoogleUser = null;
};

const HEADERS = [
  'Documento',
  'Tipo Doc',
  'Nombre Completo',
  'Ficha',
  'Programa de Formación',
  'Regional',
  'Centro de Formación',
  'Fecha de Registro',
  'Estado Inducción',
  'Puntaje (%)',
  'Aciertos',
  'Total Preguntas',
  'Fecha de Finalización',
  'Resumen y Observaciones'
];

const apprenticeToRow = (a: ApprenticeProfile) => [
  a.docNumber,
  a.docType,
  a.fullName,
  a.ficha,
  a.program,
  a.regional,
  a.center,
  a.enrollmentDate,
  a.status,
  a.score !== undefined ? `${a.score}%` : 'Pendiente',
  a.answersSummary ? a.answersSummary.correct : 'N/A',
  a.answersSummary ? a.answersSummary.total : '10',
  a.completedAt || 'Pendiente',
  a.instructorNotes ? `Nota: ${a.instructorNotes}` : a.answersSummary ? `Aciertos: ${a.answersSummary.correct}/${a.answersSummary.total}` : 'Sin evaluar'
];

/**
 * Create a new Google Spreadsheet formatted with SENA identity in Google Drive.
 */
export const createInductionSpreadsheet = async (
  token: string,
  title: string,
  initialCohort: ApprenticeProfile[] = []
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: title || `SENA_Induccion_Cohorte_${new Date().toISOString().slice(0, 10)}`
      },
      sheets: [
        {
          properties: {
            title: 'Aprendices_Induccion',
            gridProperties: {
              frozenRowCount: 1
            }
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Error al crear hoja de cálculo: ${createRes.statusText}`);
  }

  const created = await createRes.json();
  const spreadsheetId = created.spreadsheetId;
  const spreadsheetUrl = created.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  const sheetId = created.sheets?.[0]?.properties?.sheetId || 0;

  // 1. Populate headers and initial cohort rows
  const allRows = [HEADERS, ...initialCohort.map(apprenticeToRow)];

  const valuesRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Induccion!A1:N${allRows.length}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: allRows
      })
    }
  );

  if (!valuesRes.ok) {
    console.warn('Headers were partially set, continuing formatting:', valuesRes.statusText);
  }

  // 2. Format Header Row with SENA Green (#39A900) & White bold text
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: HEADERS.length
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 57 / 255,
                    green: 169 / 255,
                    blue: 0 / 255
                  },
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    fontSize: 10,
                    bold: true
                  },
                  horizontalAlignment: 'CENTER'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
            }
          },
          {
            autoResizeDimensions: {
              dimensions: {
                sheetId: sheetId,
                dimension: 'COLUMNS',
                startIndex: 0,
                endIndex: HEADERS.length
              }
            }
          }
        ]
      })
    });
  } catch (fmtError) {
    console.warn('Formatting batch update non-fatal error:', fmtError);
  }

  return { spreadsheetId, spreadsheetUrl };
};

/**
 * Sync or update an apprentice row in the Google Spreadsheet.
 */
export const syncApprenticeToSheet = async (
  token: string,
  spreadsheetId: string,
  apprentice: ApprenticeProfile
): Promise<boolean> => {
  try {
    // 1. Fetch column A to check if apprentice exists
    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Induccion!A:A`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!checkRes.ok) {
      console.warn('Could not read existing rows from sheet, trying append:', checkRes.statusText);
      return appendApprenticeRow(token, spreadsheetId, apprentice);
    }

    const data = await checkRes.json();
    const rows = data.values || [];
    
    // Find index where docNumber matches (ignoring header at row 0)
    const existingIndex = rows.findIndex((r: any[], idx: number) => idx > 0 && r[0]?.toString().trim() === apprentice.docNumber.trim());

    if (existingIndex > 0) {
      // Row number in Google Sheets is 1-indexed (index + 1)
      const rowNum = existingIndex + 1;
      const rowData = apprenticeToRow(apprentice);

      const updateRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Induccion!A${rowNum}:N${rowNum}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            values: [rowData]
          })
        }
      );

      return updateRes.ok;
    } else {
      // Append new row
      return appendApprenticeRow(token, spreadsheetId, apprentice);
    }
  } catch (err) {
    console.error('Error synchronizing apprentice to sheet:', err);
    return false;
  }
};

const appendApprenticeRow = async (token: string, spreadsheetId: string, apprentice: ApprenticeProfile): Promise<boolean> => {
  const rowData = apprenticeToRow(apprentice);
  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Induccion!A:N:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowData]
      })
    }
  );

  return appendRes.ok;
};

/**
 * Sync entire cohort to Google Sheets (overwriting or appending all records).
 */
export const syncCohortToSheet = async (
  token: string,
  spreadsheetId: string,
  cohort: ApprenticeProfile[]
): Promise<boolean> => {
  try {
    const allRows = [HEADERS, ...cohort.map(apprenticeToRow)];
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aprendices_Induccion!A1:N${allRows.length}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: allRows
        })
      }
    );
    return res.ok;
  } catch (err) {
    console.error('Error syncing cohort to sheet:', err);
    return false;
  }
};
