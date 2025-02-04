import Matter from "matter-js";
import BottomWall from "../components/BottomWall";
import LeftWall from "../components/LeftWall";
import RightWall from "../components/RightWall";
import Constants from "../constants";
import TopWall from "../components/TopWall";
import Square from "../components/Square";
import Button from "../components/Button";
import Name from "../components/Name";

export default (testWorld) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    const MyName = Name(world, "black", { x: Constants.WINDOW_WIDTH / 2 - 50, y: Constants.WINDOW_HEIGHT - 20 }, { width: 100, height: 100, fontSize: 30 });

    const Top = TopWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: 0 }, { width: Constants.WINDOW_WIDTH, height: 20, label: "TopWall" });
    const Middle = TopWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 + 80 }, { width: Constants.WINDOW_WIDTH, height: 10, label: "MiddleWall" });
    const Bottom = BottomWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT - 10 }, { width: Constants.WINDOW_WIDTH, height: 20, label: "BottomWall" });
    const Left = LeftWall(world, "orange", { x: 0, y: Constants.WINDOW_HEIGHT / 2 }, { width: 20, height: Constants.WINDOW_HEIGHT + 90, label: "LeftWall" });
    const Right = RightWall(world, "orange", { x: Constants.WINDOW_WIDTH - 15, y: Constants.WINDOW_HEIGHT / 2 }, { width: 20, height: Constants.WINDOW_HEIGHT + 90, label: "RightWall" });
    const Square1 = Square(world, "green", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT / 2 - 300 }, { width: 30, height: 30 }, { isStatic: true, label: "enemy" });
    const Square2 = Square(world, "blue", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 - 200 }, { width: 15, height: 15 }, { isStatic: false, label: "player" });
    const ButtonUp = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - 300 }, { width: 80, height: 50 }, "up", () => moveObject("up"));
    const ButtonDown = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - 150 }, { width: 80, height: 50 }, "down", () => moveObject("down"));
    const ButtonLeft = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT - 225 }, { width: 80, height: 50 }, "left", () => moveObject("left"));
    const ButtonRight = Button(world, "grey", { x: Constants.WINDOW_WIDTH / 2 + 100, y: Constants.WINDOW_HEIGHT - 225 }, { width: 80, height: 50 }, "right", () => moveObject("right"));

    const speed = 0.5;

    const moveObject = (direction) => {
        if (!Square1 || !Square1.body) return;
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
            default:
                return;
        }
        Matter.Body.setVelocity(Square2.body, velocity);
    };

    return {
        physics: { engine, world },
        TopWall: Top,
        BottomWall: Bottom,
        LeftWall: Left,
        RightWall: Right,
        Middle: Middle,
        Enemy: Square1,
        Player: Square2,
        ButtonUp: ButtonUp,
        ButtonDown: ButtonDown,
        ButtonLeft: ButtonLeft,
        ButtonRight: ButtonRight,
        Name: MyName,
    };
};
