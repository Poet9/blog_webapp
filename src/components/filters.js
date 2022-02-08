import React, { useEffect, useState } from 'react';
import {Col, Nav, Collapse, Badge} from 'react-bootstrap';
import styles from './explore.module.css';
/****** icons **********/
import dropDownIcon from '../icons/chevron-down.svg';
import profilPic from '../img/avatardefault.png';

export default function Filters(props) {
    const [filtersCollapseH4, setFiltersCollapseH4] = useState(true) //filters stat
    useEffect(()=>{ window.innerWidth < 1200 && setFiltersCollapseH4(false);}, [])

    const [favoriteUsersH5, setFavoriteUsersH5] = useState(false);
    const [risingStarsH5, setRisingStarsH5] = useState(false);
    const favoriteUsers= props.favUsers || [];
    const risingStarsUsers = ['johndoe', 'JaneDoe', 'userNAme23', 'userNAme2', 'fifthWheel'];
    const renderFavUserH5 = ()=>{
        if(favoriteUsers.length > 0 && favoriteUsers[0].length > 0){
            return <h5
            className={styles.risingStarsH5}
            onClick={() => setFavoriteUsersH5(!favoriteUsersH5)}>
                Favorite <img src={dropDownIcon} alt="" width="25px" />
            </h5>;
        }
    }
    return <Col xl={3} className="my-3 border-right">
    <h4 className='text-light' 
        onClick={() => setFiltersCollapseH4(!filtersCollapseH4)}
    >Filters <img src={dropDownIcon} alt="" width="25px" /></h4>
    <Collapse in={filtersCollapseH4}>
        <Nav className='flex-column'>
            <Nav.Link className='text-light'>
                {renderFavUserH5()}
                <Collapse in={favoriteUsersH5}>
                    <Nav className='flex-xl-column'>
                        {favoriteUsers.map((favUser, index)=>
                            <Nav.Link className='text-light' 
                            id={`risingStar-${index}`} 
                            key={index}> <img src={profilPic} alt="" width="30px"/> 
                            {favUser}
                            </Nav.Link>
                        )}
                    </Nav>
                </Collapse>
            </Nav.Link>
            <Nav.Link className='text-light'>
                <h5
                    className={styles.risingStarsH5}
                    onClick={() => setRisingStarsH5(!risingStarsH5)}
                > Rising stars <img src={dropDownIcon} alt="" width="25px" />
                </h5>
                <Collapse in={risingStarsH5}>
                    <Nav className='flex-xl-column'>
                    {risingStarsUsers.map( (username, index) => {
                        const badgeColor = ['bg-warning', 'bg-secondary', 'bg-danger', 'bg-primary', 'bg-primary'];
                        const badge = <Badge className={badgeColor[index]+' px-2 mx-2'}>{index+1}</Badge>;
                        return <Nav.Link className='text-light' 
                        id={`risingStar-${index}`} 
                        key={index}> {username}{badge}
                        </Nav.Link>
                    })}
                    </Nav>
                </Collapse>
            </Nav.Link>
            <Nav.Link className='text-light'>Cras justo odio</Nav.Link>
            <Nav.Link className='text-light'>Dapibus ac facilisis in</Nav.Link>
            <Nav.Link className='text-light'>Morbi leo risus</Nav.Link>
            <Nav.Link className='text-light'>Porta ac consectetur ac</Nav.Link>
        </Nav>
    </Collapse>
    </Col>;
}
