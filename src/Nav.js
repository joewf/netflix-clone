import React, {useState, useEffect} from 'react';
import './Nav.css';
import avat from './avat.jpg'

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", handleShow);
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
            className='nav__logo'
            // src='https://upload.wikimedia.org/wikipedia/commons/0/0f/'
            src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
            alt='Netflix Logo'>
            </img>

            <img
            className='nav__avatar'
            src={avat}
            alt='Avatar'>
            </img>
        </div>
    )
}

export default Nav