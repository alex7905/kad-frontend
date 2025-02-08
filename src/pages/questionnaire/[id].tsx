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
  projectType: string;
  businessDescription: string;
  targetAudience: string;
  keyFeatures: string[];
  budget: number;
  timeline: {
    startDate: string;
    endDate: string;
  };
  technicalRequirements: {
    frontend: string[];
    backend: string[];
    database: string[];
    hosting: string[];
  };
  additionalNotes?: string;
  status: 'pending' | 'reviewed' | 'in_progress' | 'completed';
  adminFeedback?: {
    message: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

const QuestionnaireDetails = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      if (!id) return;

      try {
        const response = user?.isAdmin 
          ? await apiService.getAdminQuestionnaire(id as string)
          : await apiService.getQuestionnaire(id as string);
        setQuestionnaire(response.data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch questionnaire');
        router.push('/questionnaire');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaire();
  }, [id, router, user?.isAdmin]);

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

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen p-8 flex items-center justify-center">
          <div className="text-slate-400">Loading questionnaire details...</div>
        </div>
      </MainLayout>
    );
  }

  if (!questionnaire) {
    return (
      <MainLayout>
        <div className="min-h-screen p-8 flex items-center justify-center">
          <div className="text-slate-400">Questionnaire not found</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">{questionnaire.projectName}</h1>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(questionnaire.status)}`}>
                  {questionnaire.status}
                </span>
                <span className="text-slate-400">
                  Submitted on {new Date(questionnaire.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/questionnaire')}
              className="py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all duration-200"
            >
              Back to Projects
            </motion.button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-xl font-bold text-white mb-4">Project Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Project Type</h3>
                    <p className="text-white">{questionnaire.projectType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Business Description</h3>
                    <p className="text-white">{questionnaire.businessDescription}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Target Audience</h3>
                    <p className="text-white">{questionnaire.targetAudience}</p>
                  </div>
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2">
                  {questionnaire.keyFeatures.map((feature, index) => (
                    <li key={index} className="text-white">{feature}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Technical Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-xl font-bold text-white mb-4">Technical Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Frontend</h3>
                    <ul className="list-disc list-inside">
                      {questionnaire.technicalRequirements.frontend.map((tech, index) => (
                        <li key={index} className="text-white">{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Backend</h3>
                    <ul className="list-disc list-inside">
                      {questionnaire.technicalRequirements.backend.map((tech, index) => (
                        <li key={index} className="text-white">{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Database</h3>
                    <ul className="list-disc list-inside">
                      {questionnaire.technicalRequirements.database.map((tech, index) => (
                        <li key={index} className="text-white">{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Hosting</h3>
                    <ul className="list-disc list-inside">
                      {questionnaire.technicalRequirements.hosting.map((tech, index) => (
                        <li key={index} className="text-white">{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Timeline & Budget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
              >
                <h2 className="text-xl font-bold text-white mb-4">Timeline & Budget</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Start Date</h3>
                    <p className="text-white">
                      {new Date(questionnaire.timeline.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">End Date</h3>
                    <p className="text-white">
                      {new Date(questionnaire.timeline.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Budget</h3>
                    <p className="text-white">
                      ${questionnaire.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Admin Feedback */}
              {questionnaire.adminFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <h2 className="text-xl font-bold text-white mb-4">Admin Feedback</h2>
                  <div className="space-y-4">
                    <p className="text-white">{questionnaire.adminFeedback.message}</p>
                    <p className="text-sm text-slate-400">
                      Last updated: {new Date(questionnaire.adminFeedback.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Additional Notes */}
              {questionnaire.additionalNotes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                >
                  <h2 className="text-xl font-bold text-white mb-4">Additional Notes</h2>
                  <p className="text-white">{questionnaire.additionalNotes}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuestionnaireDetails; 