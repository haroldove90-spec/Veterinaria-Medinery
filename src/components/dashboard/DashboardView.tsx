/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Download, 
  ChevronDown,
  Star,
  Users,
  Grid,
  Bell
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { AppointmentStatus } from '../../types';

// --- Improved Data Structure for Visual Representation ---
const performanceData = [
  { name: 'Jan', value: 300 },
  { name: 'Feb', value: 200 },
  { name: 'Mar', value: 250 },
  { name: 'Apr', value: 220 },
  { name: 'May', value: 280 },
  { name: 'Jun', value: 400 },
  { name: 'Jul', value: 300 },
  { name: 'Aug', value: 320 },
  { name: 'Sep', value: 250 },
  { name: 'Oct', value: 280 },
  { name: 'Nov', value: 220 },
  { name: 'Dec', value: 350 },
];

const genderData = [
  { name: 'Male', value: 4000, color: '#0A58CA' },
  { name: 'Female', value: 1000, color: '#E2E8F0' },
];

const appointments = [
  { id: 1, name: 'Linda Brown', time: '08:00 AM', status: 'confirmed', type: 'First visit' },
  { id: 2, name: 'Nelly Dean', time: '09:00 AM', status: 'confirmed', type: 'First visit' },
  { id: 3, name: 'John Doe', time: '10:00 AM', status: 'confirmed', type: 'First visit' },
  { id: 4, name: 'James Vane', time: '10:45 AM', status: 'confirmed', type: 'First visit' },
  { id: 5, name: 'Mary Smith', time: '11:00 AM', status: 'cancelled', type: 'Consultation' },
];

const patientFiles = [
  { name: 'Linda Pres***.pdf', id: '1' },
  { name: 'John Checkup.pdf', id: '2' },
  { name: 'James Pres***.pdf', id: '3' },
  { name: 'Nelly X-ray result.pdf', id: '4' },
];

const doctorReviews = [
  { id: 1, name: 'Linda Brown', text: 'Dr. James is a great doctor!' },
  { id: 2, name: 'John Doe', text: 'Dr. James is my favorite' },
  { id: 3, name: 'James Vane', text: 'Thanks Doc!' },
];

export const DashboardView: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 bg-[#F8FAFD] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-medinery-dark">Hello James!</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Welcome James to Our Platform.<br/>
            Let's help patients to live a healthier and happier life
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 bg-medinery-teal text-white rounded-lg flex items-center justify-center shadow-lg shadow-medinery-teal/20">
            <Grid size={18} />
          </button>
          <button className="w-10 h-10 bg-white border border-slate-200 text-slate-400 rounded-lg flex items-center justify-center shadow-sm">
            <Bell size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Section (Column 1 & 2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Income Chart Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-lg font-bold text-medinery-dark">Doctor Salary</h2>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-medinery-teal text-white rounded-lg text-xs font-bold">
                Yearly <ChevronDown size={14} />
              </button>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A58CA" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0A58CA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0A58CA" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    dot={{ r: 4, fill: '#fff', stroke: '#0A58CA', strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-around mt-6 border-t border-slate-50 pt-6">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">This Week</p>
                <p className="text-2xl font-black text-medinery-blue">$259</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">This Month</p>
                <p className="text-2xl font-black text-medinery-blue">$873</p>
              </div>
            </div>
          </div>

          {/* Duty Hour Calendar / Widget */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 h-fit">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-medinery-dark">Duty Hour</h2>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-medinery-teal text-white rounded-lg text-xs font-bold">
                Weekly <ChevronDown size={14} />
              </button>
            </div>
            <div className="flex justify-between items-center gap-1">
              {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day} className={`flex flex-col items-center p-3 rounded-2xl w-full max-w-[60px] transition-all cursor-pointer ${day === 'Mon' ? 'bg-medinery-blue text-white shadow-xl shadow-medinery-blue/30 scale-110' : 'text-slate-400 hover:bg-slate-50'}`}>
                  <span className="text-[10px] font-bold mb-2">{day}</span>
                  <span className="text-lg font-black">{9 + i - (i > 3 ? 5 : 0)}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-medinery-blue rounded-full text-white font-bold text-sm shadow-xl shadow-medinery-blue/20 flex items-center justify-center gap-2">
              <span className="text-xl font-black">49 hours</span>
              <span className="opacity-60 text-xs font-medium italic">Avg Duty Hour</span>
            </button>
          </div>
        </div>

        {/* Center Section (Column 3) */}
        <div className="space-y-8">
          {/* Gender Distribution Chart */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-medinery-dark">Patient Gender</h2>
              <button className="text-medinery-teal text-[10px] font-black uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="flex items-center gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-medinery-blue rounded-full" />
                  <span className="text-xs font-bold text-slate-500">4000 Male</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-200 rounded-full" />
                  <span className="text-xs font-bold text-slate-500">1000 Female</span>
                </div>
              </div>
              <div className="relative w-32 h-32 mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      innerRadius={40}
                      outerRadius={55}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-medinery-dark">
                  80%
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointment List */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col flex-1 min-h-[460px]">
            <h2 className="text-lg font-bold text-medinery-dark mb-8">Upcoming Appointment</h2>
            <div className="space-y-6 flex-1">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{appt.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{appt.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-900 bg-slate-50 px-2 py-1 rounded-md">{appt.time}</span>
                    {appt.status === 'confirmed' ? (
                      <CheckCircle2 size={16} className="text-medinery-teal" />
                    ) : (
                      <XCircle size={16} className="text-rose-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section (Column 4) */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden group">
            <h2 className="text-xs font-black uppercase text-slate-400 tracking-widest text-left mb-8">Profile</h2>
            <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 border-4 border-white shadow-lg shadow-slate-200/50" />
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Dr James Smith</h3>
            <p className="text-xs font-bold text-medinery-blue italic ">Cardiologists doctors</p>
            
            <div className="flex justify-around items-center mt-8 pt-8 border-t border-slate-50 mb-8">
              <div className="flex flex-col items-center">
                <Star className="text-medinery-blue mb-1" size={14} fill="currentColor" />
                <span className="text-sm font-black text-slate-900">4.5 Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="text-medinery-blue mb-1" size={14} />
                <span className="text-sm font-black text-slate-900">115 Patient</span>
              </div>
            </div>

            <div className="space-y-4 text-left">
              {doctorReviews.map(review => (
                <div key={review.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                  <div>
                    <h5 className="text-[10px] font-black text-slate-900">{review.name}</h5>
                    <p className="text-[10px] text-slate-500 font-medium italic">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Files */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-medinery-dark">Patient File</h2>
              <button className="text-medinery-teal text-[10px] font-black uppercase tracking-widest bg-medinery-teal/10 px-3 py-1 rounded-lg">View As</button>
            </div>
            <div className="space-y-4">
              {patientFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 group hover:bg-medinery-blue/5 transition-all">
                  <div className="flex items-center gap-3">
                    <FileText className="text-medinery-blue" size={16} />
                    <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{file.name}</span>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-medinery-blue/10 text-medinery-blue flex items-center justify-center group-hover:bg-medinery-blue group-hover:text-white transition-all shadow-sm">
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
