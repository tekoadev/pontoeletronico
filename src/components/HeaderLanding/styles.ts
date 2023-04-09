import styled from "styled-components";

interface StyleDProps {
  active: boolean;
}

export const Open = styled.div<StyleDProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  align-items: center;
  min-width: 100vw;
  height: 10vh;
  background-color: #1f2933;
  margin: 0;
  padding: 0 2.5vw;
  /* box-shadow: ${(props) => (props.active ? "none" : "0px 0px 15px black")}; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--white);
  z-index: 4;
  gap: 12px;

  > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;

    > div:nth-child(2) {
      display: flex;
      gap: 30px;

      @media (max-width: 1024px) {
        display: none;
      }
    }
  }

  > div:nth-child(2) {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 48px;
  gap: 2px;

  > p {
    white-space: nowrap;
    font-weight: 800;
    font-size: 24px;
    cursor: pointer;
  }
`;

export const Fig = styled.figure`
  height: 80%;
  margin: 0;
  > img {
    height: 80%;
    width: fit-content;
    cursor: pointer;
  }
`;

export const Text = styled.p`
  font-size: 14px;
  align-items: center;
  align-content: center;
  display: flex;
  font-weight: 500;
  color: white;
`;

export const TextEmphasis = styled.p`
  font-size: 14px;
  align-items: center;
  align-content: center;
  display: flex;
  font-weight: bold;

  height: 60px;
  border: 1px solid white;
  padding: 0px 20px;
  border-radius: 15px;

  background-color: transparent;
  color: white;

  @media (max-width: 1024px) {
    display: none;
  }

  :hover {
    background-color: white;
    color: black;
  }
`;

export const TestButton = styled.p`
  font-size: 14px;
  align-items: center;
  align-content: center;
  display: flex;
  font-weight: bold;

  height: 60px;
  border: 1px solid white;
  padding: 0px 20px;
  border-radius: 15px;
  background-color: white;
  color: black;

  @media (max-width: 1024px) {
    display: none;
  }

  :hover {
    background-color: transparent;
    color: white;
  }
`;

export const HamburgerButton = styled.button`
  width: 30px;
  height: ${(props) => (props.theme == "active" ? "20px" : "24px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  background-color: transparent;
  border: none;
  align-items: ${(props) => (props.theme == "active" ? "center" : "")};
  justify-content: ${(props) => (props.theme == "active" ? "center" : "")};
  padding-top: ${(props) => (props.theme == "active" ? "10px" : "0px")};

  .bar1,
  .bar2,
  .bar3 {
    width: 100%;
    height: 4px;
    background-color: white;
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  .bar1 {
    transform: ${(props) =>
      props.theme == "active" ? "rotate(-45deg)" : "rotate(0deg)"};
    margin-bottom: ${(props) => (props.theme == "active" ? "-5px" : "0")};
  }

  .bar2 {
    opacity: ${(props) => (props.theme == "active" ? "0" : "1")};
  }

  .bar3 {
    transform: ${(props) =>
      props.theme == "active" ? "rotate(45deg)" : "rotate(0deg)"};
    margin-bottom: ${(props) => (props.theme == "active" ? "6px" : "0")};
  }

  @media (min-width: 1025px) {
    display: none;
    width: 0px;
    height: 0px;
  }
`;

export const NavMobileOptions = styled.div<StyleDProps>`
  position: fixed;
  top: 10vh;
  left: 0;
  background-color: #1f2933;
  box-shadow: 0 0 15px black;
  color: white;
  width: 100vw;
  height: ${(props) => (props.active ? "320px" : "0px")};
  overflow-y: hidden;
  padding-bottom: ${(props) => (props.active ? "40px" : "0px")};
  padding-top: ${(props) => (props.active ? "30px" : "0px")};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  @media (min-width: 1025px) {
    display: none;
    width: 0px;
    height: 0px;
  }

  > p {
    width: max-content;
    text-align: end;
    padding-right: 40px;
    font-size: 18px;
  }
`;
