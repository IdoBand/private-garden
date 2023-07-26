import styled from "styled-components";
import React from 'react'

const basicStyle = `
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
`

const NotAllowed = styled.button`
${basicStyle}
&:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
`;
const Wait = styled.button`
${basicStyle}
&:disabled {
  cursor: wait;
  opacity: 0.6;
}
`;

interface Props {
  text: string
  onClick?: any
  type?: 'button' | 'submit'
  isDisabled: boolean
  waitOrNotAllowed?: 'wait' | 'not-allowed'
}


const GreenButton: React.FC<Props> = ({
  text, 
  onClick,
  type = 'button',
  isDisabled,
  waitOrNotAllowed
  }) => {
    
  return waitOrNotAllowed ==='wait' ? 
    <Wait type={type} onClick={onClick? onClick : undefined} disabled={isDisabled}>{text}</Wait> 
    :
    <NotAllowed type={type} onClick={onClick? onClick : undefined} disabled={isDisabled} > {text} </NotAllowed>
}

export default GreenButton;