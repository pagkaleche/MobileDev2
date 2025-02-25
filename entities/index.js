import Matter from "matter-js";
import Wall from "../components/Wall";
import Constants from "../constants";
import Name from "../components/Name";
import GameBackground from "../components/Background";
import Cop from "../components/Cop";
import MrK from "../components/MrK";
import MsB from "../components/MsB";

export default (testWorld) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    const MyName = Name(world, "black", { x: Constants.WINDOW_WIDTH / 2 - 70, y: Constants.WINDOW_HEIGHT - 20 }, { width: 100, height: 100, fontSize: 20 });

    const Background = GameBackground(world, "white", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_WIDTH / 2 + 260}, { width: Constants.WINDOW_WIDTH, height: Constants.WINDOW_HEIGHT}, "BG")
    const Top = Wall(world, "red", { x: Constants.WINDOW_WIDTH / 2 - 8, y: 0 }, { width: Constants.WINDOW_WIDTH, height: 20 }, "TopWall");
    const Middle = Wall(world, "red", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 - 20 }, { width: Constants.WINDOW_WIDTH, height: 10},"MiddleWall" );
    const Split = Wall(world, "red", { x: 200, y: Constants.WINDOW_HEIGHT / 2 + 230 }, { width: 20, height: Constants.WINDOW_HEIGHT / 2 }, "LeftWall");
    const Bottom = Wall(world, "red", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT - 50 }, { width: Constants.WINDOW_WIDTH, height: 20 }, "BottomWall");
    const Left = Wall(world, "red", { x: 0, y: Constants.WINDOW_HEIGHT / 2 }, { width: 20, height: Constants.WINDOW_HEIGHT + 90 }, "LeftWall");
    const Right = Wall(world, "red", { x: Constants.WINDOW_WIDTH - 15, y: Constants.WINDOW_HEIGHT / 2 }, { width: 20, height: Constants.WINDOW_HEIGHT + 90 }, "RightWall");
    const MisterK = MrK(world, "green", { x: Constants.WINDOW_WIDTH / 2 + 100, y: Constants.WINDOW_HEIGHT / 2 - 100 }, { width: 40, height: 40 }, { isStatic: false, label: "K" });
    const MissB = MsB(world, "green", { x: Constants.WINDOW_WIDTH / 2 - 100, y: Constants.WINDOW_HEIGHT / 2 - 100 }, { width: 40, height: 40 }, { isStatic: false, label: "B" });
    const MrCop = Cop(world, "green", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 - 200 }, { width: 40, height: 40 }, { isStatic: false, label: "Cop" });

    return {
        physics: { engine, world },
        BG: Background,
        TopWall: Top,
        BottomWall: Bottom,
        LeftWall: Left,
        RightWall: Right,
        Middle: Middle,
        Split: Split,
        MrCop: MrCop,
        MrK: MisterK,
        MsB: MissB,
        Name: MyName,
    };
};
