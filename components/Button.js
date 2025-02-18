import Matter from "matter-js";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const iconMap = {
    jump: "cat",
    left: "chevron-left-box",
    right: "chevron-right-box",
};

const Button = (props) => {
    const { body, size, color, label, onPress, onPressIn, onPressOut } = props;

    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <TouchableOpacity
            style={[styles.button, { left: x, top: y, width: size.width, height: size.height, backgroundColor: color || "pink", opacity: 0.5 }]}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <MaterialCommunityIcons name={iconMap[label]} size={70} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
});

export default (world, color, pos, size, label, onPress) => {
    const buttonCategory = 0x0004;

    const buttonBody = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            label: label,
            collisionFilter: {
                category: buttonCategory,
                mask: 0x0001,
            }
        }
    );

    Matter.World.add(world, buttonBody);

    return {
        body: buttonBody,
        color,
        size,
        label,
        onPress,
        renderer: <Button body={buttonBody} size={size} color={color} label={label} onPress={onPress} />,
    };
};
