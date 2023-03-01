import styled from "styled-components";
import React from 'react'

interface Props {
  text: string;
  onClick: () => void;
  width: string;
}

const GreenButton: React.FC<Props> = ({
  text, 
  onClick,
  width,
  }) => {
  const NewButton = styled.button`
  font-family:Arial, Helvetica, sans-serif;
  font-weight: 200;
  color: white;
  border: 0px solid lightgray;
  background-color: rgb(0, 90, 0);
  border-radius: 10px;
  height: 25px;
  width: ${width}px;
  margin: 5px;
  &:hover {
    color: dark-grey;
    background-color: rgb(0, 150, 0);
  }
`
return (
  <NewButton
    onClick={onClick}
  > 
    {text}
  </NewButton>
)
}
export default GreenButton