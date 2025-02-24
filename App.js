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
  const [gameStarted, setGameStarted] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (score >= 50) {
      setLevelCompleted(true);
      setGameStarted(false);
    }
  }, [score]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]}
        entities={gameEntities}
        running={gameStarted}
        onEvent={(e) => {
          if (e.type === "gameOver") {
            handleGameOver();
          }
          if (e.type === "score") {
            setScore(score + 10);
          }
        }}
      >
        <StatusBar style="auto" />
      </GameEngine>
      {/* <Text style={styles.scoreText}>
        Score: {score}
      </Text>
      <Text style={styles.levelCompleted}>
        {levelCompleted && "Great! Level 1 completed"}
      </Text>
      {!gameStarted && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={startGame}
        >
          <Text style={{ color: "white", fontSize: 30 }}>Start Game</Text>
        </TouchableOpacity>
      )} */}
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