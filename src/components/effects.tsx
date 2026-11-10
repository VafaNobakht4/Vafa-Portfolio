import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#";

// Text that starts as random symbols and resolves letter by letter.
export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView) return;
    const totalFrames = 22;
    let frame = 0;

    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / totalFrames) * text.length);
      const next = text
        .split("")
        .map((char, i) => {
          if (char === " " || i < revealed) return char;
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");
      setOutput(next);

      if (frame >= totalFrames) {
        setOutput(text);
        clearInterval(id);
      }
    }, 30);

    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} className={className}>
      {output}
    </span>
  );
}

// Pulls its content slightly toward the mouse while hovering.
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMouseMove(event: React.MouseEvent) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - box.left - box.width / 2) * strength);
    y.set((event.clientY - box.top - box.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// Tilts its content in 3D toward the mouse while hovering.
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 16 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 16 });

  function handleMouseMove(event: React.MouseEvent) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{ rotateX: springX, rotateY: springY }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
