import React from 'react';

const Pagination = ({handleClickPrevious,handleClickNext}) => {
    return (
        <div className="button-style">
            <button className="each-button" type="button" onClick={handleClickPrevious} > Vorige</button>
            <button className="each-button" type="button" onClick={handleClickNext}> Volgende </button>
        </div>
    );
};

export default Pagination;