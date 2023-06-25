import styled from "styled-components";
import React from 'react'

interface Props {
  text: string
  onClick?: any
  type?: 'button' | 'submit'
}

const NewButton = styled.button`
  font-weight: 200;
  color: white;
  border: none;
  background: #007449;
  border-radius: 5px;
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
  type = 'button'
  }) => {
  return (
    <NewButton type={type} onClick={onClick? onClick : undefined}> {text} </NewButton>
  )
}

export default GreenButton;