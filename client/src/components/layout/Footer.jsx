import { profile } from '../../data/siteData';

export default function Footer({ setCursorVariant }) {
    const cursorProps = {
        onMouseEnter: () => setCursorVariant?.('button'),
        onMouseLeave: () => setCursorVariant?.('default'),
    };

    const scrollToTop = (event) => {
        event.preventDefault();
        document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <div className="footer-primary">
                    <a className="footer-brand" href="#hero" onClick={scrollToTop} {...cursorProps}>
                        <span className="footer-mark">AZ<span>.</span></span>
                        <span className="footer-identity">
                            <strong>Adnan Zohair</strong>
                            <small>Web developer · Karachi, Pakistan</small>
                        </span>
                    </a>

                    <nav className="footer-links" aria-label="Footer navigation">
                        <a href="#work" {...cursorProps}>Work</a>
                        <a href="#about" {...cursorProps}>About</a>
                        <a href="#experience" {...cursorProps}>Experience</a>
                        <a href="#contact" {...cursorProps}>Contact</a>
                    </nav>

                    <div className="footer-socials">
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" {...cursorProps}>
                            LinkedIn <span aria-hidden="true">↗</span>
                        </a>
                        <a href={`mailto:${profile.email}`} {...cursorProps}>
                            Email <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>

                <div className="footer-meta">
                    <p>© {new Date().getFullYear()} Adnan Zohair. All rights reserved.</p>
                    <p className="footer-status"><span />Available for select projects</p>
                    <a href="#hero" onClick={scrollToTop} {...cursorProps}>Back to top <span aria-hidden="true">↑</span></a>
                </div>
            </div>
        </footer>
    );
}
