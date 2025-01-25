import Matter from "matter-js";
import entities from "./entities";

const maxDeltaTime = 16

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let delta = time.delta;
    let fixedDelta = Math.min(delta, maxDeltaTime);

    engine.world.gravity.y = 0.1;
    engine.timing.timeScale = 1;

    // Matter.Events.on(engine, "collisionStart", (event) => {
    //     let pairs = event.pairs;
    //     let objA = pairs[0].bodyA.label;
    //     let objB = pairs[0].bodyB.label;

    //     if (objA === "Box" && objB === "BottomWall") {
    //         // Matter.Body.setVelocity(entities.Box.body, { x: 1, y: 0 });
    //         if (entities.Box.body.velocity.y < 1) {
    //             Matter.Body.setVelocity(entities.Box.body, { x: 1, y: 0 });
    //         }
    //     }
    // });

    const spriteItem = entities.Box1;
    touches.filter(t => t.type === "press").forEach(t => {
        const touchEvent = t.event;
        const firstTouch = touchEvent.changedTouches?.[0]; 
    
        if (firstTouch) {
            const touchX = firstTouch.pageX;
            const touchY = firstTouch.pageY;
    
            // console.log("Touch coordinates:", touchX, touchY);
    
            const spriteItem = entities.Box1;
    
            if (
                touchX >= spriteItem.body.position.x - (spriteItem.body.bounds.max.x - spriteItem.body.bounds.min.x) / 2 &&
                touchX <= spriteItem.body.position.x + (spriteItem.body.bounds.max.x - spriteItem.body.bounds.min.x) / 2 &&
                touchY >= spriteItem.body.position.y - (spriteItem.body.bounds.max.y - spriteItem.body.bounds.min.y) / 2 &&
                touchY <= spriteItem.body.position.y + (spriteItem.body.bounds.max.y - spriteItem.body.bounds.min.y) / 2
            ) {
                engine.world.gravity.y = -3;
                // console.log("Gravity updated:", engine.world.gravity.y);
                // console.log("Entity mass:", spriteItem.body.mass);
                Matter.Body.setVelocity(spriteItem.body, {
                    x: 0, 
                    y: 0,
                  });
                Matter.Body.applyForce(spriteItem.body, spriteItem.body.position, {
                    x: 0,
                    y: -0.3,
                });
            }
        } else {
            console.error("No touch data found in changedTouches.");
        }
    });
    
    Matter.Engine.update(engine, fixedDelta);

    return entities;
};

export default Physics;