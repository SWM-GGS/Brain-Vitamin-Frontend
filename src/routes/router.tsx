import { Routes, Route } from 'react-router-dom';
import CardMatch from '../pages/games/CardMatch.tsx';
import OneToFifty from '../pages/games/OneToFifty.tsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CardMatch />} />
      <Route path="/oneToFifty" element={<OneToFifty />} />
    </Routes>
  );
}
