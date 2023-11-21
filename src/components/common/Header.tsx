import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

interface Props {
  label: string;
}

function Header({ label }: Readonly<Props>) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <Back
        onClick={goBack}
        alt="뒤로가기 버튼"
        src="/assets/images/arrow-narrow-left.svg"
      />
      <span>{label}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.4rem;
  font-family: 'Pretendard-Medium';
  position: fixed;
  top: 1rem;
  left: 1rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    top: 0;
    left: 0;
  }
`;

const Back = styled.img`
  padding: 1rem;
  width: 6rem;
  height: 6rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 50px;
    height: 50px;
  }
  @media screen and (max-width: 767px) {
    width: 50px;
    height: 50px;
  }
`;

export default Header;
