import useReveal from "../hooks/useReveal";
import Glossary from "./Glossary";

const CARDS = [
  {
    icon: "🎯",
    title: "What is Eureka!?",
    desc: (
      <>
        Asia's largest business model competition, run by E-Cell IIT Bombay since 1998 — for
        startups at the ideation and{" "}
        <Glossary term="MVP = Minimum Viable Product, the simplest working version of your idea. You don't need one to start — an idea is enough.">
          MVP
        </Glossary>{" "}
        stage.
      </>
    ),
  },
  {
    icon: "🏛️",
    title: "This campus round",
    desc: "ABES Engineering College, Ghaziabad is hosting a Zonal Round leg — pitch offline, get mentored, and advance to the VC Round.",
  },
  {
    icon: "🌍",
    title: "What you get",
    desc: (
      <>
        1-on-1 mentorship, access to 50+{" "}
        <Glossary term="VC = Venture Capitalist, an investor who funds promising startups in exchange for equity.">
          VC
        </Glossary>{" "}
        firms, equity-free grants, and a shot at global stages like TigerLaunch and Eureka!{" "}
        <Glossary term="GCC = Gulf Cooperation Council — UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman.">
          GCC
        </Glossary>
        .
      </>
    ),
  },
];

export default function About() {
  const [ref, visible] = useReveal();
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">The Basics</span>
          <h2 className="section-heading">
            What's actually <span className="gradient-text">happening</span>?
          </h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>
            A quick rundown so you know exactly what you're signing up for.
          </p>
        </div>
        <div ref={ref} className={`about-grid reveal ${visible ? "in" : ""}`}>
          {CARDS.map((c) => (
            <div className="about-card" key={c.title}>
              <div className="icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
