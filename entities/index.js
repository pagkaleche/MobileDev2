import Matter from "matter-js";
import BottomWall from "../components/BottomWall";
import LeftWall from "../components/LeftWall";
import RightWall from "../components/RightWall";
import Circle from "../components/Circle";
import Constants from "../constants";
import Box from "../components/Box";
import TopWall from "../components/TopWall";
import Sprite from "../components/Sprite";
import Square from "../components/Square";
import Button from "../components/Button";

export default (testWorld) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    const initialPosition = { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 };

    const Top = TopWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: 0 }, { width: Constants.WINDOW_WIDTH, height: 20, label: "top" });
    const Middle = TopWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 + 80 }, { width: Constants.WINDOW_WIDTH, height: 10, label: "middle" });
    const Bottom = BottomWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT - 10 }, { width: Constants.WINDOW_WIDTH, height: 20, label: "bottom" });
    const Left = LeftWall(world, "orange", { x: 0, y: Constants.WINDOW_HEIGHT / 2 }, { width: 20, height: Constants.WINDOW_HEIGHT + 90, label: "LeftWall" });
    const Right = RightWall(world, "orange", { x: Constants.WINDOW_WIDTH - 15, y: Constants.WINDOW_HEIGHT / 2 }, { width: 20, height: Constants.WINDOW_HEIGHT + 90, label: "right" });
    // const Circle1 = Circle(world, "pink", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT / 2 - 300 }, { radius: 15 });
    // const Butt = Box(world, "green", initialPosition, { width: 50, height: 50 });
    const Square1 = Square(world, "green", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT / 2 - 300 }, { width: 30, height: 30 }, { isStatic: true, label: "enemy" });
    const Square2 = Square(world, "blue", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 - 200 }, { width: 15, height: 15 }, { isStatic: false, label: "player" });
    // const Sprite1 = Sprite(world, "green", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT / 2 - 300 }, { width: 50, height: 50 });

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
    };
};
