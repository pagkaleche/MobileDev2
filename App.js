import { registerRootComponent } from "expo";
import { GameEngine } from "react-native-game-engine";
import { View, StyleSheet, Text, Button } from "react-native";
import entities from "./entities";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Physics from "./Physics";

registerRootComponent(App);

export default function App() {
  const [gameEntities, setGameEntities] = useState(entities());
  const [gameOver, setGameOver] = useState(false);
  const gameEngineRef = useRef(null);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  const restartGame = () => {
    setGameOver(false);
    gameEngineRef.current.dispatch({ type: "game_restart" });
  };

  const handleEvent = useCallback((e) => {
    if (e.type === "game_over") {
      setGameOver(true);
    } else if (e.type === "game_start") {
    }
  }, []);

  return (
    <View style={styles.container}>
      <GameEngine
        ref={gameEngineRef}
        systems={[Physics]}
        entities={gameEntities}
        running={!gameOver}
        onEvent={handleEvent}
        setGameOver={setGameOver}
      >
        <StatusBar style="auto" />
      </GameEngine>
      {gameOver && (
        <View style={styles.overlay}>
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Roasted Cat!</Text>
            <Button title="Restart" onPress={restartGame} />
          </View>
        </View>
      )}
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
  gameOverText: {
    fontSize: 52,
    color: "#fff",
    marginBottom: 20,
  },
});