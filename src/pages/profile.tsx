import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';

interface ProfileForm {
  displayName: string;
  profilePicture?: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    defaultValues: {
      displayName: user?.displayName || ''
    }
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);
      await apiService.updateProfile(data);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Profile Settings</h1>
            <p className="text-slate-400">Manage your account information and preferences</p>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-primary-500 mb-4 overflow-hidden">
                  <img
                    src={user?.photoURL || 'https://via.placeholder.com/128'}
                    alt={user?.displayName || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                >
                  Change Photo
                </button>
              </div>

              {/* Display Name */}
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-slate-300 mb-2">
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  {...register('displayName', {
                    required: 'Display name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {errors.displayName && (
                  <p className="mt-2 text-sm text-red-500">{errors.displayName.message}</p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-400 cursor-not-allowed"
                />
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Account Type
                </label>
                <div className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300">
                  {user?.isAdmin ? 'Administrator' : 'User'}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </motion.button>
            </form>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-red-500/10"
          >
            <h2 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h2>
            <p className="text-slate-400 mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-medium transition-all duration-200"
            >
              Delete Account
            </motion.button>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile; 