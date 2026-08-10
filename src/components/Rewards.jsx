import { REWARDS } from "../data/eureca";
import useReveal from "../hooks/useReveal";

export default function Rewards() {
  const [ref, visible] = useReveal();
  return (
    <section className="section" id="rewards">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Global Ecosystem</span>
          <h2 className="section-heading">
            Where <span className="gradient-text">winners go next</span>
          </h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>
            Eureka! doesn't stop at the finals — top teams get access to global launchpads.
          </p>
        </div>
        <div ref={ref} className={`rewards-grid reveal ${visible ? "in" : ""}`}>
          {REWARDS.map((r) => (
            <div className="reward-card" key={r.title}>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
