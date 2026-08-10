import { TIMELINE } from "../data/eureka";
import useReveal from "../hooks/useReveal";

export default function Timeline() {
  const [ref, visible] = useReveal();
  return (
    <section className="section" id="timeline">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Key Dates</span>
          <h2 className="section-heading">
            The <span className="gradient-text">Eureka! Journey</span>
          </h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>
            From idea to enterprise — here's the full timeline for EUREKA '26.
          </p>
        </div>

        <div ref={ref} className={`timeline reveal ${visible ? "in" : ""}`}>
          <div className="timeline-line" />
          {TIMELINE.map((item, i) => (
            <div
              className={`timeline-item ${i === 2 ? "active" : ""}`}
              key={item.title}
            >
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-title">{item.title}</div>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
