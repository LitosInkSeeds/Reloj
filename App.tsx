
import React, { useState, useEffect } from 'react';
import { CosmicClock } from './components/CosmicClock';

declare global {
  interface Window {
    Telegram: any;
  }
}

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Configuración de la interfaz de Telegram
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
      tg.headerColor = '#000000';
      tg.backgroundColor = '#000000';
      
      if (tg.MainButton) {
        tg.MainButton.setText("CERRAR");
        tg.MainButton.show();
        tg.MainButton.onClick(() => tg.close());
      }
    }

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatus = () => {
    const h = time.getHours();
    if (h >= 3 && h < 9) return "TIEMPO DE AUTOCUIDADO";
    if (h >= 9 && h < 15) return "TIEMPO DE TRABAJO";
    if (h >= 15 && h < 21) return "TIEMPO DE CREATIVIDAD";
    return "TIEMPO DE DESCANSO";
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-between py-16 px-6 text-white font-sans select-none overflow-hidden touch-none">
      
      {/* ESPACIADOR SUPERIOR */}
      <div className="h-4" />

      {/* 1. ESFERA DEL RELOJ (CENTRAL) */}
      <div className="relative flex items-center justify-center w-full max-w-[85vw]">
        <CosmicClock size={Math.min(window.innerWidth * 0.85, 360)} />
      </div>

      {/* 2. ETIQUETA DE TIEMPO Y BRANDING */}
      <div className="flex flex-col items-center gap-12">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.4em] text-white/40 mb-2 uppercase">Ciclo Actual</p>
          <h2 className="text-2xl font-black uppercase tracking-[0.25em] italic text-white/95 leading-tight">
            {getStatus()}
          </h2>
        </div>

        <div className="flex flex-col items-center opacity-30">
          <div className="w-8 h-[1px] bg-white mb-4" />
          <p className="text-[10px] font-black tracking-[1.2em] uppercase italic ml-[1.2em]">
            Litos Ink Seeds
          </p>
        </div>
      </div>
      
    </div>
  );
}
