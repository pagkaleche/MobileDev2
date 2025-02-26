import Matter from "matter-js";
import React from "react";
import { Image as ExpoImage } from "expo-image";

const Wall = (props) => {
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
            source={require('../assets/fire2_gif.gif')}
        />
    );
};

export default (world, color, pos, size) => {
    const wallCategory = 0x0003;

    const wall = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            friction: 0.5,
            label: "Wall",
            collisionFilter: {
                category: wallCategory,
                mask: 0x0001,
            }
        }
    );
    Matter.World.add(world, wall);
    return {
        body: wall,
        color,
        pos,
        size,
        renderer: <Wall body={wall} size={size} />,
    };
};