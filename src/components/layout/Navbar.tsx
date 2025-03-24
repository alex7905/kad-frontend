import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  InformationCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const unreadNotifications = 0;

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'About', href: '/about', icon: InformationCircleIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Questionnaire', href: '/questionnaire', icon: DocumentTextIcon },
    ...(user?.isAdmin ? [
      { name: 'Admin Dashboard', href: '/admin', icon: HomeIcon },
      { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
      { name: 'Questionnaires', href: '/admin/questionnaires', icon: ClipboardDocumentListIcon },
      { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
    ] : [])
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-slate-900/50 backdrop-blur-lg border-b border-white/10 z-50 md:h-full md:w-20">
      <div className="flex items-center justify-between h-full px-4 mx-auto md:flex-col md:h-full md:py-8">
        <div className="flex items-center space-x-4 md:flex-col md:space-x-0 md:space-y-8 w-full">
          {/* User actions at the top */}
          <div className="flex items-center justify-between w-full md:flex-col md:space-y-4">
            <button
              className="p-3 text-slate-400 hover:text-primary-300 transition-colors relative"
              onClick={() => router.push('/notifications')}
            >
              <BellIcon className="w-6 h-6" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full text-xs flex items-center justify-center text-white">
                  {unreadNotifications}
                </span>
              )}
            </button>

            <button
              onClick={logout}
              className="p-3 text-slate-400 hover:text-primary-300 transition-colors flex items-center space-x-2"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>

          {/* Navigation links */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                router.pathname === item.href
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-slate-400 hover:bg-primary-500/10 hover:text-primary-300'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;