import Matter from "matter-js";
import GameBackground from "../components/GameBackground";
import Wall from "../components/Wall";
import Platform from "../components/Platform";
import Constants from "../constants";
import CreateIceBlock from "../components/IceBlock";
import CreatePlayer from "../components/Player";
import Button from "../components/Button";
import Score from "../components/Score";
import { MoveObject } from "../Physics";

export default () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    const BackGround = GameBackground(world, "black", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT / 2 - 133 }, { width: Constants.WINDOW_WIDTH, height: Constants.WINDOW_HEIGHT, label: "GameBackground" });
    const Wood = Platform(world, { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - 180 }, { width: 80, height: 13 }, "Platform");
    const Bottom = Wall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT - 150 }, { width: Constants.WINDOW_WIDTH, height: 30, label: "BottomWall" });
    const IceBlock1 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 - 150, y: 550 }, { width: 155, height: 30 }, "Block1");
    const IceBlock2 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 + 150, y: 400 }, { width: 155, height: 30 }, "Block2");
    const IceBlock3 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 - 90, y: 250 }, { width: 155, height: 30 }, "Block3");
    const IceBlock4 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 + 250, y: 150 }, { width: 155, height: 30 }, "Block4");
    const IceBlock5 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH / 2 - 250, y: - 200 }, { width: 155, height: 30 }, "Block5");
    const IceBlock6 = CreateIceBlock(world, "blue", { x: Constants.WINDOW_WIDTH - 400, y: 50 }, { width: 155, height: 30 }, "Block6");
    const ButtonLeft = Button(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 150, y: Constants.WINDOW_HEIGHT - 50 }, { width: 80, height: 70 }, "left", () => MoveObject("left", Player));
    const ButtonRight = Button(world, "orange", { x: Constants.WINDOW_WIDTH / 2 + 150, y: Constants.WINDOW_HEIGHT - 50 }, { width: 80, height: 70 }, "right", () => MoveObject("right", Player));
    const JumpButton = Button(world, "red", { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT - 50 }, { width: 130, height: 65 }, "jump", () => MoveObject("jump", Player));
    const Player = CreatePlayer(world, { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT / 2 + 150 }, { width: 28, height: 48, label: "Player" });
    const ScoreBoard = Score(world, "white", { x: Constants.WINDOW_WIDTH / 2 + 20, y: 100 }, { width: 100, height: 100, fontSize: 70 }, "Score", 0);

    return {
        physics: { engine, world },
        BackGround: BackGround,
        ScoreBoard: {
            ...ScoreBoard,
            score: 0,
        },
        IceBlock1: IceBlock1,
        IceBlock2: IceBlock2,
        IceBlock3: IceBlock3,
        IceBlock4: IceBlock4,
        IceBlock5: IceBlock5,
        IceBlock6: IceBlock6,
        Player: Player,
        Platform: Wood,
        BottomWall: Bottom,
        ButtonLeft: ButtonLeft,
        ButtonRight: ButtonRight,
        JumpButton: JumpButton,
    };
};
