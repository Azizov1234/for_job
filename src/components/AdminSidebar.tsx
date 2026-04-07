import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CarFront, ShoppingCart, LogOut, Car } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/cars', icon: CarFront, label: 'Manage Cars' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Manage Orders' },
];

export function AdminSidebar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-border hidden lg:flex flex-col z-40">
        <div className="h-16 flex items-center px-6 border-b border-border">
           <NavLink to="/" className="flex items-center gap-2 group">
             <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:scale-105 transition-transform duration-300">
               <Car size={18} />
             </div>
             <span className="font-bold text-lg tracking-tight">Drive.net CRM</span>
           </NavLink>
        </div>
        
        <div className="flex-1 py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all-smooth text-sm font-medium ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile nav indicator - minimalist for this demo */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border flex justify-around items-center z-40 px-2 sm:px-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 rounded-xl transition-all-smooth text-xs font-medium ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-gray-500 hover:text-primary'
                }`
              }
            >
              <item.icon size={20} className="mb-1" />
              <span className="hidden sm:block">{item.label}</span>
            </NavLink>
          ))}
      </div>
    </>
  );
}
