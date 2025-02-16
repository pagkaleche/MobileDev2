import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const RightWall = (props) => {
    const {body} = props;
    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y - 100;

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
            }}
        />
    );
};

export default (world, color, pos, size) => {
    const RightWallCategory = 0x0003;

    const wall = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            friction: 0.5,
            label: "RightWall",
            collisionFilter: {
                category: RightWallCategory,
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
        renderer: <RightWall color={color}/>,
    };
};