import React, { useState } from "react";
import { UncontrolledCarousel } from "reactstrap";
import items from "../../assets/games/games";
const Games = () => {
    return(
        <>
            <div>
                <div className="title"> Liste des jeux présents </div>
                <UncontrolledCarousel
                    className="carousel"
                    items={items}
                />
                <div className="text"> More games coming soon..</div>
            </div>

        </>
    )
}

export default Games;