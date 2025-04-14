import { FaGithubSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa";

export default function Socials() {
    return (
        <div className="flex space-x-6 mt-4">
          <a
            href="https://github.com/OwnerOfJK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black"
          >
            <FaGithubSquare size={28} />
          </a>
          <a
            href="https://x.com/OwnerOfJK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <FaTwitterSquare size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/johnkaller/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900"
          >
            <FaLinkedin size={28} />
          </a>
        </div>
    );
}