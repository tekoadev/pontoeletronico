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
  }
`;

export const ContainerTableComponent = styled.div`
  width: 100%;
  height: calc((80vh - 260px));
  overflow: auto;
`;
