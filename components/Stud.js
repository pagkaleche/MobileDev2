import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Stud = (props) => {
    const { body } = props;
    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;

    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: props.color,
                // display: "none",
            }}
        />
    );
};

export default (world, color, pos, size) => {
    const stud = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            restitution: 1,
            friction: 0,
            label: "Stud"
        }
    );
    Matter.World.add(world, stud);
    return {
        body: stud,
        color,
        pos,
        size,
        renderer: <Stud />,
    };
};