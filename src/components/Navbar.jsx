export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="navbar-brand">
          <span className="dot" />
          <span>EUREKA&nbsp;<span className="gradient-text">'26</span></span>
        </a>
        <nav className="navbar-links">
          <a href="#about">What is it</a>
          <a href="#timeline">Timeline</a>
          <a href="#tracks">Tracks</a>
          <a href="#rewards">Rewards</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#register" className="btn btn-primary navbar-cta">
          Register Team
        </a>
      </div>
    </header>
  );
}
