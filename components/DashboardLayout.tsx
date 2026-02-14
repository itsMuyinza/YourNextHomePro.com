
import React from 'react';
import { Home, User, MessageSquare, Shield, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { DashboardViewState, Pro } from '../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeView: DashboardViewState;
  onViewChange: (view: DashboardViewState) => void;
  pro: Pro;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeView, onViewChange, pro }) => {
  
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="h-5 w-5" /> },
    { id: 'inbox', label: 'Inbox', icon: <MessageSquare className="h-5 w-5" />, badge: 3 },
    { id: 'profile', label: 'My Profile', icon: <User className="h-5 w-5" /> },
    { id: 'credentials', label: 'Credentials', icon: <Shield className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-taupe/10 hidden lg:flex flex-col sticky top-20 h-[calc(100vh-80px)]">
        <div className="p-6">
           <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-xl bg-terracotta/10 flex items-center justify-center text-terracotta">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-espresso leading-tight">Pro Portal</h3>
                <span className="text-[10px] text-taupe uppercase tracking-widest">Business Suite</span>
              </div>
           </div>
           
           <nav className="space-y-1">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => onViewChange(item.id as DashboardViewState)}
                 className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                   activeView === item.id 
                     ? 'bg-espresso text-white shadow-md' 
                     : 'text-taupe hover:bg-gray-50 hover:text-espresso'
                 }`}
               >
                 <div className="flex items-center gap-3">
                   {item.icon}
                   {item.label}
                 </div>
                 {item.badge && (
                   <span className="bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                     {item.badge}
                   </span>
                 )}
               </button>
             ))}
           </nav>
        </div>

        <div className="mt-auto p-6 border-t border-taupe/10">
           <div className="flex items-center gap-3 mb-4">
              <img src={pro.imageUrl} alt="Profile" className="h-10 w-10 rounded-full object-cover border border-taupe/20" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-espresso truncate">{pro.businessName}</p>
                <p className="text-xs text-taupe truncate">{pro.email}</p>
              </div>
           </div>
           <button className="flex items-center gap-2 text-xs font-bold text-taupe hover:text-red-600 transition-colors uppercase tracking-wider">
             <LogOut className="h-4 w-4" /> Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};
