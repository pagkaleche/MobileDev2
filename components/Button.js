import Matter from "matter-js";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const iconMap = {
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-back",
    right: "arrow-forward",
};

const Button = (props) => {
    const { body, size, color, label, onPress } = props;

    const x = body.position.x - size.width / 2;
    const y = body.position.y - size.height / 2;

    return (
        <TouchableOpacity
            style={[styles.button, { left: x, top: y, width: size.width, height: size.height, backgroundColor: color || "pink" }]}
            onPress={onPress}
        >
            {/* <Ionicons name={iconMap[label]} size={30} color="white" /> */}
            <Text style={styles.text}>{label}</Text>
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
    const buttonBody = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            isStatic: true,
            label: label,
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
