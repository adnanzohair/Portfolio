import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/siteData';

const filters = ['All', 'Shopify Plus', 'MERN', 'WordPress', 'Magento 2', 'Webflow'];

export default function Work({ setCursorVariant }) {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(projects[0]);
  const visible = filter === 'All' ? projects : projects.filter((project) => project.platform === filter);

  const selectFilter = (value) => {
    setFilter(value);
    setActive(value === 'All' ? projects[0] : projects.find((project) => project.platform === value));
  };

  return (
    <section id="work" className="work-showcase section-padding">
      <div className="section-container">
        <div className="work-heading">
          <div><p className="eyebrow"><span /> Selected work</p><h2 className="section-title">REAL PROJECTS.<br /><em>REAL SYSTEMS.</em></h2></div>
          <div className="filter-row" aria-label="Filter projects">{filters.map((item) => <button key={item} onClick={() => selectFilter(item)} className={filter === item ? 'active' : ''}>{item}</button>)}</div>
        </div>

        <div className="work-layout">
          <div className="project-list">
            <AnimatePresence mode="popLayout">
              {visible.map((project, index) => (
                <motion.article
                  layout key={project.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={active.slug === project.slug ? 'active' : ''}
                  onMouseEnter={() => { setActive(project); setCursorVariant('project'); }}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Link to={`/work/${project.slug}`}>
                    <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{project.title}</h3><p>{project.platform}</p></div><span className="project-arrow">↗</span>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <div className="project-viewer">
            <div className="project-frame">
              <AnimatePresence mode="wait">
                <motion.div key={active.slug} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="project-art project-art-image">
                  <span className="project-frame-index">{String(projects.indexOf(active) + 1).padStart(2, '0')}</span>
                  <img src={active.heroImage} alt={`${active.title} website homepage`} />
                  <div className="project-art-caption"><strong>{active.title}</strong><span>{active.platform}</span></div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="viewer-meta"><p>{active.description}</p><a href={active.url} target="_blank" rel="noreferrer">Visit website ↗</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
