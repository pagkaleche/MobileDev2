import { registerRootComponent } from "expo";
import { GameEngine } from "react-native-game-engine";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import entities from "./entities";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Physics from "./Physics";

registerRootComponent(App);

export default function App() {
  const [gameEntities, setGameEntities] = useState(entities());
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameEvent, setGameEvent] = useState(null);
  const gameEngineRef = useRef(null);


  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  const startGame = () => {
    setGameRunning(true);
    gameEngineRef.current.dispatch({ type: "game_start" });
  };

  const restartGame = () => {
    setGameOver(false);
    setGameRunning(true);
    gameEngineRef.current.dispatch({ type: "game_restart" });
  };

  const handleEvent = useCallback((e) => {
    if (e.type === "game_over") {
      setGameOver(true);
      setGameRunning(false);
    } else if (e.type === "game_start") {
      setGameOver(false);
      setGameRunning(true);
    }

    setGameEntities((prevEntities) => ({
      ...prevEntities,
      Player: {
        ...prevEntities.Player,
        events: e,
      },
    }));
  }, []);

  return (
    <View style={styles.container}>
      <GameEngine
        ref={gameEngineRef}
        systems={[Physics]}
        entities={gameEntities}
        running={gameRunning}
        onEvent={handleEvent}
        setGameOver={setGameOver}
      >
        <StatusBar style="auto" />
      </GameEngine>
      {!gameRunning && !gameOver && (
        <TouchableOpacity style={styles.startGame} onPress={startGame}>
          <Text style={styles.startGameText}>Start Game</Text>
        </TouchableOpacity>
      )}
      {gameOver && (
        <>
          <Text style={styles.gameOverText}>Roasted Cat!</Text>
          <TouchableOpacity style={styles.gameOver} onPress={restartGame}>
            <Text style={styles.restartText}>Restart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    padding: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  gameOver: {
    position: "absolute",
    top: "50%",
    left: "55%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "rgb(117, 44, 44)",
    padding: 10,
    borderRadius: 10,
  },
  gameOverText: {
    fontSize: 52,
    fontWeight: "bold",
    position: "absolute",
    top: "35%",
    left: "25%",
    color: "orange",
    marginBottom: 20,
  },
  restartText: {
    color: "rgb(255, 255, 255)",
    fontSize: 30,
  },
  startGame: {
    fontSize: 52,
    position: "absolute",
    top: "50%",
    left: "40%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "orange",
    padding: 20,
    borderRadius: 10,
  },
  startGameText: {
    color: "#fff",
    fontSize: 40,
  },
  button: {
    backgroundColor: "blue",
    padding: 40,
  },
});