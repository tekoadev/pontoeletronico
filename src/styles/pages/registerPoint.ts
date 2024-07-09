import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 1;

  flex-direction: column;
  align-content: space-around;
  justify-content: space-between;
  align-items: center;
  min-height: 86vh;
  min-width: 100vw;
  padding: 0 80px;
  padding-top: 14vh;
  padding-bottom: 5vh;
  background-color: #ebf0f5;
  overflow: scroll;

  &.home {
    padding: 50px 0;
  }
`;

export const ReportWrapper = styled.div`
  width: 80%;
  min-width: 800px;
  height: 80vh;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  background-color: var(--white);
  margin: 0 auto;
`;

export const ReportInputs = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-between;
  padding: 20px;
`;

export const EmployLabel = styled.label`
  margin-bottom: 12px;
  width: 100%;
`;

export const EmploySelect = styled.select`
  width: max-content;
  background-color: var(--white);
  border-radius: 8px;
  padding: 6px;
`;

export const EmployOptions = styled.option`
  width: 100%;
`;

export const EmployColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const DownloadPDF = styled.button`
  background-color: green;
  border: none;
  padding: 12px;
  border-radius: 12px;
  color: var(--white);
  font-weight: 600;
`;

export const TableHeadersColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;

  width: 100%;

  > div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

export const TableHeadersText = styled.p`
  text-align: start;
  margin: 2px 0;
`;

export const TableComponent = styled.table`
  width: 100%;
  height: 400px;

  overflow: hidden;
  overflow-y: auto;
  text-align: center;
  position: relative;

  > tr:nth-child(1) {
    position: sticky;
    top: 0px;
    height: 40px;

    background-color: white; /* opcional, para esconder o cabeçalho quando o usuário rolar para cima */
    border: 1px solid black;

    th {
      padding-top: 0px;
      border-left: 1px solid black;
    }
  }

  td {
    border-left: 1px solid black;
    width: 230px;

    svg {
      margin-left: 10px;
    }

    .plus {
      margin: 0px;
    }
  }

  .day {
    width: 80px;
  }
`;

export const ContainerTableComponent = styled.div`
  width: 100%;
  height: calc((80vh - 260px));
  overflow: auto;
`;

export const ContainerHome = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 80px;
  max-width: 1500px;
`;

export const ContainerInfo = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

export const Infos = styled.div`
  border: 1px solid var(--text);
  border-radius: 10px;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    width: 290px;
  }
  @media (min-width: 905px) {
    width: fit-content;
  }

  @media (min-width: 1405px) {
    :nth-child(1) {
      width: 400px;
    }
    :nth-child(2) {
      width: 500px;
    }
  }
  @media (min-width: 1410px) {
    :nth-child(1) {
      width: 500px;
    }
    :nth-child(2) {
      width: 600px;
    }
  }

  h3 {
    font-size: 15px;
    color: var(--select);

    &.employee {
      font-size: 13px;
    }

    @media (min-width: 905px) {
      font-size: 25px;

      &.employee {
        font-size: 25px;
      }
    }

    @media (min-width: 1024px) {
      font-size: 30px;

      &.employee {
        font-size: 30px;
      }
    }
  }

  p {
    color: var(--select);
    font-weight: 500;
  }
`;

export const InfoAlignment = styled.div`
  display: flex;
  gap: 50px;
  font-size: 30px;
  margin-top: 30px;
  align-items: center;
`;

export const ImageContainer = styled.figure`
  display: none;
  width: 50px;

  .true {
    transform: rotate(90deg);
  }

  .false {
    transform: rotate(0);
  }

  &.info {
    display: block;
    width: 20px;
  }

  .timeInACloud {
    width: 80px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 1020px) {
    display: block;
  }

  @media (min-width: 1170px) {
    width: 100px;

    .timeInACloud {
      width: 150px;
    }
  }
