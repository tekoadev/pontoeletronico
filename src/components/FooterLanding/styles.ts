import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 40px;
  background-color: #1f2933;

  @media (max-width: 425px) {
    gap: 40px;
    flex-direction: column;
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

export const Nav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ItemNav = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    cursor: pointer;

    > img {
      aspect-ratio: 1/1;
    }
  }
`;
