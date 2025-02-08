import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';

interface Questionnaire {
  _id: string;
  projectName: string;
  status: 'pending' | 'reviewed' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  businessRequirements: string;
  technicalRequirements: string;
  timeline: string;
  budget: string;
}

const QuestionnaireList = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await apiService.getMyQuestionnaires();
        setQuestionnaires(response.data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch questionnaires');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaires();
  }, []);

  const getStatusColor = (status: Questionnaire['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'reviewed':
        return 'bg-blue-500/20 text-blue-300';
      case 'in_progress':
        return 'bg-purple-500/20 text-purple-300';
      case 'completed':
        return 'bg-green-500/20 text-green-300';
      default:
        return 'bg-slate-500/20 text-slate-300';
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
              <p className="text-slate-400">Track and manage your project questionnaires</p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/questionnaire/new')}
              className="py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200"
            >
              New Project
            </motion.button>
          </div>

          {/* Questionnaires List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            {loading ? (
              <div className="p-8 text-center text-slate-400">Loading...</div>
            ) : questionnaires.length === 0 ? (
              <div className="p-8 text-center">
                <h3 className="text-xl font-medium text-white mb-2">No Projects Yet</h3>
                <p className="text-slate-400 mb-6">Start by creating your first project questionnaire</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/questionnaire/new')}
                  className="py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200"
                >
                  Create Project
                </motion.button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="p-4 text-sm font-medium text-slate-400">Project Name</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Status</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Created</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Last Updated</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionnaires.map((questionnaire) => (
                      <tr
                        key={questionnaire._id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className="font-medium text-white">{questionnaire.projectName}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(questionnaire.status)}`}>
                            {questionnaire.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300">
                          {new Date(questionnaire.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-slate-300">
                          {new Date(questionnaire.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push(`/questionnaire/${questionnaire._id}`)}
                            className="text-primary-400 hover:text-primary-300 font-medium"
                          >
                            View Details
                          </motion.button>
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

export default QuestionnaireList; 