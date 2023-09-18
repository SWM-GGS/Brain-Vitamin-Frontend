import { Routes, Route } from 'react-router-dom';
import CardMatch from '../pages/games/CardMatch.tsx';
import WordPuzzle from '../pages/games/WordPuzzle.tsx';
import DateQuiz from '../pages/games/DateQuiz.tsx';
import Coloring from '../pages/games/Coloring.tsx';
import Overlapping from '../pages/games/Overlapping.tsx';
import Maze from '../pages/games/Maze.tsx';
import Market from '../pages/games/Market.tsx';
import { CogTrainingProps, GameResultProps } from '../pages/CogTraining.tsx';
import NumberTouch from '../pages/games/NumberTouch.tsx';
import NearTime from '../pages/games/NearTime.tsx';
import BasicCalculate from '../pages/games/BasicCalculate.tsx';
import PatternNumber from '../pages/games/PatternNumber.tsx';
import ShownColor from '../pages/games/ShownColor.tsx';
import MeaningColor from '../pages/games/MeaningColor.tsx';
import SameColor from '../pages/games/SameColor.tsx';
import DayOfWeek from '../pages/games/DayOfWeek.tsx';
import Antonym from '../pages/games/Antonym.tsx';
import Synonym from '../pages/games/Synonym.tsx';
import CompassDirection from '../pages/games/CompassDirection.tsx';
import PictureMatch from '../pages/games/PictureMatch.tsx';
import PatternPicture from '../pages/games/PatternPicture.tsx';
import ChangeCalculate from '../pages/games/ChangeCalculate.tsx';

export type GameProps = {
  gameData: CogTrainingProps;
  onGameEnd: (lastGameResult?: GameResultProps) => void;
  saveGameResult: (
    problemId: number,
    duration: number,
    result: string,
    score: number,
  ) => void;
  isNextButtonClicked: boolean;
  setAnswerState: React.Dispatch<React.SetStateAction<string>>;
  answerState: string;
};
export default function GameRouter({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
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
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
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
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
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
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
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
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
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
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
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
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
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
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/numberTouch"
        element={
          <NumberTouch
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/nearTime"
        element={
          <NearTime
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/basicCalculate"
        element={
          <BasicCalculate
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/patternNumber"
        element={
          <PatternNumber
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/shownColor"
        element={
          <ShownColor
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/meaningColor"
        element={
          <MeaningColor
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/sameColor"
        element={
          <SameColor
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/dayOfWeek"
        element={
          <DayOfWeek
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/antonym"
        element={
          <Antonym
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/synonym"
        element={
          <Synonym
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/compassDirection"
        element={
          <CompassDirection
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/pictureMatch"
        element={
          <PictureMatch
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/patternPicture"
        element={
          <PatternPicture
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
      <Route
        path="/changeCalculate"
        element={
          <ChangeCalculate
            gameData={gameData}
            onGameEnd={onGameEnd}
            saveGameResult={saveGameResult}
            isNextButtonClicked={isNextButtonClicked}
            setAnswerState={setAnswerState}
            answerState={answerState}
          />
        }
      />
    </Routes>
  );
}
