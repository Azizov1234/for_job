import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-4 sm:p-8 md:p-10 min-h-screen overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
