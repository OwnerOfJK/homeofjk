import Image from 'next/image';

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
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">John Kaller</h1>
        <p className="text-base text-gray-600 mt-1">Building software & exploring ideas</p>
      </div>
    </div>
  );
}
