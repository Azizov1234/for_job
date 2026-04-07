import { BarChart3, TrendingUp, ShoppingBag, CarFront } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function Dashboard() {
  const { orders, cars } = useAppStore();

  const totalSales = orders
    .filter((o) => o.status !== 'PENDING')
    .reduce((acc, curr) => acc + curr.price, 0);
    
  const totalOrders = orders.length;

  const topSellingCar = cars[0]?.title || 'Tesla Model S Plaid'; // Fake logic for top selling

  const stats = [
    { label: 'Total Sales', value: `$${totalSales.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Listings', value: cars.length.toString(), icon: CarFront, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Top Selling', value: topSellingCar, icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
        <p className="text-gray-500 mt-1">Metrics and performance of your marketplace.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5 truncate max-w-[150px]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm p-6 h-[400px] flex flex-col justify-center items-center">
            {/* Fake Chart Placeholder */}
            <BarChart3 size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium font-sm">Analytics Chart Placeholder</p>
            <p className="text-gray-400 text-xs mt-1">Integration with Chart.js or Recharts recommended</p>
        </div>
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 line-clamp-1 h-[400px] overflow-hidden flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="flex-1 space-y-4">
            {orders.slice(0, 4).map(order => (
              <div key={order.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                  {order.userName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{order.carTitle}</p>
                  <p className="text-xs text-gray-500 truncate">{order.userName}</p>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  ${(order.price / 1000).toFixed(1)}k
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
