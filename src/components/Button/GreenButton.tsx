import styled from "styled-components";
import React from 'react'

interface Props {
  text: string;
  onClick: any;
}

const NewButton = styled.button`
  font-weight: 200;
  color: white;
  border: none;
  background: linear-gradient(25deg, rgb(0, 150, 0), rgb(0,255,0));
  border-radius: 10px;
  height: 25px;
  min-width: 100px;
  margin: 5px;
  white-space: nowrap;
  &:hover {
    background-color: rgb(0, 90, 0);
    cursor: pointer;
  }
`;

const GreenButton: React.FC<Props> = ({
  text, 
  onClick,
  }) => {
  return (
    <NewButton onClick={onClick}> {text} </NewButton>
  )
}

export default GreenButton;