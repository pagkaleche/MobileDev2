import Matter from "matter-js";
import { Text } from 'react-native';

const Name = (props) => {
    const { body, size, color } = props;
    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <Text
            style={{
                position: "absolute",
                left: x,
                top: y,
                fontSize: size.fontSize,
                color: color || "BLack",
                fontWeight: "bold",
            }}
        >
           Adrian Landia
        </Text>
    );
};

export default (world, color, pos, size) => {
    const nameCategory = 0x0004;

    const myName = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            label: "Name",
            collisionFilter: {
                category: nameCategory,
                mask: 0x0001,
            }
        }
    );
    Matter.World.add(world, myName);

    return { body: myName, size, color, renderer: Name };
}
