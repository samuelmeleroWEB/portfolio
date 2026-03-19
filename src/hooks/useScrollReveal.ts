import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const useScrollReveal = (threshold: number = 0.2): [ReturnType<typeof useInView>[0], ReturnType<typeof useAnimation>] => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return [ref, controls];
};
