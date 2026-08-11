import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '../data/siteData';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services({ setCursorVariant }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="services" className="services-section section-padding">
            <div className="section-container" ref={ref}>
                <div className="services-heading">
                    <motion.div
                        className="services-heading-copy"
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                    >
                        <p className="eyebrow"><span />Services</p>
                        <h2>What I <em>deliver.</em></h2>
                    </motion.div>

                    <motion.p
                        className="services-intro"
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.1 }}
                    >
                        Focused digital engineering for ambitious businesses—from the first build to long-term performance.
                    </motion.p>
                </div>

                <motion.div
                    className="services-list-labels"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.14 }}
                >
                    <span>Expertise</span>
                    <span>Scope</span>
                </motion.div>

                <div className="services-list">
                    {services.map((service, i) => (
                        <motion.article
                            key={service.title}
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            transition={{ delay: 0.15 + i * 0.06 }}
                            className="service-row"
                            onMouseEnter={() => setCursorVariant?.('text')}
                            onMouseLeave={() => setCursorVariant?.('default')}
                        >
                            <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <span className="service-arrow" aria-hidden="true">↗</span>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
