import Matter from "matter-js";
import entities from "./entities";

const maxDeltaTime = 16

const Physics = (entities, { time }) => { 
    let engine = entities.physics.engine;
    let delta = time.delta;
    let fixedDelta = Math.min(delta, maxDeltaTime);

    engine.world.gravity.y = 2;
    engine.timing.timeScale = 1;
    
    Matter.Engine.update(engine, fixedDelta);

    Matter.Events.on(engine, "collisionStart", (event) => {
        let pairs = event.pairs;
        let objA = pairs[0].bodyA.label;
        let objB = pairs[0].bodyB.label;

        if (objA === "Box" && objB === "BottomWall") {
            // Matter.Body.setVelocity(entities.Box.body, { x: 1, y: 0 });
            if (entities.Box.body.velocity.y < 1) {
                Matter.Body.setVelocity(entities.Box.body, { x: 1, y: 0 });
            }
        }
    });

    

    return entities;
};

export default Physics;