import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-secondary-900">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#2563eb,#7c3aed)] opacity-30 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_150%)] mix-blend-multiply"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center space-x-3">
                  <span className="text-primary-400 font-mono text-2xl">&lt;/&gt;</span>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-primary-400 to-secondary-400">
                    KAD Development
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {router.pathname !== '/about' && (
                user ? (
                  <>
                    <Link href="/about">
                      <span className="text-white hover:text-primary-400 transition-colors">
                        About
                      </span>
                    </Link>
                    <Link href="/dashboard">
                      <span className="text-white hover:text-primary-400 transition-colors">
                        Dashboard
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/about">
                      <span className="text-white hover:text-primary-400 transition-colors">
                        About
                      </span>
                    </Link>
                    <Link href="/login">
                      <span className="text-white hover:text-primary-400 transition-colors">
                        Login
                      </span>
                    </Link>
                    <Link href="/register">
                      <span className="px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-colors">
                        Get Started
                      </span>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-slate-900 text-white',
          duration: 4000,
          style: {
            background: '#0f172a',
            color: '#fff',
            borderRadius: '0.75rem',
          },
        }}
      />
    </div>
  );
};

export default PublicLayout; 