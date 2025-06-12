import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';
import { Loader } from '../common/Loader';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  function togglePopup(e) {
    if (e.currentTarget !== e.target) return;
    setSettings((prevState) => ({ ...prevState, visible: false }));
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSettings((prevState) => ({ ...prevState, visible: false }));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setSettings]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visible]);

  return (
    <PopupContainer visible={visible} onClick={togglePopup}>
      <StyledPopup>
        {!content || Object.keys(content).length === 0 ? (
          <Loader />
        ) : (
          <>
            <CloseIcon onClick={togglePopup} />
            <PopupHeader
              name={name}
              gender={gender}
              image={image}
              status={status}
              species={species}
              type={type}
            />
            <PopupInfo origin={origin} location={location} />
            <PopupEpisodes episodes={episodes} />
          </>
        )}
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visible 0.3s;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 930px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 50%;
`;
