import { useState } from "react";
import * as React from "react";
import { useConfetti } from "../../src";

export const App = () => {
    const [image, setImage] = useState('water-drop');
    const [size, setSize] = useState('16,32,64');
    const [weight, setWeight] = useState('10,20,10');
    const [duration, setDuration] = useState('3000');
    const [fadeOut, setFadeOut] = useState(true);
    const [fadeOutDuration, setFadeOutDuration] = useState('500');
    const [particleCount, setParticleCount] = useState('50');
    const [speed, setSpeed] = useState('50');
    const [rotate, setRotate] = useState(false);

    const { runAnimation } = useConfetti({
        images: size.split(',').map((size, index) => {
            const weights = weight.split(',');
            return {
                src: '/img/' + image + '.svg',
                size: parseInt(size.trim()) ?? 1,
                weight: parseInt(weights[index]?.trim()) ?? parseInt(weights[0]?.trim()) ?? undefined,
            }
        }),
        duration: parseInt(duration),
        fadeOut: fadeOut ? parseInt(fadeOutDuration) : false,
        particleCount: parseInt(particleCount),
        speed: parseInt(speed),
        rotate,
    });

    const handleRunAnimation = () => {
        runAnimation();
    }

    return (
        <div className="container">
            <div className="form">
                <div className="field">
                    <div>
                        Particle image
                    </div>
                    <div>
                        <select onChange={event => setImage(event.target.value)}>
                            <option value="water-drop">
                                Water drop
                            </option>
                            <option value="snowflake">
                                Snowflake
                            </option>
                            <option value="lightning-bolt">
                                Lightning bolt
                            </option>
                        </select>
                    </div>
                </div>

                <div className="field">
                    <div>
                        Particle size(s)
                    </div>
                    <div>
                        <input type="text" value={size} onChange={event => setSize(event.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <div>
                        Particle weight(s)
                    </div>
                    <div>
                        <input type="text" value={weight} onChange={event => setWeight(event.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <div>
                        Duration (ms)
                    </div>
                    <div>
                        <input type="text" value={duration} onChange={event => setDuration(event.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <div>
                        Fade out
                    </div>
                    <div>
                        <input type="checkbox" checked={fadeOut} onChange={event => setFadeOut(event.target.checked)} />
                    </div>
                </div>

                <div className="field">
                    <div>
                        Fade out duration (ms)
                    </div>
                    <div>
                        <input type="text" value={fadeOutDuration} onChange={event => setFadeOutDuration(event.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <div>
                        Particle count
                    </div>
                    <div>
                        <input type="text" value={particleCount} onChange={event => setParticleCount(event.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <div>
                        Particle speed
                    </div>
                    <div>
                        <input type="text" value={speed} onChange={event => setSpeed(event.target.value)} />
                    </div>
                </div>

                <div className="field">
                    <div>
                        Rotate particles
                    </div>
                    <div>
                        <input type="checkbox" checked={rotate} onChange={event => setRotate(event.target.checked)} />
                    </div>
                </div>

                <button
                    onClick={handleRunAnimation}
                >
                    🎉Run confetti animation!
                </button>
            </div>
        </div>
    );
}
