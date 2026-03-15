import { useEffect, useRef, useState } from 'react';

/**
 * SpotlightCursor
 * A smooth radial-gradient spotlight that follows the mouse cursor.
 * Exported as both `Component` (named) and `default` for flexibility.
 *
 * Props:
 *   className   – extra classes applied to the overlay div (e.g. "hidden md:block")
 *   size        – diameter of the spotlight in px (default 600)
 *   color       – spotlight colour in any CSS format (default semi-transparent indigo)
 *   opacity     – 0–1 max opacity of the spotlight (default 0.18)
 *   speed       – lerp factor 0–1; lower = smoother/slower (default 0.1)
 */
export function Component({
  className = '',
  size = 600,
  color = '99, 102, 241',
  opacity = 0.18,
  speed = 0.1,
}) {
  const overlayRef = useRef(null);
  const pos = useRef({ x: -9999, y: -9999 });       // raw mouse position
  const current = useRef({ x: -9999, y: -9999 });   // interpolated (lerped) position
  const rafId = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    const loop = () => {
      // Lerp towards target for buttery-smooth movement
      current.current.x += (pos.current.x - current.current.x) * speed;
      current.current.y += (pos.current.y - current.current.y) * speed;

      if (overlayRef.current) {
        const { x, y } = current.current;
        overlayRef.current.style.background = `radial-gradient(
          ${size}px circle at ${x}px ${y}px,
          rgba(${color}, ${opacity}) 0%,
          transparent 80%
        )`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [size, color, opacity, speed, visible]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'opacity 0.4s ease',
        opacity: visible ? 1 : 0,
        mixBlendMode: 'screen',
      }}
    />
  );
}

export default Component;
