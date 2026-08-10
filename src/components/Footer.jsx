import { EVENT_INFO } from "../data/eureca";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--gradient-cta)",
                display: "inline-block",
              }}
            />
            EURECA '26 @ {EVENT_INFO.college}
          </div>
          <div className="footer-links">
            <a href="#about">What is it</a>
            <a href="#timeline">Timeline</a>
            <a href="#tracks">Tracks</a>
            <a href="#faq">FAQ</a>
            <a href={`mailto:${EVENT_INFO.contactEmail}`}>{EVENT_INFO.contactEmail}</a>
          </div>
        </div>
        <p className="footer-fine">
          This is an unofficial, student-run campus landing page built to help students at{" "}
          {EVENT_INFO.college} register for the Eureka! Zonal Round, part of EURECA '26 by
          E-Cell, IIT Bombay. Official rules, dates and judging criteria are governed by
          E-Cell IIT Bombay — always cross-check final details at{" "}
          <a
            href="https://www.ecell.in/eureka/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline" }}
          >
            ecell.in/eureka
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
