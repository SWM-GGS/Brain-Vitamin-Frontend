import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer.ts';
import { checkIsFirstRun } from '../utils/firstRun.ts';
import CogTraining from '../pages/CogTraining.tsx';
import FontSizeSet from '../pages/FontSizeSet.tsx';
import PhoneNumberSet from '../pages/PhoneNumberSet.tsx';
import NameSet from '../pages/NameSet.tsx';
import BirthDateSet from '../pages/BirthDateSet.tsx';
import EducationSet from '../pages/EducationSet.tsx';
import Home from '../pages/Home.tsx';
import Family from '../pages/Family.tsx';
import LogIn from '../pages/LogIn.tsx';

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
            to={isLoggedIn ? '/home' : isFirstRun ? '/fontSizeSet' : '/logIn'}
          />
        }
      />
      <Route path="/fontSizeSet" element={<FontSizeSet />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/phoneNumberSet" element={<PhoneNumberSet />} />
      <Route path="/nameSet" element={<NameSet />} />
      <Route path="/birthDateSet" element={<BirthDateSet />} />
      <Route path="/educationSet" element={<EducationSet />} />
      <Route path="/home" element={<Home />} />
      <Route path="/family" element={<Family />} />
      <Route path="/cogTraining/*" element={<CogTraining />} />
    </Routes>
  );
}
