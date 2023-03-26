import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-between;
  align-items: center;

  padding-top: 14vh;

  min-height: 86vh;
  min-width: 100vw;

  background-color: #ebf0f5;
`;

export const ReportInputs = styled.div`
  display: flex;
  min-width: calc(100%-48px);
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
`;

export const EmployColumn = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;
`;

export const ReportWrapper = styled.div`
  width: 80%;
  min-width: 800px;
  height: 80vh;

  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.2);
  border-radius: 12px;

  background-color: var(--white);
`;

export const EmployLabel = styled.label`
  margin-bottom: 12px;
  width: 100%;
`;

export const TableHeadersText = styled.p`
  text-align: start;
  margin: 2px 0;
`;

export const TableHeadersColumn = styled.div``;

export const TableHeadersWrapper = styled.div`
  display: flex;
  min-width: calc(100%-48px);
  justify-content: space-between;
  align-items: center;
  padding: 4px 24px;
`;

export const EmploySelect = styled.select`
  width: 80%;
  background-color: var(--white);
  border-radius: 8px;
  padding: 6px;
`;

export const EmployOptions = styled.option`
  width: 100%;
`;

export const DownloadPDF = styled.button`
  background-color: green;
  border: none;
  padding: 12px;
  border-radius: 12px;
  color: var(--white);
  font-weight: 600;
`;

