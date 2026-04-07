import { useAppStore } from '../../store/useAppStore';
import type { Order } from '../../types';
import toast from 'react-hot-toast';

const statuses: Order['status'][] = ['PENDING', 'CONFIRMED', 'DELIVERED'];

export function ManageOrders() {
  const { orders, updateOrderStatus } = useAppStore();

  const handleStatusChange = (id: string, status: Order['status']) => {
    updateOrderStatus(id, status);
    toast.success(`Order status updated to ${status}`);
  };

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    CONFIRMED: 'bg-blue-100 text-blue-700',
    DELIVERED: 'bg-green-100 text-green-700',
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Orders</h1>
        <p className="text-gray-500 mt-1">Manage customer purchases.</p>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">#{order.id.toUpperCase()}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.userName}</td>
                  <td className="px-6 py-4">{order.carTitle}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">${order.price.toLocaleString()}</td>
                  <td className="px-6 py-4 flex justify-end">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-0 cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none appearance-none ${statusColors[order.status]}`}
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
             <div className="p-8 text-center text-gray-500">
             No orders found.
           </div>
          )}
        </div>
      </div>
    </div>
  );
}
