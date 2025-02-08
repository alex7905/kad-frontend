import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';

interface User {
  _id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin: string;
  questionnaires: string[];
}

interface PaginatedUsers {
  users: User[];
  total: number;
  pages: number;
  currentPage: number;
}

const UsersManagement = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<PaginatedUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
      return;
    }
  }, [user, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getAllUsers({
          page: currentPage,
          limit: 10,
          search: searchTerm
        });
        setUsers(response.data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoleChange = async (userId: string, makeAdmin: boolean) => {
    try {
      await apiService.updateUserRole(userId, makeAdmin);
      setUsers(prev => prev ? {
        ...prev,
        users: prev.users.map(u =>
          u._id === userId ? { ...u, isAdmin: makeAdmin } : u
        )
      } : null);
      toast.success(`User role updated successfully`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await apiService.deleteUser(selectedUser._id);
      setUsers(prev => prev ? {
        ...prev,
        users: prev.users.filter(u => u._id !== selectedUser._id),
        total: prev.total - 1
      } : null);
      toast.success('User deleted successfully');
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete user');
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
              <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
              <p className="text-slate-400">Manage user accounts and permissions</p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-72"
            >
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </motion.div>
          </div>

          {/* Users List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10"
          >
            {loading ? (
              <div className="p-8 text-center text-slate-400">Loading users...</div>
            ) : !users?.users.length ? (
              <div className="p-8 text-center text-slate-400">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-white/10">
                      <th className="p-4 text-sm font-medium text-slate-400">User</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Role</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Joined</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Last Login</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Projects</th>
                      <th className="p-4 text-sm font-medium text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-white">{user.displayName}</div>
                            <div className="text-sm text-slate-400">{user.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <select
                            value={user.isAdmin ? 'admin' : 'user'}
                            onChange={(e) => handleRoleChange(user._id, e.target.value === 'admin')}
                            className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-lg text-white"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="p-4 text-slate-300">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-slate-300">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-slate-300">
                          {user.questionnaires.length}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => router.push(`/admin/users/${user._id}`)}
                              className="text-primary-400 hover:text-primary-300"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeleteModal(true);
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              Delete
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
            {users && users.pages > 1 && (
              <div className="flex justify-center items-center gap-2 p-4 border-t border-white/10">
                {Array.from({ length: users.pages }, (_, i) => i + 1).map((page) => (
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Delete User</h2>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete {selectedUser.displayName}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </MainLayout>
  );
};

export default UsersManagement; 