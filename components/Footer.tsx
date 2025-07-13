import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-blue-950/80 via-blue-900/60 to-transparent pt-12 pb-6 mt-0 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex gap-6 mb-2">
          <a href="https://github.com/mahidharreddy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/mahidharreddy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-xl">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/mahidharreddy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-xl">
            <FaTwitter />
          </a>
          <a href="mailto:mahidharreddy@email.com" className="hover:text-blue-400 transition-colors text-xl">
            <FaEnvelope />
          </a>
        </div>
        <div className="text-center text-sm text-neutral-400 dark:text-neutral-500">
          <span className="block font-semibold tracking-wide text-white/80 mb-1">Let’s build something amazing together 🚀</span>
          <span>&copy; {new Date().getFullYear()} Mahidhar Reddy. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
} 