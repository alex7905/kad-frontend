import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900/50 backdrop-blur-lg border-t border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-slate-400">Powered by</span>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-primary-400 font-mono text-xl">&lt;/&gt;</span>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-primary-400 to-secondary-400">
              KAD Development
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 