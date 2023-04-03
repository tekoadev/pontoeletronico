export const cpfFormatter = (cpf: string): string => {
  // retira os caracteres indesejados...
  cpf = cpf.replace(/\D/g, "");

  // realizar a formatação...
  return cpf
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    .substring(0, 14);
};

export const cnpjFormatter = (cnpj: string): string => {
  // retira os caracteres indesejados...
  cnpj = cnpj.replace(/\D/g, "");

  // realizar a formatação...
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

export const hourFormatter = (hour: string): string => {
  // retira os caracteres indesejados...

  hour = hour.replace(/\D/g, "");
  const newHour = hour.split("");
  newHour.shift();
  hour = newHour.join('');

  // realizar a formatação...
  return hour.replace(/(\d{2})(\d{2})/, "$1:$2");
};
