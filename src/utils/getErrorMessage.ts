import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError) => {
  return `[일시적인 오류 발생]
  이용에 불편을 드려 죄송합니다.
  status: ${error.response?.status}
  statusText: ${error.response?.statusText}`;
};
