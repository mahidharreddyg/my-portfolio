import React from "react";
import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";

interface LetsConnectModalProps {
  open: boolean;
  onClose: () => void;
}

const LetsConnectModal: React.FC<LetsConnectModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#181824] px-8 py-6 shadow-2xl border border-[#232336]">
        {/* Drag bar */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-1 rounded-full bg-[#232336]" />
        </div>
        {/* Social icons */}
        <div className="flex justify-center gap-6 mb-2">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="text-gray-400 hover:text-blue-400 text-lg" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-400 hover:text-white text-lg" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-gray-400 hover:text-blue-300 text-lg" />
          </a>
        </div>
        {/* Tabs */}
        <div className="flex mb-5 mt-4 bg-[#101014] rounded-lg overflow-hidden border border-[#232336]">
          <button className="flex-1 py-2 bg-[#232336] text-white font-semibold text-sm transition">
            Quick connect
          </button>
          <button className="flex-1 py-2 text-gray-400 font-semibold text-sm transition">
            Fill a form
          </button>
        </div>
        {/* Cards */}
        <div className="flex gap-4 mb-6">
          {/* Email Card */}
          <div className="flex-1 rounded-xl bg-gradient-to-br from-[#20203a] to-[#232336] p-4 flex flex-col gap-2 shadow border border-[#232336]">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-900 p-2 rounded-full">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </span>
              <span className="text-white font-semibold text-base">Email</span>
            </div>
            <div>
              <div className="text-white font-medium text-sm">hello@aayushbharti.in</div>
              <div className="text-gray-400 text-xs">Send me an email directly</div>
            </div>
          </div>
          {/* Book a Call Card */}
          <div className="flex-1 rounded-xl bg-gradient-to-br from-[#232336] to-[#20203a] p-4 flex flex-col gap-2 shadow border border-[#232336]">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-900 p-2 rounded-full">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              <span className="text-white font-semibold text-base">Book a Call</span>
            </div>
            <div>
              <div className="text-white font-medium text-sm">Schedule a time slot</div>
              <div className="text-gray-400 text-xs">Book a call on my calendar</div>
            </div>
          </div>
        </div>
        {/* Availability */}
        <div className="flex items-center justify-center mt-2">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          <span className="text-green-400 font-medium text-sm">Currently available for new opportunities</span>
        </div>
      </div>
    </div>
  );
};

export default LetsConnectModal;
