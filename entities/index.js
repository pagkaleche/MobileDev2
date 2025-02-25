import Matter from "matter-js";
import Wall from "../components/Wall";
import Constants from "../constants";
import Square from "../components/Square";
import Button from "../components/Button";
import Name from "../components/Name";

export default (testWorld) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    const MyName = Name(world, "black", { x: Constants.WINDOW_WIDTH / 2 - 70, y: Constants.WINDOW_HEIGHT - 20 }, { width: 100, height: 100, fontSize: 20 });

    const Top = Wall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: 0 }, { width: Constants.WINDOW_WIDTH, height: 20 }, "TopWall");
    const Middle = Wall(world, "orange", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 + 80 }, { width: Constants.WINDOW_WIDTH, height: 10},"MiddleWall" );
    const Bottom = Wall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT - 10 }, { width: Constants.WINDOW_WIDTH, height: 20 }, "BottomWall");
    const Left = Wall(world, "orange", { x: 0, y: Constants.WINDOW_HEIGHT / 2 }, { width: 20, height: Constants.WINDOW_HEIGHT + 90 }, "LeftWall");
    const Right = Wall(world, "orange", { x: Constants.WINDOW_WIDTH - 15, y: Constants.WINDOW_HEIGHT / 2 }, { width: 20, height: Constants.WINDOW_HEIGHT + 90 }, "RightWall");
    const Enemy1 = Square(world, "green", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT / 2 - 300 }, { width: 30, height: 30 }, { isStatic: true, label: "enemy1" });
    // const Player = Square(world, "blue", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 - 200 }, { width: 15, height: 15 }, { isStatic: false, label: "player" });
    // const Enemy2 = Square(world, "black", { x: Constants.WINDOW_WIDTH / 2 + 100, y: Constants.WINDOW_HEIGHT / 2 - 300 }, { width: 40, height: 80 }, { isStatic: false, label: "enemy2" });
    // const ButtonUp = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - 300 }, { width: 80, height: 50 }, "up", () => moveObject("up"));
    // const ButtonDown = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - 225 }, { width: 80, height: 50 }, "down", () => moveObject("down"));
    // const ButtonLeft = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT - 225 }, { width: 80, height: 50 }, "left", () => moveObject("left"));
    // const ButtonRight = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2 + 100, y: Constants.WINDOW_HEIGHT - 225 }, { width: 80, height: 50 }, "right", () => moveObject("right"));
    // const Stop = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - 150 }, { width: 80, height: 50 }, "stop", () => moveObject("Stop"));

    const speed = 1;

    const moveObject = (direction) => {
        if (!Player || !Player.body) return;
        let velocity = { x: 0, y: 0 };

        switch (direction) {
            case "up":
                velocity.y = -speed;
                break;
            case "down":
                velocity.y = speed;
                break;
            case "left":
                velocity.x = -speed;
                break;
            case "right":
                velocity.x = speed;
                break;
            case "Stop":
                velocity = { x: 0, y: 0 };
                break;
            default:
                return;
        }
        Matter.Body.setVelocity(Player.body, velocity);
    };

    return {
        physics: { engine, world },
        TopWall: Top,
        BottomWall: Bottom,
        LeftWall: Left,
        RightWall: Right,
        Middle: Middle,
        Enemy1: Enemy1,
        // Enemy2: Enemy2,
        Player: Player,
        // ButtonUp: ButtonUp,
        // ButtonDown: ButtonDown,
        // ButtonLeft: ButtonLeft,
        // ButtonRight: ButtonRight,
        // Stop: Stop,
        Name: MyName,
    };
};
