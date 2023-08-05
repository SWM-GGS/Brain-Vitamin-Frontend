import Router from './routes/router';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducer.ts';
import GlobalStyle from './components/common/GlobalStyle.ts';
import Splash from './pages/Splash.tsx';
import { useEffect, useState } from 'react';

function AppInner() {
  const fontSize = useSelector((state: RootState) => state.user.fontSize);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 여기서 필요한 초기화 작업을 수행한 후에 스플래시 화면을 닫을 수 있습니다.
    // 예를 들어, 로고 로딩이 완료되었을 때 setLoading(false); 를 호출합니다.
    // 이렇게 하면 스플래시 화면이 일정 시간 후에 자동으로 사라지도록 할 수도 있습니다.
    // setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <>
          <GlobalStyle fontSize={fontSize} />
          <Router />
        </>
      )}
    </>
  );
}

export default AppInner;
