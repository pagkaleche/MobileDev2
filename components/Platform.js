import Matter from "matter-js";
import React from "react";
import { Image } from "react-native";

const Platform = (props) => {
    const { body, size } = props;
    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;
    
    return (
        <Image
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size.width,
                height: size.height,
            }}
            source={require('../assets/platform.png')}
        />
    );
};

export default (world, pos, size, label) => {
    const PlatformCategory = 0x0003;

    const wood = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            friction: 0.1,
            restitution: 0,
            label: label || "Platform",
            collisionFilter: {
                category: PlatformCategory,
                mask: 0x0001,
            }
        }
    );
    Matter.World.add(world, wood);
    return {
        body: wood,
        pos,
        size,
        renderer: <Platform body={wood} size={size} />,
    };
};