import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import toast from 'react-hot-toast';

export function ManageCars() {
  const { cars, deleteCar } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter(car => 
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCar(id);
      toast.success('Car deleted successfully');
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Vehicles</h1>
          <p className="text-gray-500 mt-1">Manage your car listings.</p>
        </div>
        
        <button 
          onClick={() => toast('Add Car functionality (UI Mock)')}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus size={18} /> Add New Car
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50/50">
          <div className="relative w-64">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-smooth"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500 font-semibold border-b border-border">
              <tr>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Condition</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCars.map(car => (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={car.image} alt={car.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                    <span className="font-medium text-gray-900">{car.title}</span>
                  </td>
                  <td className="px-6 py-4">{car.brand}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">${car.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${car.condition === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {car.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button onClick={() => toast('Edit feature (Mock)')} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                         <Edit2 size={16} />
                       </button>
                       <button onClick={() => handleDelete(car.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCars.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No vehicles found matching "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
