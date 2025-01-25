import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const Box = (props) => {
    const { body, size, color } = props;
    // const width = body.bounds.max.x - body.bounds.min.x;
    // const height = body.bounds.max.y - body.bounds.min.y;

    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        // <View
        //     style={{
        //         position: "absolute",
        //         left: x,
        //         top: y,
        //         width: size.width,
        //         height: size.height,
        //         backgroundColor: color || "pink",
        //         // display: "none",
        //     }}
        // />

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