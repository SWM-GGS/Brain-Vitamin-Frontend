import { Routes, Route } from 'react-router-dom';
import CardMatch from '../pages/CardMatch.tsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CardMatch />} />
    </Routes>
  );
}
