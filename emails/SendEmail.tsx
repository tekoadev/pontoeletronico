import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";


export interface ICollaborator {
  RangeOfCollaborators: string;
  cellPhone: string;
  companyName: string;
  email: string;
  name: string;
  receiveNotifications: boolean;
}

export default function Email({ data }: { data: ICollaborator }) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Pedido para testar o produto!</Text>
          <Text style={paragraph}>
            <Text style={paragraph}>Nome: {data.name}</Text>
            <Text style={paragraph}>Email: {data.email}</Text>
            <Text style={paragraph}>Telefone: {data.cellPhone}</Text>
            <Text style={paragraph}>Nome da empresa: {data.companyName}</Text>
            <Text style={paragraph}>
              Quantidade de funcionários: {data.RangeOfCollaborators}
            </Text>
            <Text style={paragraph}>
              Deseja receber notificação?{" "}
              {data.receiveNotifications ? "Sim" : "Não"}
            </Text>
          </Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#ffffff",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

