import styled from "styled-components";

export const CalendarWrapper = styled.div`
  z-index: 1;
  width: 80vw;
  height: fit-content;
  margin: 10vh 5vw 0 5vw;
  background-color: var(--white);
  padding: 2vh 5vw;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  font-family: "Roboto", sans-serif;
  @media (min-width: 760px) {
    width: 60vw;
  }
  * > button {
    cursor: pointer;
  }
  @media (max-width: 760px) {
    height: fit-content;
  }
`;

export const AdmCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  z-index: 1;
  width: 100%;
  height: 80vh;
  margin-top: 10vh;
  background-color: var(--white);
  padding: 2vh 5vw;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  font-family: "Roboto", sans-serif;
  @media (min-width: 760px) {
    width: 100%;
    margin: 2vh;
    height: fit-content;
  }
  * > button {
    cursor: pointer;
  }
  background-color: var(--white);
`;
