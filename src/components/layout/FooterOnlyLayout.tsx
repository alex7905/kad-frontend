import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';

interface FooterOnlyLayoutProps {
  children: React.ReactNode;
}

const FooterOnlyLayout = ({ children }: FooterOnlyLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-secondary-900">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#2563eb,#7c3aed)] opacity-30 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_150%)] mix-blend-multiply"></div>
      </div>

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '0.75rem',
          },
        }}
      />
    </div>
  );
};

export default FooterOnlyLayout; 