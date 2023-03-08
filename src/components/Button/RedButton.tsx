import styled from "styled-components";
import React from 'react'

interface Props {
  text: string;
  onClick: any;
}
const NewButton = styled.button`
  font-family:Arial, Helvetica, sans-serif;
  font-weight: 200;
  color: white;
  border: 0px solid lightgray;
  background-color: rgb(190, 60, 60);
  border-radius: 10px;
  height: 25px;
  min-width: 100px;
  margin: 5px;
  &:hover {
    background-color: rgb(180, 0, 0);
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