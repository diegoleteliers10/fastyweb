type TerminalStep = {
  typed: HTMLElement | null;
  cursor: HTMLElement | null;
  output: HTMLElement | null;
};

const sleep = (ms: number): Promise<void> =>
  new Promise((r) => window.setTimeout(r, ms));

const rand = (min: number, max: number): number => min + Math.random() * (max - min);

const setActiveCursor = (steps: TerminalStep[], idx: number): void => {
  steps.forEach((step, i) => {
    if (!step.cursor) return;
    step.cursor.style.display = i === idx ? "inline-block" : "none";
  });
};

const reset = (steps: TerminalStep[]): void => {
  steps.forEach((step) => {
    if (step.typed) step.typed.textContent = "";
    if (step.output) {
      step.output.hidden = true;
      step.output.classList.remove("is-complete");
      Array.from(step.output.children).forEach((line) => {
        const el = line as HTMLElement;
        el.style.opacity = "";
        el.style.transform = "";
        el.style.transition = "";
      });
    }
  });
  setActiveCursor(steps, 0);
};

const typeText = async (el: HTMLElement, text: string): Promise<void> => {
  el.textContent = "";
  for (const ch of text) {
    el.textContent += ch;
    const isPunct = ch === " " || ch === "-" || ch === "/" || ch === ".";
    await sleep(isPunct ? rand(35, 55) : rand(28, 52));
  }
};

const revealOutput = async (output: HTMLElement, stagger: number): Promise<void> => {
  const lines = Array.from(output.children) as HTMLElement[];
  lines.forEach((line) => {
    line.style.opacity = "0";
    line.style.transform = "translateY(3px)";
  });
  output.hidden = false;
  void output.offsetHeight;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    line.style.transition = `opacity 220ms var(--ease-out), transform 220ms var(--ease-out)`;
    line.style.opacity = "1";
    line.style.transform = "none";
    await sleep(stagger);
  }
  output.classList.add("is-complete");
};

const collectSteps = (terminal: HTMLElement): TerminalStep[] => {
  const lines = Array.from(terminal.querySelectorAll<HTMLElement>("[data-line]"));
  return lines.map((line) => {
    const typed = line.querySelector<HTMLElement>("[data-typed]");
    const cursor = line.querySelector<HTMLElement>("[data-cursor]");
    let output: HTMLElement | null = null;
    let next = line.nextElementSibling as HTMLElement | null;
    while (next) {
      if (next.hasAttribute("data-output")) {
        output = next;
        break;
      }
      next = next.nextElementSibling as HTMLElement | null;
    }
    return { typed, cursor, output };
  });
};

const runCycle = async (steps: TerminalStep[]): Promise<void> => {
  await sleep(600);

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];

    if (step.typed && step.typed.dataset.typed) {
      await typeText(step.typed, step.typed.dataset.typed);
      await sleep(300);
    }

    setActiveCursor(steps, i);

    if (step.output) {
      await revealOutput(step.output, 90);
      await sleep(600);
    }
  }
};

const initialized = new WeakSet<HTMLElement>();

export const setupTerminalCycle = (terminal: HTMLElement): void => {
  if (initialized.has(terminal)) return;
  initialized.add(terminal);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const steps = collectSteps(terminal);
  if (steps.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    reset(steps);
    void runCycle(steps);
  }, { threshold: 0.35 });

  observer.observe(terminal);
};

export const initTerminalCycles = (): void => {
  const terminals = document.querySelectorAll<HTMLElement>("[data-terminal]");
  terminals.forEach((t) => setupTerminalCycle(t));
};
