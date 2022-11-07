import ConfettiGenerator from "confetti-js";
import * as React from "react";
import { useEffect, useRef } from "react";
import { usePrevious } from "./utils";

export type ConfettiImage = {
    src: string
    size?: number
    weight?: number
}

export type ImageConfettiProps = {
    // whether to run the confetti animation
    runAnimation: boolean
    // array of particle images
    images: ConfettiImage[]
    // callback to run after animation completes
    onAnimationCompleted?: () => void
    // duration of the animation (in ms)
    duration?: number
    // number of particles to render at one time
    particleCount?: number
    // speed the particles "fall"
    speed?: number
    // when to begin the fadeout animation (in ms)
    fadeOut?: number | false
    // whether to rotate the particle images during animation
    rotate?: boolean
}

const confettiSettingsTemplate = {
    target: 'confetti-canvas',
    clock: 50,
    max: 50,
    fps: 60,
    rotate: false,
};

type ConfettiJsSettings = typeof confettiSettingsTemplate & { props: Required<ConfettiImage>[] }

export function ImageConfetti({
        duration = 2000,
        fadeOut = 1000,
        images,
        onAnimationCompleted,
        particleCount = 50,
        rotate = false,
        runAnimation,
        speed = 50,
}: ImageConfettiProps) {
    // track previous value so animation is only triggered once
    const previousRunAnimation = usePrevious<number>(runAnimation);

    // allow canvas to be manipulated directly
    const canvasRef = useRef<HTMLCanvasElement|null>();

    // keep confetti object persistent between renders
    const confetti = useRef<{ render: () => void, clear: () => void }|null>();

    // cleanup animation on unmount
    useEffect(() => {
        return () => {
            if (confetti.current) {
                confetti.current.clear();
                confetti.current = null;
            }
            onAnimationCompleted && onAnimationCompleted();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // run the animation when 'runAnimation' changes from 'false' to 'true'
    useEffect(() => {
        let timer1, timer2;

        if (runAnimation && !previousRunAnimation) {
            // create confetti instance
            if (!confetti.current) {
                const settings: ConfettiJsSettings = {
                    ...confettiSettingsTemplate,
                    max: particleCount,
                    clock: speed,
                    rotate: rotate,
                    props: images.map(({ src, size = 24, weight = 1 }) => ({
                        type: 'svg',
                        ...{src, size, weight},
                    })),
                }

                confetti.current = ConfettiGenerator(settings);
                if (confetti.current) confetti.current.render();
            }

            // start fade out after 1 second
            if (fadeOut !== false && fadeOut > 0) {
                timer1 = setTimeout(() => {
                    if (canvasRef && canvasRef.current) {
                        canvasRef.current.style.opacity = '0';
                    }
                    clearInterval(timer1);
                }, duration - fadeOut);
            }

            // stop animation after 1.5 seconds
            timer2 = setTimeout(() => {
                if (confetti.current) confetti.current.clear();
                onAnimationCompleted && onAnimationCompleted();
                clearInterval(timer2);
            }, duration);
        }
    }, [runAnimation, previousRunAnimation, onAnimationCompleted, duration, fadeOut, images, speed, rotate, particleCount]);

    return (
        <canvas
            id="confetti-canvas"
            ref={node => canvasRef.current = node}
            style={{
                display: runAnimation ? 'block' : 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 1,
                zIndex: 2000,
                transition: 'opacity ' + (fadeOut ?? 0) + 'ms',
            }}
        />
    )
}