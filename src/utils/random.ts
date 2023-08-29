export const getRandomFloat = () => {
  const randomBytes = new Uint32Array(1); // 4바이트 무작위 배열
  window.crypto.getRandomValues(randomBytes);
  return randomBytes[0] / 0xffffffff;
};
