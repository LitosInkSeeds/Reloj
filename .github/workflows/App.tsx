
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
    // Inicialización de Telegram WebApp
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.headerColor = '#000000';
      tg.backgroundColor = '#000000';
      
      // Botón principal nativo de Telegram para cerrar la app de forma limpia
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

  const statusLabel = getStatus();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white font-sans select-none overflow-hidden">
      
      {/* 1. ESFERA DEL RELOJ (FUNCIONAL) */}
      <div className="mb-12">
        <CosmicClock size={320} />
      </div>

      {/* 2. ETIQUETA DE TIEMPO CORRESPONDIENTE */}
      <div className="text-center">
        <div className="text-2xl font-black uppercase tracking-[0.3em] italic text-white/90">
          {statusLabel}
        </div>
      </div>

      {/* 3. BRANDING EXCLUSIVO */}
      <div className="absolute bottom-12">
        <p className="text-[11px] font-black tracking-[1.2em] uppercase italic opacity-30 ml-[1.2em]">
          Litos Ink Seeds
        </p>
      </div>
      
    </div>
  );
}
