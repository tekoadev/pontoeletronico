export const RandomNumberGenerator = () => {
  const fistNumber = Math.floor(Math.random() * 10) + 1;
  const secondNumber = Math.floor(Math.random() * 10) + 1;

  return [fistNumber, secondNumber];
};

export const CaptchaChecker = (
  numbers: number[],
  response: number,
  showAlert: (
    type: string,
    title: string,
    content: string,
    percentage?: number
  ) => void
) => {
  if (numbers[0] + numbers[1] === Number(response)) {
    return true;
  }
  showAlert("error", "Resposta errada", "");
  return false;
};
