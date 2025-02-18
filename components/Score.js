import Matter from "matter-js";
import { Text } from 'react-native';

const Score = (props) => {
    const { body, size, color, score } = props;
    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <Text
            style={{
                position: "absolute",
                left: x,
                top: y,
                fontSize: size.fontSize,
                color: color || "White",
                fontWeight: "bold",
            }}
        >
          {score}
        </Text>
    );
};

export default (world, color, pos, size, label, score) => {
    const myScore = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            label: label || "Score",
            collisionFilter: {
                mask: 0x0000,
            }
        }
    );
    Matter.World.add(world, myScore);

    return { body: myScore, size, color, renderer: <Score score={score} size={size} color={color} /> };
}
