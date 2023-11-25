import { styled } from 'styled-components';

type Props = {
  label: string;
  desc: string;
  value: string;
  callbackFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  onClickButton: () => void;
  style?: React.CSSProperties;
};
function ShortInput({
  label,
  desc,
  value,
  callbackFn,
  buttonText,
  onClickButton,
  ...props
}: Readonly<Props>) {
  return (
    <ShortInputContainer {...props} style={props.style}>
      <ShortInputBox
        style={{
          background: value ? 'white' : '#f4f4f4',
          border: value ? '0.2rem solid var(--main-color)' : 'none',
        }}>
        <InputLabel
          style={{
            color: value ? 'var(--main-color)' : '#6D6B69',
          }}>
          {label}
        </InputLabel>
        <Input placeholder={desc} value={value} onChange={callbackFn} />
      </ShortInputBox>
      <ShortButton
        style={{
          background: value ? 'var(--main-color)' : '#C6C6C6',
        }}
        disabled={!value}
        onClick={onClickButton}>
        {buttonText}
      </ShortButton>
    </ShortInputContainer>
  );
}

const ShortInputContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const ShortInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30.7rem;
  height: 7.8rem;
  border-radius: 0.8rem;
  padding: 1.4rem 0.9rem;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    height: 7rem;
    padding: 1rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 86px;
  }
`;

const ShortButton = styled.button`
  color: white;
  font-size: 1.4rem;
  border-radius: 0.8rem;
  width: 125px;
  @media screen and (max-width: 767px) {
    height: 86px;
  }
`;

const InputLabel = styled.div`
  font-size: 1.4rem;
  margin: 0 0 0.8rem 0;
`;

const Input = styled.input`
  width: 100%;
  font-size: 2rem;
  &::placeholder {
    color: #6d6b69;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

export default ShortInput;
