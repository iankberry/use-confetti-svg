import * as React from "react";
import { useCallback } from "react";
import { createRoot } from 'react-dom/client';
import { ImageConfetti, ImageConfettiProps } from "./ImageConfetti";

export type ConfettiOptions = Omit<ImageConfettiProps, 'runAnimation' | 'onAnimationCompleted'>

export const useConfetti = (options: ConfettiOptions) => {
    const runAnimation = useCallback(() => {
        // add container element to the dom to hold the confetti canvas
        const confettiRoot = document.createElement('div');
        document.body.append(confettiRoot);

        return new Promise<void>(resolve => {
            // create a new confetti element
            const component = React.createElement(ImageConfetti, {
                runAnimation: true,
                onAnimationCompleted: () => {
                    if (confettiRoot) {
                        document.body.removeChild(confettiRoot);
                    }
                    resolve();
                },
                ...options,
            });

            // render the element in the container
            createRoot(confettiRoot).render(component);
        });
    }, [options]);

    return {
        runAnimation,
    }
}