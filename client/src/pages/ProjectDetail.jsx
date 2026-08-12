import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { projects } from '../data/siteData';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectDetail({ setCursorVariant }) {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projectIndex >= 0 ? projects[(projectIndex + 1) % projects.length] : null;
  const cursorProps = {
    onMouseEnter: () => setCursorVariant?.('button'),
    onMouseLeave: () => setCursorVariant?.('default'),
  };

  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!project) return (
    <main className="project-missing"><div><p>404</p><h1>Project not found.</h1><Link to="/#work">Back to work</Link></div></main>
  );

  return (
    <main className="case-study">
      <Helmet>
        <title>{project.title} — {project.platform} Project | Adnan Zohair</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <article className="case-study-inner">
        <motion.div initial="hidden" animate="visible" variants={reveal}>
          <Link className="case-back" to="/#work" {...cursorProps}><span>←</span> Selected work</Link>

          <header className="case-header">
            <div className="case-title">
              <p className="eyebrow"><span />Case study · {String(projectIndex + 1).padStart(2, '0')}</p>
              <h1>{project.title}</h1>
            </div>
            <div className="case-intro">
              <p>{project.description}</p>
              <a href={project.url} target="_blank" rel="noreferrer" {...cursorProps}>Visit live website <span>↗</span></a>
            </div>
          </header>
        </motion.div>

        <motion.figure className="case-visual" initial={{ opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .85, delay: .15, ease: [0.16, 1, 0.3, 1] }}>
          <div className="case-browser-bar"><span /><span /><span /><small>{new URL(project.url).hostname.replace('www.', '')}</small></div>
          <img src={project.heroImage} alt={`${project.title} live website homepage`} />
          <figcaption><span>Live website</span><span>{project.platform} development</span></figcaption>
        </motion.figure>

        <motion.section className="case-overview" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={reveal}>
          <div className="case-overview-heading"><p className="eyebrow"><span />Project overview</p><h2>Built for a real business.<br /><em>Engineered to perform.</em></h2></div>
          <div className="case-facts">
            <dl><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Platform</dt><dd>{project.platform}</dd></div><div><dt>Status</dt><dd><span className="case-live-dot" />Live production site</dd></div></dl>
            <p>{project.description} The engagement combined production-ready development with maintainable implementation and a focus on the day-to-day needs of the business.</p>
          </div>
        </motion.section>

        <section className="case-capabilities">
          <div><p className="case-label">Services delivered</p>{project.services.map((service, index) => <div className="case-service" key={service}><span>{String(index + 1).padStart(2, '0')}</span><strong>{service}</strong></div>)}</div>
          <div><p className="case-label">Technology stack</p><div className="case-tech">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
        </section>

        {nextProject && <Link className="case-next" to={`/work/${nextProject.slug}`} onMouseEnter={() => setCursorVariant?.('project')} onMouseLeave={() => setCursorVariant?.('default')}>
          <div><p>Next case study · {String((projectIndex + 1) % projects.length + 1).padStart(2, '0')}</p><h2>{nextProject.title}</h2></div><span>↗</span>
        </Link>}
      </article>
    </main>
  );
}
