import Profile from '@/app/components/profile';
import Socials from '@/app/components/socials';
import ProjectCarousel from '@/app/components/project-carousel';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col bg-white">
      {/* Profile Section - Header Area */}
      <div className="flex flex-col items-center gap-4 pt-8 pb-4 px-6">
        <Profile />
        <Socials />
      </div>

      {/* Project Display - Main Content Area */}
      <div className="flex-1 flex items-center justify-center pb-8">
        <ProjectCarousel />
      </div>
    </div>
  );
}