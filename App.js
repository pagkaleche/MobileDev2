import { registerRootComponent } from "expo";
import { GameEngine } from "react-native-game-engine";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import entities from "./entities";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Physics from "./Physics";

registerRootComponent(App);

export default function App() {
  const [gameEntities, setGameEntities] = useState(entities());

  const handleTouch = () => {
    const newCircle = gameEntities.addCircle();

    setGameEntities((prevEntities) => {
      const updatedEntities = {
        ...prevEntities,
        [`Circle_${Date.now()}`]: newCircle,
      };
      console.log(updatedEntities);
      return updatedEntities;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={handleTouch}>
        <GameEngine
          systems={[Physics]}
          entities={gameEntities}
        >
          <StatusBar style="auto" />
        </GameEngine>
      </TouchableOpacity>
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 8,
  },
});