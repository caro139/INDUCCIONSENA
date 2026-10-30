# Sincronización Automática con Google Sheets y Google Drive · SENA Inducción

Plan de arquitectura e implementación para sincronizar automáticamente el registro de aprendices y los resultados de su evaluación de apropiación del conocimiento en una hoja de cálculo alojada en Google Drive, mediante Google Workspace APIs y OAuth institucional.

---

### Decisiones Críticas y Confirmaciones del Usuario

> [!IMPORTANT]
> A partir de las aclaraciones confirmadas en la Fase 1, se han fijado las siguientes definiciones clave de producto:

- **Autenticación e Integración Workspace**: Se utilizará Google Workspace OAuth (`set_up_oauth`) para conectar la cuenta Google institucional del instructor o coordinador, solicitando los permisos mínimos necesarios (`https://www.googleapis.com/auth/spreadsheets` y `https://www.googleapis.com/auth/drive.file`).
- **Hito de Sincronización**: La sincronización se ejecutará de forma automática en dos momentos estratégicos:
  1. Al registrarse o ingresar como aprendiz (creación/actualización de ficha de aprendiz).
  2. Al finalizar la Evaluación de Apropiación del Conocimiento (registro de puntaje, aciertos, estado normativo y resumen de áreas).
- **Nivel de Detalle del Registro**: Registro integral en columnas estructuradas que incluye identificación, datos de ficha, programa, regional, resultado cuantitativo y cualitativo de la evaluación, y resumen de respuestas.

---

## 1. Visión General y Concepto Central

- **Propósito**: Permitir que los instructores y coordinadores del SENA cuenten con una hoja de cálculo en su Google Drive que consolide en tiempo real la lista de aprendices, su avance en la inducción y el resultado de la evaluación del Reglamento del Aprendiz (Acuerdo 0009 de 2024).
- **Público Objetivo**: 
  - **Instructores y Coordinadores**: Pueden vincular su Drive con un clic, crear una hoja titulada `"SENA_Induccion_Cohorte_[Ficha]"`, y compartirla o auditarla en vivo.
  - **Aprendices**: No requieren permisos especiales de Drive; sus datos se envían a la hoja centralizada de la cohorte sin interrumpir su experiencia formativa.
- **Valor Principal**: Elimina la descarga manual repetitiva de archivos CSV y centraliza la evidencia institucional de apropiación de conocimientos en la nube oficial de Google.

---

## 2. Experiencia de Usuario y Diseño Visual

### Flujo de Usuario

1. **Vinculación por el Instructor (Panel de Control)**:
   - En el **Panel de Instructor**, aparece una tarjeta dedicada: *"Sincronización con Google Drive & Sheets"*.
   - Si no está conectado, muestra el botón oficial de inicio de sesión con Google.
   - Una vez autenticado, muestra el estado de la hoja de cálculo:
     - Botón **"Crear Hoja de Cálculo en Google Drive"** (crea la hoja con cabeceras institucionales).
     - Enlace directo con ícono externo: *"Abrir en Google Sheets ↗"*.
     - Indicador de estado: *"Sincronización en tiempo real activa"*.
2. **Registro del Aprendiz**:
   - Al registrarse o iniciar sesión, el sistema despacha una solicitud asíncrona que verifica si el aprendiz ya existe en la hoja (por número de documento) y añade la fila o actualiza sus datos básicos.
3. **Culminación de la Evaluación**:
   - Al dar clic en *"Finalizar y Calificar"*, la aplicación califica las 10 preguntas y envía a la hoja de Google Sheets los resultados: puntaje, estado (`Aprobado` o `Plan de Mejoramiento`), fecha/hora y desglose por categorías.
   - En pantalla, el aprendiz recibe un aviso sutil y positivo: *"Datos y resultado registrados en la base central institucional"*.

### Identidad Visual y Estilo

- **Paleta y Postura**: Verde institucional SENA (`#39A900`), Azul Institucional (`#00324D`), fondos claros pulcros y soporte de modo oscuro contrastado.
- **Tipografía y Jerarquía**: Tipografía legible (*Plus Jakarta Sans* y *Outfit*), metadatos sin cajas innecesarias (separadores tipográficos discretos `·`).
- **Estados Interactivos**: Indicador de sincronización con insignias de estado sutiles (Sin vincular, Sincronizando, Conectado) y notificación flotante sin bloqueo de pantalla.

---

## 3. Decisiones de Producto y Compensaciones (Trade-Offs)

- **Creación Automática vs. Hoja Preexistente**:
  - *Enfoque Seleccionado*: La plataforma ofrecerá un botón para crear automáticamente una hoja formateada con títulos y encabezados SENA (`SENA_Induccion_Cohorte_[Fecha]`), guardando el `spreadsheetId` en memoria/configuración local y en Firestore, permitiendo además ingresar un ID existente si el centro ya tiene una plantilla.
  - *Motivo*: Brinda una experiencia de cero fricción con un solo clic, sin forzar al usuario a copiar y pegar IDs de URL manualmente.
