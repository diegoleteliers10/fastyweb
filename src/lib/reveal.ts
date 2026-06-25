const STAGGER_MS = 70;

export const initReveal = (): void => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (targets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const index = Number(el.dataset.revealIndex ?? "0");
        if (Number.isFinite(index) && index > 0) {
          el.style.setProperty("--reveal-delay", `${index * STAGGER_MS}ms`);
        }
        el.classList.add("is-revealed");
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  targets.forEach((t) => observer.observe(t));
};