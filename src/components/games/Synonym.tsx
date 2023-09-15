import styled from 'styled-components';

const Letter = styled.span`
  font-family: Pretendard-Bold;
  font-size: 6rem;
  padding: 3rem 0;
  background: #fff0da;
  border-radius: 1rem;
  width: 400px;
  margin: 0 auto;
  text-align: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3.6rem;
    padding: 1.5rem 0;
    width: 280px;
  }
  @media screen and (max-width: 767px) {
    font-size: 2.4rem;
    padding: 1.5rem 0;
    width: 230px;
    margin: 1rem auto;
  }
`;

export default Letter;