- **Sincronización al Finalizar vs. Pregunta por Pregunta**:
  - *Enfoque Seleccionado*: Sincronizar en los dos hitos (registro y culminación de evaluación).
  - *Motivo*: Evita agotar las cuotas de API de Google Sheets (límite de 300 peticiones por minuto por proyecto) y no genera latencia en el temporizador del examen mientras el aprendiz responde.
- **Almacenamiento del Token de Acceso**:
  - *Enfoque Seleccionado*: Mantenimiento del token OAuth en memoria mediante el listener de autenticación de Firebase (`GoogleAuthProvider`), sin persistir el token de acceso en `localStorage` por normas de seguridad.

---

## 4. Arquitectura Técnica y Estrategia de Datos

### Diagrama del Sistema y Flujo de Sincronización

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PORTAL SENA INDUCCIÓN                           │
└────────────────────────────────────────────────────────────────────────┘
          │                                              │
          ▼                                              ▼
┌────────────────────────┐                    ┌──────────────────────────┐
│     ROL INSTRUCTOR     │                    │       ROL APRENDIZ       │
│  (Google Workspace     │                    │ (Registro & Evaluación   │
│   OAuth 2.0 Login)     │                    │  Acuerdo 0009 de 2024)   │
└────────────────────────┘                    └──────────────────────────┘
          │ (Token Bearer en memoria)                    │ (Payload de datos)
          ▼                                              ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SERVICIO DE SINCRONIZACIÓN GOOGLE                    │
│                        (src/services/sheets.ts)                        │
├────────────────────────────────────────────────────────────────────────┤
│  • createInductionSpreadsheet(token, title)                            │
│  • appendOrUpdateApprenticeRow(token, sheetId, apprenticeData)         │
│  • updateEvaluationResult(token, sheetId, apprenticeDoc, evalResult)   │
└────────────────────────────────────────────────────────────────────────┘
                                 │
                 Llamadas REST Google Sheets API v4
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      GOOGLE DRIVE & GOOGLE SHEETS                      │
│            Hoja: "SENA_Induccion_Cohorte_ADSO_2026"                    │
├────────────────────────────────────────────────────────────────────────┤
│ Columnas:                                                              │
│ [Doc | Tipo | Nombres | Ficha | Programa | Regional | Centro |         │
│  Fecha Registro | Estado | Puntaje (%) | Aciertos | Total | Resumen]  │
└────────────────────────────────────────────────────────────────────────┘
```

### Estructura de Columnas en Google Sheets

1. **Documento**: Número de identificación del aprendiz.
2. **Tipo Doc**: CC, TI, CE, PEP.
3. **Nombre Completo**: Nombre y apellidos registrados.
4. **Ficha de Formación**: Código de ficha (ej: 2834920).
5. **Programa**: Programa de formación académica.
6. **Regional & Centro**: Sede de formación.
7. **Fecha y Hora de Registro**: Marca temporal ISO / local.
8. **Estado Formativo**: `En proceso`, `Aprobado` o `Plan de Mejoramiento`.
9. **Puntaje Obtenido (%)**: Porcentaje de 0% a 100%.
10. **Aciertos**: Número de respuestas correctas (ej: 9 de 10).
11. **Total Preguntas**: 10.
12. **Fecha de Finalización**: Fecha y hora de presentación del cuestionario.
13. **Desglose de Áreas**: Resumen cuantitativo por temas del Reglamento.

---

## 5. Fases de Ejecución

1. **Fase 1: Configuración de Google Workspace OAuth**:
   - Ejecutar `set_up_oauth` con los scopes `https://www.googleapis.com/auth/spreadsheets` y `https://www.googleapis.com/auth/drive.file`.
   - Pausar para la aprobación de permisos mediante la tarjeta del sistema.
2. **Fase 2: Servicio de Integración Google Sheets**:
   - Crear cliente REST para Google Sheets API (`spreadsheets.create`, `spreadsheets.values.append`, `spreadsheets.values.update`, `spreadsheets.values.get`).
   - Implementar formateo de filas con encabezados oficiales SENA en verde y blanco.
3. **Fase 3: Integración con el Panel de Instructor**:
   - Añadir sección en `InstructorDashboard.tsx` con botón para conectar Google, crear la hoja en Google Drive, ver su enlace en vivo y verificar el estado de sincronización.
4. **Fase 4: Conexión de Eventos de Sincronización**:
   - Conectar el registro del aprendiz en `RoleEntryScreen.tsx` / `RegisterForm.tsx` con el despacho hacia la hoja de cálculo.
   - Conectar la función `finishEvaluation` en `InductionContext.tsx` para sincronizar el puntaje, estado y respuestas en tiempo real.
5. **Fase 5: Validación y Pruebas**:
   - Compilación con `compile_applet` y validación estricta con `lint_applet`.
   - Verificación de manejo de errores si el usuario no tiene conexión o si la hoja aún no ha sido creada.
