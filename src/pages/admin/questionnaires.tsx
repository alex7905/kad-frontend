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
  submittedBy: {
    _id: string;
    displayName: string;
    email: string;
  };
  submittedAt: string;
  projectType: string;
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
  businessDescription: string;
  targetAudience: string;
  keyFeatures: string[];
  additionalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedQuestionnaires {
  questionnaires: Questionnaire[];
  total: number;
  pages: number;
  currentPage: number;
}

const QuestionnaireManagement = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [questionnaires, setQuestionnaires] = useState<PaginatedQuestionnaires | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
      return;
    }
  }, [user, router]);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await apiService.getAllQuestionnaires({
          page: currentPage,
          limit: 10,
          status: statusFilter !== 'all' ? statusFilter : undefined
        });
        setQuestionnaires(response.data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch questionnaires');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaires();
  }, [currentPage, statusFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'in_review':
        return 'text-blue-400 bg-blue-400/10';
      case 'approved':
        return 'text-green-400 bg-green-400/10';
      case 'rejected':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-slate-400 bg-slate-400/10';
    }
  };

  if (!user?.isAdmin) {
    return null;
  }

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
              <h1 className="text-4xl font-bold text-white mb-2">Questionnaire Management</h1>
              <p className="text-slate-400">Review and manage project questionnaires</p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-4"
            >
              <input
                type="text"
                placeholder="Search questionnaires..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-72 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </motion.div>
          </div>

          {/* Questionnaires List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            {loading ? (
              <div className="p-8 text-center text-slate-400">Loading questionnaires...</div>
            ) : !questionnaires?.questionnaires.length ? (
              <div className="p-8 text-center text-slate-400">No questionnaires found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="p-4 text-sm font-medium text-slate-400">Project</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Submitted By</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Date</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Type</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Budget</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Timeline</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Status</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questionnaires.questionnaires.map((questionnaire) => (
                      <tr
                        key={questionnaire._id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className="font-medium text-white">{questionnaire.projectName}</div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-white">
                              {questionnaire.submittedBy.displayName}
                            </div>
                            <div className="text-sm text-slate-400">
                              {questionnaire.submittedBy.email}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">
                          {new Date(questionnaire.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-slate-300">{questionnaire.projectType}</td>
                        <td className="p-4 text-slate-300">{questionnaire.budget}</td>
                        <td className="p-4 text-slate-300">{questionnaire.timeline.startDate} - {questionnaire.timeline.endDate}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              questionnaire.status
                            )}`}
                          >
                            {questionnaire.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() =>
                                router.push(`/admin/questionnaire/${questionnaire._id}`)
                              }
                              className="text-primary-400 hover:text-primary-300"
                            >
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {questionnaires && questionnaires.pages > 1 && (
              <div className="flex justify-center items-center gap-2 p-4 border-t border-white/10">
                {Array.from({ length: questionnaires.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-primary-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuestionnaireManagement; 