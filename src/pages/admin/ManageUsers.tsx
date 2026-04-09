import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, User as UserIcon, Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import type { User } from '../../types';

/* Mock users list */
const MOCK_USERS: User[] = [
  { id: 'admin_1', name: 'Super Admin',   email: 'admin@example.com',   role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=4F46E5&color=fff',   createdAt: '2024-01-01' },
  { id: 'u2',      name: 'Alice Smith',   email: 'alice@example.com',   role: 'user',  avatar: 'https://ui-avatars.com/api/?name=Alice+Smith&background=6366f1&color=fff',   createdAt: '2024-01-10' },
  { id: 'u3',      name: 'Bob Johnson',   email: 'bob@example.com',     role: 'user',  avatar: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=10b981&color=fff',   createdAt: '2024-01-15' },
  { id: 'u4',      name: 'Charlie Brown', email: 'charlie@example.com', role: 'user',  avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=f59e0b&color=fff', createdAt: '2024-01-22' },
  { id: 'u5',      name: 'Diana Prince',  email: 'diana@example.com',   role: 'user',  avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=ec4899&color=fff',  createdAt: '2024-02-01' },
  { id: 'u6',      name: 'Edward Blake',  email: 'edward@example.com',  role: 'user',  avatar: 'https://ui-avatars.com/api/?name=Edward+Blake&background=14b8a6&color=fff',  createdAt: '2024-02-10' },
  { id: 'u7',      name: 'Fiona Green',   email: 'fiona@example.com',   role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Fiona+Green&background=8b5cf6&color=fff',   createdAt: '2024-02-18' },
];

export function ManageUsers() {
  const [users, setUsers]       = useState<User[]>(MOCK_USERS);
  const [search, setSearch]     = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      const newRole = u.role === 'admin' ? 'user' : 'admin';
      toast.success(`${u.name} is now ${newRole}.`);
      return { ...u, role: newRole };
    }));
  };

  const deleteUser = (id: string) => {
    const u = users.find(u => u.id === id);
    if (!u) return;
    if (!window.confirm(`Delete ${u.name}?`)) return;
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success('User removed.');
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Users</h1>
          <p className="text-gray-400 mt-1">Manage user accounts and roles.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/10 rounded-xl px-4 py-2">
          <UserIcon size={16} /> {users.length} total users
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="glass-card overflow-hidden"
      >
        {/* Search bar */}
        <div className="p-4 border-b border-gray-100 dark:border-white/10 bg-white/20 dark:bg-white/5">
          <div className="relative w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none input-glow transition-all-smooth"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="text-xs uppercase bg-gray-50/80 dark:bg-white/5 font-semibold border-b border-gray-100 dark:border-white/10">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {filtered.map((u, idx) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="table-row-hover hover:bg-white/40 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl object-cover border border-white/30" />
                      <span className="font-semibold text-gray-900 dark:text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{u.email}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{u.createdAt}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                      u.role === 'admin'
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400'
                    }`}>
                      {u.role === 'admin' ? <Shield size={11} /> : <UserIcon size={11} />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleRole(u.id)}
                        title="Toggle role"
                        className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg btn-hover-scale"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        title="Delete user"
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg btn-hover-scale"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-10 text-center text-gray-400">No users found for "{search}".</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
