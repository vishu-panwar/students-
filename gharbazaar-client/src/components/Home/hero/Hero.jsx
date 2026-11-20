import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGetAdvertisementQuery } from "../../../store/HeroSectionQuery/getAdvertismentQuery";
import HeroShimmer from "./HeroShimmer";

// ─────────────────────────────────────────────────────────────────────────────
// Slider
// - Desktop: fixed height passed via className, object-cover + object-top
//   (fills frame, any overflow cropped from BOTTOM only)
// - Mobile: aspect-ratio drives height naturally, same crop strategy
// ─────────────────────────────────────────────────────────────────────────────
function Slider({ slides, className = "" }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-play
  useEffect(() => {
    if (!slides.length || isPaused) {
      clearInterval(intervalRef.current);
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [slides.length, isPaused]);

  // Guard out-of-range index after refetch
  useEffect(() => {
    if (slides.length && current >= slides.length) setCurrent(0);
  }, [slides.length, current]);

  if (!slides.length) return null;

  return (
    <section
      className={`relative w-full overflow-hidden bg-gray-100 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <Link
            key={slide._id || index}
            to={slide.link || "/"}
            aria-label={slide.title || `Advertisement ${index + 1}`}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title || `Advertisement ${index + 1}`}
              className="w-full h-full object-cover object-[center_10%] md:object-[center_30%]"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </Link>
        ))}
      </div>

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-4 sm:w-6 bg-white shadow-md"
                  : "w-1.5 sm:w-2 bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// Breakpoint heights (desktop slider):
//   sm  (≥640)  → 260px
//   md  (≥768)  → 320px
//   lg  (≥1024) → 380px
//   xl  (≥1280) → 420px
//
// Mobile slider uses aspect-[2/1] so it scales naturally with screen width:
//   375px phone → ~188px tall   (no crop at top)
//   430px phone → ~215px tall
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { data, isLoading, isError } = useGetAdvertisementQuery();

  if (isLoading) return <HeroShimmer />;

  if (isError) {
    return (
      <section className="w-full h-44 sm:h-64 md:h-[320px] lg:h-[380px] flex items-center justify-center text-gray-400 text-sm">
        No advertisements found
      </section>
    );
  }

  const all = data?.advertisements ?? [];

  const desktopSlides = all.slice(0, 4);
  const mobileSlides  = all.slice(4, 8);

  // Desktop always shows something; mobile only when 5th+ banner is uploaded
  const showDesktop = desktopSlides.length > 0 ? desktopSlides : all;

  return (
    <>
      {/* ── DESKTOP (md+) ─────────────────────────────────────────────────────
          Fixed height — object-cover + object-top crops from bottom only      */}
      <Slider
        slides={showDesktop}
        className="hidden md:block h-[220px] sm:h-[250px] md:h-[270px] lg:h-[320px] xl:h-[360px]"
      />

      {/* ── MOBILE (<md) ──────────────────────────────────────────────────────
          aspect-[2/1] → height = width ÷ 2, so a 390px screen = 195px tall.
          This means the full banner width is always shown and only the very
          bottom is cropped if the image is taller — exactly what was asked.   */}
      {mobileSlides.length > 0 && (
        <Slider
          slides={mobileSlides}
          className="block md:hidden w-full aspect-[3/2]"
        />
      )}
    </>
  );
}
