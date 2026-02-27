import { useEffect } from 'react';
import { useAnimation, AnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const useScrollReveal = (threshold: number = 0.2): [ReturnType<typeof useInView>[0], AnimationControls] => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return [ref, controls];
};