`;

export const InfosDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: var(--select);
    font-weight: 600;
    font-size: 10px;

    @media (min-width: 905px) {
      font-size: 16px;
    }
  }

  div {
    display: flex;
    gap: 30px;
    margin-top: 10px;
    align-items: center;
  }
`;

export const ContainerOptions = styled.div`
  width: 100%;
  margin-top: 50px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;
export const ContainerOptionsInfo = styled.div`
  border: 1px solid var(--text);
  border-radius: 10px;
`;

export const OptionsInfo = styled.div`
  border: 1px solid var(--text);
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  gap: 10px;
  cursor: pointer;

  .info {
    width: 80px;
  }
`;

export const OptionsAlignment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .align {
    width: 80px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    p,
    span {
      color: var(--select);
      font-weight: 600;
      font-size: 10px;

      @media (min-width: 768px) {
        font-size: 16px;
      }
    }

    p {
      color: var(--text);
    }
  }
`;

export const Calendar = styled.div`
  width: 100%;
`;

export const Download = styled.div`
  width: 100%;
  padding: 10px 10px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  > div:last-child > button {
    padding: 10px;
    border: 1px solid var(--select);
    border-radius: 10px;
    background-color: var(--background);
    color: var(--white);

    :hover {
      opacity: 0.6;
      color: var(--select);
    }

    @media (min-width: 768px) {
      padding: 15px;
      font-size: 20px;
    }
  }
`;

export const DownloadAlignment = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-around;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    p {
      width: fit-content;
      font-size: 14px;

      @media (min-width: 768px) {
        font-size: 20px;
      }
    }

    select {
      width: max-content;
      font-size: 10px;
      border-radius: 10px;
      border: 1px solid var(--select);
      cursor: pointer;
      outline: none;

      @media (min-width: 768px) {
        font-size: 16px;
        padding: 3px 0 3px 5px;
      }

      @media (min-width: 1020px) {
        font-size: 20px;
      }
    }

    input {
      width: 100%;
      max-width: 60px;
      border-radius: 10px;
      border: 1px solid var(--select);
      font-size: 10px;
      padding-left: 5px;
      outline: none;

      @media (min-width: 768px) {
        padding: 5px 0 5px 5px;
        font-size: 16px;
        width: 50%;
      }
    }
  }
`;

export const CalendarWrapper = styled.div`
  z-index: 1;
  width: 80vw;
  height: fit-content;
  margin: 10vh 5vw 0 5vw;
  background-color: var(--white);
  padding: 2vh 5vw;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  @media (min-width: 760px) {
    width: 60vw;
  }
  * > button {
    cursor: pointer;
  }
  @media (min-width: 760px) {
    height: fit-content;
    width: 50vw;
  }
  .react-calendar__navigation {
    width: 100%;
    align-items: center;
    display: flex;
  }

  .react-calendar button {
    margin: 2vh 0;
    border: 0;
    outline: none;
    font: inherit;
    font-size: 0.8em;
    border: none;
  }
  .react-calendar__month-view__weekdays__weekday :first-child {
    text-decoration: none;
  }

  .red_item abbr {
    background-color: green;
    border-radius: 5px;
    padding: 2px;
    width: 40%;
    margin: 0 30%;
  }

  * abbr {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .react-calendar__navigation {
    gap: 5vw;
  }
`;

export const InputCheckBox = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #ccc;
  position: relative;

  width: 120px;
  height: 35px;
  padding-left: 5px;
  margin: 0px 4px;
  border-radius: 5px;

  background-color: ${(props) => (props.checked ? "#97C160" : "#E5E5E5")};

  display: flex;
  align-items: center;

  &:after {
    content: ${(props) => (props.checked ? "Pago ✔" : "Em aberto ✘")}; ;
    color: white;
    font-size: 20px;
    display: ${(props) => (props.checked ? "block" : "none")}
    left: 0;
    position: absolute;
    
  }
`;
