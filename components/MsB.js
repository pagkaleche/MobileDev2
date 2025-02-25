import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const MsB = (props) => {
    const { body, size, color } = props;

    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <Image
            source={require('../assets/MsB.png')}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size.width,
                height: size.height,
            }}
        />
    );
};

export default (world, color, pos, size) => {
    const MsB1 = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: false,
            label: "MsB",
            friction: 0,
            restitution: 0,
            render: {
                MsB: {
                    xScale: size.width/100,
                    yScale: size.height/100
                }
            }
        }
    );
    Matter.World.add(world, MsB1);
    return {
        body: MsB1,
        color,
        pos,
        size,
        renderer: <MsB body={MsB1} color={color} size={size} />
    };
};