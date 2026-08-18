import { motion } from 'framer-motion';

export default function Introduction() {
  return (
    <section className="statement-section section-padding" aria-label="Introduction">
      <div className="section-container">
        <p className="eyebrow"><span /> Built for production</p>
        <motion.h2
          className="statement-title"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          I BUILD FOR<br /><em>THE REAL WEB.</em>
        </motion.h2>
        <p className="statement-copy">From custom web applications to content-rich business platforms, I focus on systems that are fast, reliable and built to thrive in real-world production.</p>
      </div>
    </section>
  );
}
