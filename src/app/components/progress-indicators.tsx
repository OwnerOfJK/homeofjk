'use client';

import { Project } from '@/app/projects/projects';

interface ProgressIndicatorsProps {
  projects: Project[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function ProgressIndicators({
  projects,
  currentIndex,
  onIndexChange,
}: ProgressIndicatorsProps) {
  return (
    <div className="flex justify-center gap-2 mt-10 pb-8">
      {projects.map((_, index) => (
        <button
          key={index}
          onClick={() => onIndexChange(index)}
          className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:ring-offset-2 ${
            index === currentIndex
              ? "bg-[#1A73E8] w-8 shadow-lg"
              : "bg-gray-300 w-2 hover:bg-gray-400"
          }`}
          aria-label={`Go to project ${index + 1}`}
        />
      ))}
    </div>
  );
}
