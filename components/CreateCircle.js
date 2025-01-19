import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const CircleRenderer = (props) => {
    const { body, color } = props;
    const radius = body.circleRadius;

    const x = body.position.x - radius;
    const y = body.position.y - radius;

    console.log("CircleRenderer", x, y, radius, color);
    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                backgroundColor: color || "black",
            }}
        />
    );
};

export default (world, color, pos, size) => {
    const CircleBody = Matter.Bodies.circle(pos.x, pos.y, size.radius, {
        restitution: 1,
        frictionAir: 0,
        friction: 0,
        label: "newCircle",
    });

    Matter.World.add(world, CircleBody);

    return {
        body: CircleBody,
        color,
        pos,
        size,
        renderer: <CircleRenderer body={CircleBody} color={color} size={size} />,
    };
}
