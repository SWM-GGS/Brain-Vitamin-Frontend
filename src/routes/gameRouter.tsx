import { Routes, Route } from 'react-router-dom';
import CardMatch from '../pages/games/CardMatch.tsx';
import WordPuzzle from '../pages/games/WordPuzzle.tsx';
import DateQuiz from '../pages/games/DateQuiz.tsx';
import Coloring from '../pages/games/Coloring.tsx';
import Overlapping from '../pages/games/Overlapping.tsx';
import Maze from '../pages/games/Maze.tsx';
import Market from '../pages/games/Market.tsx';
import { CogTrainingProps } from '../pages/CogTraining.tsx';

export type GameProps = {
  gameData: CogTrainingProps;
  onGameEnd: () => void;
  saveGameResult: (
    problemId: number,
    duration: number,
    result: string,
    score: number,
  ) => void;
};
export default function GameRouter({
  gameData,
  onGameEnd,
  saveGameResult,
}: GameProps) {
  return (
    <Routes>
      <Route
        path="/cardMatch"
        element={
          <CardMatch
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
          />
        }
      />
      <Route
        path="/wordPuzzle"
        element={
          <WordPuzzle
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
          />
        }
      />
      <Route
        path="/dateQuiz"
        element={
          <DateQuiz
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
          />
        }
      />
      <Route
        path="/coloring"
        element={
          <Coloring
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
          />
        }
      />
      <Route
        path="/overlapping"
        element={
          <Overlapping
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
          />
        }
      />
      <Route
        path="/maze"
        element={
          <Maze
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
          />
        }
      />
      <Route
        path="/market"
        element={
          <Market
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
          />
        }
      />
    </Routes>
  );
}
