import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { NICHE_SOLUTIONS, SERVICE_CATEGORIES, NicheSolution } from '../data/agencyData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSolution: (sol: NicheSolution) => void;
  currency: 'INR' | 'USD';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSolution,
  currency
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredNiches = NICHE_SOLUTIONS.filter(n =>
    n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.hindiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.solution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl animated-glass-card border border-white/20 p-4 overflow-hidden">
        
        {/* Input */}
        <div className="flex items-center gap-3 px-3 pb-3 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by industry (e.g. restaurant, clinic, real estate, salon...)"
            className="flex-1 bg-transparent text-sm font-semibold text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-3 max-h-80 overflow-y-auto space-y-1">
          {filteredNiches.length > 0 ? (
            filteredNiches.map((niche) => (
              <div
                key={niche.id}
                onClick={() => {
                  onSelectSolution(niche);
                  onClose();
                  // scroll to industries section
                  const el = document.getElementById('industries');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-3 rounded-xl hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors group border border-transparent hover:border-cyan-500/30"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {niche.name} ({niche.hindiName})
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {niche.solution}
                  </p>
                </div>
                <div className="text-right pl-3">
                  <span className="text-xs font-bold text-cyan-400">
                    {currency === 'INR' ? niche.indiaBudget : niche.usaBudget}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No exact industry match found. Try typing 'restaurant', 'clinic', or 'retail'.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
