import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';

const AdminSettings = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
      return;
    }
  }, [user, router]);

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Admin Settings</h1>
            <p className="text-slate-400">Configure system-wide settings and preferences</p>
          </motion.div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* General Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-6">General Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    defaultValue="KAD Software"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue="support@kadsoftware.com"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Questionnaire Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-6">Questionnaire Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Default Status
                  </label>
                  <select
                    defaultValue="pending"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Auto-assign to Admin
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded border-slate-700 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-slate-300">
                      Automatically assign new questionnaires to available admins
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-6">Notification Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Notifications
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-slate-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-slate-300">
                        New questionnaire submissions
                      </span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-slate-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-slate-300">
                        Status updates
                      </span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded border-slate-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-slate-300">
                        User registrations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.success('Settings saved successfully')}
                disabled={loading}
                className={`py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminSettings; 