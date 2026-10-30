import React, { useState } from 'react';
import { useInduction } from '../context/InductionContext';
import { SENA_RIGHTS } from '../data/senaData';
import { 
  Search, 
  Scale, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  HelpCircle,
  FileText
} from 'lucide-react';

export const ModuleRights: React.FC = () => {
  const { markModuleCompleted, setActiveSection } = useInduction();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Formación', 'Evaluación', 'Bienestar', 'Representación', 'Garantías'];

  const filteredRights = SENA_RIGHTS.filter(r => {
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.practicalExample.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'Todas' || r.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleComplete = () => {
    markModuleCompleted('derechos');
    setActiveSection('deberes');
  };

  return (
    <div className="space-y-8">
      {/* Module Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold text-[#39A900] tracking-wider uppercase">
          Módulo 02 · Reglamento del Aprendiz (Acuerdo 0009 de 2024)
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Derechos del Aprendiz SENA
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl">
          Como aprendiz matriculado en el SENA bajo el vigente <strong className="text-slate-800">Acuerdo 0009 de 2024</strong> del Consejo Directivo Nacional, eres el protagonista de tu formación integral. Conocer tus derechos te empodera para exigir una educación de excelencia, trato digno y el uso pleno de los ambientes de formación.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por derecho, artículo o palabra clave..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]/40 focus:border-[#39A900] transition-all"
          />
        </div>

        {/* Categories segmented buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#00324D] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRights.map((right) => (
          <div
            key={right.id}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-mono font-semibold text-[#39A900]">{right.article}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-600">{right.category}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00324D] transition-colors">
                {right.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {right.description}
              </p>
            </div>

            {/* Practical Example Box */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-lg text-xs text-emerald-950">
                <HelpCircle className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-slate-800 mb-0.5">Caso en la vida real:</strong>
                  <span>{right.practicalExample}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRights.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="text-base font-semibold text-slate-800">No se encontraron derechos con ese criterio</h4>
          <p className="text-xs text-slate-500 mt-1">Intenta con otro término de búsqueda o selecciona "Todas".</p>
        </div>
      )}

      {/* Institutional Guarantee Note */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-start gap-4">
        <Scale className="w-6 h-6 text-[#00324D] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-900 font-semibold block mb-0.5">Garantía del Debido Proceso (Art. 29 Constitución y Reglamento SENA):</strong>
          Ningún aprendiz podrá ser sancionado sin haber sido escuchado previamente en Comité de Evaluación y Seguimiento, con el derecho a presentar descargos, pruebas y recursos de reposición legal.
        </div>
      </div>

      {/* Module Completion Footer */}
      <div className="p-6 bg-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">¿Apropiaste tus derechos como aprendiz?</div>
            <div className="text-xs text-slate-600">Continuemos con tus deberes, prohibiciones y las consecuencias del incumplimiento.</div>
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>Continuar a Deberes y Prohibiciones</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
