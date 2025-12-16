"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { projects } from "../projects/projects";

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    resetIframeState();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    resetIframeState();
  };

  const resetIframeState = () => {
    setIframeLoading(true);
    setIframeError(false);
    loadedRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    resetIframeState();

    // Set a timeout to detect if iframe fails to load
    const timeout = setTimeout(() => {
      if (!loadedRef.current) {
        setIframeError(true);
        setIframeLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const currentProject = projects[currentIndex];

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "coming-soon":
        return "Coming Soon";
      case "in-progress":
        return "In Progress";
      default:
        return null;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "coming-soon":
        return "bg-gray-100 text-gray-600 border-gray-300";
      case "in-progress":
        return "bg-blue-50 text-[#1A73E8] border-[#1A73E8]";
      default:
        return "";
    }
  };

  return (
    <div
      ref={carouselRef}
      className="relative flex-1 flex items-center justify-center w-full px-16 md:px-24"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-[#F1F3F4] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2"
        aria-label="Previous project"
      >
        <FaChevronLeft className="text-[#1A73E8]" size={20} />
      </button>

      {/* Project Panel */}
      <div
        className="w-full max-w-4xl bg-white rounded border border-gray-200 shadow-md p-8 md:p-12 transition-all duration-300 flex flex-col"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2>
                  <a className="text-2xl font-semibold text-gray-900" href={currentProject.projectUrl}>
                  {currentProject.name}  
                  </a>
                </h2>
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#1A73E8] transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                {currentProject.techStack && currentProject.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#F1F3F4] text-gray-600 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-base text-gray-600">
                {currentProject.description}
              </p>
            </div>
            {getStatusLabel(currentProject.status) && (
              <span
                className={`px-3 py-1 rounded text-sm font-medium border ${getStatusColor(
                  currentProject.status
                )}`}
              >
                {getStatusLabel(currentProject.status)}
              </span>
            )}
          </div>

          {/* Demo Area */}
          {currentProject.status === "active" && (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#F1F3F4] rounded border border-gray-200 min-h-[500px] overflow-hidden">
              {currentProject.embedComponent ? (
                currentProject.embedComponent
              ) : currentProject.projectUrl ? (
                <div className="w-full flex-1 flex flex-col">
                  <div className="flex-1 relative bg-white">
                    {iframeLoading && !iframeError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A73E8] mx-auto mb-4"></div>
                          <p className="text-gray-600">Loading demo...</p>
                        </div>
                      </div>
                    )}
                    {iframeError ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="text-center p-8 max-w-md">
                          <div className="mb-4 text-gray-400">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="text-gray-700 mb-2 font-medium">This site cannot be embedded</p>
                          <p className="text-sm text-gray-600 mb-6">
                            The website has security settings that prevent iframe embedding.
                          </p>
                          <a
                            href={currentProject.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A73E8] text-white rounded hover:bg-[#174EA6] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2"
                          >
                            <span>Open in New Tab</span>
                            <FaExternalLinkAlt size={14} />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <iframe
                        src={currentProject.projectUrl}
                        className="absolute inset-0 w-full h-full border-0"
                        title={`${currentProject.name} demo`}
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
                        onLoad={() => {
                          loadedRef.current = true;
                          setIframeLoading(false);
                          setIframeError(false);
                        }}
                        onError={() => {
                          setIframeLoading(false);
                          setIframeError(true);
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-gray-600">Interactive demo coming soon</p>
                </div>
              )}
            </div>
          )}

          {/* Placeholder for non-active projects */}
          {currentProject.status !== "active" && (
            <div className="flex-1 flex items-center justify-center bg-[#F1F3F4] rounded border border-gray-200 min-h-[200px]">
              <div className="text-center p-8">
                <p className="text-gray-500">
                  {currentProject.status === "in-progress"
                    ? "Currently under development"
                    : "Stay tuned for updates"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-[#F1F3F4] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2"
        aria-label="Next project"
      >
        <FaChevronRight className="text-[#1A73E8]" size={20} />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2 ${
              index === currentIndex
                ? "bg-[#1A73E8] w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
