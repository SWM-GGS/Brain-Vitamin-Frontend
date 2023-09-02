import { styled } from 'styled-components';
import LeftTapBar from '../components/common/LeftTapBar';
import BottomTapBar from '../components/common/BottomTapBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import axios from 'axios';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import LayerPopup from '../components/common/LayerPopup';
import { useModal } from '../hooks/useModal';

function Setting() {
  const { nickname, familyKey, accessToken, fontSize, profileImgUrl } =
    useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isModalOpen, modalText, openModal, closeModal } = useModal();
  const [isConfirmSignoutOpen, setIsConfirmSignoutOpen] = useState(false);
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

  const toProfile = () => {
    navigate('/profile');
  };

  const toPhoneNumberEdit = () => {
    navigate('/phoneNumberEdit');
  };

  const toFontSizeEdit = () => {
    navigate('/fontSizeEdit');
  };

  const handleOut = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    dispatch(
      userSlice.actions.setUser({
        name: '',
        nickname: '',
        fontSize,
        phoneNumber: '',
        familyKey: '',
        accessToken: '',
      }),
    );
    navigate('/logIn');
  };

  const handleSignout = async () => {
    const refreshToken = await localStorage.getItem('refreshToken');
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/signout`,
        {
          accessTokenDto: {
            accessToken,
          },
          refreshTokenDto: {
            refreshToken,
          },
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      openModal(data.result);
      handleOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const refreshToken = await localStorage.getItem('refreshToken');
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/logout`,
        {
          accessTokenDto: {
            accessToken,
          },
          refreshTokenDto: {
            refreshToken,
          },
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      openModal(data.result);
      handleOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <Container3>
          <Box>
            <Version>
              <PrivacyButton
                onClick={() =>
                  window.open(
                    'http://brain-vitamin-web-front-deploy.s3-website.ap-northeast-2.amazonaws.com/privacy',
                    '개인정보처리방침',
                    'noopener',
                  )
                }>
                <span>개인정보처리방침 보기</span>
                <span
                  style={{
                    color: 'gray',
                    fontWeight: 'bold',
                    margin: '0 0 0 1rem',
                  }}>
                  {'>'}
                </span>
              </PrivacyButton>
            </Version>
            <ProfileContainer>
              {profileImgUrl ? (
                <ProfileImage alt="" src={profileImgUrl} />
              ) : (
                <ProfileImage alt="" src="/assets/images/profile-default.svg" />
              )}
              <Name>{nickname}</Name>
              <Sub>가족 고유번호 : {familyKey}</Sub>
            </ProfileContainer>
            <ButtonContainer>
              <EditButton onClick={toProfile}>회원정보 변경하기</EditButton>
              <EditButton onClick={toPhoneNumberEdit}>
                전화번호 변경하기
              </EditButton>
              <EditButton onClick={toFontSizeEdit}>
                글자크기 변경하기
              </EditButton>
            </ButtonContainer>
          </Box>
          <SubButtonContainer>
            <SignoutButton onClick={() => setIsConfirmSignoutOpen(true)}>
              회원탈퇴
            </SignoutButton>
            <LogoutButton onClick={() => setIsConfirmLogoutOpen(true)}>
              로그아웃
            </LogoutButton>
          </SubButtonContainer>
        </Container3>
      </Container2>
      <BottomTapBar />
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={closeModal}
        />
      )}
      {isConfirmSignoutOpen && (
        <LayerPopup
          label="정말 회원탈퇴하시겠습니까?"
          leftButtonText="취소"
          onClickLeftButton={() => setIsConfirmSignoutOpen(false)}
          rightButtonText="확인"
          onClickRightButton={handleSignout}
        />
      )}
      {isConfirmLogoutOpen && (
        <LayerPopup
          label="정말 로그아웃하시겠습니까?"
          leftButtonText="취소"
          onClickLeftButton={() => setIsConfirmLogoutOpen(false)}
          rightButtonText="확인"
          onClickRightButton={handleLogout}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Container2 = styled.div`
  padding: 5rem;
  display: flex;
  gap: 2.8rem;
  justify-content: center;
  height: 100vh;
  @media screen and (min-width: 768px) {
    align-items: center;
    flex-direction: column;
    width: 140rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 3rem 1.6rem;
    gap: 1rem;
    align-content: flex-start;
  }
`;
const Container3 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 87rem;
  height: 48.7rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3.7rem 6.9rem 3.7rem 11rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 6rem 2rem;
    flex-direction: column;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 41.2rem;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const ProfileImage = styled.img`
  width: 20rem;
  height: 20rem;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
  }
`;
const Name = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  color: #433d3a;
  margin: 2.9rem 0 1.3rem 0;
  @media screen and (max-width: 767px) {
    font-size: 2.2rem;
    margin: 1.5rem 0 1rem 0;
  }
`;
const Sub = styled.span`
  font-size: 1.6rem;
  color: #433d3a;
`;
const EditButton = styled.button`
  width: 100%;
  height: 5.7rem;
  border-radius: 0.8rem;
  border: 0.2rem solid #e8e8e8;
  font-size: 2.2rem;
  font-family: 'Pretendard-Medium';
  color: #433d3a;
  background: white;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;
const Version = styled.span`
  font-size: 1.6rem;
  color: #433d3a;
  position: absolute;
  top: 4rem;
  right: 7rem;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    top: 2rem;
    right: 2rem;
  }
`;
const SubButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 87rem;
  gap: 1.2rem;
  margin: 4.5rem 0 0 0;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 2rem 0 0 0;
  }
`;
const SignoutButton = styled.button`
  width: 20rem;
  height: 5.7rem;
  border-radius: 0.8rem;
  background: #ffe1e1;
  color: #ff3c3c;
  font-size: 2.2rem;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;
const LogoutButton = styled.button`
  width: 20rem;
  height: 5.7rem;
  border-radius: 0.8rem;
  border: 0.2rem solid #e8e8e8;
  background: none;
  color: #6d6b69;
  font-size: 2.2rem;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;
const PrivacyButton = styled.button`
  display: flex;
  justify-content: space-between;
  background: var(--main-bg-color);
  padding: 1rem;
  border-radius: 1rem;
  font-size: 2rem;
  align-items: center;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
  }
`;

export default Setting;
