import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const areas = [
    { title: 'Performance Optimization', description: 'Page speed audits, caching strategies, lazy loading and code optimization for sub-second load times.' },
    { title: 'Caching Strategy', description: 'Full-page cache, block cache, Varnish and CDN configuration for optimal server response.' },
    { title: 'Plugin Optimization', description: 'Auditing plugin bloat, removing unnecessary HTTP requests and reducing JavaScript payload.' },
    { title: 'Debugging', description: 'Systematic diagnosis of complex production issues across Magento 2 and WordPress environments.' },
    { title: 'Stability', description: 'Building systems that handle real traffic without breaking — tested under production conditions.' },
    { title: 'Technical SEO', description: 'Structured data, site architecture, crawlability and on-page optimizations for search visibility.' },
];

export default function Performance({ setCursorVariant }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="performance" className="section-padding relative">
            <div className="section-container" ref={ref}>
                {/* Header */}
                <motion.div
                    className="flex items-center gap-3 mb-4"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-text-muted text-xs tracking-[0.3em] uppercase font-display">Performance</span>
                </motion.div>

                <motion.h2
                    className="font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter mb-6"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.1 }}
                >
                    <span className="text-text">FAST BY</span>{' '}
                    <span className="text-gradient-accent">DEFAULT.</span>
                </motion.h2>

                <motion.p
                    className="text-text-secondary max-w-xl mb-16 leading-relaxed"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.2 }}
                >
                    Speed isn&apos;t an afterthought — it&apos;s built into every decision from server configuration
                    to frontend rendering. Real performance gains from real production experience.
                </motion.p>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {areas.map((area, i) => (
                        <motion.div
                            key={area.title}
                            className="glass rounded-xl p-6 hover:bg-glass-hover paddding:11px transition-all duration-500 group"
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            transition={{ delay: 0.25 + i * 0.08 }}
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <div className="w-8 h-8 rounded-lg bg-accent-dim flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-display font-semibold text-text mb-2">{area.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">{area.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
