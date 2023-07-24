import { Routes, Route } from 'react-router-dom';
import CardMatch from '../pages/games/CardMatch.tsx';
import OneToFifty from '../pages/games/OneToFifty.tsx';
import WhackAMole from '../pages/games/WhackAMole.tsx';
import WordPuzzle from '../pages/games/WordPuzzle.tsx';
import Calendar from '../pages/Calendar.tsx';
import DateQuiz from '../pages/games/DateQuiz.tsx';
import Coloring from '../pages/games/Coloring.tsx';
import Overlapping from '../pages/games/Overlapping.tsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CardMatch />} />
      <Route path="/oneToFifty" element={<OneToFifty />} />
      <Route path="/whackAMole" element={<WhackAMole />} />
      <Route path="/wordPuzzle" element={<WordPuzzle />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/dateQuiz" element={<DateQuiz />} />
      <Route path="/coloring" element={<Coloring />} />
      <Route path="/overlapping" element={<Overlapping />} />
    </Routes>
  );
}
