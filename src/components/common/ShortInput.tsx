import { styled } from 'styled-components';

type Props = {
  label: string;
  desc: string;
  value: string;
  callbackFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
};
function ShortInput({ label, desc, value, callbackFn, buttonText }: Props) {
  return (
    <ShortInputWrapper>
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
        disabled={!value}>
        {buttonText}
      </ShortButton>
    </ShortInputWrapper>
  );
}

const ShortInputWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 8.2rem 0 1.6rem 0;
`;

const ShortInputBox = styled.div`
  width: 30.7rem;
  height: 7.8rem;
  border-radius: 0.8rem;
  padding: 1.4rem 0.9rem;
`;

const ShortButton = styled.button`
  color: white;
  font-size: 1.4rem;
  border-radius: 0.8rem;
  padding: 2rem 2.4rem;
`;

const InputLabel = styled.div`
  font-size: 1.4rem;
  margin: 0 0 0.8rem 0;
`;

const Input = styled.input`
  font-size: 2rem;
  &::placeholder {
    color: #6d6b69;
  }
`;

export default ShortInput;
