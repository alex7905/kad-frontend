import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import { FiUsers, FiFileText, FiPieChart, FiSettings } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Analytics {
  totalUsers: number;
  totalQuestionnaires: number;
  questionnairesStatusCount: {
    pending: number;
    reviewed: number;
    in_progress: number;
    completed: number;
  };
  recentQuestionnaires: any[];
  userRegistrationStats: {
    _id: {
      year: number;
      month: number;
    };
    count: number;
  }[];
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const response = await apiService.getAnalytics();
        setAnalytics(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, router]);

  const cards = [
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: FiUsers,
      link: '/admin/users',
      color: 'from-blue-500/20 to-blue-600/20 border-blue-500/20',
      hoverColor: 'hover:border-blue-500/40',
    },
    {
      title: 'Questionnaire Management',
      description: 'Review and manage project questionnaires',
      icon: FiFileText,
      link: '/admin/questionnaires',
      color: 'from-purple-500/20 to-purple-600/20 border-purple-500/20',
      hoverColor: 'hover:border-purple-500/40',
    },
    {
      title: 'Analytics Overview',
      description: loading 
        ? 'Loading stats...' 
        : `${analytics?.totalUsers || 0} Users · ${analytics?.totalQuestionnaires || 0} Projects`,
      icon: FiPieChart,
      color: 'from-green-500/20 to-green-600/20 border-green-500/20',
      hoverColor: 'hover:border-green-500/40',
      stats: [
        {
          label: 'Pending',
          value: analytics?.questionnairesStatusCount?.pending || 0,
          color: 'text-yellow-400'
        },
        {
          label: 'In Progress',
          value: analytics?.questionnairesStatusCount?.in_progress || 0,
          color: 'text-purple-400'
        }
      ]
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: FiSettings,
      link: '/admin/settings',
      color: 'from-orange-500/20 to-orange-600/20 border-orange-500/20',
      hoverColor: 'hover:border-orange-500/40',
    }
  ];

  if (!user?.isAdmin) {
    return null;
  }

  // Prepare data for charts
  const userRegistrationData = {
    labels: analytics?.userRegistrationStats.map(stat => 
      new Date(stat._id.year, stat._id.month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    ).reverse() || [],
    datasets: [
      {
        label: 'New Users',
        data: analytics?.userRegistrationStats.map(stat => stat.count).reverse() || [],
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4
      }
    ]
  };

  const questionnaireStatusData = {
    labels: ['Pending', 'Reviewed', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [
          analytics?.questionnairesStatusCount?.pending || 0,
          analytics?.questionnairesStatusCount?.reviewed || 0,
          analytics?.questionnairesStatusCount?.in_progress || 0,
          analytics?.questionnairesStatusCount?.completed || 0
        ],
        backgroundColor: [
          '#f59e0b', // Pending (Amber)
          '#2563eb', // Reviewed (Blue)
          '#7c3aed', // In Progress (Purple)
          '#10b981'  // Completed (Green)
        ]
      }
    ]
  };

  return (
    <MainLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your application and users</p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {card.link ? (
                    <button
                      onClick={() => router.push(card.link)}
                      className={`w-full h-full p-6 rounded-2xl bg-gradient-to-br ${card.color} border ${
                        card.hoverColor
                      } transition-all duration-300 group hover:scale-105`}
                    >
                      <div className="flex flex-col items-start">
                        <Icon className="w-8 h-8 text-white mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                        <p className="text-slate-400 text-sm text-left">{card.description}</p>
                      </div>
                    </button>
                  ) : (
                    <div className={`w-full h-full p-6 rounded-2xl bg-gradient-to-br ${card.color} border ${card.hoverColor} transition-all duration-300`}>
                      <div className="flex flex-col items-start">
                        <Icon className="w-8 h-8 text-white mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                        <p className="text-slate-400 text-sm text-left mb-4">{card.description}</p>
                        {card.stats && (
                          <div className="flex gap-4 mt-2">
                            {card.stats.map((stat, i) => (
                              <div key={i} className="flex flex-col">
                                <span className={`text-lg font-semibold ${stat.color}`}>{stat.value}</span>
                                <span className="text-xs text-slate-400">{stat.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-slate-400 mb-1">Total Users</div>
                <div className="text-2xl font-semibold text-white">
                  {loading ? 'Loading...' : analytics?.totalUsers || 0}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-slate-400 mb-1">Active Projects</div>
                <div className="text-2xl font-semibold text-white">
                  {loading ? 'Loading...' : analytics?.totalQuestionnaires || 0}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-slate-400 mb-1">Pending Reviews</div>
                <div className="text-2xl font-semibold text-white">
                  {loading ? 'Loading...' : analytics?.questionnairesStatusCount?.pending || 0}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-slate-400 mb-1">Completed Projects</div>
                <div className="text-2xl font-semibold text-white">
                  {loading
                    ? 'Loading...'
                    : analytics?.questionnairesStatusCount?.completed || 0}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">User Registration Trend</h3>
              <div className="h-[300px]">
                <Line
                  data={userRegistrationData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                          color: '#94a3b8'
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                          color: '#94a3b8'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-6">Questionnaire Status</h3>
              <div className="h-[300px] flex items-center justify-center">
                <Doughnut
                  data={questionnaireStatusData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: '#94a3b8'
                        }
                      }
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Recent Questionnaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-6">Recent Submissions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-4 text-sm font-medium text-slate-400">Project Name</th>
                    <th className="pb-4 text-sm font-medium text-slate-400">Submitted By</th>
                    <th className="pb-4 text-sm font-medium text-slate-400">Status</th>
                    <th className="pb-4 text-sm font-medium text-slate-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics?.recentQuestionnaires.map((questionnaire) => (
                    <tr
                      key={questionnaire._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 text-white">
                        {questionnaire.projectName}
                      </td>
                      <td className="py-4 text-slate-300">
                        {questionnaire.user.email}
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          questionnaire.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : questionnaire.status === 'reviewed'
                            ? 'bg-blue-500/20 text-blue-300'
                            : questionnaire.status === 'in_progress'
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-green-500/20 text-green-300'
                        }`}>
                          {questionnaire.status}
                        </span>
                      </td>
                      <td className="py-4 text-slate-300">
                        {new Date(questionnaire.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard; 