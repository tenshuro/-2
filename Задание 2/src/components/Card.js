import styled from 'styled-components';
import { ReactComponent as Male } from '../assets/genders/male.svg';
import { ReactComponent as Female } from '../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../assets/genders/genderless.svg';

export function Card({ status, name, species, type, gender, image, onClickHandler }) {
  return (
    <StyledCard onClick={onClickHandler}>
      <CardImg src={image} alt={name} />

      <CardInfo>
        <CardTitle name={name} gender={gender} />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </StyledCard>
  );
}

function CardTitle({ name, gender }) {
  return (
    <CardTitleContainer>
      <StyledCardTitle>{name}</StyledCardTitle>
      <IconContainer>
        {gender === 'Male' && <Male width={20} height={20} fill="#33b3c8" />}
        {gender === 'Female' && <Female width={24} height={24} fill="pink" />}
        {(gender === 'unknown' || gender === 'Genderless') && (
          <Genderless width={24} height={24} fill="#999" />
        )}
      </IconContainer>
    </CardTitleContainer>
  );
}

function CardStatus({ status, species, type }) {
  return (
    <CardStatusContainer>
      <StyledCardStatus status={status}>{status}</StyledCardStatus>
      &nbsp;-&nbsp;
      <CardSpecies>{species}</CardSpecies>
      {type && <CardType>{type}</CardType>}
    </CardStatusContainer>
  );
}

// Styled Components
const StyledCard = styled.div`
  cursor: pointer;
  background-color: #3b4a67;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardImg = styled.img`
  width: 100%;
  height: auto;
`;

const CardInfo = styled.div`
  padding: 12px;
`;

const CardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCardTitle = styled.h3`
  font-size: 18px;
  color: white;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardStatusContainer = styled.div`
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledCardStatus = styled.span`
  color: ${({ status }) =>
    status === 'Alive' ? '#6eff6e' : status === 'Dead' ? '#ff6e6e' : '#ccc'};
`;

const CardSpecies = styled.span`
  color: #ccc;
`;

const CardType = styled.span`
  font-style: italic;
  color: #999;
  margin-left: 5px;
`;
