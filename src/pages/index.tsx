import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import PublicLayout from '@/components/layout/PublicLayout';

const Home = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const features = [
    {
      title: 'Web Development',
      description: 'Custom web applications tailored to your business needs',
      icon: (
        <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
      icon: (
        <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with third-party services',
      icon: (
        <svg className="w-8 h-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  if (loading) {
    return null;
  }

  const content = (
    <div className="min-h-screen p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              KAD Software
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Build your next project with our expert team. Start by filling out our project questionnaire.
          </p>
        </motion.div>

        {/* Quick Actions */}
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Start New Project</h2>
              <p className="text-slate-300 mb-6">
                Fill out our comprehensive questionnaire to help us understand your project requirements.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/questionnaire')}
                className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200"
              >
                Start Questionnaire
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">View Projects</h2>
              <p className="text-slate-300 mb-6">
                Check the status of your existing projects and questionnaire submissions.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/questionnaire')}
                className="w-full py-3 px-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl font-medium transition-all duration-200"
              >
                View Projects
              </motion.button>
            </motion.div>

            {user.isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-4">Admin Dashboard</h2>
                <p className="text-slate-300 mb-6">
                  Access analytics, manage users, and review project submissions.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/admin')}
                  className="w-full py-3 px-4 bg-accent-500 hover:bg-accent-600 text-white rounded-xl font-medium transition-all duration-200"
                >
                  Go to Dashboard
                </motion.button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Get Started</h2>
              <p className="text-slate-300 mb-6">
                Create an account to start your project journey with us. Access our project management tools and expert support.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/register')}
                className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200"
              >
                Sign Up Now
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Already a Member?</h2>
              <p className="text-slate-300 mb-6">
                Sign in to your account to continue working on your projects and track their progress.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/login')}
                className="w-full py-3 px-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl font-medium transition-all duration-200"
              >
                Sign In
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="p-6">
                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  return user ? <MainLayout>{content}</MainLayout> : <PublicLayout>{content}</PublicLayout>;
};

export default Home; 