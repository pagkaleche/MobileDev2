import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Circle = (props) => {
    const { body, color } = props;
    const radius = body.circleRadius; 
    const x = body.position.x - radius; 
    const y = body.position.y - radius; 

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: radius * 2,  
                height: radius * 2,
                borderRadius: radius,  
                backgroundColor: color || "pink",
            }}
        />
    );
};

export default (world, color, pos, size) => {
    const Circle1 = Matter.Bodies.circle(pos.x, pos.y, size.radius, {
        restitution: 0.7,
        frictionAir: 0,
        friction: 0.1,
        label: "Circle",
        isStatic: false,
    });

    Matter.World.add(world, Circle1);

    return {
        body: Circle1,
        color,
        pos,
        size,
        renderer: <Circle body={Circle1} color={color} size={size}/>,
    };
};
