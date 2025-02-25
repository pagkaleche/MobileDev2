import { registerRootComponent } from "expo";
import { GameEngine } from "react-native-game-engine";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import entities from "./entities";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Physics from "./Physics";

registerRootComponent(App);

export default function App() {
  const [gameEntities, setGameEntities] = useState(entities());
  const [gameStarted, setGameStarted] = useState(true);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (score >= 100) {
      setLevelCompleted(true);
    }
  }, [score]);

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]}
        entities={gameEntities}
        running={true}
        onEvent={(e) => {
          if (e.type === "score") {
            setScore(score + 50);
          }
        }}
      >
        <StatusBar style="auto" />
      </GameEngine>
      <Text style={styles.levelCompleted}>
        {levelCompleted && "Great! Game Completed!"}
      </Text>
      <Text style={styles.scoreText}>
        Score: {score}
      </Text>
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
  startButton: {
    position: "absolute",
    top: 250,
    left: 100,
    right: 100,
    height: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    position: "absolute",
    top: 20,
    left: 140,
    fontSize: 40
  },
  levelCompleted: {
    position: "absolute", 
    top: 110, 
    left: 130, 
    fontSize: 30
  }
});