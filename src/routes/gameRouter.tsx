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
import WordMemory from '../pages/games/WordMemory.tsx';
import FlagMemory from '../pages/games/FlagMemory.tsx';
import FlagMatch from '../pages/games/FlagMatch.tsx';

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
}: Readonly<GameProps>) {
  const gameProps = {
    gameData,
    onGameEnd,
    saveGameResult,
    isNextButtonClicked,
    setAnswerState,
    answerState,
  };

  return (
    <Routes>
      <Route path="/cardMatch" element={<CardMatch {...gameProps} />} />
      <Route path="/wordPuzzle" element={<WordPuzzle {...gameProps} />} />
      <Route path="/dateQuiz" element={<DateQuiz {...gameProps} />} />
      <Route path="/coloring" element={<Coloring {...gameProps} />} />
      <Route path="/overlapping" element={<Overlapping {...gameProps} />} />
      <Route path="/maze" element={<Maze {...gameProps} />} />
      <Route path="/market" element={<Market {...gameProps} />} />
      <Route path="/numberTouch" element={<NumberTouch {...gameProps} />} />
      <Route path="/nearTime" element={<NearTime {...gameProps} />} />
      <Route
        path="/basicCalculate"
        element={<BasicCalculate {...gameProps} />}
      />
      <Route path="/patternNumber" element={<PatternNumber {...gameProps} />} />
      <Route path="/shownColor" element={<ShownColor {...gameProps} />} />
      <Route path="/meaningColor" element={<MeaningColor {...gameProps} />} />
      <Route path="/sameColor" element={<SameColor {...gameProps} />} />
      <Route path="/dayOfWeek" element={<DayOfWeek {...gameProps} />} />
      <Route path="/antonym" element={<Antonym {...gameProps} />} />
      <Route path="/synonym" element={<Synonym {...gameProps} />} />
      <Route
        path="/compassDirection"
        element={<CompassDirection {...gameProps} />}
      />
      <Route path="/pictureMatch" element={<PictureMatch {...gameProps} />} />
      <Route
        path="/patternPicture"
        element={<PatternPicture {...gameProps} />}
      />
      <Route
        path="/changeCalculate"
        element={<ChangeCalculate {...gameProps} />}
      />
      <Route path="/wordMemory" element={<WordMemory {...gameProps} />} />
      <Route path="/flagMemory" element={<FlagMemory {...gameProps} />} />
      <Route path="/flagMatch" element={<FlagMatch {...gameProps} />} />
    </Routes>
  );
}
