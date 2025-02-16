import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Square = (props) => {
    const { body, size, color } = props;
    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size.width,
                height: size.height,
                backgroundColor: color || "pink",
            }}
        />
    );
};

export default (world, color, pos, size, options = {}) => {
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
            label: options.label || "Square1",
            collisionFilter: {
                category: playerCategory,   
                mask: 0x0002 | 0x0003,  
            },
        }
    );
    Matter.World.add(world, Square1);
    return {
        body: Square1,
        color,
        pos,
        size,
        renderer: <Square />
    };
};