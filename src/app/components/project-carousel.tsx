"use client";

import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { projects } from "../projects/projects";
import Image from "next/image";

interface ProjectCarouselProps {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const STATUS_LABELS: Record<string, string> = {
  active: "Online",
  "coming-soon": "Coming Soon",
  "in-progress": "In Progress",
};

export default function ProjectCarousel({ currentIndex, setCurrentIndex }: ProjectCarouselProps) {
  const [iframeState, setIframeState] = useState<"loading" | "loaded" | "error">("loading");
  const [drag, setDrag] = useState({ active: false, startX: 0, offsetX: 0, startTime: 0 });

  const currentProject = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const navigate = useCallback((direction: 1 | -1) => {
    setCurrentIndex((currentIndex + direction + projects.length) % projects.length);
    setIframeState("loading");
  }, [currentIndex, setCurrentIndex]);

  const goToPrevious = useCallback(() => navigate(-1), [navigate]);
  const goToNext = useCallback(() => navigate(1), [navigate]);

  // Unified drag handler
  const handleDrag = useCallback((type: "start" | "move" | "end", clientX = 0) => {
    if (type === "start") {
      setDrag({ active: true, startX: clientX, offsetX: 0, startTime: Date.now() });
    } else if (type === "move" && drag.active) {
      setDrag(d => ({ ...d, offsetX: clientX - d.startX }));
    } else if (type === "end" && drag.active) {
      const velocity = Math.abs(drag.offsetX) / (Date.now() - drag.startTime);
      const threshold = window.innerWidth * 0.15;
      
      if (Math.abs(drag.offsetX) > threshold || velocity > 0.5) {
        if (drag.offsetX < 0) goToNext();
        else goToPrevious();
      }
      setDrag(d => ({ ...d, active: false, offsetX: 0 }));
    }
  }, [drag, goToNext, goToPrevious]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goToPrevious(); }
      if (e.key === "ArrowRight") { e.preventDefault(); goToNext(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Iframe timeout
  useEffect(() => {
    setIframeState("loading");
    const timeout = setTimeout(() => {
      setIframeState(s => s === "loading" ? "error" : s);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  // Global mouse events for drag
  useEffect(() => {
    if (!drag.active) return;
    const onMove = (e: MouseEvent) => handleDrag("move", e.clientX);
    const onUp = () => handleDrag("end");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag.active, handleDrag]);

  const renderCard = (project: typeof projects[0], isCurrent: boolean, zIndex: number) => {
    const transform = isCurrent
      ? `translateX(${drag.offsetX}px) rotate(${drag.offsetX * 0.02}deg)`
      : "scale(0.95) translateY(20px)";
    
    const opacity = isCurrent
      ? (drag.active ? Math.max(0.3, 1 - Math.abs(drag.offsetX) / (window.innerWidth * 0.5)) : 1)
      : 0.5;

    return (
      <div
        key={`${project.name}-${isCurrent}`}
        className="absolute inset-0 flex items-center justify-center px-4 md:px-8"
        style={{ zIndex, pointerEvents: isCurrent ? "auto" : "none" }}
      >
        <div
          className="w-full max-w-4xl h-[600px] md:h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ease-out relative"
          style={{ transform, opacity, cursor: isCurrent ? (drag.active ? "grabbing" : "grab") : "default" }}
          onMouseDown={isCurrent ? e => handleDrag("start", e.clientX) : undefined}
          onTouchStart={isCurrent ? e => handleDrag("start", e.touches[0].clientX) : undefined}
          onTouchMove={isCurrent ? e => handleDrag("move", e.touches[0].clientX) : undefined}
          onTouchEnd={isCurrent ? () => handleDrag("end") : undefined}
        >
          {/* Active project content */}
          {project.status === "active" && (
            project.embedComponent || (project.projectUrl ? (
              <div className="absolute inset-0">
                {isCurrent && iframeState === "loading" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73E8] mx-auto mb-4" />
                      <p className="text-gray-600">Loading demo...</p>
                    </div>
                  </div>
                )}
                {isCurrent && iframeState === "error" ? (
                  <IframeError url={project.projectUrl!} />
                ) : (
                  <iframe
                    src={isCurrent ? project.projectUrl : undefined}
                    className="absolute inset-0 w-full h-full border-0 rounded-3xl"
                    title={`${project.name} demo`}
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
                    onLoad={() => isCurrent && setIframeState("loaded")}
                    onError={() => isCurrent && setIframeState("error")}
                  />
                )}
              </div>
            ) : (
              <Placeholder text="Interactive demo coming soon" />
            ))
          )}

          {/* Non-active project placeholder */}
          {project.status !== "active" && (
            <Placeholder
              text={project.status === "in-progress" ? "Currently under development" : "Stay tuned for updates"}
              withBackground
            />
          )}

          {/* Info overlay */}
          <ProjectOverlay project={project} />
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex-1 flex items-center justify-center w-full">
      <div className="relative w-full h-full">
        {renderCard(nextProject, false, 1)}
        {renderCard(currentProject, true, 2)}
      </div>

      <NavButton direction="left" onClick={goToPrevious} />
      <NavButton direction="right" onClick={goToNext} />
    </div>
  );
}

// Extracted components
const NavButton = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 ${direction === "left" ? "left-4" : "right-4"} -translate-y-1/2 z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2`}
    aria-label={`${direction === "left" ? "Previous" : "Next"} project`}
  >
    {direction === "left" ? <FaChevronLeft className="text-[#1A73E8]" size={18} /> : <FaChevronRight className="text-[#1A73E8]" size={18} />}
  </button>
);

const Placeholder = ({ text, withBackground }: { text: string; withBackground?: boolean }) => (
  <div className="absolute inset-0">
    {withBackground && <Image src="/onepiecebg.jpg" alt="Background" fill className="object-cover" />}
    <div className={`absolute inset-0 flex items-center justify-center ${withBackground ? "bg-black/60" : "bg-[#F1F3F4]"}`}>
      <p className={withBackground ? "text-white text-2xl font-medium" : "text-gray-600"}>{text}</p>
    </div>
  </div>
);

const IframeError = ({ url }: { url: string }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-white">
    <div className="text-center p-8 max-w-md">
      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-gray-700 mb-2 font-medium">This site cannot be embedded</p>
      <p className="text-sm text-gray-600 mb-6">The website has security settings that prevent iframe embedding.</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A73E8] text-white rounded hover:bg-[#174EA6] transition-colors">
        <span>Open in New Tab</span>
        <FaExternalLinkAlt size={14} />
      </a>
    </div>
  </div>
);

const ProjectOverlay = ({ project }: { project: typeof projects[0] }) => (
  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent pointer-events-none">
    <div className="flex items-end justify-between gap-4">
      <div className="flex-1 pointer-events-auto">
        <div className="flex items-center gap-3 mb-3">
          <h2>
            <a className="text-2xl md:text-3xl font-bold text-white hover:text-[#1A73E8] transition-colors" href={project.projectUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h2>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#1A73E8] transition-colors" aria-label="GitHub">
            <FaGithub size={24} />
          </a>
        </div>
        <p className="text-sm md:text-base text-white/90 leading-relaxed mb-3">{project.description}</p>
        {project.techStack &&  project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span key={tech} className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white rounded text-xs font-medium border border-white/30">{tech}</span>
            ))}
          </div>
        )}
      </div>
      {STATUS_LABELS[project.status!] && (
        <span className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold backdrop-blur-sm border pointer-events-auto self-start bg-blue-800/60 text-blue-200 border-blue-300/50">
          {STATUS_LABELS[project.status!]}
        </span>
      )}
    </div>
  </div>
);