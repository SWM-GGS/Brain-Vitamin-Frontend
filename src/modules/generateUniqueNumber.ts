export const generateUniqueNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(milliseconds).padStart(3, '0');
  const uniqueNumber = `${year}${formattedMonth}${formattedDay}-${formattedHours}${formattedMinutes}${formattedSeconds}${formattedMilliseconds}`;
  return uniqueNumber;
};
