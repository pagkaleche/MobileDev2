import Matter from "matter-js";
import BottomWall from "../components/BottomWall";
import LeftWall from "../components/LeftWall";
import RightWall from "../components/RightWall";
import Circle from "../components/Circle";
import { Dimensions } from "react-native";
import Constants from "../constants";
import Stud from "../components/Stud";
import Box from "../components/Box";

const createStuds = (world, color, startX, startY, rows, cols, spacing) => {
    const studs = {};
    let studIndex = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const offset = row % 2 === 0 ? 0 : spacing / 2;
            const x = startX + col * spacing + offset;
            const y = startY + row * spacing;

            const studKey = `Stud${studIndex}`;
            studs[studKey] = Stud(world, color, { x, y }, { width: 6, height: 6 });
            studIndex++;
        }
    }

    return studs;
};

export default (testWorld) => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    const initialPosition = { x: Constants.WINDOW_WIDTH / 2 + 5, y: Constants.WINDOW_HEIGHT / 2 - 500 };
    const Bottom = BottomWall(world, "orange", { x: Constants.WINDOW_WIDTH / 2 - 8, y: Constants.WINDOW_HEIGHT }, { width: Constants.WINDOW_WIDTH, height: 50 });
    const Left = LeftWall(world, "blue", { x: 0, y: Constants.WINDOW_HEIGHT / 2 + 25 }, { width: 25, height: Constants.WINDOW_HEIGHT });
    const Right = RightWall(world, "blue", { x: Constants.WINDOW_WIDTH - 20, y: Constants.WINDOW_HEIGHT / 2 + 25 }, { width: 25, height: Constants.WINDOW_HEIGHT });
    const Circle1 = Circle(world, "pink", initialPosition, { radius: 15 });
    const Box1 = Box(world, "green", initialPosition, { width: 30, height: 30 });
    const studs = createStuds(world, "purple", Constants.WINDOW_WIDTH / 2 - 300, Constants.WINDOW_HEIGHT / 3, 10, 13, 45);

    const spawnedCircles = {};
    const addCircle = () => {
        const newCircleKey = `Circle${Object.keys(spawnedCircles).length + 1}`;
        const newCircle = Circle(world, "pink", initialPosition, { radius: 15 });
        spawnedCircles[newCircleKey] = newCircle;
        return newCircle;
    };
    return {
        physics: { engine, world },
        BottomWall: Bottom,
        LeftWall: Left,
        RightWall: Right,
        Circle1,
        addCircle,
        Box1,
        ...studs,
    };
};
