import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Car, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Mock API Check
    setTimeout(() => {
      setIsLoading(false);
      
      if (email === 'admin@example.com' && password === 'SuperAdmin123!') {
        login({
          id: 'admin_1',
          name: 'Super Admin',
          email,
          role: 'admin',
          avatar: `https://ui-avatars.com/api/?name=Super+Admin&background=6366f1&color=fff`,
        });
        toast.success('Logged in successfully! Welcome back.');
        navigate('/');
      } else if (email.includes('@') && password.length >= 6) {
         // Fallback user login for generic mock
         login({
          id: Math.random().toString(36).substr(2, 9),
          name: 'Test User',
          email,
          role: 'user',
          avatar: `https://ui-avatars.com/api/?name=${email}&background=6366f1&color=fff`,
        });
        toast.success('User session started! Welcome.');
        navigate('/');
      } else {
         toast.error('Invalid credentials. Please try again.');
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border p-8 pb-10">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-primary text-primary-foreground p-3 rounded-xl mb-4 shadow-md">
          <Car size={28} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h1>
        <p className="text-gray-500 text-sm mt-2">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-smooth"
              placeholder="admin@drive.net"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <a href="#" className="text-xs font-medium text-accent hover:text-blue-600 transition-colors">Forgot password?</a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-smooth"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-gray-800 disabled:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all-smooth shadow-sm"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign In <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-primary hover:text-gray-700 transition-colors">
          Create one now
        </Link>
      </p>
    </div>
  );
}
