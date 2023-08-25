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
import CogTrainingResult from '../pages/CogTrainingResult.tsx';
import ScreeningTest from '../pages/ScreeningTest.tsx';
import ScreeningTestResult from '../pages/ScreeningTestResult.tsx';
import MyPage from '../pages/MyPage.tsx';
import Privacy from '../pages/Privacy.tsx';
import Setting from '../pages/Setting.tsx';
import FontSizeEdit from '../pages/FontSizeEdit.tsx';

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
      <Route path="/cogTrainingResult" element={<CogTrainingResult />} />
      <Route path="/screeningTest" element={<ScreeningTest />} />
      <Route path="/screeningTestResult" element={<ScreeningTestResult />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/fontSizeEdit" element={<FontSizeEdit />} />
    </Routes>
  );
}
