import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// A small dot that follows the mouse, plus a ring that trails behind it
// and grows over links and buttons. Only shown on devices with a mouse.
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // The dot is 6px wide, so shift it by 3px to center it on the pointer.
  const dotX = useTransform(mouseX, (v) => v - 3);
  const dotY = useTransform(mouseY, (v) => v - 3);

  // The ring is 34px wide (shift by 17px) and springs after the pointer.
  const springConfig = { stiffness: 250, damping: 25, mass: 0.6 };
  const ringX = useSpring(
    useTransform(mouseX, (v) => v - 17),
    springConfig,
  );
  const ringY = useSpring(
    useTransform(mouseY, (v) => v - 17),
    springConfig,
  );

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setHovering(!!target?.closest("a, button, input, textarea"));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-[34px] w-[34px] rounded-full border border-accent/60"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 1.9 : 1,
          opacity: visible ? (hovering ? 0.9 : 0.55) : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
