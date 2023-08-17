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
        const refreshToken = await localStorage.getItem('refreshToken');
        const accessToken = await localStorage.getItem('accessToken');
        if (!refreshToken) return;
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/patient/reissue`,
          {
            accessTokenDto: {
              accessToken: accessToken,
            },
            refreshTokenDto: {
              refreshToken: refreshToken,
            },
          },
          { headers: { authorization: `Bearer ${accessToken}` } },
        );
        const { name, nickname, phoneNumber, familyKey, fontSize } =
          data.result.patientDetailDto;
        dispatch(
          userSlice.actions.setUser({
            name,
            nickname,
            phoneNumber,
            familyKey,
            fontSize,
            accessToken: data.result.tokenDto.accessTokenDto.accessToken,
          }),
        );
        await localStorage.setItem(
          'refreshToken',
          data.result.tokenDto.refreshTokenDto.refreshToken,
        );
        await localStorage.setItem(
          'accessToken',
          data.result.tokenDto.accessTokenDto.accessToken,
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
        if (status === 401) {
          if (
            config.url === `${import.meta.env.VITE_API_URL}/patient/reissue`
          ) {
            return;
          }
          const originalRequest = config;
          const refreshToken = await localStorage.getItem('refreshToken');
          const accessToken = await localStorage.getItem('accessToken');
          // refreshToken이 유효하다면, accessToken 갱신 요청 후 실패했던 api 재요청
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/patient/reissue`,
            {
              accessTokenDto: {
                accessToken: accessToken,
              },
              refreshTokenDto: {
                refreshToken: refreshToken,
              },
            },
            { headers: { authorization: `Bearer ${accessToken}` } },
          );
          dispatch(
            userSlice.actions.setAccessToken(
              data.result.tokenDto.accessTokenDto.accessToken,
            ),
          );
          await localStorage.setItem(
            'refreshToken',
            data.result.tokenDto.refreshTokenDto.refreshToken,
          );
          await localStorage.setItem(
            'accessToken',
            data.result.tokenDto.accessTokenDto.accessToken,
          );
          originalRequest.headers.authorization = `Bearer ${data.result.tokenDto.accessTokenDto.accessToken}`;
          return axios(originalRequest);
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
