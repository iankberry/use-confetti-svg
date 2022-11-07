# use-confetti-svg

> React hook to display a confetti animation with a custom SVG particle image

This hook makes it easy to add a simple confetti animation with custom SVG particles to any page. It is designed with transitions in mind as it supports fading out during the animation. There are several props that allow you to control the speed, duration, and size of the particles. All of these are explored in the [included demo](https://github.com/iankberry/use-confetti-svg/blob/main/example).

The confetti animation in this library is based on the excellent [confetti-js](https://github.com/Agezao/confetti-js) library.

## Installation

```sh
npm install --save use-confetti-svg
```

## Using the demo

1. Checkout this repository

2. Run the below command to start the server on port 3010.

```sh
npm run example
```

[![Edit react-tour-callout](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-tour-callout-uxilky?fontsize=14&hidenavigation=1&theme=dark)

## Reference

### Inputs

This hook accepts the following options:

| Option        | Type                          | Default  | Definition                                                                                                                                                                              |
|---------------|-------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| images        | `ConfettiImage[]`             | REQUIRED | An array of particle images to use for the confetti animation. See below for `ConfettiImage` properties.                                                                                |
| duration      | `number` (ms)                 | 2000     | How long to run the confetti animation for                                                                                                                                              |
| fadeOut       | `number` (ms)  &#124; `false` | 1000     | When to begin fading out the confetti animation. The fade-out will begin at the specified time and complete at the specified `duration` value. Specify `false` to disable the fade-out. |
| particleCount | `number`                      | 50       | Total number of particles to render at one time                                                                                                                                         |
| speed         | `number`                      | 50       | How fast the confetti particles should "fall"                                                                                                                                           |
| rotate        | `boolean`                     | false    | Whether to rotate the particle images while they are falling                                                                                                                            |

#### Confetti image object

| Option | Type     | Default  | Definition                                                                                                                                                                                          |
|--------|----------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| src    | `string` | REQUIRED | Full path to the SVG image                                                                                                                                                                          |
| size   | `number` | 24       | Size of the SVG image in px                                                                                                                                                                         |
| weight | `number` | 1        | Numeric value that controls how often to display this image relative to others. For instance, if there are two images with weights of 50 and 100, the second image will be rendered twice as often. |

### Outputs

This hook returns the following properties:

```
runAnimation: () => Promise<void>
```

#### runAnimation `async function`
This function runs the confetti animation and returns a promise that resolves when the animation completes.

## Example

This is just a simple example that runs the confetti animation with two different particle images. The animation runs for 3 seconds total, with a fade-out beginning at 2 seconds.

```jsx 
import React from "react";
import { runAnimation } from "use-confetti-svg";

export default function App() {
    const [animating, setAnimating] = React.useState(false);

    const { runAnimation } = useConfetti({
        images: [
            {
                src: '/img/snowflake.svg',
                size: 32,
                weight: 5,
            },
            {
                src: '/img/bolt.svg',
                size: 40,
                weight: 3,
            },
        ],
        duration: 3000,
        fadeOut: 2000,
    });
    
    const handleRunAnimation = () => {
        setAnimating(true);
        runAnimation().then(() => {
            setAnimating(false);
        })
    }

    return (
        <div>
            <button
                onClick={handleRunAnimation}
                disabled={animating}
            >
                Run animation
            </button>
        </div>
    );
}
```

## Note

Feel free to submit issues/PR's and I will do my best to respond.

## License

This project is licensed under the terms of the [MIT license](https://github.com/iankberry/use-confetti-svg/blob/main/LICENSE).