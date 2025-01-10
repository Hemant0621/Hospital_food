import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Bell , Menu , X } from 'lucide-react';
import { useState } from 'react';

// Types
type OrderSummary = {
  ordersReceived: number;
  ordersServed: number;
  pendingOrders: number;
  revenue: number;
  newCustomers: number;
};


type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  itemNumber: string;
};

type Order = {
  id: string;
  customer: string;
  food: {
    name: string;
    image: string;
  };
  phone: string;
  price: number;
  status: 'Accepted' | 'Pending';
};

const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample data
  const orderSummary: OrderSummary = {
    ordersReceived: 1520,
    ordersServed: 1428,
    pendingOrders: 30,
    revenue: 105,
    newCustomers: 36
  };

  const salesData = [
    { month: 'Jan', orders: 25, received: 30 },
    { month: 'Feb', orders: 15, received: 20 },
    { month: 'Mar', orders: 25, received: 28 },
    { month: 'Apr', orders: 30, received: 32 },
    { month: 'May', orders: 28, received: 30 },
    { month: 'Jun', orders: 20, received: 25 },
    { month: 'Jul', orders: 25, received: 30 },
    { month: 'Aug', orders: 20, received: 28 },
    { month: 'Sep', orders: 15, received: 22 },
    { month: 'Oct', orders: 20, received: 25 },
    { month: 'Nov', orders: 25, received: 28 }
  ];

  const popularItems: MenuItem[] = [
    { id: '1', name: 'Chilly Paner Footlong', price: 8.30, image: '/api/placeholder/200/150', itemNumber: '#996' },
    { id: '2', name: 'Chilly Garlic Bread', price: 7.35, image: '/api/placeholder/200/150', itemNumber: '#997' },
    { id: '3', name: 'Mutton King Burger', price: 9.55, image: '/api/placeholder/200/150', itemNumber: '#994' },
    { id: '4', name: 'Kebab Mutton Spicy', price: 8.97, image: '/api/placeholder/200/150', itemNumber: '#869' }
  ];

  const recentOrders: Order[] = [
    {
      id: '#25896',
      customer: 'Jefferson Clay',
      food: { name: 'Chicken Burger', image: '/api/placeholder/50/50' },
      phone: '+99 256 896 8855',
      price: 11.00,
      status: 'Accepted'
    },
    {
      id: '#27856',
      customer: 'Langston Lee',
      food: { name: 'Pizza Chicken Bake', image: '/api/placeholder/50/50' },
      phone: '+99 963 852 7744',
      price: 50.00,
      status: 'Pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-400 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          <h1 className="text-white text-xl font-bold flex gap-2 items-center cursor-pointer">
            <img className='h-8 md:h-10' src="/logo.png" alt="" />
            <span className="hidden sm:inline">Hospitailer</span>
          </h1>
          <span className="text-white text-sm md:text-base">Hi, {window.localStorage.getItem('user')}</span>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="text-white" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex relative">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative z-30 w-64 bg-white p-4 min-h-screen transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none`}>
          <nav className="space-y-4">
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span>Dashboard</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span>Patients</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span>Customers</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span>Menu</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span>Complaints</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span>Sales Report</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span>Update Menu</span>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 w-full">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <span className="text-xl md:text-2xl font-bold">{orderSummary.ordersReceived}</span>
                <span className="text-orange-500">☰</span>
              </div>
              <span className="text-sm text-gray-500">Orders received</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <span className="text-xl md:text-2xl font-bold">{orderSummary.ordersServed}</span>
                <span className="text-green-500 text-xl">🍽</span>
              </div>
              <span className="text-sm text-gray-500">Orders served</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <span className="text-xl md:text-2xl font-bold">{orderSummary.pendingOrders}</span>
                <span className="text-blue-500">⏳</span>
              </div>
              <span className="text-sm text-gray-500">Pending orders</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <span className="text-xl md:text-2xl font-bold">${orderSummary.revenue}</span>
                <span className="text-red-500">💰</span>
              </div>
              <span className="text-sm text-gray-500">Revenue</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <span className="text-xl md:text-2xl font-bold">{orderSummary.newCustomers}</span>
                <span className="text-yellow-500">👥</span>
              </div>
              <span className="text-sm text-gray-500">New customers</span>
            </div>
          </div>

          {/* Sales Report Chart */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Sales Report</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="orders" stroke="#ffa500" />
                  <Line type="monotone" dataKey="received" stroke="#ffcb8c" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popular Items */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Most Searched Foods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.itemNumber}</p>
                    <p className="text-orange-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <h2 className="text-lg font-semibold p-4">Recent Online Orders</h2>
            <div className="min-w-[768px]">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Order Id</th>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-left">Food</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-t">
                      <td className="px-4 py-2">{order.id}</td>
                      <td className="px-4 py-2">{order.customer}</td>
                      <td className="px-4 py-2 flex items-center space-x-2">
                        <img src={order.food.image} alt={order.food.name} className="w-8 h-8 rounded" />
                        <span>{order.food.name}</span>
                      </td>
                      <td className="px-4 py-2">{order.phone}</td>
                      <td className="px-4 py-2">${order.price.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded ${order.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;