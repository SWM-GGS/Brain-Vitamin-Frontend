import { Routes, Route } from 'react-router-dom';
import CardMatch from '../pages/games/CardMatch.tsx';
import WordPuzzle from '../pages/games/WordPuzzle.tsx';
import DateQuiz from '../pages/games/DateQuiz.tsx';
import Coloring from '../pages/games/Coloring.tsx';
import Overlapping from '../pages/games/Overlapping.tsx';
import Maze from '../pages/games/Maze.tsx';
import Market from '../pages/games/Market.tsx';
import { CogTrainingProps } from '../pages/CogTraining.tsx';

type Props = {
  gameData: CogTrainingProps[];
  gameIndex: number;
  goNextGame: () => void;
};
export type GameProps = {
  gameData: CogTrainingProps;
  onGameEnd: () => void;
};
export default function GameRouter({ gameData, gameIndex, goNextGame }: Props) {
  return (
    <Routes>
      <Route
        path="/cardMatch"
        element={
          <CardMatch gameData={gameData[gameIndex]} onGameEnd={goNextGame} />
        }
      />
      <Route
        path="/wordPuzzle"
        element={
          <WordPuzzle gameData={gameData[gameIndex]} onGameEnd={goNextGame} />
        }
      />
      <Route
        path="/dateQuiz"
        element={
          <DateQuiz gameData={gameData[gameIndex]} onGameEnd={goNextGame} />
        }
      />
      <Route
        path="/coloring"
        element={
          <Coloring gameData={gameData[gameIndex]} onGameEnd={goNextGame} />
        }
      />
      <Route
        path="/overlapping"
        element={
          <Overlapping gameData={gameData[gameIndex]} onGameEnd={goNextGame} />
        }
      />
      <Route
        path="/maze"
        element={<Maze gameData={gameData[gameIndex]} onGameEnd={goNextGame} />}
      />
      <Route
        path="/market"
        element={
          <Market gameData={gameData[gameIndex]} onGameEnd={goNextGame} />
        }
      />
    </Routes>
  );
}
