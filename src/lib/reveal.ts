const STAGGER_MS = 85;

export function initReveal(): void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (targets.length === 0) return;

  document.documentElement.classList.add("motion-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!(entry.target instanceof HTMLElement)) return;
        const el = entry.target;
        const index = Number(el.dataset.revealIndex ?? "0");
        if (Number.isFinite(index) && index > 0) {
          el.style.setProperty("--reveal-delay", `${Math.min(index, 3) * STAGGER_MS}ms`);
        }
        el.classList.add("is-revealed");
        el.closest(".section")?.classList.add("is-in-view");
        observer.unobserve(el);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
  );

  targets.forEach((t) => observer.observe(t));

  const stages = document.querySelectorAll<HTMLElement>("[data-motion-stage]");
  const stageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.6) return;
      if (!(entry.target instanceof HTMLElement)) return;
      entry.target.classList.add("is-playing");
      stageObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  stages.forEach((stage) => stageObserver.observe(stage));
}
