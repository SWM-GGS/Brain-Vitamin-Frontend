import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 5rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 1.5rem;
  }
`;
const Clock = styled.div`
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/assets/images/clock.png');
  background-size: cover;
  border: 0.2rem solid #091921;
  box-shadow:
    0 -15px 15px rgba(255, 255, 255, 0.05),
    inset 0 -15px 15px rgba(255, 255, 255, 0.05),
    0 -5px 15px rgba(0, 0, 0, 0.3),
    inset 0 15px 15px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background: var(--black-color);
    border-radius: 50%;
    z-index: 10;
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 180px;
    height: 180px;
  }
  @media screen and (max-width: 767px) {
    width: 200px;
    height: 200px;
  }
`;
const Hour = styled.div`
  position: absolute;
`;
const Min = styled.div`
  position: absolute;
  width: 190px;
  height: 190px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 130px;
    height: 130px;
  }
  @media screen and (max-width: 767px) {
    width: 130px;
    height: 130px;
  }
`;
const Sec = styled.div`
  position: absolute;
  width: 230px;
  height: 230px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 140px;
    height: 140px;
  }
  @media screen and (max-width: 767px) {
    width: 140px;
    height: 140px;
  }
`;
const Hr = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 80px;
    background: var(--black-color);
    z-index: 10;
    border-radius: 6px 6px 0 0;
    @media screen and (min-width: 768px) and (max-height: 1079px) {
      width: 6px;
      height: 50px;
    }
    @media screen and (max-width: 767px) {
      width: 6px;
      height: 50px;
    }
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 100px;
    height: 100px;
  }
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
  }
`;
const Mm = styled.div`
  width: 190px;
  height: 190px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 90px;
    background: var(--black-color);
    z-index: 10;
    border-radius: 6px 6px 0 0;
    @media screen and (min-width: 768px) and (max-height: 1079px) {
      width: 3px;
      height: 60px;
    }
    @media screen and (max-width: 767px) {
      width: 3px;
      height: 60px;
    }
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 130px;
    height: 130px;
  }
  @media screen and (max-width: 767px) {
    width: 130px;
    height: 130px;
  }
`;
const Sc = styled.div`
  width: 230px;
  height: 230px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  &:before {
    content: '';
    position: absolute;
    width: 2px;
    height: 150px;
    background: #ff105e;
    z-index: 10;
    border-radius: 6px 6px 0 0;
    @media screen and (min-width: 768px) and (max-height: 1079px) {
      width: 2px;
      height: 90px;
    }
    @media screen and (max-width: 767px) {
      width: 2px;
      height: 90px;
    }
  }
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 140px;
    height: 140px;
  }
  @media screen and (max-width: 767px) {
    width: 140px;
    height: 140px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    gap: 2rem;
  }
  @media screen and (max-width: 767px) {
    gap: 2rem;
  }
`;
const Button = styled.button`
  padding: 3rem 4rem;
  font-size: 6rem;
  border-radius: 1rem;
  background: var(--button-bg-color);
  color: white;
  border: 0.2rem solid var(--gray-bg-color);
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3rem;
    padding: 1.5rem 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
    padding: 1.5rem 2rem;
  }
`;

export {
  Container,
  Clock,
  Hour,
  Min,
  Sec,
  Hr,
  Mm,
  Sc,
  ButtonContainer,
  Button,
};
