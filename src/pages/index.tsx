import LandingFooter from "@/components/FooterLanding";
import LandingHeader from "@/components/HeaderLanding";
import { useGeneral } from "@/context/generalContext";
import * as S from "@/styles/pages/landingPageStyles";
import { CaptchaChecker, RandomNumberGenerator } from "@/utils/captcha";
import { useEffect, useState } from "react";

export default function Home() {
  const [numbers, setNumbers] = useState(RandomNumberGenerator());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [ddd, setDdd] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [companyRole, setCompanyRole] = useState("");
  const [RangeOfCollaborators, setRangeOfCollaborators] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [receiveNotifications, setReceiveNotifications] = useState(false);
  const [data, setData] = useState({});
  const { showAlert } = useGeneral();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <LandingHeader />
      <S.MainContainer>
        <S.ContainerWithoutBackgroundColor>
          <S.GenericInformationContainer>
            <S.ContainerGenericTitle>
              <S.Title>
                Solução de registro de ponto completa para economizar tempo e
                dinheiro com seu RH!
              </S.Title>
              <S.SubTitle>
                plataforma simplificada para o colaborador registra seu ponto,
                com serviço de localização no registro de ponto
              </S.SubTitle>
            </S.ContainerGenericTitle>
            <S.GenericButtonWithBackgroundColor textAlign="left">
              TESTE GRATUITO
            </S.GenericButtonWithBackgroundColor>
          </S.GenericInformationContainer>

          <S.Imagem src="https://res.cloudinary.com/da4pzol89/image/upload/v1674404488/test/imagem-notebook-cell_1_wib1m8.png" />
        </S.ContainerWithoutBackgroundColor>
        <S.ContainerWithoutBackgroundColor>
          <S.Imagem src="https://png.pngtree.com/png-clipart/20210404/big/pngtree-hand-holding-mobile-phone-social-finger-click-to-browse-news-page-png-image_6188413.png" />
          <S.GenericInformationContainer>
            <S.ContainerGenericTitle>
              <S.Title>
                Funcionário registra seu ponto pelo próprio aparelho com
                <S.LineBreaker />
                <S.HighlightText>Apenas um click!</S.HighlightText>
              </S.Title>
              <S.SubTitle>
                texto genérico pacas onde voce pode fazer em qualquer lugar
              </S.SubTitle>
            </S.ContainerGenericTitle>
          </S.GenericInformationContainer>
        </S.ContainerWithoutBackgroundColor>
        <S.ContainerWithoutBackgroundColor>
          <S.GenericInformationContainer>
            <S.ContainerGenericTitle>
              <S.Title>
                Folha de ponto gerada
                <S.LineBreaker />
                <S.HighlightText>Automaticamente!</S.HighlightText>
              </S.Title>
              <S.SubTitle>
                Com duas opção de arquivo como PDF ou Excel
              </S.SubTitle>
            </S.ContainerGenericTitle>
          </S.GenericInformationContainer>
          <S.Imagem src="https://png.pngtree.com/png-clipart/20210404/big/pngtree-hand-holding-mobile-phone-social-finger-click-to-browse-news-page-png-image_6188413.png" />
        </S.ContainerWithoutBackgroundColor>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            if (CaptchaChecker(numbers, +captcha, showAlert)) {
              setData({
                name,
                email,
                companyName,
                cellPhone: ddd + cellPhone,
                RangeOfCollaborators,
                receiveNotifications,
              });
            }
          }}
        >
          <S.Title>Cadastra-se para um demostração gratuita</S.Title>
          <S.Input
            type="text"
            placeholder="Nome da Responsável*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <S.Input
            type="Email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <S.Input
            type="text"
            placeholder="Nome da Empresa*"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <S.CellContainer>
            <S.InputDDD
              type="text"
              placeholder="DDD"
              value={ddd}
              onChange={(e) => setDdd(e.target.value)}
              required
            />
            <S.Input
              type="text"
              placeholder="Celular*"
              value={cellPhone}
              onChange={(e) => setCellPhone(e.target.value)}
              required
            />
          </S.CellContainer>
          <S.Select
            value={companyRole}
            onChange={(e) => setCompanyRole(e.target.value)}
            required
          >
            <S.Option value="" selected disabled>
              Função
            </S.Option>
            <S.Option value="Proprietário/Diretor">
              Proprietário/Diretor
            </S.Option>
            <S.Option value="Recursos humanos">Recursos humanos</S.Option>
            <S.Option value="Departamento pessoal">
              Departamento pessoal
            </S.Option>
            <S.Option value="Administrativo/Financeiro">
              Administrativo/Financeiro
            </S.Option>
            <S.Option value="Jurídico">Jurídico</S.Option>
            <S.Option value="Tecnologia">Tecnologia</S.Option>
            <S.Option value="Outros">Outros</S.Option>
          </S.Select>
          <S.Select
            value={RangeOfCollaborators}
            onChange={(e) => setRangeOfCollaborators(e.target.value)}
            required
          >
            <S.Option value="" selected disabled>
              Faixa de colaboradores
            </S.Option>
            <S.Option value="até 10">até 10</S.Option>
            <S.Option value="de 11 a 20">de 11 a 20</S.Option>
            <S.Option value="de 21 a 50">de 21 a 50</S.Option>
            <S.Option value="de 51 a 100">de 51 a 100</S.Option>
            <S.Option value="de 101 a 500">de 101 a 500</S.Option>
            <S.Option value="acima de 500">acima de 500</S.Option>
          </S.Select>
          <S.PrivacyOrCaptchaContainer>
            <S.Label htmlFor="captcha">
              * {numbers[0]} + {numbers[1]} = ?
            </S.Label>
            <S.Input
              type="text"
              name="captcha"
              placeholder="Resposta"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              required
            />
          </S.PrivacyOrCaptchaContainer>
          <S.PrivacyOrCaptchaContainer>
            <S.ContainerCheckbox>
              <S.Checkbox
                type="checkbox"
                checked={receiveNotifications}
                onChange={(e) => setReceiveNotifications(e.target.checked)}
              />
              <S.SubTitle>concordo em receber notificações</S.SubTitle>
            </S.ContainerCheckbox>
            <S.SubTitle>
              ao informar meus dados, eu concordo com a Politica de Privacidade.
            </S.SubTitle>
          </S.PrivacyOrCaptchaContainer>
          <S.GenericButtonWithBackgroundColor textAlign="center" type="submit">
            TESTE GRATUITO
          </S.GenericButtonWithBackgroundColor>
        </S.Form>
      </S.MainContainer>

      <LandingFooter />
    </>
  );
}
