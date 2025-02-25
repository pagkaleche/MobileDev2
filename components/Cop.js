import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const Cop = (props) => {
    const { body, size, color } = props;

    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <Image
            source={require('../assets/MrCop.png')}
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
    const Cop1 = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: false,
            label: "Cop",
            friction: 0,
            restitution: 0,
            render: {
                Cop: {
                    xScale: size.width/100,
                    yScale: size.height/100
                }
            },
        },
    );
    Matter.World.add(world, Cop1);
    return {
        body: Cop1,
        color,
        pos,
        size,
        renderer: <Cop body={Cop1} color={color} size={size} />
    };
};