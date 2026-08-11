import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <motion.div
            className="fixed inset-0 z-[10000] bg-bg flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Logo */}
            <motion.div
                className="font-display text-6xl font-bold tracking-tighter text-text"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                AZ
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-[2px] bg-surface overflow-hidden rounded-full">
                <motion.div
                    className="h-full bg-accent"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>

            {/* Title */}
            <motion.p
                className="text-text-muted text-xs tracking-[0.3em] uppercase font-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                Web Developer
            </motion.p>
        </motion.div>
    );
}
