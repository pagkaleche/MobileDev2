import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const IceBlockRenderer = (props) => {
    const { body, size, color } = props;
    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <View
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size.width,
                height: size.height,
                backgroundColor: color || "cyan",
            }}
        />
    );
};

const CreateIceBlock = (world, color, pos, size, label) => {
    const iceBlockCategory = 0x0002;

    const block = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            label: label || "IceBlock",
            friction: 0.2,
            restitution: 0,
            collisionFilter: {
                category: iceBlockCategory,
                mask: 0x0001,
            }
        }
    );

    Matter.World.add(world, block);

    return {
        body: block,
        color: color,
        size: size,
        renderer: <IceBlockRenderer body={block} size={size} color={color} />,
    };
};

export default CreateIceBlock;
