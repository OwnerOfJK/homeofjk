export interface Project {
  name: string;
  description: string;
  techStack?: string[];
  status?: "active" | "coming-soon" | "in-progress";
  projectUrl?: string;
  githubUrl?: string;
  embedComponent?: React.ReactNode;
}

export const projects: Project[] = [
  {
    name: "Leaf",
    description:
      "AI-native book recommendation platform integrating Langfuse for analytics and interaction tracking.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "RAG Pipeline",
      "Langfuse",
    ],
    status: "active",
    projectUrl: "https://leaf-books.com/",
    githubUrl: "https://github.com/OwnerOfJK/leaf",
  },
  {
    name: "Lead Manager",
    description:
      "A comprehensive RevOps tool that automates lead data collection, enriches context with external sources, and provides an AI assistant for sales workflows.", 
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "HubSpot API",
      "LinkedIn integrations",
      "Whisper",
    ],
    status: "active",
    projectUrl: "https://lead-manager-woad.vercel.app",
    githubUrl: "https://github.com/OwnerOfJK/lead_manager",
  },
  {
    name: "Linda",
    description:
      "Privacy-focused real-time location tracker app for connecting friends globally, designed to share cities securely and privately.", 
    techStack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Firebase",
      "Geolocation",
      "TEE"
    ],
    status: "in-progress",
    projectUrl: "",
    githubUrl: "https://github.com/OwnerOfJK/linda",
  },
  {
    name: "ft-transcendence",
    description:
      "A full-stack realtime multiplayer Pong web app including user accounts, tournaments, stats, and admin observability, built as the final project of the 42 core curriculum.", 
    techStack: [
      "TypeScript",
      "Node.js",
      "WebSockets",
      "Docker",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    status: "active",
    projectUrl: "https://ft-transcendence.app",
    githubUrl: "https://github.org/cubernetes/ft-transcendence",
  },
  {
    name: "PixeLAW Core",
    description:
      "The foundational smart contract framework for building pixel-based interactive games on Starknet, providing core contract primitives and default apps.", 
    techStack: [
      "Cairo",
      "Starknet",
      "Dojo ECS",
      "Docker",
      "Blockchain",
      "Smart Contracts",
    ],
    status: "in-progress",
    projectUrl: "", 
    githubUrl: "https://github.com/pixelaw/core",
  },
  {
    name: "unpackai",
    description:
      "The Unpack.AI library — The library to ease your learning, building and the deployment of state-of-the-art deep learning models. Built on top of fastAI.",
    techStack: [
      "Python",
      "Machine Learning",
      "AI Libraries",
    ],
    status: "active",
    projectUrl: "https://unpackai.github.io/unpackai/", 
    githubUrl: "https://github.com/unpackAI/unpackai",
  },
  {
    name: "DishDetect",
    description:
      "Web application that estimates dishwasher fill percentage via a fine-tuned RF-DETR model and provides visual detection with LLM-based suggestions.", 
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Roboflow",
      "RF-DETR",
      "Object Detection",
    ],
    status: "active",
    projectUrl: "https://dishwash-object-detector.vercel.app/", 
    githubUrl: "https://github.com/OwnerOfJK/DishDetect",
  },
];
