import PublicLayout from "@/components/layout/PublicLayout";
import { NextPage } from "next";
import Head from "next/head";
import { motion, Variants } from "framer-motion";

const AboutPage: NextPage = () => {
  const fadeInUp: Variants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const staggerChildren: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <PublicLayout>
      <Head>
        <title>About Us - KAD Software</title>
        <meta name="description" content="Learn more about KAD Software and our mission" />
      </Head>

      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-secondary-900/50 to-accent-900/50 animate-gradient-xy mix-blend-multiply" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-24"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full blur-2xl opacity-20"
              />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative">
                About{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
                  KAD Software
                </span>
              </h1>
            </div>
            <motion.p
              {...fadeInUp}
              className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto"
            >
              Empowering businesses through innovative solutions and cutting-edge technology
            </motion.p>
          </motion.div>

          {/* Mission & Vision Cards */}
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
          >
            <motion.div
              variants={fadeInUp}
              className="group relative bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-slate-300 leading-relaxed">
                  At KAD Software, we are dedicated to revolutionizing the way businesses operate
                  in the digital age. Our mission is to provide cutting-edge solutions
                  that empower organizations to achieve their full potential through
                  technology and innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group relative bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-secondary-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-16 h-16 bg-secondary-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-slate-300 leading-relaxed">
                  We envision a future where every business, regardless of size, has
                  access to powerful tools and technologies that drive growth and
                  success. Through our platform, we aim to bridge the gap between
                  traditional business practices and modern digital solutions.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-24"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Our Core Values
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "We constantly push boundaries to deliver cutting-edge solutions that meet evolving business needs.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  ),
                  color: "primary"
                },
                {
                  title: "Excellence",
                  description: "We strive for excellence in everything we do, ensuring the highest quality in our products and services.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ),
                  color: "secondary"
                },
                {
                  title: "Customer Focus",
                  description: "Our customers' success is our success. We are committed to providing exceptional support and solutions.",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  ),
                  color: "accent"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="group relative bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-300 text-center"
                >
                  <div className={`w-20 h-20 mx-auto bg-${value.color}-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <svg className={`w-10 h-10 text-${value.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {value.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-slate-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto mb-8">
              Join us on our mission to revolutionize the future of business technology.
              Let's build something amazing together.
            </p>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today
            </motion.a>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default AboutPage; 