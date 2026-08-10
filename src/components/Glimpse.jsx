import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";

const SLIDES = [
  { src: "/gallery/glimpse-1.jpg", caption: "EUREKA! 2025 — Road to Enterprise" },
  { src: "/gallery/glimpse-2.jpg", caption: "The E-Cell ABESEC crew, all geared up" },
  { src: "/gallery/glimpse-3.jpg", caption: "Teams pitching their solutions live" },
  { src: "/gallery/glimpse-4.jpg", caption: "Judges and audience locked in" },
  { src: "/gallery/glimpse-5.jpg", caption: "The judging panel in action" },
  { src: "/gallery/glimpse-6.jpg", caption: "Token of appreciation for our judges" },
  { src: "/gallery/glimpse-7.jpg", caption: "Wrapped up with smiles all around" },
];

export default function Glimpse() {
  const [ref, visible] = useReveal();
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  function goTo(i) {
    const next = (i + SLIDES.length) % SLIDES.length;
    setIndex(next);
    const track = trackRef.current;
    if (track) {
      const child = track.children[next];
      if (child) child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  useEffect(() => {
    function restart() {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setIndex((i) => {
          const next = (i + 1) % SLIDES.length;
          const track = trackRef.current;
          if (track) {
            const child = track.children[next];
            if (child)
              child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          }
          return next;
        });
      }, 4000);
    }
    restart();
    return () => clearInterval(timerRef.current);
  }, []);

  function pauseAndRestart() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % SLIDES.length;
        const track = trackRef.current;
        if (track) {
          const child = track.children[next];
          if (child)
            child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
        return next;
      });
    }, 4000);
  }

  return (
    <section className="section glimpse-section" id="glimpse">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Throwback</span>
          <h2 className="section-heading">
            Last Year's <span className="gradient-text">Glimpse</span>
          </h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>
            A quick look back at EUREKA! 2025 — the pitches, the panel, and the people.
          </p>
        </div>

        <div ref={ref} className={`glimpse-carousel reveal ${visible ? "in" : ""}`}>
          <button
            className="glimpse-nav glimpse-nav-prev"
            aria-label="Previous photo"
            onClick={() => {
              goTo(index - 1);
              pauseAndRestart();
            }}
          >
            ‹
          </button>

          <div className="glimpse-track" ref={trackRef}>
            {SLIDES.map((s, i) => (
              <figure className="glimpse-slide" key={s.src}>
                <img src={s.src} alt={s.caption} loading="lazy" />
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>

          <button
            className="glimpse-nav glimpse-nav-next"
            aria-label="Next photo"
            onClick={() => {
              goTo(index + 1);
              pauseAndRestart();
            }}
          >
            ›
          </button>
        </div>

        <div className="glimpse-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              className={`glimpse-dot ${i === index ? "active" : ""}`}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => {
                goTo(i);
                pauseAndRestart();
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
