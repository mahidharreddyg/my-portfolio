import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaFingerprint } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full h-full bg-black flex flex-col justify-between pt-12 pb-6 px-4 md:px-12 relative overflow-hidden">

      {/* Tech Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 relative z-10 pt-10">

        {/* Top Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 items-start">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-blue-400">
              <FaFingerprint className="text-3xl animate-pulse" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase">System Ready</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Let's Build <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">The Future</span>
            </h2>
            <p className="text-neutral-400 max-w-sm text-sm leading-relaxed mt-2 font-mono">
              [INITIATING CONNECTION PROTOCOL] <br />
              Open to collaborations, open-source projects, and exciting engineering challenges.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:place-items-end text-sm font-mono">
            <div className="flex flex-col gap-4">
              <h3 className="text-white/60 uppercase tracking-widest text-xs font-semibold mb-2">Connect</h3>
              <a href="https://github.com/mahidharreddy" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-400 hover:translate-x-1 transition-all flex items-center gap-2">
                <FaGithub size={16} /> GitHub
              </a>
              <a href="https://linkedin.com/in/mahidharreddy" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-400 hover:translate-x-1 transition-all flex items-center gap-2">
                <FaLinkedin size={16} /> LinkedIn
              </a>
              <a href="https://twitter.com/mahidharreddy" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-400 hover:translate-x-1 transition-all flex items-center gap-2">
                <FaTwitter size={16} /> Twitter
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-white/60 uppercase tracking-widest text-xs font-semibold mb-2">Engage</h3>
              <a href="mailto:mahidharreddy@email.com" className="text-neutral-400 hover:text-emerald-400 hover:translate-x-1 transition-all flex items-center gap-2">
                <FaEnvelope size={16} /> Contact
              </a>
              <span className="text-neutral-600 cursor-not-allowed flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Status: Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Tech Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-20 pt-8 border-t border-white/10 relative z-10 font-mono text-xs text-neutral-500">
        <p>
          &copy; {new Date().getFullYear()} MAHIDHAR REDDY.
        </p>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">SYS.INFO</span>
          <span className="hover:text-white transition-colors cursor-pointer">TERMINAL</span>
          <span className="flex items-center gap-2">
            LATENCY: <span className="text-emerald-400">12ms</span>
          </span>
        </div>
      </div>

    </footer>
  );
} 