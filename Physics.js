import Matter from "matter-js";

const maxDeltaTime = 16
let hasScored = false;

const Physics = (entities, { time, dispatch, touches }) => {
    let engine = entities.physics.engine;
    let delta = time.delta;
    let fixedDelta = Math.min(delta, maxDeltaTime);

    engine.world.gravity.y = 0;
    engine.timing.timeScale = 1;

    Matter.Events.on(engine, "collisionStart", (event) => {
        let pairs = event.pairs;
        let objA = pairs[0].bodyA;
        let objB = pairs[0].bodyB;

        event.pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === "Cop" && bodyB.label === "MrK") ||
                (bodyA.label === "MrK" && bodyB.label === "Cop")
            ) {
                Matter.Body.setPosition(entities.MrK.body, { x: 110, y: 541 });
                Matter.Body.setVelocity(entities.MrK.body, { x: 0, y: 0 });
                dispatch({ type: "score" });
            }
        });

        event.pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === "Cop" && bodyB.label === "MsB") ||
                (bodyA.label === "MsB" && bodyB.label === "Cop")
            ) {
                Matter.Body.setPosition(entities.MsB.body, { x: 320, y: 535 });
                Matter.Body.setVelocity(entities.MsB.body, { x: 0, y: 0 });
                dispatch({ type: "score" });
            }
        });
    });


    const cop = entities.MrCop;
    touches.filter(t => t.type === "start" || t.type === "move").forEach(t => {
        const touchEvent = t.event;
        const firstTouch = touchEvent.changedTouches?.[0];

        if (firstTouch) {
            const touchX = firstTouch.pageX;
            const touchY = firstTouch.pageY;
            Matter.Body.setPosition(cop.body, { x: touchX, y: touchY });
        } else {
            console.error("No touch data found in changedTouches.");
        }
    });

    Matter.Engine.update(engine, fixedDelta);
    return entities;
};

export default Physics;