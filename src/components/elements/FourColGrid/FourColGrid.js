import React from 'react'
import './FourColGrid.css'

const FourColGrid = (props) => {

    const renderElements = () =>{
        const grid = props.children.map((e,i) => {
            return(
                <div
                    key={i}
                    className="rmdb-grid-element"
                >
                    {e}
                </div>

            )
        })
        return grid
    }

    return(
        <div className="rmdb-grid">
            {props.header && !props.loading ? <h1>{props.header}</h1> : null}
            <div className="rmdb-grid-content">
                {renderElements()}
            </div>
        </div>
    )
}

export default FourColGrid;