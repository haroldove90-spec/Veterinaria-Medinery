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
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 z-50 shadow-sm relative">
      <div className="flex items-center gap-4 lg:gap-6 w-full max-w-2xl">
        {onOpenMenu && (
          <button 
            onClick={onOpenMenu}
            className="lg:hidden p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          >
            <Menu size={24} />
          </button>
        )}
        
        {title && (
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-lg font-black italic">M</span>
            </div>
            <span className="font-black text-slate-900 tracking-tighter">{title}</span>
          </div>
        )}

        <form onSubmit={handleSearch} className="hidden md:block flex-1 relative group ml-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar paciente o cliente..."
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all font-medium"
          />
        </form>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden md:flex flex-col items-end mr-2">
          <span className="text-[10px] font-bold text-[#A8B5A2] uppercase tracking-[0.2em] leading-none">Acceso</span>
          <span className="text-sm font-bold text-[#4A5D4E] mt-1">{currentRole} Mode</span>
        </div>

        <button className="relative p-2 text-[#7F8C8D] hover:text-[#4A5D4E] transition-colors hover:bg-[#F9F9F7] rounded-lg">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="w-px h-6 bg-[#F0EFEA]"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="w-8 h-8 rounded-full bg-[#E5BA73] flex items-center justify-center shadow-sm">
            <User size={18} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};
