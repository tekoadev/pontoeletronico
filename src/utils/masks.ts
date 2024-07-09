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
  hour = newHour.join("");

  // realizar a formatação...
  return hour.replace(/(\d{2})(\d{2})/, "$1:$2");
};

export const verifyHour = (hour: string) => {
  if(Number(hour[0]) > 2){
    return false
  }

  if(Number(hour[0]) == 2 && Number(hour[1]) > 3){
    return false
  }

  if(Number(hour[3]) > 5){
    return false
  }

  return true
}


export const phoneFormatter = (phone: string): string => {
  const cleaned = ('' + phone).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{5})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + ' ' + match[3] + '-' + match[4]
  }

  const match2 = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/)
  if (match2) {
    return (
      '(' + match2[1] + ') ' + match2[2] + ' ' + match2[3] + '-' + match2[4]
    )
  }
  return phone
}

export const checkPhone = (phone: string): boolean => {
  const cleaned = ('' + phone).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/)
  if (match) {
    return true
  }

  const match2 = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{3})$/)
  if (match2) {
    return true
  }
  return false
}