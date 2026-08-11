import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { projects } from '../data/siteData';

export default function ProjectDetail({ setCursorVariant }) {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projectIndex >= 0 ? projects[(projectIndex + 1) % projects.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <main className="min-h-screen grid place-items-center px-6 pt-32">
        <div className="text-center">
          <p className="text-accent font-display tracking-[0.25em] text-xs uppercase">404</p>
          <h1 className="font-display text-5xl font-bold mt-4">Project not found.</h1>
          <Link className="inline-block mt-8 text-text-secondary hover:text-accent" to="/#work">Back to work</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <Helmet>
        <title>{project.title} — {project.platform} Project | Adnan Zohair</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <motion.article
        className="max-w-[1200px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <span aria-hidden="true">←</span> All projects
        </Link>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_0.6fr] gap-12 items-end">
          <div>
            <p className="text-accent font-display tracking-[0.25em] text-xs uppercase">{project.platform}</p>
            <h1 className="font-display font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tighter mt-5">
              {project.title}
            </h1>
          </div>
          <p className="text-text-secondary text-lg leading-relaxed">{project.description}</p>
        </div>

        <div className="project-placeholder aspect-[16/7] rounded-3xl mt-16 border border-border">
          <span className="relative z-10">{project.platform} website development</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="glass rounded-2xl p-7">
            <p className="text-text-muted text-xs uppercase tracking-widest">Role</p>
            <p className="font-display text-xl mt-3">{project.role}</p>
          </div>
          <div className="glass rounded-2xl p-7 md:col-span-2">
            <p className="text-text-muted text-xs uppercase tracking-widest">Technologies</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.map((tech) => <span key={tech} className="bg-surface px-3 py-1.5 rounded-full text-sm">{tech}</span>)}
            </div>
          </div>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex mt-10 px-7 py-3.5 rounded-full bg-accent text-bg font-medium"
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          Visit live website ↗
        </a>

        {nextProject && (
          <Link
            to={`/work/${nextProject.slug}`}
            className="mt-24 pt-12 border-t border-border flex items-end justify-between gap-6 group"
            onMouseEnter={() => setCursorVariant('project')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <div><p className="text-text-muted text-xs uppercase tracking-[0.2em]">Next project</p><h2 className="font-display text-3xl md:text-5xl font-bold mt-3 group-hover:text-accent transition-colors">{nextProject.title}</h2></div>
            <span className="text-accent text-2xl">↗</span>
          </Link>
        )}
      </motion.article>
    </main>
  );
}
