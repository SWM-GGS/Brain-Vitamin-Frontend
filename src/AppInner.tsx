import Router from './routes/router';
import { useSelector } from 'react-redux';
import { RootState } from './store/reducer.ts';
import GlobalStyle from './components/common/GlobalStyle.tsx';
import Splash from './pages/Splash.tsx';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './store/index.ts';
import axios from 'axios';
import userSlice from './slices/user.ts';
import { checkIsVersionLatest, setVersion } from './utils/checkVersion.ts';
import { useModal } from './hooks/useModal.ts';
import LayerPopup from './components/common/LayerPopup.tsx';

function AppInner() {
  const dispatch = useAppDispatch();
  const fontSize = useSelector((state: RootState) => state.user.fontSize);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const { isModalOpen, modalText, openModal, closeModal } = useModal();

  useEffect(() => {
    const isVersionLatest = checkIsVersionLatest();
    if (!isVersionLatest) {
      openModal('최신 버전으로 앱을 업데이트해주세요.');
    }
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
        localStorage.setItem(
          'refreshToken',
          data.result.tokenDto.refreshTokenDto.refreshToken,
        );
        localStorage.setItem(
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
          localStorage.setItem(
            'refreshToken',
            data.result.tokenDto.refreshTokenDto.refreshToken,
          );
          localStorage.setItem(
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
      {loading || showSplash ? (
        <Splash />
      ) : (
        <>
          <GlobalStyle fontSize={fontSize} />
          <Router />
        </>
      )}
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="업데이트하기"
          onClickCenterButton={() => {
            setVersion();
            window.open(
              'https://play.google.com/store/apps/details?id=com.brainvitamin',
              'WindowName',
              'noopener',
            );
          }}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default AppInner;
