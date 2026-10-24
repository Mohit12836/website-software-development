import React from 'react';
import { Home, Sparkles, Layout, MessageSquarePlus, Mail } from 'lucide-react';
import { STUDIO_CONFIG } from '../data/studioConfig';

interface MobileBottomNavProps {
  onOpenConsultation: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenConsultation
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060913]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 flex items-center justify-around shadow-2xl">
      <button
        onClick={() => scrollTo('hero')}
        className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>

      <button
        onClick={() => scrollTo('demos')}
        className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
      >
        <Layout className="w-4 h-4" />
        <span>Demos</span>
      </button>

      <button
        onClick={() => scrollTo('pricing')}
        className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
      >
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Pricing</span>
      </button>

      {/* Main Consultation Trigger */}
      <button
        onClick={onOpenConsultation}
        className="flex flex-col items-center gap-1 text-[10px] text-amber-400 font-bold hover:brightness-110 transition-colors"
      >
        <MessageSquarePlus className="w-4 h-4" />
        <span>Discuss Project</span>
      </button>

      {/* Verified Email Contact */}
      <a
        href={`mailto:${STUDIO_CONFIG.contacts.email}?subject=Project%20Brief%20Inquiry`}
        className="flex flex-col items-center gap-1 text-[10px] text-cyan-400 font-medium transition-colors"
      >
        <Mail className="w-4 h-4" />
        <span>Email Us</span>
      </a>
    </div>
  );
};
