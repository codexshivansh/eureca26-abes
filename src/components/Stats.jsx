import { STATS } from "../data/eureka";

export default function Stats() {
  return (
    <div className="stats-strip">
      <div className="container stats-grid">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
