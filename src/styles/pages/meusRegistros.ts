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
