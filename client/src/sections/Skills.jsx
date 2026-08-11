import { motion } from 'framer-motion';

const toolkit = {
  Commerce: ['Magento 2', 'Shopify'],
  CMS: ['WordPress', 'Webflow'],
  Languages: ['PHP', 'JavaScript', 'jQuery', 'HTML5', 'CSS3'],
  'Data / APIs': ['MySQL', 'AJAX', 'JSON', 'XML', 'APIs'],
  Infrastructure: ['Linux', 'Git', 'GitHub'],
  Optimization: ['Technical SEO', 'Performance'],
};

const portfolioStack = ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Framer Motion'];

export default function Skills({ setCursorVariant }) {
  return (
    <section id="skills" className="section-padding stack-section">
      <div className="section-container">
        <p className="eyebrow"><span /> Professional toolkit</p>
        <h2 className="section-title">THE<br /><em>STACK.</em></h2>
        <div className="stack-ecosystem">
          <div className="stack-center"><span>AZ</span><small>Professional<br />toolkit</small></div>
          <div className="stack-groups">
            {Object.entries(toolkit).map(([group, items], index) => (
              <motion.article key={group} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>
                <span>{String(index + 1).padStart(2, '0')}</span><h3>{group}</h3>
                <div>{items.map((item) => <button key={item} onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>{item}</button>)}</div>
              </motion.article>
            ))}
          </div>
        </div>
        <div className="portfolio-stack"><div><span>This portfolio</span><p>Tools used to create this site—not presented as equal professional experience.</p></div><ul>{portfolioStack.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </div>
    </section>
  );
}
