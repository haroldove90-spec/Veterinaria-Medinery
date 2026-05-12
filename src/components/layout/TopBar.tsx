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
}

export const TopBar: React.FC<TopBarProps> = ({ currentRole, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="h-16 bg-white border-b border-[#F0EFEA] flex items-center justify-between px-8 shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-6 w-full max-w-2xl">
        <form onSubmit={handleSearch} className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B5A2] group-focus-within:text-[#4A5D4E] transition-colors" size={18} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar propietario, mascota o teléfono... (Alt + S)"
            className="w-full bg-[#F9F9F7] border border-[#F0EFEA] rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]/10 focus:border-[#4A5D4E] transition-all"
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
