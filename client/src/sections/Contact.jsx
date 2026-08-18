import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '../data/siteData';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const projectTypes = [
    'Custom Web Application',
    'MERN / Full-Stack Development',
    'Business Website / CMS',
    'E-commerce Platform',
    'Performance Optimization',
    'Custom Plugin / Extension',
    'Other',
];

const whatsappNumber = '923360232152';

export default function Contact({ setCursorVariant }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const [formState, setFormState] = useState('idle'); // idle | success
    const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!formData.name.trim()) e.name = 'Name is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email is required';
        if (!formData.message.trim()) e.message = 'Message is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const whatsappMessage = [
            'Hello, I would like to discuss a project.',
            '',
            `Name: ${formData.name.trim()}`,
            `Email: ${formData.email.trim()}`,
            `Project type: ${formData.projectType || 'Not specified'}`,
            `Message: ${formData.message.trim()}`,
        ].join('\n');

        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
            '_blank',
            'noopener,noreferrer',
        );
        setFormState('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
    };

    return (
        <section id="contact" className="contact-section section-padding">
            <div className="section-container" ref={ref}>
                <motion.div
                    className="contact-heading"
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <p className="eyebrow"><span />Contact</p>
                    <h2>Let&apos;s build something <em>remarkable.</em></h2>
                </motion.div>

                <div className="contact-layout">
                    <motion.div
                        className="contact-copy"
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="contact-lead">
                            Ready to build something exceptional? Whether it&apos;s a custom application, business website,
                            e-commerce experience or API-driven platform — let&apos;s talk about your project.
                        </p>

                        <div className="contact-details">
                            {[
                                { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                                { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
                                { label: 'Location', value: profile.location, href: null },
                                { label: 'LinkedIn', value: 'linkedin.com/in/adnan-zohair', href: profile.linkedin },
                            ].map(item => (
                                <div key={item.label} className="contact-detail">
                                    <span>{item.label}</span>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.label === 'LinkedIn' ? '_blank' : undefined}
                                            rel={item.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                                            onMouseEnter={() => setCursorVariant?.('button')}
                                            onMouseLeave={() => setCursorVariant?.('default')}
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <strong>{item.value}</strong>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="contact-form"
                        variants={fadeUp}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.3 }}
                    >
                        {formState === 'success' ? (
                            <div className="contact-success">
                                <div className="contact-success-icon">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3>WhatsApp opened</h3>
                                <p>Your message is ready. Tap send in WhatsApp to submit it.</p>
                                <button
                                    type="button"
                                    onClick={() => setFormState('idle')}
                                    className="contact-reset"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="contact-field">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                        className={errors.name ? 'has-error' : ''}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="field-error">{errors.name}</p>}
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                                        className={errors.email ? 'has-error' : ''}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && <p className="field-error">{errors.email}</p>}
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="projectType">Project type</label>
                                    <select
                                        id="projectType"
                                        value={formData.projectType}
                                        onChange={(e) => setFormData(p => ({ ...p, projectType: e.target.value }))}
                                    >
                                        <option value="">Select a project type</option>
                                        {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>

                                <div className="contact-field">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                                        className={errors.message ? 'has-error' : ''}
                                        placeholder="Tell me about your project..."
                                    />
                                    {errors.message && <p className="field-error">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="contact-submit"
                                    onMouseEnter={() => setCursorVariant?.('button')}
                                    onMouseLeave={() => setCursorVariant?.('default')}
                                >
                                    <>Continue on WhatsApp <span aria-hidden="true">↗</span></>
                                </button>
                            </>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
