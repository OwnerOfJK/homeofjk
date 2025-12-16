import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Socials() {
  return (
    <div className="flex gap-4 justify-center">
      <a
        href="https://github.com/OwnerOfJK"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-[#1A73E8] transition-colors duration-200"
        aria-label="GitHub"
      >
        <FaGithub size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/johnkaller/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-[#1A73E8] transition-colors duration-200"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={24} />
      </a>
      <a
        href="https://x.com/OwnerOfJK"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:text-[#1A73E8] transition-colors duration-200"
        aria-label="Twitter/X"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href="mailto:john.kaller@hotmail.com"
        className="text-gray-700 hover:text-[#1A73E8] transition-colors duration-200"
        aria-label="Email"
      >
        <FaEnvelope size={24} />
      </a>
    </div>
  );
}