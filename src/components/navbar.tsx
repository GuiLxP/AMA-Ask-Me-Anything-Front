import { useEffect, useState } from 'react';
import diflenLogoWhite from '../assets/DIFLEN LOGO WHITE.png'
import diflenLogoBlack from '../assets/DIFLEN LOGO BLACK.png'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Menu } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate()

  useEffect(() => {
    const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(currentTheme);

    const themeListener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeListener);

    return () => {
      window.matchMedia('(prefers-color_scheme: dark)').removeEventListener('change', themeListener);
    };
  }, []);

  function redirectToRooms() {
    try {
      navigate(`/rooms`)
    } catch {
      toast.error('Erro ao ir para salas!')
    }
  }

  function redirectToHome() {
    try {
      navigate(`/`)
    } catch {
      toast.error('Erro ao voltar para tela inicial!')
    }
  }

  return (
    <nav className="bg-white dark:bg-black px-14 py-4 text-black shadow-lg">
      <div className="container mx-auto  flex items-center justify-between">
        {/* Logo */}
        <button onClick={redirectToHome}>
          <img src={theme === 'light' ? diflenLogoBlack : diflenLogoWhite} alt="Diflen Logo" className="h-10" />
        </button>

        {/* Menu para dispositivos maiores */}
        <div className="hidden md:flex space-x-8">
          <button onClick={redirectToHome} className="text-black dark:text-white hover:text-slate-400 transition duration-300">Início</button>
          <button onClick={redirectToRooms} className="text-black dark:text-white hover:text-slate-400 transition duration-300">Salas</button>
        </div>

        {/* Menu hamburguer para dispositivos móveis */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="relative z-10 block dark:text-white text-black focus:outline-none">
            <Menu />
          </button>
        </div>
      </div>

      {/* Menu dropdown para dispositivos móveis */}
      <div className={`fixed inset-0 bg-black bg-opacity-80 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-end p-6">
          <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <button onClick={redirectToHome} className="text-white hover:text-slate-400 transition duration-300">Início</button>
          <button onClick={redirectToRooms} className="text-white hover:text-slate-400 transition duration-300">Salas</button>
        </div>
      </div>
    </nav>
  );
};

