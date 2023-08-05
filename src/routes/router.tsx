import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer.ts';
import CogTraining from '../pages/CogTraining.tsx';
import CardMatch from '../pages/games/CardMatch.tsx';
import OneToFifty from '../pages/games/OneToFifty.tsx';
import WhackAMole from '../pages/games/WhackAMole.tsx';
import WordPuzzle from '../pages/games/WordPuzzle.tsx';
import Calendar from '../pages/Calendar.tsx';
import DateQuiz from '../pages/games/DateQuiz.tsx';
import Coloring from '../pages/games/Coloring.tsx';
import Overlapping from '../pages/games/Overlapping.tsx';
import Maze from '../pages/games/Maze.tsx';
import Market from '../pages/games/Market.tsx';
import NumberTouch from '../pages/games/NumberTouch.tsx';
import FontSizeSet from '../pages/FontSizeSet.tsx';
import Home from '../pages/Home.tsx';
import PhoneNumberSet from '../pages/PhoneNumberSet.tsx';
import { checkIsFirstRun } from '../utils/firstRun.ts';

export default function Router() {
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.phoneNumber,
  );
  const isFirstRun = checkIsFirstRun();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={
              isLoggedIn
                ? '/home'
                : isFirstRun
                ? '/fontSizeSet'
                : '/phoneNumberSet'
            }
          />
        }
      />
      <Route path="/fontSizeSet" element={<FontSizeSet />} />
      <Route path="/home" element={<Home />} />
      <Route path="/phoneNumberSet" element={<PhoneNumberSet />} />
      <Route path="/cogTraining" element={<CogTraining />} />
      <Route path="/cardMatch" element={<CardMatch />} />
      <Route path="/oneToFifty" element={<OneToFifty />} />
      <Route path="/whackAMole" element={<WhackAMole />} />
      <Route path="/wordPuzzle" element={<WordPuzzle />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/dateQuiz" element={<DateQuiz />} />
      <Route path="/coloring" element={<Coloring />} />
      <Route path="/overlapping" element={<Overlapping />} />
      <Route path="/maze" element={<Maze />} />
      <Route path="/market" element={<Market />} />
      <Route path="/numberTouch" element={<NumberTouch />} />
    </Routes>
  );
}
