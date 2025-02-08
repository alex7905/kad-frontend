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
  submittedBy: {
    _id: string;
    displayName: string;
    email: string;
  };
  submittedAt: string;
  adminFeedback?: {
    message: string;
    createdAt: string;
    updatedAt: string;
  };
}

const QuestionnaireDetail = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
      return;
    }
  }, [user, router]);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      if (!id) return;
      
      try {
        const response = await apiService.getAdminQuestionnaire(id as string);
        setQuestionnaire(response.data);
        if (response.data.adminFeedback?.message) {
          setFeedback(response.data.adminFeedback.message);
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch questionnaire');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaire();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!questionnaire) return;

    setUpdating(true);
    try {
      await apiService.updateQuestionnaireStatus(questionnaire._id, {
        status: newStatus
      });
      
      const response = await apiService.getAdminQuestionnaire(questionnaire._id);
      setQuestionnaire(response.data);
      toast.success('Status updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleFeedbackUpdate = async () => {
    if (!questionnaire || !feedback.trim()) return;

    setUpdating(true);
    try {
      await apiService.updateQuestionnaireStatus(questionnaire._id, {
        status: questionnaire.status,
        adminFeedback: feedback
      });
      
      const response = await apiService.getAdminQuestionnaire(questionnaire._id);
      setQuestionnaire(response.data);
      toast.success('Feedback updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update feedback');
    } finally {
      setUpdating(false);
    }
  };

  if (!user?.isAdmin) {
    return null;
  }

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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="text-slate-400 hover:text-white mb-4 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">{questionnaire.projectName}</h1>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Submitted by {questionnaire.submittedBy.displayName}</span>
              <span>•</span>
              <span>{new Date(questionnaire.submittedAt).toLocaleDateString()}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Project Details */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Project Details</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Project Type</h3>
                    <p className="text-white">{questionnaire.projectType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Business Description</h3>
                    <p className="text-white">{questionnaire.businessDescription}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Target Audience</h3>
                    <p className="text-white">{questionnaire.targetAudience}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Key Features</h3>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {questionnaire.keyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  {questionnaire.additionalNotes && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-2">Additional Notes</h3>
                      <p className="text-white">{questionnaire.additionalNotes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Requirements */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Technical Requirements</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Frontend</h3>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {questionnaire.technicalRequirements.frontend.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Backend</h3>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {questionnaire.technicalRequirements.backend.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Database</h3>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {questionnaire.technicalRequirements.database.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Hosting</h3>
                    <ul className="list-disc list-inside text-white space-y-1">
                      {questionnaire.technicalRequirements.hosting.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-8"
            >
              {/* Status */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Project Status</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Current Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      questionnaire.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : questionnaire.status === 'reviewed'
                        ? 'bg-blue-500/20 text-blue-300'
                        : questionnaire.status === 'in_progress'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {questionnaire.status.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Update Status</h3>
                    <div className="space-y-2">
                      {['pending', 'reviewed', 'in_progress', 'completed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(status)}
                          disabled={updating || questionnaire.status === status}
                          className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-200 ${
                            questionnaire.status === status
                              ? 'bg-primary-500/20 text-primary-300 cursor-default'
                              : 'bg-slate-800 hover:bg-slate-700 text-white'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Admin Feedback</h3>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Add your feedback here..."
                      className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none mb-4"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFeedbackUpdate}
                      disabled={updating || !feedback.trim()}
                      className={`w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200 ${
                        updating || !feedback.trim() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {updating ? 'Saving...' : 'Save Feedback'}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">Project Info</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Budget</h3>
                    <p className="text-white">${questionnaire.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Timeline</h3>
                    <div className="text-white">
                      <p>Start: {new Date(questionnaire.timeline.startDate).toLocaleDateString()}</p>
                      <p>End: {new Date(questionnaire.timeline.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuestionnaireDetail; 