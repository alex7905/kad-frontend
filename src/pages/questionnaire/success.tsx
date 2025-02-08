import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';

const QuestionnaireSuccess = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) {
      router.push('/questionnaire');
    }
  }, [router]);

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center"
        >
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Questionnaire Submitted Successfully!
          </h1>
          
          <p className="text-slate-300 mb-8">
            Thank you for submitting your project questionnaire. Our team will review your requirements
            and get back to you soon.
          </p>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/questionnaire/${router.query.id}`}
                className="block w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200"
              >
                View Submission
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/questionnaire"
                className="block w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all duration-200"
              >
                Back to Projects
              </Link>
            </motion.div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-slate-400">
              Need help? Contact our support team at{' '}
              <a
                href="mailto:support@kadsoftware.com"
                className="text-primary-400 hover:text-primary-300"
              >
                support@kadsoftware.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default QuestionnaireSuccess; 