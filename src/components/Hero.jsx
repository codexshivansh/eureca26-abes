import { EVENT_INFO } from "../data/eureca";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div>
          <div className="hero-badge-row">
            <span className="eyebrow">🚀 28th Edition · E-Cell IIT Bombay</span>
            <span className="eyebrow">📍 {EVENT_INFO.college}</span>
          </div>

          <h1 className="hero-title">
            Pitch Your Startup at <span className="highlight">EURECA '26</span> —
            Asia's Largest Business Model Competition
          </h1>

          <p className="hero-desc">
            Eureka! by E-Cell IIT Bombay is coming to {EVENT_INFO.college} for its
            Zonal Round — got a startup idea? Build your team, submit your pitch, and get
            a shot at 1-on-1 mentorship, VC introductions, and prizes worth{" "}
            <strong style={{ color: "var(--text)" }}>INR 2 Crore+</strong>.
          </p>

          <div className="hero-actions">
            <a href="#register" className="btn btn-primary">
              Register Your Team →
            </a>
            <a href="#about" className="btn btn-ghost">
              What is Eureka!?
            </a>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <div className="label">Zonal Round</div>
              <div className="value">Sept 5 – Oct 3, 2026</div>
            </div>
            <div className="hero-meta-item">
              <div className="label">Reg. Deadline</div>
              <div className="value">18 Aug, 2026</div>
            </div>
            <div className="hero-meta-item">
              <div className="label">Team Size</div>
              <div className="value">Solo or Team</div>
            </div>
            <div className="hero-meta-item">
              <div className="label">Prize Pool</div>
              <div className="value">INR 2 Cr+</div>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-title">📝 How to register — 3 steps</div>
          <div className="hero-steps">
            <div className="hero-step">
              <div className="hero-step-num">1</div>
              <div>
                <div className="hero-step-title">Pick your track & form a team</div>
                <div className="hero-step-desc">
                  Choose from Business, Social, AI &amp; Deeptech, HealthCare and more.
                  Solo founders are welcome too.
                </div>
              </div>
            </div>
            <div className="hero-step">
              <div className="hero-step-num">2</div>
              <div>
                <div className="hero-step-title">Fill the form below</div>
                <div className="hero-step-desc">
                  Share your team &amp; idea details in the registration form on this page —
                  takes under 3 minutes.
                </div>
              </div>
            </div>
            <div className="hero-step">
              <div className="hero-step-num">3</div>
              <div>
                <div className="hero-step-title">We'll confirm your slot</div>
                <div className="hero-step-desc">
                  Our campus team will reach out with your Zonal Round slot, venue &amp;
                  next steps before the deadline.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
