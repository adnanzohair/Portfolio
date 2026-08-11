import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useActiveSection } from '../../hooks';

const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

const sectionIds = ['hero', 'about', 'work', 'experience', 'skills', 'services', 'contact'];

export default function Navbar({ setCursorVariant }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeSection = useActiveSection(sectionIds);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        const onKeyDown = (event) => event.key === 'Escape' && setMobileOpen(false);
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [mobileOpen]);

    const handleClick = (event, href) => {
        event.preventDefault();
        setMobileOpen(false);
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = `/${href}`;
    };

    const cursorProps = {
        onMouseEnter: () => setCursorVariant?.('button'),
        onMouseLeave: () => setCursorVariant?.('default'),
    };

    return (
        <>
            <motion.header
                className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
                initial={{ y: -90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
                <nav className="site-nav" aria-label="Primary navigation">
                    <a className="site-logo" href="#hero" onClick={(event) => handleClick(event, '#hero')} {...cursorProps}>
                        AZ<span>.</span>
                    </a>

                    <div className="site-nav-links">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.href}
                                    className={isActive ? 'is-active' : ''}
                                    href={link.href}
                                    onClick={(event) => handleClick(event, link.href)}
                                    aria-current={isActive ? 'page' : undefined}
                                    {...cursorProps}
                                >
                                    {link.label}
                                    {isActive && <motion.span layoutId="nav-indicator" />}
                                </a>
                            );
                        })}
                    </div>

                    <a className="site-nav-cta" href="#contact" onClick={(event) => handleClick(event, '#contact')} {...cursorProps}>
                        Let&apos;s work together <span aria-hidden="true">↗</span>
                    </a>

                    <button
                        className={`site-menu-toggle ${mobileOpen ? 'is-open' : ''}`}
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                        {...cursorProps}
                    >
                        <span />
                        <span />
                    </button>
                </nav>
            </motion.header>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-navigation"
                        className="mobile-navigation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="mobile-navigation-inner">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    className={activeSection === link.href.slice(1) ? 'is-active' : ''}
                                    href={link.href}
                                    onClick={(event) => handleClick(event, link.href)}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.055, duration: 0.35 }}
                                >
                                    <small>0{index + 1}</small>{link.label}
                                </motion.a>
                            ))}
                            <a className="mobile-nav-cta" href="#contact" onClick={(event) => handleClick(event, '#contact')}>
                                Start a project <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
