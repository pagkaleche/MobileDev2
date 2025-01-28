import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const Sprite = (props) => {
    const { body, size, color } = props;

    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <Image
            source={require('../assets/cucumber.png')}
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
    const Sprite1 = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: false,
            label: "Sprite1",
            friction: 0,
            frictionAir: 0,
            restitution: 0.8,
            render: {
                sprite: {
                    texture: '../assets/cucumber.png',
                    xScale: size.width/100,
                    yScale: size.height/100
                }
            }
        }
    );
    Matter.World.add(world, Sprite1);
    return {
        body: Sprite1,
        color,
        pos,
        size,
        renderer: <Sprite body={Sprite1} color={color} size={size} />
    };

};