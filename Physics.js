import Matter from "matter-js";

const maxDeltaTime = 16
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let delta = time.delta;
    let fixedDelta = Math.min(delta, maxDeltaTime);

    engine.world.gravity.y = 0;
    engine.timing.timeScale = 1;

    Matter.Events.on(engine, "collisionStart", (event) => {
        event.pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === "player" && bodyB.label === "enemy") ||
                (bodyA.label === "enemy" && bodyB.label === "player") ||
                (bodyA.label === "player" && bodyB.label === "LeftWall")
            ) {

                if (entities["Player"]) {
                    entities["Player"].color = getRandomColor();
                }

                const enemy = bodyA.label === "enemy" ? bodyA : bodyB;
                const player = bodyA.label === "player" ? bodyA : bodyB;
                Matter.Body.setPosition(enemy, {
                    x: Math.random() * 300 + 50,
                    y: Math.random() * 500 + 50,
                });

                Matter.Body.setVelocity(player, { x: 0, y: 0 });
                Matter.Body.setVelocity(enemy, { x: 0, y: 0 });
            } else if (bodyA.label === "player" && (
                bodyB.body.label === "LeftWall" ||
                bodyB.label === "right" ||
                bodyB.label === "top" ||
                bodyB.label === "middle")) {

                console.log("Player colliding with wall");

                if (entities["Player"]) {
                    entities["Player"].color = getRandomColor();
                }
                Matter.Body.setVelocity(bodyA, { x: 0, y: 0 });
            }
        });
    });

    Matter.Engine.update(engine, fixedDelta);
    return entities;
};

export default Physics;