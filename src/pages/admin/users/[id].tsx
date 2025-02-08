import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';

interface UserDetails {
  user: {
    _id: string;
    email: string;
    displayName: string;
    isAdmin: boolean;
    createdAt: string;
    lastLogin: string;
  };
  questionnaires: Array<{
    _id: string;
    projectName: string;
    status: string;
    createdAt: string;
  }>;
}

const UserDetailsPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        if (id) {
          const response = await apiService.getUserDetails(id as string);
          setUserDetails(response.data);
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id, user, router]);

  if (!user?.isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen p-8">
          <div className="max-w-4xl mx-auto text-center">
            Loading...
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!userDetails) {
    return (
      <MainLayout>
        <div className="min-h-screen p-8">
          <div className="max-w-4xl mx-auto text-center">
            User not found
          </div>
        </div>
      </MainLayout>
    );
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
            className="mb-8"
          >
            <button
              onClick={() => router.push('/admin/users')}
              className="text-primary-400 hover:text-primary-300 mb-4"
            >
              ← Back to Users
            </button>
            <h1 className="text-3xl font-bold text-white">User Details</h1>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-slate-400">Display Name</div>
                <div className="text-lg text-white">{userDetails.user.displayName}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Email</div>
                <div className="text-lg text-white">{userDetails.user.email}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Role</div>
                <div className="text-lg text-white">
                  {userDetails.user.isAdmin ? 'Administrator' : 'User'}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Member Since</div>
                <div className="text-lg text-white">
                  {new Date(userDetails.user.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Last Login</div>
                <div className="text-lg text-white">
                  {new Date(userDetails.user.lastLogin).toLocaleDateString()}
                </div>
              </div>
            </div>
          </motion.div>

          {/* User's Questionnaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Questionnaires</h2>
            {userDetails.questionnaires.length === 0 ? (
              <p className="text-slate-400">No questionnaires submitted yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="pb-2 text-sm font-medium text-slate-400">Project Name</th>
                      <th className="pb-2 text-sm font-medium text-slate-400">Status</th>
                      <th className="pb-2 text-sm font-medium text-slate-400">Submitted</th>
                      <th className="pb-2 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails.questionnaires.map((questionnaire) => (
                      <tr key={questionnaire._id} className="border-b border-white/5">
                        <td className="py-3 text-white">{questionnaire.projectName}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            questionnaire.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : questionnaire.status === 'in_review'
                              ? 'bg-blue-500/20 text-blue-300'
                              : questionnaire.status === 'approved'
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {questionnaire.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 text-slate-300">
                          {new Date(questionnaire.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => router.push(`/admin/questionnaires/${questionnaire._id}`)}
                            className="text-primary-400 hover:text-primary-300"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDetailsPage; 