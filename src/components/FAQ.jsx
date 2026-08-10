import { useState } from "react";
import { FAQS } from "../data/eureka";
import useReveal from "../hooks/useReveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [ref, visible] = useReveal();

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Still Confused?</span>
          <h2 className="section-heading">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>
        <div
          ref={ref}
          className={`faq-list reveal ${visible ? "in" : ""}`}
          style={{ maxWidth: 760, margin: "0 auto" }}
        >
          {FAQS.map((item, i) => (
            <div className={`faq-item ${openIndex === i ? "open" : ""}`} key={item.q}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                {item.q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
