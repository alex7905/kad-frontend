import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import QuestionnaireForm from '@/components/questionnaire/QuestionnaireForm';

const NewQuestionnaire = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">New Project Questionnaire</h1>
            <p className="text-slate-400">
              Fill out the form below to help us understand your project requirements.
              This information will help us provide you with the best possible solution.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <QuestionnaireForm />
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold text-white mb-4">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Project Types</h3>
                <p className="text-slate-400">
                  Choose the type that best fits your project. If unsure, select "Other" and provide details
                  in the description.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Technical Requirements</h3>
                <p className="text-slate-400">
                  Don't worry if you're not sure about technical details. Our team will help you choose
                  the best technologies for your project.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Budget & Timeline</h3>
                <p className="text-slate-400">
                  Provide your best estimate. We'll work with you to find a solution that fits your
                  budget and schedule.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewQuestionnaire; 