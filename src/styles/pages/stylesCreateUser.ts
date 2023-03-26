import styled from "styled-components";

interface StyledProps {
  active?: boolean;
  opened?: boolean
  borderError?: boolean
}


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  z-index: 1;
  border-radius: 6px;
  color: var(--white) !important;
  @media (min-width: 760px) {
    width: 60vw;
    margin: 2vh;
    height: fit-content;
  }
  display: flex;
  background: var(--inputs);
  box-shadow: var(--shadow);
  color: var(--white);
  flex-direction: column;

  > div {
    display: flex;

    > h3 {
      font-size: 24px;
      font-weight: 600;

      @media (max-width: 768px) {
        text-align: center;
      }
    }
  }
`;

export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
  }
  border-bottom: 1px solid var(--text);
  border-radius: 6px;
`;
export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Item = styled.div<StyledProps>`
  display: flex;
  padding: 24px 24px;
  align-items: center;
  gap: 12px;
  transition: 0.2s ease;
  cursor: pointer;
  background: ${(props) => (props.active ? "var(--inputs)" : "inherit")};

  > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    color: var(--white) !important;

    > span {
      font-weight: 500;
      font-size: 16px;
    }

    > svg {
      font-weight: 300;
      font-size: 14px;

      @media (max-width: 690px) {
        font-size: 12px;
      }
    }
  }
  > :first-child {
    height: 10%;
    color: var(--white);
    filter: invert(1);
  }
  img:last-child {
    transform: rotate(${(props) => (props.opened ? 90 : 0)}deg);
  }
  border-bottom: 1px solid var(--text);
  border-radius: 6px;
`;

export const SubItemContainer = styled.div<StyledProps>`
  display: flex;
  overflow: hidden;
  transition: 0.3s ease;
  max-height: ${(props) => (props.opened ? "fit-content" : 0)};
  transition: 2s ease;
  * {
    max-height: ${(props) => (props.opened ? "fit-content" : 0)};
  }
`;

export const Wrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const DownloadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 24px;
  margin: 0 2%;
  padding-bottom: 15px;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const DownloadWrapperColumn = styled.div`
  margin-top: 2vh;
  width: 100%;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (max-width: 750px) {
    max-width: 100%;
  }
`;

export const DownloadLabel = styled.label`
  margin-bottom: 12px;
  width: 100%;
`;

export const DownloadInput = styled.input<StyledProps>`
  width: 60%;
  background-color: var(--inputs);
  color: var(--white);
  border-radius: 8px;
  padding: 6px;
  border: ${(props) =>
    props.borderError
      ? "1px solid var(--red-alert)"
      : "1px solid var(--white)"};
`;

export const DownloadSelect = styled.select`
  width: 80%;
  background-color: var(--white);
  border-radius: 8px;
  padding: 6px;
`;

export const DownloadOption = styled.option`
  width: 100%;
`;

export const DownloadButtons = styled.div`
  width: 100%;
  margin: 24px 0;
  display: flex;
  justify-content: center;
  > div {
    display: flex;
    justify-content: center;
  }
  > button {
    font-weight: 800;
    color: var(--select);
    border-radius: 6px;
    padding: 12px 18px;
    font-size: large;
    background-color: var(--primary);
    border: 1px solid var(--select);
    :hover {
      background-color: var(--primary-hover);
      color: var(--text);
      border: 1px solid var(--text);
    }
  }
`;

export const Error = styled.span`
  margin-top: 5px;
  color: var(--red-alert);
  font-size: 11px;
`;

export const Toggle = styled.label``;

export const InterrogationWrapper = styled.div`
  position: fixed;
  right: 21vw;
  top: 25vh;
  > img {
    width: 2.5vw;
    height: auto;
  }
  @media (max-width: 750px) {
    right: 7vw;
    top: 20vh;
    > img {
      width: 5vw;
      height: auto;
    }
  }
`;
