import React from 'react';
import { useParams } from 'react-router-dom';

const Gallery = ({ account }) => {

    const { id } = useParams();




    return (
        <div className="galgal">

            <img className="thread1 img-fluid center-block" src={require('./assets/images/1ETH-1.png')} ></img>
            <img className="thread2 img-fluid center-block" src={require('./assets/images/1ETH-2.png')} ></img>

        </div>
    );
};

export default Gallery;