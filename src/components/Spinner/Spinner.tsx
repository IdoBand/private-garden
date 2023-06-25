import styled from "styled-components";
import React from 'react'
import { PropagateLoader } from "react-spinners";

const SpinnerContainer = styled.div`
    width: 100%;
    padding: 50px 0 50px 0;
    display: flex;
    justify-content: center;
`

const Spinner: React.FC = () => {
    return (<SpinnerContainer>
        <PropagateLoader color="#007449" />
    </SpinnerContainer>)
}

export default Spinner