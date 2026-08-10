// Lightweight, dependency-free confetti burst — no external library needed.
// Fires a short canvas-based burst and cleans itself up.
const COLORS = ["#2f5fed", "#4f8dff", "#8fb4ff", "#16a34a", "#ffd166", "#ffffff"];

export function fireConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();

  const count = 140;
  const particles = Array.from({ length: count }, () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -14 - 4,
    size: Math.random() * 7 + 4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 16,
    shape: Math.random() > 0.5 ? "rect" : "circle",
  }));

  const gravity = 0.45;
  const drag = 0.985;
  let frame = 0;
  const maxFrames = 130;
  let rafId;

  function tick() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.vx *= drag;
      p.vy = p.vy * drag + gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    if (frame < maxFrames) {
      rafId = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafId);
      canvas.remove();
    }
  }

  rafId = requestAnimationFrame(tick);

  // Safety cleanup in case something goes wrong
  setTimeout(() => canvas.remove(), 4000);
}
