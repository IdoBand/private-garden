import React from 'react'
import { PropagateLoader } from "react-spinners";

const Spinner: React.FC = () => {
    return (<section className="spinner-container">
        <PropagateLoader color="#007449" />
    </section>)
}

export default Spinner