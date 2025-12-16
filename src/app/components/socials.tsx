import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaMedium } from "react-icons/fa";

const socials = [
  { href: "https://github.com/OwnerOfJK", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/johnkaller/", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://x.com/OwnerOfJK", label: "Twitter/X", Icon: FaTwitter },
  { href: "https://medium.com/@john-kaller", label: "Medium", Icon: FaMedium },
  { href: "mailto:john.kaller@hotmail.com", label: "Email", Icon: FaEnvelope },
];

export default function Socials() {
  return (
    <div className="flex gap-4 justify-center">
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : "_blank"}
          rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
          className="text-gray-700 hover:text-[#1A73E8] transition-colors duration-200"
          aria-label={label}
        >
          <Icon size={24} />
        </a>
      ))}
    </div>
  );
}