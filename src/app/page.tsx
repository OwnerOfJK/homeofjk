import Socials from '@/app/components/socials'
import Projects from './components/projects';
import Image from 'next/image'
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-6">
      <Head>
        <title>ownerofjk</title>
        <meta name="description" content="This is the entity of" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={"/strawhat.jpeg"}
        width={300}
        height={300}
        alt="Straw Hat"
        className="rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      />
      <Socials/>
      <Projects/>
    </div>
  );
}