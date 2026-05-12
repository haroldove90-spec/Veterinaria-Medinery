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
      animate={{ width: isCollapsed ? '80px' : '100px' }}
      className="h-screen bg-[#0A58CA] text-white flex flex-col relative transition-all duration-300 ease-in-out shadow-2xl z-[110]"
    >
      {/* Header / Logo */}
      <div className="h-20 flex items-center justify-center border-b border-white/10">
        <div className="font-extrabold text-xl italic tracking-tighter">My<span className="text-medinery-teal">Doc</span></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 flex flex-col items-center gap-6 overflow-y-auto no-scrollbar">
        {filteredItems.map((item) => (
          <button
            key={item.title}
            onClick={() => item.view && onNavigate(item.view)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group relative ${
              activeView === item.view 
                ? 'bg-medinery-teal text-white shadow-lg shadow-medinery-teal/40' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <item.icon size={20} />
            
            {/* Tooltip */}
            <div className="absolute left-16 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-2 group-hover:translate-x-0 z-50 shadow-xl whitespace-nowrap">
              {item.title}
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 flex flex-col items-center gap-4 border-t border-white/10">
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
          <Settings size={18} />
        </button>
        <button 
          onClick={() => onNavigate('lobby')}
          className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center hover:bg-rose-500/40 transition-all mb-4"
        >
          <LogOut size={18} className="rotate-180" />
        </button>
      </div>
    </motion.aside>
  );
};
