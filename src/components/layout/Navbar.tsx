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
    <nav className="fixed md:left-0 top-0 w-full md:w-20 md:h-full bg-slate-900/50 backdrop-blur-lg border-b md:border-b-0 md:border-r border-white/10 z-50">
      <div className="flex md:flex-col items-center h-full py-2 md:py-8 px-4 md:px-0">
        {/* Logo for mobile */}
        <Link href="/" className="mr-auto md:mr-0 md:mb-8">
          <span className="text-primary-400 font-semibold text-lg md:hidden">KAD</span>
          <span className="hidden md:block">
            <HomeIcon className="w-6 h-6 text-primary-400" />
          </span>
        </Link>

        <div className="flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-8 md:flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center p-2 md:p-3 rounded-xl transition-all duration-200 ${
                router.pathname === item.href
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-slate-400 hover:bg-primary-500/10 hover:text-primary-300'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="ml-2 text-sm md:hidden">{item.name}</span>
              <span className="hidden md:sr-only">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-4">
          <button
            className="p-2 md:p-3 text-slate-400 hover:text-primary-300 transition-colors"
            onClick={() => router.push('/notifications')}
          >
            <div className="relative">
              <BellIcon className="w-6 h-6" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full text-xs flex items-center justify-center text-white">
                  {unreadNotifications}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={logout}
            className="p-2 md:p-3 text-slate-400 hover:text-primary-300 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span className="sr-only">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;