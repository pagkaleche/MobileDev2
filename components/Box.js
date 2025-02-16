import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const Box = (props) => {
    const { body, size, color } = props;
    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <Image
            source={require('../assets/butt.png')}
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
    const Box1 = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: false,
            label: "Box1",
            friction: 0,
            frictionAir: 0,
            restitution: 0.8,
            render: {
                sprite: {
                    texture: '../assets/butt.png',
                    xScale: size.width/100,
                    yScale: size.height/100
                }
            }
        }
    );
    Matter.World.add(world, Box1);
    return {
        body: Box1,
        color,
        pos,
        size,
        renderer: <Box body={Box1} color={color} size={size} />
    };

};