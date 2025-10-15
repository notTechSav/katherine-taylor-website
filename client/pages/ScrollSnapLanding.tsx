import { useViewportHeight } from '../hooks/useViewportHeight';
import Header from '../components/landing/Header';
import Section from '../components/landing/Section';
import ScrollLock from '../components/landing/ScrollLock';
import VideoBackground from '../components/landing/VideoBackground';
import './ScrollSnapLanding.css';

export default function ScrollSnapLanding() {
  // Fix iOS viewport height
  useViewportHeight();

  return (
    <>
      {/* Sticky Header (OUTSIDE scroll container) */}
      <Header />

      {/* Scroll Lock Controller */}
      <ScrollLock />

      {/* Main Scroll Container */}
      <main className="overflow-hidden">

        {/* SECTION 1: HERO VIDEO - Starting with just this one section */}
        <Section id="hero" className="bg-black">
          <VideoBackground
            src="https://res.cloudinary.com/katherine-taylor-escort-video/video/upload/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.mov"
            poster="https://res.cloudinary.com/katherine-taylor-escort-video/image/upload/v1760312493/Love_Elevated_Katherine_Taylor_Escort_kuz4ej.jpg"
            className="opacity-60"
          />
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-wide mb-4">
              KATHERINE TAYLOR
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wider uppercase">
              Understated Luxury
            </p>
          </div>
        </Section>

        {/* We'll add more sections one by one */}

      </main>
    </>
  );
}
