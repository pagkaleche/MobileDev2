import { registerRootComponent } from "expo";
import { GameEngine } from "react-native-game-engine";
import { View, StyleSheet } from "react-native";
import entities from "./entities";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Physics from "./Physics";

registerRootComponent(App);

export default function App() {
  const [gameEntities, setGameEntities] = useState(entities());

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]}
        entities={gameEntities}
        running={true}
      >
        <StatusBar style="auto" />
      </GameEngine>
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