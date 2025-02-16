import Matter, { Collision } from "matter-js";
import Constants from "./constants";

const maxDeltaTime = 16;

const Physics = (entities, { time, touches }) => {
    let engine = entities.physics.engine;
    let delta = time.delta;
    let fixedDelta = Math.min(delta, maxDeltaTime);

    engine.world.gravity.y = 0.8;
    engine.timing.timeScale = 1;

    let speed = 0;

    Object.keys(entities).forEach((key) => {
        let entity = entities[key];
        let player = entities.Square;

        if (entity?.body && (entity.body.label === "Block1" || entity.body.label === "Block2" || entity.body.label === "Block3" || entity.body.label === "Block4" || entity.body.label === "Block5" || entity.body.label === "Block6")) {
            Matter.Body.setVelocity(entity.body, { x: 0, y: speed });

            if (entity.body.position.y > Constants.WINDOW_HEIGHT - 150) {
                const top = Constants.WINDOW_HEIGHT - 1000;

                const pos1 = Math.floor(Math.random() * (Constants.WINDOW_WIDTH - 350));
                const pos2 = Math.floor(Math.random() * (Constants.WINDOW_WIDTH + 850));

                if (entity.body.label === "Block1") {
                    Matter.Body.setPosition(entity.body, {
                        x: Constants.WINDOW_WIDTH / 2 - 200,
                        y: top,
                    });
                }

                if (entity.body.label === "Block2") {
                    Matter.Body.setPosition(entity.body, {
                        x: Constants.WINDOW_WIDTH,
                        y: top,
                    });
                }

                if (entity.body.label === "Block3") {
                    Matter.Body.setPosition(entity.body, {
                        x: Constants.WINDOW_WIDTH / 2 - 200,
                        y: top,
                    });
                }

                if (entity.body.label === "Block4") {
                    Matter.Body.setPosition(entity.body, {
                        x: Constants.WINDOW_WIDTH / 1.5,
                        y: top,
                    });
                }

                if (entity.body.label === "Block5") {
                    Matter.Body.setPosition(entity.body, {
                        x: Constants.WINDOW_WIDTH,
                        y: top,
                    });
                }

                if (entity.body.label === "Block6") {
                    Matter.Body.setPosition(entity.body, {
                        x: Constants.WINDOW_WIDTH / 2 - 200,
                        y: top,
                    });
                }
            }
        }

        let moveInterval = 5000;
        let movementStarted = false;
        let moveIntervalId = null;

        Object.keys(entities).forEach((key) => {
            let entity = entities[key];

            if (entity && entity.body &&
                (entity.body.label === "Block1" || entity.body.label === "Block2" || entity.body.label === "Block3" || entity.body.label === "Block4" || entity.body.label === "Block5" || entity.body.label === "Block6")) {

                const currentY = entity.body.position.y;
                const targetY = currentY + 0.25;
                if (player.body.position.y < 350) {
                    if (currentY < targetY) {
                        const newY = currentY + 0.25;
                        Matter.Body.setPosition(entity.body, { x: entity.body.position.x, y: newY });
                    }
                }
            }
        });


        if (player.body.position.y < 350 && !movementStarted) {
            movementStarted = true;
            moveBlocksDown();
            if (moveIntervalId) {
                clearInterval(moveIntervalId);
            }
            moveIntervalId = setInterval(moveBlocksDown, moveInterval);
        }

        let increment = 0.15;
        let targetMoveDistance = 0.15;
        function moveBlocksDown() {
            if (!movementStarted) return;
            Object.keys(entities).forEach((key) => {
                let entity = entities[key];
                if (entity && entity.body &&
                    (entity.body.label === "Block1" || entity.body.label === "Block2" || entity.body.label === "Block3" || entity.body.label === "Block4" || entity.body.label === "Block5" || entity.body.label === "Block6")) {

                    const currentY = entity.body.position.y;
                    const targetY = currentY + targetMoveDistance;

                    if (currentY < targetY) {
                        const newY = currentY + increment;
                        Matter.Body.setPosition(entity.body, { x: entity.body.position.x, y: newY });
                    }
                }
            });
        }


    });

    const isTouchInside = (touch, entity) => {
        if (!touch || !entity || !entity.body || !entity.body.bounds) return false;

        const x = touch.event?.pageX;
        const y = touch.event?.pageY;
        const { min, max } = entity.body.bounds;

        return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
    };

    let startTouch = touches.find(t => t.type === "start");
    let endTouch = touches.find(t => t.type === "end");

    let Player = entities.Square;
    let ButtonLeft = Object.values(entities).find(e => e.body?.label === "left");
    let ButtonRight = Object.values(entities).find(e => e.body?.label === "right");

    if (startTouch) {
        if (isTouchInside(startTouch, ButtonLeft)) {
            Matter.Body.setVelocity(Player.body, { x: -5, y: Player.body.velocity.y });
        }

        if (isTouchInside(startTouch, ButtonRight)) {
            Matter.Body.setVelocity(Player.body, { x: 5, y: Player.body.velocity.y });
        }
    }

    if (endTouch) {
        Matter.Body.setVelocity(Player.body, { x: 0, y: Player.body.velocity.y });
    }

    Matter.Events.on(engine, "collisionStart", (event) => {
        const pairs = event.pairs;

        pairs.forEach((pair) => {
            const { bodyA, bodyB } = pair;

            if (bodyA.label === "Player" && bodyB.label === "Block1") {
                isPlayerOnGround(Player);
                Matter.Body.setVelocity(Player.body, { x: 0, y: 0 });
                Player.body.position.y = bodyB.position.y - bodyB.bounds.max.y + Player.body.bounds.min.y;
                Player.body.position.y = Math.max(Player.body.position.y, bodyB.position.y - bodyB.bounds.max.y + Player.body.bounds.min.y);
            }

            if (bodyA.label === "Player" && bodyB.label === "Block2") {
                isPlayerOnGround(Player);
                Matter.Body.setVelocity(Player.body, { x: 0, y: 0 });
                Player.body.position.y = bodyB.position.y - bodyB.bounds.max.y + Player.body.bounds.min.y;
            }

            if (bodyA.label === "Player" && bodyB.label === "Block3") {
                isPlayerOnGround(Player);
                Matter.Body.setVelocity(Player.body, { x: 0, y: 0 });
                Player.body.position.y = bodyB.position.y - bodyB.bounds.max.y + Player.body.bounds.min.y;
            }

            if (bodyA.label === "Player" && bodyB.label === "Block4") {
                isPlayerOnGround(Player);
                Matter.Body.setVelocity(Player.body, { x: 0, y: 0 });
                Player.body.position.y = bodyB.position.y - bodyB.bounds.max.y + Player.body.bounds.min.y;
            }
        });
    });

    Matter.Engine.update(engine, fixedDelta);
    return entities;
};

let currentSpeed = 0;
const maxSpeed = 5;
const acceleration = 1;

const MoveObject = (direction, Player) => {
    if (!Player || !Player.body) {
        return;
    }

    let velocity = { x: Player.body.velocity.x, y: Player.body.velocity.y };
    switch (direction) {
        case "jump":
            console.log(isPlayerOnGround(Player));
            if (!isPlayerOnGround(Player)) return;
            velocity.y = -10.5;
            break;
        case "left":

            currentSpeed = Math.max(currentSpeed - acceleration, -maxSpeed);
            velocity.x = currentSpeed;
            break;
        case "right":

            currentSpeed = Math.min(currentSpeed + acceleration, maxSpeed);
            velocity.x = currentSpeed;
            break;
        default:
            return;
    }

    Matter.Body.setVelocity(Player.body, velocity);
};

const isPlayerOnGround = (Player) => {
    if (!Player || !Player.body) {
        return false;
    }
    const yVelocity = Player.body.velocity.y;
    return Math.abs(yVelocity) < 0.1;
};


export { MoveObject };
export default Physics;
