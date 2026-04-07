import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <Outlet />
      </main>
      <footer className="w-full bg-white border-t border-border mt-auto py-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Drive.net - Premium Car Marketplace
      </footer>
    </div>
  );
}
