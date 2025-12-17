'use client';

import { useState } from 'react';
import Profile from '@/app/components/profile';
import Socials from '@/app/components/socials';
import ProjectCarousel from '@/app/components/project-carousel';
import ProgressIndicators from '@/app/components/progress-indicators';
import { projects } from '@/app/projects/projects';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="min-h-screen md:h-screen w-screen flex flex-col bg-white overflow-y-auto md:overflow-hidden">
      {/* Profile Section - Header Area */}
      <div className="flex flex-col items-center gap-4 pt-8 pb-6 px-6">
        <Profile />
        <Socials />
      </div>

      {/* Project Display - Main Content Area */}
      <div className="h-[80vh] md:flex-1 relative flex items-center justify-center">
        <ProjectCarousel currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </div>

      {/* Progress Indicators - Bottom of Page */}
      <ProgressIndicators
        projects={projects}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  );
}