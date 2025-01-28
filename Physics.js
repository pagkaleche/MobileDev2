import Matter from "matter-js";

const maxDeltaTime = 16

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let delta = time.delta;
    let fixedDelta = Math.min(delta, maxDeltaTime);

    engine.world.gravity.y = 0;
    engine.timing.timeScale = 1;

    Matter.Events.on(engine, "collisionStart", (event) => {
        let pairs = event.pairs;
        let objA = pairs[0].bodyA;
        let objB = pairs[0].bodyB;

        const applyVelocityOnCollision = (wallLabel, circle, velocity) => {
            if ((objA.label === "Circle" && objB.label === wallLabel) ||
                (objB.label === "Circle" && objA.label === wallLabel)) {
                let circleBody = objA.label === "Circle" ? objA : objB;
                Matter.Body.setVelocity(circleBody, velocity);
            }
        };

        applyVelocityOnCollision("BottomWall", objA, { x: 15, y: 0 });
        applyVelocityOnCollision("RightWall", objA, { x: 0, y: -15 });
        applyVelocityOnCollision("TopWall", objA, { x: -15, y: 0 });

    });

    const circle = entities.Circle;

    touches.filter(t => t.type === "press").forEach(t => {
        Matter.Body.setVelocity(circle.body, { x: 0, y: 15 });
    });

    Matter.Engine.update(engine, fixedDelta);

    return entities;
};

export default Physics;