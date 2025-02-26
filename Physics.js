import Matter from "matter-js";
import Constants from "./constants";

const maxDeltaTime = 16;
let hasScored = false;

const Physics = (entities, { time, touches, dispatch, events }) => {
    let engine = entities.physics.engine;
    let delta = time.delta;
    let fixedDelta = Math.min(delta, maxDeltaTime);

    let player = entities.Player;
    let platform = entities.Platform;
    let myScore = entities.ScoreBoard;
    
    let movementStarted = false;
    engine.world.gravity.y = 1;
    engine.timing.timeScale = 1;

    //reset rigid body position when game restarts
    if (events.some(event => event.type === "game_restart")) {
        myScore.score = 0;
        Matter.Body.setVelocity(player.body, {
            x: 0,
            y: 0,
        });
        Matter.Body.setPosition(player.body, {
            x: Constants.WINDOW_WIDTH / 2,
            y: Constants.WINDOW_HEIGHT / 2 + 210,
        });
        Matter.Body.setPosition(platform.body, {
            x: Constants.WINDOW_WIDTH / 2,
            y: Constants.WINDOW_HEIGHT - 180,
        });

        const blockPositions = {
            Block1: { x: Constants.WINDOW_WIDTH / 2 - 150, y: 550 },
            Block2: { x: Constants.WINDOW_WIDTH / 2 + 150, y: 400 },
            Block3: { x: Constants.WINDOW_WIDTH / 2 - 90, y: 250 },
            Block4: { x: Constants.WINDOW_WIDTH / 2 + 250, y: 150 },
            Block5: { x: Constants.WINDOW_WIDTH / 2 - 250, y: -200 },
            Block6: { x: Constants.WINDOW_WIDTH - 400, y: 50 },
        };

        Object.values(entities).forEach((entity) => {
            if (entity?.body && blockPositions[entity.body.label]) {
                Matter.Body.setPosition(entity.body, blockPositions[entity.body.label]);
            }
        });
    };

    //wrap player around screen
    if (player.body.position.x > Constants.WINDOW_WIDTH) {
        Matter.Body.setPosition(player.body, { x: 0, y: player.body.position.y });
    } else if (player.body.position.x < 0) {
        Matter.Body.setPosition(player.body, { x: Constants.WINDOW_WIDTH, y: player.body.position.y });
    }

    //move all blocks down per instance when player reaches < 350px
    Object.keys(entities).forEach((key) => {
        let entity = entities[key];

        if (entity?.body && (entity.body.label === "Block1" || entity.body.label === "Block2" || entity.body.label === "Block3" || entity.body.label === "Block4" || entity.body.label === "Block5" || entity.body.label === "Block6" || entity.body.label === "Platform")) {
            if (entity.body.position.y > Constants.WINDOW_HEIGHT - 150) {
                const top = Constants.WINDOW_HEIGHT - 1000;
                const getRandomOffset = () => Math.random() * 60 - 30;
                const blockPositions = [
                    Constants.WINDOW_WIDTH / 4,
                    Constants.WINDOW_WIDTH / 1.5,
                    Constants.WINDOW_WIDTH / 2,
                ];
                let randomX = blockPositions[Math.floor(Math.random() * blockPositions.length)];

                if (entity.body.label === "Block1") {
                    Matter.Body.setPosition(entity.body, {
                        x: randomX + getRandomOffset(),
                        y: top,
                    });
                }

                if (entity.body.label === "Block2") {
                    Matter.Body.setPosition(entity.body, {
                        x: randomX + getRandomOffset(),
                        y: top,
                    });
                }

                if (entity.body.label === "Block3") {
                    Matter.Body.setPosition(entity.body, {
                        x: randomX + getRandomOffset(),
                        y: top,
                    });
                }

                if (entity.body.label === "Block4") {
                    Matter.Body.setPosition(entity.body, {
                        x: randomX + getRandomOffset(),
                        y: top,
                    });
                }

                if (entity.body.label === "Block5") {
                    Matter.Body.setPosition(entity.body, {
                        x: randomX + getRandomOffset(),
                        y: top,
                    });
                }

                if (entity.body.label === "Block6") {
                    Matter.Body.setPosition(entity.body, {
                        x: randomX + getRandomOffset(),
                        y: top,
                    });
                }

                if (entity.body.label === "Platform") {
                    Matter.Body.setPosition(entity.body, {
                        x: Constants.WINDOW_WIDTH - 800,
                        y: Constants.WINDOW_HEIGHT,
                    });
                }
            }
        }

        //move blocks down when player reaches < 350px
        let moveInterval = 3000;
        let moveIntervalId = null;

        Object.keys(entities).forEach((key) => {
            let entity = entities[key];

            if (entity && entity.body &&
                (entity.body.label === "Block1" || entity.body.label === "Block2" || entity.body.label === "Block3" || entity.body.label === "Block4" || entity.body.label === "Block5" || entity.body.label === "Block6" || entity.body.label === "Platform")) {

                const currentY = entity.body.position.y;
                const targetY = currentY + 0.25;
                if (player.body.position.y < 350) {
                    hasHitThreshold = true;
                    if (currentY < targetY) {
                        const newY = currentY + 0.25;
                        Matter.Body.setPosition(entity.body, { x: entity.body.position.x, y: newY });
                    }
                }
            }
        });

        //trigger auto move blocks down
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

    //score logic
    if (!hasScored && player.body.position.y < 350 && Math.floor(player.body.velocity.y) === -1) {
        hasScored = true;
        myScore.score += 1;
    };

    if(player.body.position.y > 350 && hasScored) {
        hasScored = false;
    };

    //hold logic
    const isTouchInside = (touch, entity) => {
        if (!touch || !entity || !entity.body || !entity.body.bounds) return false;

        const x = touch.event?.pageX;
        const y = touch.event?.pageY;
        const { min, max } = entity.body.bounds;

        return x >= min.x && x <= max.x && y >= min.y && y <= max.y;
    };

    let startTouch = touches.find(t => t.type === "start");
    let endTouch = touches.find(t => t.type === "end");

    let Player = entities.Player;
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

    //collision detection between player, blocks and fire
    Matter.Events.on(engine, "collisionStart", (event) => {
        event.pairs.forEach(({ bodyA, bodyB }) => {
            if ((bodyA.label === "Player" && bodyB.label === "Block1" || bodyA.label === "Block1" && bodyB.label === "Player")) {

            }

            if ((bodyA.label === "Player" && bodyB.label === "Wall" || bodyA.label === "Wall" && bodyB.label === "Player")) {
                movementStarted = false;
                dispatch({ type: "game_over" });
            }
        });
    });

    Matter.Engine.update(engine, fixedDelta);
    return entities;
};

//player movement
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
            if (!isPlayerOnGround(Player)) return;
            velocity.y = -12;
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

//check if player is on the ground so they can jump
const isPlayerOnGround = (Player) => {
    if (!Player || !Player.body) {
        return false;
    }
    const yVelocity = Player.body.velocity.y;
    return Math.abs(yVelocity) < 0.1;
};

export { MoveObject };
export default Physics;
