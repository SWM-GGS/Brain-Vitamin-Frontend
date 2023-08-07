import Router from './routes/router';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducer.ts';
import GlobalStyle from './components/common/GlobalStyle.tsx';
import Splash from './pages/Splash.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './store/index.ts';
import axios from 'axios';
import userSlice from './slices/user.ts';

function AppInner() {
  const dispatch = useAppDispatch();
  const fontSize = useSelector((state: RootState) => state.user.fontSize);
  const [loading, setLoading] = useState(true);

  // 앱 실행 시 refreshToken 있으면 자동 로그인
  useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await localStorage.getItem('refreshToken');
        if (!token) {
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            nickname: response.data.data.nickname,
            phoneNumber: response.data.data.phoneNumber,
            familyKey: response.data.data.familyKey,
            accessToken: response.data.data.accessToken,
            fontSize: response.data.data.fontSize,
          }),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTokenAndRefresh();
  }, [dispatch]);

  // axios interceptor 설정
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const originalRequest = config;
            const refreshToken = await localStorage.getItem('refreshToken');
            // refreshToken이 유효하다면, accessToken 갱신 요청 후 실패했던 api 재요청
            const { data } = await axios.post(
              `${import.meta.env.VITE_API_URL}/refreshToken`,
              {},
              { headers: { authorization: `Bearer ${refreshToken}` } },
            );
            dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
            originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch]);

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
