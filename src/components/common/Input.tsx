import { styled } from 'styled-components';

type Props = {
  label: string;
  desc: string;
  value: string;
  callbackFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
};
function Input({ label, desc, value, callbackFn, ...props }: Props) {
  return (
    <InputBox
      {...props}
      style={{
        background: value ? 'white' : '#f4f4f4',
        border: value ? '0.2rem solid var(--main-color)' : 'none',
        ...props.style,
      }}>
      <InputLabel
        style={{
          color: value ? 'var(--main-color)' : '#6D6B69',
        }}>
        {label}
      </InputLabel>
      <InputArea placeholder={desc} value={value} onChange={callbackFn} />
    </InputBox>
  );
}

const InputBox = styled.div`
  width: 41.2rem;
  height: 7.8rem;
  border-radius: 0.8rem;
  padding: 1.4rem 0.9rem;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 7rem;
  }
`;

const InputLabel = styled.div`
  font-size: 1.4rem;
  margin: 0 0 0.8rem 0;
`;

const InputArea = styled.input`
  font-size: 2rem;
  &::placeholder {
    color: #6d6b69;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

export default Input;
