"use client";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      name: "Server-side Pong",
      link: "https://your-portfolio.com",
      image: "/strawhat.jpeg",
    },
    {
      name: "Onchain pixel game",
      link: "https://weather-app.com",
      image: "/strawhat.jpeg",
    },
    {
      name: "Linda - React Native App",
      link: "https://blog-platform.com",
      image: "/strawhat.jpeg",
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-15">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <Image
              src={project.image}
              width={100}
              height={100}
              alt={project.name}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {project.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Click to view</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}