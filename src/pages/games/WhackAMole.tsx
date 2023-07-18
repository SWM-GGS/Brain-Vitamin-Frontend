import { useState } from 'react';
import {
  AllMolesContainer,
  MoleContainer,
} from '../../components/games/WhackAMole';

export default function WhackAMole() {
  let [score, setScore] = useState(0);

  function createMoleHill() {
    const hills = [];
    const numHills = 9;
    for (let i = 0; i < numHills; i++) {
      hills.push(<MoleContainer key={i} setScore={setScore} score={score} />);
    }

    return hills;
  }
  // TO-DO: 시간 제한
  return (
    <>
      <h1>두더지 잡기</h1>
      <h2>지금까지 잡은 횟수 : {score}</h2>
      <AllMolesContainer>{createMoleHill()}</AllMolesContainer>
    </>
  );
}
