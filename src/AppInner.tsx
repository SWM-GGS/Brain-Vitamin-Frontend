import Router from './routes/router';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducer.ts';
import GlobalStyle from './components/common/GlobalStyle.ts';

function AppInner() {
  const fontSize = useSelector((state: RootState) => state.user.fontSize);

  return (
    <>
      <GlobalStyle fontSize={fontSize} />
      <Router />
    </>
  );
}

export default AppInner;
