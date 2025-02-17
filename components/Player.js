import Matter from "matter-js";
import React, { useState, useEffect, useRef } from "react";
import { Image as ExpoImage } from "expo-image";

const WALK_LEFT = [
    require("../assets/cat_ani/left/1.png"),
    require("../assets/cat_ani/left/2.png"),
    require("../assets/cat_ani/left/3.png"),
    require("../assets/cat_ani/left/4.png"),
];

const WALK_RIGHT = [
    require("../assets/cat_ani/right/1.png"),
    require("../assets/cat_ani/right/2.png"),
    require("../assets/cat_ani/right/3.png"),
    require("../assets/cat_ani/right/4.png"),
];

const CreatePlayer = (props) => {
    const { body, size } = props;
    const [frameIndex, setFrameIndex] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [direction, setDirection] = useState("right");

    const prevXRef = useRef(body.position.x);
    const lastUpdateRef = useRef(Date.now());

    useEffect(() => {
        let frameTimer;
        const frameDelay = 1000;

        const updateFrame = () => {
            const deltaX = body.position.x - prevXRef.current;
            const now = Date.now();

            if (Math.abs(deltaX) > 1) {
                setIsMoving(true);
                setDirection(deltaX > 0 ? "right" : "left");

                if (now - lastUpdateRef.current >= frameDelay) {
                    setFrameIndex((prev) => (prev + 1) % (deltaX > 0 ? WALK_RIGHT.length : WALK_LEFT.length));
                    lastUpdateRef.current = now;
                }
            } else {
                setIsMoving(false);
            }

            prevXRef.current = body.position.x;
            frameTimer = requestAnimationFrame(updateFrame);
        };

        frameTimer = requestAnimationFrame(updateFrame);

        return () => cancelAnimationFrame(frameTimer);
    }, [body.position.x]);


    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    const selectedFrames = direction === "right" ? WALK_RIGHT : WALK_LEFT;

    return (
        <ExpoImage
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size.width,
                height: size.height,
                contentFit: "cover",
            }}
            source={isMoving ? selectedFrames[frameIndex] : selectedFrames[0]}
        />
    );
};

export default (world, pos, size, options = {}) => {
    const playerCategory = 0x0001;

    const Square1 = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: options.isStatic || false,
            friction: 0,
            restitution: 0,
            label: options.label || "Player",
            render: {
                visible: true,
                fillStyle: "transparent",
                strokeStyle: "#FF0000",
                lineWidth: 2,
            },
            collisionFilter: {
                category: playerCategory,
                mask: 0x0002 | 0x0003,
            },
        }
    );

    Matter.World.add(world, Square1);

    let score = 0;

    const updateScore = (points) => {
        score += points;
    };

    return {
        body: Square1,
        pos,
        size,
        score,
        updateScore,
        renderer: <CreatePlayer body={Square1} size={size} />,
    };
};

