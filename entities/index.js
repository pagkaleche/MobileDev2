import Matter from "matter-js";
import BottomWall from "../components/BottomWall";
import LeftWall from "../components/LeftWall";
import RightWall from "../components/RightWall";
import Constants from "../constants";
import CreateIceBlock from "../components/IceBlock";
import Square from "../components/Square";
import Button from "../components/Button";
import Name from "../components/Name";
import { MoveObject } from "../Physics";

export default (testWorld) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    // const MyName = Name(world, "black", { x: Constants.WINDOW_WIDTH / 2 - 50, y: Constants.WINDOW_HEIGHT - 60 }, { width: 100, height: 100, fontSize: 30 });
    const top = Constants.WINDOW_HEIGHT - 780
    const Bottom = BottomWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT - 150 }, { width: Constants.WINDOW_WIDTH, height: 10, label: "BottomWall" });
    const Left = LeftWall(world, "orange", { x: -5, y: Constants.WINDOW_HEIGHT / 2 - 100 }, { width: 10, height: Constants.WINDOW_HEIGHT, label: "LeftWall" });
    const Right = RightWall(world, "orange", { x: Constants.WINDOW_WIDTH - 10, y: Constants.WINDOW_HEIGHT / 2 - 100 }, { width: 10, height: Constants.WINDOW_HEIGHT, label: "RightWall" });
    const IceBlock1 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 - 150, y: 550 }, { width: 450, height: 10 }, "Block1");
    const IceBlock2 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 + 150, y: 400 }, { width: 450, height: 10 }, "Block2");
    const IceBlock3 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 - 90, y: 250 }, { width: 450, height: 10 }, "Block2");
    const IceBlock4 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 + 250, y: 150 }, { width: 450, height: 10 }, "Block3");
    const IceBlock5 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 - 250, y: -200 }, { width: 450, height: 10 }, "Block3");
    const IceBlock6 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH - 400, y: 50 }, { width: 450, height: 10 }, "Block4");
    const ButtonLeft = Button(world, "blue", { x: Constants.WINDOW_WIDTH / 2 - 150, y: Constants.WINDOW_HEIGHT - 80 }, { width: 80, height: 50 }, "left", () => MoveObject("left", Player));
    const ButtonRight = Button(world, "blue", { x: Constants.WINDOW_WIDTH / 2 + 150, y: Constants.WINDOW_HEIGHT - 80 }, { width: 80, height: 50 }, "right", () => MoveObject("right", Player));
    const JumpButton = Button(world, "blue", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - 80 }, { width: 130, height: 50 }, "jump", () => MoveObject("jump", Player));
    const Player = Square(world, "blue", { x: Constants.WINDOW_WIDTH / 2 - 120, y: Constants.WINDOW_HEIGHT / 2 + 150}, { width: 40, height: 40, label: "Player" });


    return {
        physics: { engine, world },
        BottomWall: Bottom,
        // LeftWall: Left,
        // RightWall: Right,
        IceBlock1: IceBlock1,
        IceBlock2: IceBlock2,
        IceBlock3: IceBlock3,
        IceBlock4: IceBlock4,
        IceBlock5: IceBlock5,
        IceBlock6: IceBlock6,
        ButtonLeft: ButtonLeft,
        ButtonRight: ButtonRight,
        JumpButton: JumpButton,
        Square: Player,
        // Name: MyName,
    };
};
