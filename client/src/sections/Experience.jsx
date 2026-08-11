import { motion } from 'framer-motion';
import { experience } from '../data/siteData';

export default function Experience({ setCursorVariant }) {
  return (
    <section id="experience" className="experience-section section-padding">
      <div className="section-container">
        <div className="experience-heading">
          <p className="eyebrow"><span /> Experience</p>
          <h2 className="section-title">WHERE I&apos;VE<br /><em>BUILT.</em></h2>
          <p>Production work across commerce, content systems and responsive web experiences.</p>
        </div>

        <div className="experience-timeline">
          <motion.div className="timeline-progress" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: '-120px' }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
          {experience.map((item, index) => (
            <motion.article
              key={item.company}
              className={`experience-entry ${index === 0 ? 'is-current' : ''}`}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setCursorVariant('text')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <div className="experience-year"><span>{item.year}</span>{index === 0 && <small>Current</small>}</div>
              <div className="experience-card">
                <div className="experience-card-head">
                  <div><h3>{item.company}</h3><p>{item.position}</p></div>
                  <time>{item.startDate} — {item.endDate}</time>
                </div>
                <p className="experience-summary">{item.description}</p>
                <div className="experience-details">
                  <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
                  <div className="experience-tech">{item.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
