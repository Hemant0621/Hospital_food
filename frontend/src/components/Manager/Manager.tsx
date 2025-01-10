import { useState } from 'react';
import Navbar from '../Navbar';
import Manager_dashboard from './Manager_dashboard';
import Manager_patient from './Manager_patient';
import Manager_Menu from './Manager_Menu';
import Manager_report from './Manager_report';

// Create a context or prop to share sidebar state between components
interface DashboardProps {
  toggleSidebar?: () => void;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavClick = (component: string) => {
    setActiveComponent(component);
    // Close sidebar on mobile when navigation item is clicked
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex relative">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative z-30 w-64 bg-white p-4 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none`}
        >
          <nav className="space-y-4">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'patients', label: 'Patients' },
              { id: 'menu', label: 'Menu' },
              { id: 'report', label: 'Sales Report' },
            ].map((item) => (
              <div
                key={item.id}
                className={`flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer ${
                  activeComponent === item.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                <span>{item.label}</span>
              </div>
            ))}
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
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <div className="container mx-auto">
            {activeComponent === 'dashboard' && <Manager_dashboard />}
            {activeComponent === 'patients' && <Manager_patient />}
            {activeComponent === 'menu' && <Manager_Menu />}
            {activeComponent === 'report' && <Manager_report />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;