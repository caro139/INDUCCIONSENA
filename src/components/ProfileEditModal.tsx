import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { SENA_REGIONALES, SENA_PROGRAMS } from '../data/senaData';
import { X } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const ProfileEditModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { currentApprentice, updateCurrentApprentice } = useInduction();

  const [fullName, setFullName] = useState(currentApprentice.fullName);
  const [docType, setDocType] = useState(currentApprentice.docType);
  const [docNumber, setDocNumber] = useState(currentApprentice.docNumber);
  const [ficha, setFicha] = useState(currentApprentice.ficha);
  const [program, setProgram] = useState(currentApprentice.program);
  const [regional, setRegional] = useState(currentApprentice.regional);
  const [center, setCenter] = useState(currentApprentice.center);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentApprentice({
      fullName,
      docType,
      docNumber,
      ficha,
      program,
      regional,
      center
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 flex items-center justify-center">
              <SenaLogo className="w-full h-full object-contain" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Personalizar Datos del Aprendiz</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nombres y Apellidos *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tipo Doc</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
              >
                <option value="CC">CC</option>
                <option value="TI">TI</option>
                <option value="CE">CE</option>
                <option value="PEP">PEP</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Número de Documento *</label>
              <input
                type="text"
                required
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Ficha SENA *</label>
              <input
                type="text"
                required
                value={ficha}
                onChange={(e) => setFicha(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg font-mono"
              />
            </div>
            <div className="col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Programa de Formación</label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg bg-white truncate"
              >
                {SENA_PROGRAMS.map(prog => (
                  <option key={prog} value={prog}>{prog}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Regional SENA</label>
            <select
              value={regional}
              onChange={(e) => setRegional(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
            >
              {SENA_REGIONALES.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Centro de Formación</label>
            <input
              type="text"
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white font-bold rounded-lg shadow-xs"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
