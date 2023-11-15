import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError) => {
  return `더 좋은 서비스를 위해 작업 중입니다.
  잠시만 기다려 주세요.
  status: ${error.response?.status}
  statusText: ${error.response?.statusText}`;
};
