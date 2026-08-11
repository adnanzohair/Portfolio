import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../hooks';

export default function CustomCursor({ variant = 'default' }) {
    const isMobile = useMediaQuery('(pointer: coarse)');
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (isMobile || prefersReducedMotion) return;

        const handleMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleLeave = () => setIsVisible(false);
        const handleEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseleave', handleLeave);
        document.addEventListener('mouseenter', handleEnter);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseleave', handleLeave);
            document.removeEventListener('mouseenter', handleEnter);
        };
    }, [isMobile, prefersReducedMotion, cursorX, cursorY]);

    if (isMobile || prefersReducedMotion) return null;

    const variants = {
        default: { width: 12, height: 12, backgroundColor: '#82aaff' },
        text: { width: 80, height: 80, backgroundColor: 'transparent', border: '1px solid rgba(130,170,255,0.38)' },
        project: { width: 80, height: 80, backgroundColor: 'rgba(130,170,255,0.1)', border: '1px solid rgba(130,170,255,0.45)' },
        button: { width: 60, height: 60, backgroundColor: 'transparent', border: '1px solid rgba(130,170,255,0.5)' },
    };

    const currentVariant = variants[variant] || variants.default;

    return (
        <>
            <style>{`@media (pointer: fine) { body { cursor: none !important; } body * { cursor: none !important; } }`}</style>
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 6,
                    height: 6,
                    backgroundColor: '#82aaff',
                    opacity: isVisible ? 1 : 0,
                }}
            />
            {/* Circle */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] flex items-center justify-center"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    ...currentVariant,
                    transition: { type: 'spring', damping: 20, stiffness: 300 },
                }}
            >
                {variant === 'project' && (
                    <span className="text-accent text-xs font-medium font-display tracking-wider uppercase">
                        View
                    </span>
                )}
            </motion.div>
        </>
    );
}
