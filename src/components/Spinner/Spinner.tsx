import styled from "styled-components";
import React from 'react'
import { PropagateLoader } from "react-spinners";

const SpinnerContainer = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
    padding: 50px 0 50px 0;
`

const Spinner: React.FC = () => {
    return (<SpinnerContainer>
        <PropagateLoader color="linear-gradient(25deg, rgb(0, 150, 0), rgb(0,255,0)" />
    </SpinnerContainer>)
}

export default Spinner