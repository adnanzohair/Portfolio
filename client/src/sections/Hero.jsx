import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.85, ease: [0.16, 1, 0.3, 1] } }),
};

function ArchitectureObject() {
  return (
    <motion.div
      className="hero-object"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="hero-orbit hero-orbit-a" />
      <div className="hero-orbit hero-orbit-b" />
      <div className="hero-core"><span>AZ</span></div>
      {[0, 1, 2, 3].map((item) => <i key={item} className={`hero-node hero-node-${item + 1}`} />)}
    </motion.div>
  );
}

export default function Hero({ setCursorVariant }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={ref} className="hero-stage grid-bg">
      <div className="hero-ambient" />
      <motion.div style={{ y: contentY, opacity }} className="section-container hero-layout">
        <div className="hero-copy">
          <motion.p className="eyebrow" custom={0.35} variants={reveal} initial="hidden" animate="visible">
            <span /> Web Developer / E-commerce Engineer
          </motion.p>
          <h1 className="hero-title" aria-label="Building digital systems">
            {['BUILDING', 'DIGITAL', 'SYSTEMS.'].map((line, index) => (
              <motion.span key={line} custom={0.55 + index * 0.11} variants={reveal} initial="hidden" animate="visible">
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p className="hero-description" custom={1} variants={reveal} initial="hidden" animate="visible">
            Building fast, reliable and production-ready digital experiences across Magento 2, WordPress and modern web platforms.
          </motion.p>
          <motion.div className="hero-actions" custom={1.15} variants={reveal} initial="hidden" animate="visible">
            <a href="#work" onClick={scrollTo('work')} className="button-primary" onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}>View my work <span>↗</span></a>
            <a href="#contact" onClick={scrollTo('contact')} className="button-secondary" onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}>Let&apos;s talk</a>
          </motion.div>
        </div>
        <ArchitectureObject />
      </motion.div>
      <div className="hero-foot section-container"><span>Karachi, Pakistan</span><span>Scroll to explore ↓</span></div>
    </section>
  );
}
