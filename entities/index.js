import Matter from "matter-js";
import BottomWall from "../components/BottomWall";
import LeftWall from "../components/LeftWall";
import RightWall from "../components/RightWall";
import Circle from "../components/Circle";
import Constants from "../constants";
import Box from "../components/Box";
import TopWall from "../components/TopWall";
import Sprite from "../components/Sprite";

export default (testWorld) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    const initialPosition = { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 };

    const Top = TopWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: 0 }, { width: Constants.WINDOW_WIDTH, height: 50 });
    const Bottom = BottomWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT }, { width: Constants.WINDOW_WIDTH, height: 50 });
    const Left = LeftWall(world, "blue", { x: 0, y: Constants.WINDOW_HEIGHT / 2 }, { width: 25, height: Constants.WINDOW_HEIGHT + 50 });
    const Right = RightWall(world, "blue", { x: Constants.WINDOW_WIDTH - 20, y: Constants.WINDOW_HEIGHT / 2 }, { width: 25, height: Constants.WINDOW_HEIGHT + 50 });
    const Circle1 = Circle(world, "pink", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT / 2 - 300 }, { radius: 15 });
    const Box1 = Box(world, "green", initialPosition, { width: 50, height: 50 });
    // const Sprite1 = Sprite(world, "green", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT / 2 - 300 }, { width: 50, height: 50 });
    

    return {
        physics: { engine, world },
        TopWall: Top,
        BottomWall: Bottom,
        LeftWall: Left,
        RightWall: Right,
        Circle: Circle1,
        Box: Box1,
        // Sprite: Sprite1,
    };
};
