import { Routes, Route } from 'react-router-dom';
import CardMatch from '../pages/games/CardMatch.tsx';
import OneToFifty from '../pages/games/OneToFifty.tsx';
import WhackAMole from '../pages/games/WhackAMole.tsx';
import WordPuzzle from '../pages/games/WordPuzzle.tsx';
import Calendar from '../pages/Calendar.tsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CardMatch />} />
      <Route path="/oneToFifty" element={<OneToFifty />} />
      <Route path="/whackAMole" element={<WhackAMole />} />
      <Route path="/wordPuzzle" element={<WordPuzzle />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}
