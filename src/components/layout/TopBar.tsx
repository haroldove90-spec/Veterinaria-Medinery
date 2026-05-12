/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { UserRole } from '../../types';

interface TopBarProps {
  currentRole: UserRole;
  onSearch: (query: string) => void;
  onOpenMenu?: () => void;
  title?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ currentRole, onSearch, onOpenMenu, title }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="h-20 bg-white flex items-center justify-between px-4 md:px-8 shrink-0 z-50 relative">
      <div className="flex items-center gap-4 lg:gap-6 w-full max-w-2xl">
        {onOpenMenu && (
          <button 
            onClick={onOpenMenu}
            className="lg:hidden p-2.5 text-slate-500 hover:text-medinery-teal hover:bg-slate-50 rounded-xl transition-all"
          >
            <Menu size={24} />
          </button>
        )}
        
        <div className="hidden lg:flex items-center gap-2">
          <span className="font-bold text-xl text-medinery-dark tracking-tight">Veterinaria Medinery</span>
        </div>

        <form onSubmit={handleSearch} className="hidden md:block flex-1 relative group ml-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-medinery-teal transition-colors" size={18} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar paciente, cliente o cita..."
            className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-medinery-teal/5 focus:border-medinery-teal transition-all font-medium"
          />
        </form>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-black text-slate-900 uppercase">James Smith</span>
          <span className="text-[10px] font-bold text-slate-400">Admin Medinery</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-medinery-teal/10 border-2 border-white shadow-sm flex items-center justify-center font-black text-medinery-teal overflow-hidden">
          JS
        </div>
      </div>
    </header>
  );
};
