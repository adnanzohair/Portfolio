import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const layers = [
    { label: 'Frontend', sub: 'React · Magento 2 · WordPress · Webflow', icon: '◇' },
    { label: 'API Layer', sub: 'REST · AJAX · JSON · XML · Third-party APIs', icon: '◈' },
    { label: 'Backend', sub: 'PHP · Node.js · Express.js · Custom Extensions', icon: '◆' },
    { label: 'Database', sub: 'MySQL · MongoDB · Data Modeling', icon: '▣' },
    { label: 'Deployment', sub: 'Linux · Git · CI/CD · Production Support', icon: '▲' },
];

export default function Engineering({ setCursorVariant }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="engineering" className="section-padding relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.015] blur-[150px] pointer-events-none" />

            <div className="section-container" ref={ref}>
                {/* Header */}
                <motion.div
                    className="flex items-center gap-3 mb-4"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-text-muted text-xs tracking-[0.3em] uppercase font-display">Architecture</span>
                </motion.div>

                <motion.h2
                    className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter mb-6"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.1 }}
                >
                    <span className="text-text">BEHIND THE</span>{' '}
                    <span className="text-gradient-accent">INTERFACE.</span>
                </motion.h2>

                <motion.p
                    className="text-text-secondary max-w-xl mb-16 leading-relaxed"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.2 }}
                >
                    More than visual development — understanding the full stack from frontend rendering
                    through API integration to database design and production deployment.
                </motion.p>

                {/* Architecture flow */}
                <div className="max-w-2xl mx-auto">
                    {layers.map((layer, i) => (
                        <motion.div
                            key={layer.label}
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            transition={{ delay: 0.3 + i * 0.1 }}
                        >
                            <div
                                className="glass rounded-xl p-6 hover:bg-glass-hover transition-all duration-500"
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-accent text-xl w-8 text-center shrink-0">{layer.icon}</span>
                                    <div>
                                        <h3 className="font-display font-semibold text-text text-lg">{layer.label}</h3>
                                        <p className="text-text-muted text-sm mt-0.5">{layer.sub}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Connector */}
                            {i < layers.length - 1 && (
                                <div className="flex justify-center py-2">
                                    <motion.div
                                        className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent"
                                        initial={{ scaleY: 0, opacity: 0 }}
                                        animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                                        transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                                        style={{ transformOrigin: 'top' }}
                                    />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
