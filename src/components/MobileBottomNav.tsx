import React from 'react';
import { Home, Layers, Grid, PlayCircle, MessageCircle, PhoneCall } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenConsultation: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenConsultation
}) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060913]/95 backdrop-blur-2xl border-t border-white/10 px-3 py-2.5 flex items-center justify-around shadow-2xl">
      <a 
        href="#"
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-cyan-400 active:scale-95 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </a>

      <a 
        href="#solutions"
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-cyan-400 active:scale-95 transition-all"
      >
        <Layers className="w-4 h-4" />
        <span>Services</span>
      </a>

      <a 
        href="#industries"
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-cyan-400 active:scale-95 transition-all"
      >
        <Grid className="w-4 h-4" />
        <span>Industries</span>
      </a>

      <a 
        href="#demos"
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-cyan-400 active:scale-95 transition-all"
      >
        <PlayCircle className="w-4 h-4" />
        <span>Demos</span>
      </a>

      <button
        onClick={onOpenConsultation}
        className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-cyan-400 active:scale-90 transition-all"
      >
        <div className="w-7 h-7 rounded-full bilberrry-btn-glow text-white flex items-center justify-center -mt-3 shadow-lg shadow-cyan-500/40">
          <PhoneCall className="w-3.5 h-3.5" />
        </div>
        <span>Quote</span>
      </button>

      <a 
        href="https://wa.me/919999999999?text=Hello%20Vismart%20Studio,%20I%20need%20a%20website%20consultation."
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-emerald-400 hover:text-emerald-300 active:scale-95 transition-all"
      >
        <MessageCircle className="w-4 h-4 text-emerald-400" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};
