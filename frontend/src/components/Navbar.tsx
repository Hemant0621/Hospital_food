import { Bell, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

function Navbar({ onMenuClick, isSidebarOpen }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const check = confirm("Do you want to logout");
    if (check) {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      navigate('/');
    }
  };

  return (
    <header className="bg-orange-400 p-4 sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          <button
            className="lg:hidden text-white p-1 hover:bg-orange-500 rounded transition-colors"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <h1 className="text-white text-xl font-bold flex items-center gap-2 cursor-pointer">
            <img 
              className="h-8 md:h-10 w-auto" 
              src="/logo.png" 
              alt="Hospitailer logo" 
            />
            <span className="hidden sm:inline">Hospitailer</span>
          </h1>
          
          <span className="text-white text-sm md:text-base truncate max-w-[150px] md:max-w-none">
            Hi, {localStorage.getItem('user')}
          </span>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            className="text-white p-1 hover:bg-orange-500 rounded transition-colors"
            aria-label="Notifications"
          >
            <Bell size={24} />
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center"
          >
            <img 
              className="h-8 w-8 cursor-pointer rounded-full" 
              src="/profile.png" 
              alt="Profile" 
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;