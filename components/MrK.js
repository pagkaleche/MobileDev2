import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const MrK = (props) => {
    const { body, size, color } = props;

    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <Image
            source={require('../assets/MrK.png')}
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
    const MrK1 = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: false,
            label: "MrK",
            friction: 0,
            restitution: 0,
            render: {
                MrK: {
                    xScale: size.width/100,
                    yScale: size.height/100
                }
            }
        }
    );
    Matter.World.add(world, MrK1);
    return {
        body: MrK1,
        color,
        pos,
        size,
        renderer: <MrK body={MrK1} color={color} size={size} />
    };
};