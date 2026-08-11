import { motion } from 'framer-motion';

const steps = [
  ['Discover', 'Understand the requirements.'],
  ['Architect', 'Plan the technical approach.'],
  ['Build', 'Develop the experience.'],
  ['Test', 'Validate function, speed and compatibility.'],
  ['Ship', 'Deploy and support the production system.'],
];

export default function HowIWork() {
  return (
    <section className="section-padding process-section">
      <div className="section-container">
        <p className="eyebrow"><span /> Process</p>
        <h2 className="section-title">FROM SPECIFICATION<br />TO <em>DEPLOYMENT.</em></h2>
        <div className="process-grid">
          {steps.map(([title, copy], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
