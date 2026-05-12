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
  ShoppingCart,
  TrendingUp
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
    title: 'Reportes', 
    icon: TrendingUp, 
    roles: [UserRole.ADMIN],
    path: '/reports',
    view: 'reports'
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
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      className="h-screen bg-slate-900 text-white flex flex-col relative transition-all duration-300 ease-in-out shadow-2xl z-[110]"
    >
      {/* Header / Logo */}
      <div className="h-20 px-6 flex items-center gap-3 overflow-hidden border-b border-white/5">
        <div className="min-w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Dog size={22} className="text-white" />
        </div>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="font-black text-xl tracking-tighter leading-none">
              MEDINERY
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-indigo-400 mt-1">Veterinaria</span>
          </motion.div>
        )}
      </div>

      {/* Toggle Button (Hidden on Mobile, but Sidebar itself handles mobile visibility) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-24 bg-indigo-600 rounded-full p-1 text-white hover:bg-indigo-500 transition-colors z-50 shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto no-scrollbar">
        {filteredItems.map((item) => (
          <button
            key={item.title}
            onClick={() => item.view && onNavigate(item.view)}
            className={`w-full flex items-center gap-4 px-3 py-3.5 rounded-2xl transition-all group relative font-bold text-left ${
              activeView === item.view 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} className={`${activeView === item.view ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs uppercase tracking-widest"
              >
                {item.title}
              </motion.span>
            )}
            
            {isCollapsed && (
              <div className="absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 z-50 shadow-2xl border border-white/10">
                {item.title}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-xs text-white shadow-lg">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col min-w-0"
            >
              <span className="text-white text-xs font-black uppercase truncate tracking-tight">{userName}</span>
              <span className="text-slate-500 text-[9px] uppercase font-black mt-0.5 tracking-widest">{userRole}</span>
            </motion.div>
          )}
        </div>
        
        <div className="space-y-1">
          <button 
            onClick={() => onNavigate('lobby')}
            className="w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all"
          >
            <LogOut size={18} className="rotate-180" />
            {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
