import Matter from "matter-js";
import React from "react";
import { Image as ExpoImage } from "expo-image";

const GameBackground = (props) => {
    const { body, size } = props;
    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;
    
    return (
        <ExpoImage
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size.width,
                height: size.height,
            }}
            source={require('../assets/background.png')}
        />
    );
};

export default (world, color, pos, size) => {

    const wall = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            friction: 0.5,
            label: "GameBackground",
            collisionFilter: {
                mask: 0x0000,
            }
        }
    );
    Matter.World.add(world, wall);
    return {
        body: wall,
        color,
        pos,
        size,
        renderer: <GameBackground body={wall} size={size} />,
    };
};