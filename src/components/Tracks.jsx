import { TRACKS } from "../data/eureka";
import useReveal from "../hooks/useReveal";
import Glossary from "./Glossary";

export default function Tracks() {
  const [ref, visible] = useReveal();
  return (
    <section className="section" id="tracks">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Choose Your Lane</span>
          <h2 className="section-heading">
            8 Tracks, <span className="gradient-text">One Stage</span>
          </h2>
          <p className="section-sub" style={{ margin: "12px auto 0" }}>
            Pick the track that fits your idea best. You can enter multiple tracks with
            different ideas.
          </p>
        </div>
        <div ref={ref} className={`tracks-grid reveal ${visible ? "in" : ""}`}>
          {TRACKS.map((t) => (
            <div className="track-chip" key={t}>
              {t === "PAN IIT" ? (
                <Glossary term="Open to startup ideas from students of any IIT, not just IIT Bombay.">
                  {t}
                </Glossary>
              ) : (
                t
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
