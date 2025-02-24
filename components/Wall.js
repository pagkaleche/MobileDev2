import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Wall = (props) => {
    const {body , size} = props;

    const width = size.width;
    const height = size.height;
    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

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

export default (world, color, pos, size, label) => {
    const wall = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        { isStatic: true,
          label: label || "Wall"  
         }
    );
    Matter.World.add(world, wall);
    return {
        body: wall,
        color,
        pos,
        size,
        renderer: <Wall/>,
    };
};