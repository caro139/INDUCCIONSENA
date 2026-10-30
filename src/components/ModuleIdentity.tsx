import React, { useState, useRef } from 'react';
import { useInduction } from '../context/InductionContext';
import { SENA_INSTITUTIONAL_INFO, SENA_SYMBOLS } from '../data/senaData';
import { 
  Shield, 
  Flag, 
  Compass, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  History,
  Target,
  Eye,
  HeartHandshake
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const ModuleIdentity: React.FC = () => {
  const { markModuleCompleted, setActiveSection, completedModules } = useInduction();
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  const [activeStanzaIndex, setActiveStanzaIndex] = useState<number>(-1); // -1 is chorus
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStopRef = useRef<(() => void) | null>(null);

  const selectedSymbol = SENA_SYMBOLS.find(s => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  // Web Audio chime/hymn harmonic motif generator (clean, 100% client side)
  const togglePlayHymn = () => {
    if (isPlayingAudio) {
      if (audioStopRef.current) {
        audioStopRef.current();
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Melody notes for Colombian SENA march motif: C4, E4, G4, C5, G4, E4, C4, G4, C5
      const notes = [
        { freq: 261.63, dur: 0.5 }, // C4
        { freq: 329.63, dur: 0.5 }, // E4
        { freq: 392.00, dur: 0.5 }, // G4
        { freq: 523.25, dur: 0.8 }, // C5
        { freq: 392.00, dur: 0.4 }, // G4
        { freq: 329.63, dur: 0.4 }, // E4
        { freq: 261.63, dur: 0.5 }, // C4
        { freq: 392.00, dur: 0.5 }, // G4
        { freq: 523.25, dur: 1.2 }, // C5
      ];

      let startTime = ctx.currentTime + 0.1;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const oscillators: OscillatorNode[] = [];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, startTime);

        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + n.dur);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(startTime);
        osc.stop(startTime + n.dur);
        oscillators.push(osc);

        startTime += n.dur + 0.05;
      });

      setIsPlayingAudio(true);

      const timeoutId = setTimeout(() => {
        setIsPlayingAudio(false);
      }, (startTime - ctx.currentTime) * 1000);

      audioStopRef.current = () => {
        clearTimeout(timeoutId);
        oscillators.forEach(osc => {
          try { osc.stop(); } catch {}
        });
        ctx.close();
      };
    } catch (e) {
      console.error('Audio could not be initialized', e);
      setIsPlayingAudio(false);
    }
  };

  const handleComplete = () => {
    markModuleCompleted('identidad');
    setActiveSection('reglamento');
  };

  const getSymbolIcon = (id: string) => {
    switch (id) {
      case 'escudo':
        return (
          <img 
            src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png" 
            alt="Escudo" 
            className="w-4 h-4 object-contain inline-block"
            referrerPolicy="no-referrer"
          />
        );
      case 'bandera':
        return <Flag className="w-4 h-4" />;
      default:
        return <SenaLogo className="w-4 h-4 object-contain inline-block" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Module Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold text-[#39A900] tracking-wider uppercase">
          Módulo 01
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Identidad, Historia e Institucionalidad SENA
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl">
          El Servicio Nacional de Aprendizaje es el patrimonio más querido por los colombianos. Conoce los orígenes que forjaron la entidad, su misión transformadora y el significado de los símbolos patrios institucionales.
        </p>
      </div>

      {/* Grid: Historia, Mision & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#39A900] flex items-center justify-center mb-4">
            <History className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Origen y Creación</h3>
          <p className="text-sm text-slate-600 leading-relaxed flex-1">
            Fundado el <strong className="text-slate-800">21 de junio de 1957</strong> mediante el Decreto Ley 118, por iniciativa del cartagenero <strong className="text-slate-800">Rodolfo Martínez Tono</strong>, con el respaldo de la Organización Internacional del Trabajo (OIT) y los gremios de la producción para capacitar técnicamente a los trabajadores del país.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Más de 65 años impulsando el progreso de Colombia.
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#00324D] flex items-center justify-center mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Misión Institucional</h3>
          <p className="text-sm text-slate-600 leading-relaxed flex-1">
            {SENA_INSTITUTIONAL_INFO.mission}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Formación Profesional Integral 100% gratuita.
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#39A900] flex items-center justify-center mb-4">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Visión 2026</h3>
          <p className="text-sm text-slate-600 leading-relaxed flex-1">
            {SENA_INSTITUTIONAL_INFO.vision}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            Liderazgo en transformación digital e innovación verde.
          </div>
        </div>
      </div>

      {/* Símbolos Institucionales - Interactive Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 bg-slate-50/70">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Símbolos Institucionales</h3>
              <p className="text-sm text-slate-600 mt-0.5">
                Selecciona cada símbolo para explorar su significado pedagógico y cívico.
              </p>
            </div>

            {/* Segmented control for symbols */}
            <div className="inline-flex p-1 bg-slate-200/80 rounded-lg shrink-0">
              {SENA_SYMBOLS.map(symbol => (
                <button
                  key={symbol.id}
                  onClick={() => setSelectedSymbolId(symbol.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedSymbolId === symbol.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {getSymbolIcon(symbol.id)}
                  <span>{symbol.title.replace('El ', '').replace('La ', '')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected symbol visual & content */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual representation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl border border-slate-200 text-center">
              {selectedSymbol.id === 'escudo' && (
                <div className="space-y-4">
                  <div className="w-36 h-36 mx-auto rounded-2xl bg-white border border-slate-200 p-3 flex items-center justify-center shadow-sm relative overflow-hidden">
                    <img
                      src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                      alt="Escudo Oficial del SENA"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.escudo-fallback') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="escudo-fallback hidden w-full h-full items-center justify-center text-[#39A900]">
                      <Shield className="w-16 h-16" />
                    </div>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#39A900]">
                    Escudo Oficial · Sectores Primario, Secundario y Terciario
                  </div>
                </div>
              )}

              {selectedSymbol.id === 'bandera' && (
                <div className="space-y-4 w-full">
                  <div className="w-48 h-28 mx-auto bg-white border-2 border-slate-300 shadow-md relative flex items-center justify-center overflow-hidden rounded">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-[#39A900]"></div>
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img
                        src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                        alt="Escudo SENA en bandera"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#39A900]"></div>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Blanco de Paz · Verde de Progreso
                  </div>
                </div>
              )}

              {selectedSymbol.id === 'logosimbolo' && (
                <div className="space-y-4">
                  <div className="w-36 h-36 mx-auto rounded-2xl bg-white border border-slate-200 p-4 flex flex-col items-center justify-center shadow-sm">
                    <SenaLogo className="w-full h-full object-contain" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#39A900]">
                    Logo Oficial · El Aprendiz proyectándose al futuro
                  </div>
                </div>
              )}
            </div>

            {/* Content explanation */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold text-[#39A900] uppercase tracking-wide">
                  {selectedSymbol.subtitle}
                </span>
                <h4 className="text-2xl font-bold text-slate-900 mt-1">
                  {selectedSymbol.title}
                </h4>
              </div>

              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {selectedSymbol.description}
              </p>

              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-lg text-emerald-950 text-sm">
                <strong className="font-semibold block mb-1">Apropiación pedagógica:</strong>
                {selectedSymbol.meaning}
              </div>

              <div className="pt-2">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Puntos Clave del Símbolo
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedSymbol.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Himno del SENA */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#39A900] uppercase tracking-wide">Himno Institucional</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">Música: Daniel Marlez · Letra: Luis Alfredo Sánchez</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              "Estudiantes del SENA adelante..."
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={togglePlayHymn}
              className={`px-4 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition-all ${
                isPlayingAudio
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-[#39A900] border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Detener Melodía</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Escuchar Melodía Sintetizada</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hymn verses interactive viewer */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Coro */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50/60 to-slate-50 p-6 rounded-xl border border-emerald-200/60 flex flex-col justify-center">
            <div className="text-xs font-bold text-[#39A900] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Coro Principal (Cantar en actos solemnes)
            </div>
            <p className="text-base sm:text-lg font-serif italic text-slate-800 leading-relaxed text-center sm:text-left">
              "{SENA_INSTITUTIONAL_INFO.hymn.chorus}"
            </p>
          </div>

          {/* Stanzas */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SENA_INSTITUTIONAL_INFO.hymn.stanzas.map((stanza) => (
              <div
                key={stanza.number}
                onClick={() => setActiveStanzaIndex(stanza.number)}
                className={`p-4 rounded-xl border text-sm transition-all cursor-pointer ${
                  activeStanzaIndex === stanza.number
                    ? 'border-[#39A900] bg-emerald-50/40 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-400 mb-1">
                  Estrofa {stanza.number}
                </div>
                <p className="text-slate-700 italic leading-relaxed">
                  {stanza.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Valores del Código de Integridad */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#39A900]" />
          <h3 className="text-xl font-bold text-slate-900">
            Valores del Código de Integridad del SENA
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SENA_INSTITUTIONAL_INFO.values.map((val) => (
            <div key={val.title} className="p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs">
              <h4 className="text-base font-bold text-slate-900 mb-1 text-[#00324D]">{val.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Module Completion Footer */}
      <div className="p-6 bg-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">¿Apropiaste la identidad institucional?</div>
            <div className="text-xs text-slate-600">Al continuar, el sistema registrará tu avance formativo.</div>
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full sm:w-auto px-6 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>Apropiar y Continuar a Reglamento del Aprendiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
