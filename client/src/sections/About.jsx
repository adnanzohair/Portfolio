import { motion } from 'framer-motion';
import { profile } from '../data/siteData';

export default function About() {
  return (
    <section id="about" className="section-padding about-editorial">
      <div className="section-container about-layout">
        <motion.div className="about-stat" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span>3+</span><strong>Years</strong><p>Web development</p>
        </motion.div>
        <motion.div className="about-body" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }}>
          <p className="eyebrow"><span /> About</p>
          <h2>COMPLEX SYSTEMS.<br /><em>CLEAN EXECUTION.</em></h2>
          <p className="about-lead">{profile.bio}</p>
          <p>From custom Magento 2 extensions to WordPress themes, plugins and production support, the work is owned from analysis through deployment—with performance, stability and maintainability built in.</p>
          <dl className="about-meta">
            <div><dt>Location</dt><dd>Karachi, Pakistan</dd></div>
            <div><dt>Focus</dt><dd>E-commerce / Web Development</dd></div>
            <div><dt>Current</dt><dd>Tekglide</dd></div>
          </dl>
          <div className="education-strip">
            {profile.education.map((item) => <div key={item.degree}><strong>{item.degree}</strong><span>{item.institution}</span></div>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
