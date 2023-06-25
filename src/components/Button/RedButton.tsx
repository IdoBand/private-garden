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
  background: linear-gradient(25deg, rgb(190, 60, 60), rgb(255, 0, 0));
  border-radius: 5px;
  height: 25px;
  min-width: 100px;
  margin: 5px;
  white-space: nowrap;
  &:hover {
    background: rgb(180, 0, 0);
    cursor: pointer;
  }
`

const RedButton: React.FC<Props> = ({
  text, 
  onClick,
  }) => {
  
return (
  <NewButton onClick={onClick}> {text} </NewButton>
)
}
export default RedButton