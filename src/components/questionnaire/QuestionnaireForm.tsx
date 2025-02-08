import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { apiService } from '@/services/api';

interface QuestionnaireFormData {
  projectName: string;
  projectType: 'web' | 'mobile' | 'desktop' | 'other';
  businessDescription: string;
  targetAudience: string;
  keyFeatures: string[];
  budget: number;
  timeline: {
    startDate: Date;
    endDate: Date;
  };
  technicalRequirements: {
    frontend: string[];
    backend: string[];
    database: string[];
    hosting: string[];
  };
  additionalNotes?: string;
}

const QuestionnaireForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<QuestionnaireFormData>({
    defaultValues: {
      keyFeatures: [''],
      technicalRequirements: {
        frontend: [''],
        backend: [''],
        database: [''],
        hosting: ['']
      }
    }
  });

  const onSubmit = async (data: QuestionnaireFormData) => {
    try {
      setLoading(true);
      // Format the data to match the backend expectations
      const formattedData = {
        ...data,
        keyFeatures: data.keyFeatures.filter(feature => feature.trim() !== ''),
        technicalRequirements: {
          frontend: data.technicalRequirements.frontend.filter(tech => tech.trim() !== ''),
          backend: data.technicalRequirements.backend.filter(tech => tech.trim() !== ''),
          database: data.technicalRequirements.database.filter(tech => tech.trim() !== ''),
          hosting: data.technicalRequirements.hosting.filter(tech => tech.trim() !== '')
        }
      };
      
      const response = await apiService.submitQuestionnaire(formattedData);
      toast.success('Questionnaire submitted successfully!');
      router.push(`/questionnaire/success?id=${response.data._id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit questionnaire');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Project Details */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Project Details</h2>
        <div className="space-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-slate-300 mb-2">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              {...register('projectName', { required: 'Project name is required' })}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your project name"
            />
            {errors.projectName && (
              <p className="mt-2 text-sm text-red-500">{errors.projectName.message}</p>
            )}
          </div>

          {/* Project Type */}
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-slate-300 mb-2">
              Project Type
            </label>
            <select
              id="projectType"
              {...register('projectType', { required: 'Project type is required' })}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select project type</option>
              <option value="web">Web Application</option>
              <option value="mobile">Mobile Application</option>
              <option value="desktop">Desktop Application</option>
              <option value="other">Other</option>
            </select>
            {errors.projectType && (
              <p className="mt-2 text-sm text-red-500">{errors.projectType.message}</p>
            )}
          </div>

          {/* Business Description */}
          <div>
            <label htmlFor="businessDescription" className="block text-sm font-medium text-slate-300 mb-2">
              Business Description
            </label>
            <textarea
              id="businessDescription"
              {...register('businessDescription', { required: 'Business description is required' })}
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe your business and project goals"
            />
            {errors.businessDescription && (
              <p className="mt-2 text-sm text-red-500">{errors.businessDescription.message}</p>
            )}
          </div>

          {/* Target Audience */}
          <div>
            <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-300 mb-2">
              Target Audience
            </label>
            <textarea
              id="targetAudience"
              {...register('targetAudience', { required: 'Target audience is required' })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe your target audience"
            />
            {errors.targetAudience && (
              <p className="mt-2 text-sm text-red-500">{errors.targetAudience.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Timeline & Budget */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Timeline & Budget</h2>
        <div className="space-y-6">
          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Start Date
              </label>
              <Controller
                name="timeline.startDate"
                control={control}
                rules={{ required: 'Start date is required' }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date || new Date())}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
                    placeholderText="Select start date"
                    minDate={new Date()}
                  />
                )}
              />
              {errors.timeline?.startDate && (
                <p className="mt-2 text-sm text-red-500">{errors.timeline.startDate.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                End Date
              </label>
              <Controller
                name="timeline.endDate"
                control={control}
                rules={{ required: 'End date is required' }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date || new Date())}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
                    placeholderText="Select end date"
                    minDate={new Date()}
                  />
                )}
              />
              {errors.timeline?.endDate && (
                <p className="mt-2 text-sm text-red-500">{errors.timeline.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-slate-300 mb-2">
              Budget (USD)
            </label>
            <input
              id="budget"
              type="number"
              {...register('budget', {
                required: 'Budget is required',
                min: { value: 1000, message: 'Minimum budget is $1,000' }
              })}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your budget"
            />
            {errors.budget && (
              <p className="mt-2 text-sm text-red-500">{errors.budget.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Technical Requirements */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Technical Requirements</h2>
        <div className="space-y-6">
          {/* Frontend */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Frontend Technologies
            </label>
            <input
              {...register('technicalRequirements.frontend.0')}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., React, Vue, Angular"
            />
          </div>

          {/* Backend */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Backend Technologies
            </label>
            <input
              {...register('technicalRequirements.backend.0')}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Node.js, Python, Java"
            />
          </div>

          {/* Database */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Database Technologies
            </label>
            <input
              {...register('technicalRequirements.database.0')}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., MongoDB, PostgreSQL"
            />
          </div>

          {/* Hosting */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Hosting Requirements
            </label>
            <input
              {...register('technicalRequirements.hosting.0')}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., AWS, Google Cloud, Azure"
            />
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-6">Additional Notes</h2>
        <div>
          <textarea
            {...register('additionalNotes')}
            rows={4}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Any additional information you'd like to share"
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className={`w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-200 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? 'Submitting...' : 'Submit Questionnaire'}
      </motion.button>
    </motion.form>
  );
};

export default QuestionnaireForm; 