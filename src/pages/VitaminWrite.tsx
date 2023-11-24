import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import { useModal } from '../hooks/useModal';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { generateUniqueNumber } from '../modules/generateUniqueNumber';
import axios, { AxiosError } from 'axios';
import LayerPopup from '../components/common/LayerPopup';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Input from '../components/common/Input';
import { MultiSelect, Option } from 'react-multi-select-component';
import Button from '../components/common/Button';
import { getErrorMessage } from '../utils/getErrorMessage';

type Props = {
  closeModal?: () => void;
};
function VitaminWrite({ closeModal }: Readonly<Props>) {
  const { accessToken, nickname } = useSelector(
    (state: RootState) => state.user,
  );
  const [image, setImage] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState('');
  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const [year, setYear] = useState(currentYear);
  const [season, setSeason] = useState('SPRING');
  const [place, setPlace] = useState('');
  const [headCount, setHeadCount] = useState('');
  const { isModalOpen, modalText, openModal } = useModal();
  const relationships = [
    '배우자',
    '아들',
    '딸',
    '아버지',
    '어머니',
    '며느리',
    '사위',
    '할아버지',
    '할머니',
    '손자',
    '손녀',
    '형제',
    '자매',
    '사촌',
    '고모',
    '이모',
    '삼촌',
    '외삼촌',
    '조카',
    '조카딸',
    '외할머니',
    '외할아버지',
  ].map((v, i) => {
    return { label: v, value: i + 1 };
  });
  const [selectedFamily, setSelectedFamily] = useState<Option[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onChangeProfileImgUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageArr = e.target.files;
    const maxImageLength = 1;
    if (!imageArr?.length) return;
    if (imageArr.length > maxImageLength) {
      openModal('최대 등록 가능한 이미지 개수를 초과했습니다.');
      return;
    }
    const image = imageArr[0];
    if (
      image.type !== 'image/jpeg' &&
      image.type !== 'image/jpg' &&
      image.type !== 'image/png'
    ) {
      openModal('JPG 혹은 PNG 확장자의 이미지 파일만 등록 가능합니다.');
      return;
    }
    setImage(image);
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
      }
    };
  };

  const handleSave = async () => {
    if (!image) return;
    setSubmitLoading(true);
    let uploadUrl = '';
    const region = 'ap-northeast-2';
    const bucket = 'brain-vitamin-user-files';
    const s3Client = new S3Client({
      region, // AWS 리전을 설정하세요
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });
    const path = `vitamin/${generateUniqueNumber()}`;
    const uploadParams = {
      Bucket: bucket,
      Key: path,
      Body: image,
    };
    try {
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);
      uploadUrl = `https://${bucket}.s3.${region}.amazonaws.com/${path}`;
    } catch (error) {
      console.error(error);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/family-stories/pictures`,
        {
          season,
          place,
          year,
          headCount: +headCount,
          familyRelations: selectedFamily.map((v) => v.value),
          imgUrl: uploadUrl,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!data.isSuccess) {
        openModal(data.message);
        return;
      }
      openModal(data.result);
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      const errorMessage = getErrorMessage(axiosError);
      openModal(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Container onClick={closeModal}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <Header>
          <Label>우리가족 비타민 만들기</Label>
          <CloseIcon
            alt="로고"
            src="/assets/images/close.svg"
            onClick={closeModal}
          />
        </Header>
        <ProfileContainer>
          <input
            style={{ display: 'none' }}
            type="file"
            id="image"
            accept="image/jpg, image/jpeg, image/png"
            onChange={onChangeProfileImgUrl}
          />
          <ImageContainer>
            <label htmlFor="image">
              {previewUrl ? <Image alt="" src={previewUrl} /> : null}
              <ChangeImageText>사진 업로드</ChangeImageText>
            </label>
          </ImageContainer>
          <SubText>
            아래 들어가는 사진 정보는 {nickname}님만을 위한{'\n'}인지 기능향상
            문제 생성에 활용돼요
          </SubText>
        </ProfileContainer>
        <FormContainer>
          <InputContainer>
            <Intro>언제 찍었나요?</Intro>
            <Align>
              <Select
                defaultValue={currentYear}
                onChange={(e) => setYear(+e.target.value)}>
                {Array.from(
                  { length: currentYear - startYear + 1 },
                  (_, i) => currentYear - i,
                ).map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
              <Select
                defaultValue="SPRING"
                onChange={(e) => setSeason(e.target.value)}>
                <option value="SPRING">봄</option>
                <option value="SUMMER">여름</option>
                <option value="FALL">가을</option>
                <option value="WINTER">겨울</option>
              </Select>
            </Align>
          </InputContainer>
          <InputContainer>
            <Intro>어디에서 찍었나요?</Intro>
            <Input
              label="장소"
              desc="장소를 입력해주세요"
              value={place}
              callbackFn={(e) => setPlace(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Intro>사진에 몇 명이 있나요?</Intro>
            <Input
              label="인원수"
              desc="인원수를 입력해주세요"
              value={headCount}
              callbackFn={(e) =>
                setHeadCount(e.target.value.replace(/\D/g, ''))
              }
            />
          </InputContainer>
          <InputContainer>
            <Intro>사진에 누가 있나요?</Intro>
            <MultiSelect
              options={relationships}
              value={selectedFamily}
              onChange={setSelectedFamily}
              labelledBy="우리 가족 구성원 중에 선택하기"
              className="select"
            />
          </InputContainer>
          <Button
            style={{ width: '100%' }}
            text="저장"
            onClick={handleSave}
            disabled={
              !image ||
              !year ||
              !season ||
              !place ||
              !headCount ||
              selectedFamily.length === 0
            }
            loading={submitLoading}
          />
        </FormContainer>
      </Popup>
      {isModalOpen && (
        <LayerPopup
          label={modalText}
          centerButtonText="확인"
          onClickCenterButton={closeModal}
          closeModal={closeModal}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  @media screen and (max-width: 767px) {
    align-items: flex-end;
  }
`;
const Popup = styled.div`
  width: 800px;
  height: 1000px;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  white-space: pre-line;
  padding: 5rem 4rem;
  overflow: auto;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 450px;
    height: 580px;
    padding: 3rem 2rem;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: calc(var(--vh, 1vh) * 93);
    padding: 2rem;
    border-radius: 1.6rem 1.6rem 0 0;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CloseIcon = styled.img`
  width: 50px;
  height: 50px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 30px;
    height: 30px;
  }
  @media screen and (max-width: 767px) {
    width: 30px;
    height: 30px;
  }
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Intro = styled.p`
  font-size: 2.4rem;
  font-family: Pretendard-Medium;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const Image = styled.img`
  display: block;
  object-fit: cover;
  width: 300px;
  height: 300px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 767px) {
    width: 125px;
    height: 125px;
  }
`;
const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
  width: 300px;
  height: 300px;
  border-radius: 4px;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 767px) {
    width: 125px;
    height: 125px;
  }
`;
const ChangeImageText = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.3rem;
  }
`;
const SubText = styled.p`
  color: #433d3a;
  text-align: center;
  font-size: 1.4rem;
`;
const Align = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
const Select = styled.select`
  width: 100%;
  height: 57px;
  font-size: 2rem;
  color: #6d6b69;
  appearance: none;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url('/assets/images/select.svg') calc(100% - 15px) center
    no-repeat;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  padding: 9px 30px;
`;

export default VitaminWrite;
