/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Dog, 
  Calendar, 
  ClipboardList, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  UserCircle,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../../types';

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  roles: UserRole[];
  path: string;
  view?: string;
}

const menuItems: SidebarItem[] = [
  { 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    roles: [UserRole.ADMIN, UserRole.VETERINARIAN, UserRole.RECEPTION],
    path: '/',
    view: 'dashboard'
  },
  { 
    title: 'Calendario', 
    icon: Calendar, 
    roles: [UserRole.ADMIN, UserRole.VETERINARIAN, UserRole.RECEPTION],
    path: '/appointments',
    view: 'calendar'
  },
  { 
    title: 'Caja / POS', 
    icon: ShoppingCart, 
    roles: [UserRole.ADMIN, UserRole.RECEPTION],
    path: '/pos',
    view: 'pos'
  },
  { 
    title: 'Mascotas', 
    icon: Dog, 
    roles: [UserRole.ADMIN, UserRole.VETERINARIAN, UserRole.RECEPTION],
    path: '/pets',
    view: 'pets'
  },
  { 
    title: 'Propietarios', 
    icon: Users, 
    roles: [UserRole.ADMIN, UserRole.RECEPTION],
    path: '/owners',
    view: 'owners'
  },
  { 
    title: 'Expedientes', 
    icon: ClipboardList, 
    roles: [UserRole.ADMIN, UserRole.VETERINARIAN],
    path: '/clinical-records',
    view: 'clinical-records'
  },
  { 
    title: 'Configuracion', 
    icon: Settings, 
    roles: [UserRole.ADMIN],
    path: '/settings',
    view: 'settings'
  },
];

interface SidebarProps {
  userRole: UserRole;
  userName: string;
  onNavigate: (view: string) => void;
  activeView: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ userRole, userName, onNavigate, activeView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '260px' }}
      className="h-screen bg-[#4A5D4E] text-white flex flex-col relative transition-all duration-300 ease-in-out shadow-xl"
    >
      {/* Header / Logo */}
      <div className="p-6 flex items-center gap-3 overflow-hidden">
        <div className="min-w-10 h-10 rounded-xl bg-[#A8B5A2] flex items-center justify-center shadow-inner">
          <Dog size={22} className="text-white" />
        </div>
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl tracking-tight uppercase whitespace-nowrap"
          >
            VetCare<span className="text-[#E5BA73]">Pro</span>
          </motion.span>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-[#A8B5A2] rounded-full p-1 text-white hover:bg-[#E5BA73] transition-colors z-50 shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
        {filteredItems.map((item) => (
          <button
            key={item.title}
            onClick={() => item.view && onNavigate(item.view)}
            className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all group relative font-medium text-left ${
              activeView === item.view 
                ? 'bg-[#5D6F61] text-white' 
                : 'text-[#C5D1C7] hover:bg-[#5D6F61]/50 hover:text-white'
            }`}
          >
            <item.icon size={20} className={`${activeView === item.view ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'} transition-opacity`} />
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm"
              >
                {item.title}
              </motion.span>
            )}
            
            {/* Tooltip for collapsed mode */}
            {isCollapsed && (
              <div className="absolute left-16 bg-[#2D3436] text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
                {item.title}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-[#5D6F61] bg-[#425246]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#E5BA73] flex items-center justify-center font-bold text-xs text-white shadow-sm overflow-hidden">
            {userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col min-w-0"
            >
              <span className="text-white text-sm font-semibold truncate leading-none">{userName}</span>
              <span className="text-[#A8B5A2] text-[10px] uppercase font-bold mt-1 tracking-wider">{userRole}</span>
            </motion.div>
          )}
        </div>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors overflow-hidden">
          <LogOut size={18} />
          {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">Salir</span>}
        </button>
      </div>
    </motion.aside>
  );
};
