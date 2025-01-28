import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const TopWall = (props) => {
    const {body} = props;
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
            }}
        />
    );
};

export default (world, color, pos, size) => {
    const wall = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        { isStatic: true,
          label: "TopWall"  
         }
    );
    Matter.World.add(world, wall);
    return {
        body: wall,
        color,
        pos,
        size,
        renderer: <TopWall color={color}/>,
    };
};