import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks';

export default function ScrollProgress() {
    const progress = useScrollProgress();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
            style={{
                scaleX: progress,
                background: '#82aaff',
            }}
        />
    );
}
