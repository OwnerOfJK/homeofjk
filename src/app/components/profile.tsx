import Image from 'next/image';
import Socials from './socials';

export default function Profile() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/strawhat.jpeg"
        width={120}
        height={120}
        alt="Profile picture"
        className="rounded-full shadow-md"
        priority
      />
      <div className="text-center max-w-2xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">John Kaller</h1>
          <Socials />
        </div>
        <p className="text-sm md:text-base text-gray-600 mt-2 leading-relaxed">
          <span className="font-semibold">Full-stack product builder</span> with 6 years of experience building early-stage companies,
          comfortable owning problems end to end. <span className="font-semibold">Two-time founder</span> in social media and AI education. Fluent in Chinese, German, and English; conversational in Portuguese.
        </p>
      </div>
    </div>
  );
}
