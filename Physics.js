import Matter from "matter-js";

const maxDeltaTime = 16
let hasScored = false;

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Physics = (entities, { time, dispatch }) => {
    let engine = entities.physics.engine;
    let delta = time.delta;
    let fixedDelta = Math.min(delta, maxDeltaTime);

    engine.world.gravity.y = 0;
    engine.timing.timeScale = 1;

    if (entities.Enemy2 && entities.Enemy2.body) {
        Matter.Body.setVelocity(entities.Enemy2.body, { x: 0, y: 0.1 });
    }

    Matter.Events.on(engine, "collisionStart", (event) => {
        let pairs = event.pairs;
        let objA = pairs[0].bodyA;
        let objB = pairs[0].bodyB;

        event.pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === "player" && bodyB.label === "enemy1") ||
                (bodyA.label === "enemy1" && bodyB.label === "player")
            ) {
                if (entities["Player"]) {
                    entities["Player"].color = getRandomColor();
                    dispatch({ type: "score" });
                    hasScored = true;
                }

                const enemy1 = bodyA.label === "enemy1" ? bodyA : bodyB;
                const player = bodyA.label === "player" ? bodyA : bodyB;
                Matter.Body.setPosition(enemy1, {
                    x: Math.random() * 300 + 50,
                    y: Math.random() * 500 + 50,
                });

                Matter.Body.setVelocity(player, { x: 0, y: 0 });
                Matter.Body.setVelocity(enemy1, { x: 0, y: 0 });
            }
        });

        event.pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === "enemy2" && bodyB.label === "MiddleWall") ||
                (bodyA.label === "MiddleWall" && bodyB.label === "enemy2")
            ) {
                dispatch({ type: "gameOver" });
            }
        });

        event.pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === "player" && bodyB.label === "enemy2") ||
                (bodyA.label === "enemy2" && bodyB.label === "player")
            ) {
                Matter.Body.setVelocity(entities.Enemy2.body, { x: 0, y: 0 });
                velocityApplied = false;
            } 
        });

        const changeColor = (enemy) => {
            if ((objA.label === "player" && objB.label === enemy) ||
                (objB.label === "player" && objA.label === enemy)) {
                let player = objA.label === "player" ? objA : objB;

                if (entities["Enemy2"]) {
                    entities["Enemy2"].color = getRandomColor();
                }

                Matter.Body.setVelocity(player, { x: 0, y: 0 });
            }
        };
        changeColor("enemy2");
    });

    Matter.Events.on(engine, "collisionEnd", (event) => {
        event.pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === "player" && bodyB.label === "enemy2") ||
                (bodyA.label === "enemy2" && bodyB.label === "player")
            ) {
                Matter.Body.setVelocity(entities.Enemy2.body, { x: 0, y: 0.1 });
                velocityApplied = true;
            } 
        });
    });

    Matter.Engine.update(engine, fixedDelta);
    return entities;
};

export default Physics;