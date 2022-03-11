import React, { useEffect, useState } from 'react';
import {Col, Nav, Collapse } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styles from './filters.module.css';
/****** icons **********/
import dropDownIcon from '../icons/chevron-down.svg';
import { setFilter } from '../features/filter';

export default function Filters(props) {
    const [filtersCollapseH4, setFiltersCollapseH4] = useState(true) //filters stat
    useEffect(()=>{ window.innerWidth < 1200 && setFiltersCollapseH4(false);}, [])

    /// function to set filter
    var previousSlectedFilter;
    const dispatchFilter = useDispatch();
    const selecetedFilterFunc = (e)=>{
        if(e.target.className.split(" ").indexOf("nav-link") > -1){
            if(previousSlectedFilter){
                previousSlectedFilter.classList.remove(styles.navLinkFavUsrClassActive);
            }
            if(previousSlectedFilter === e.target) {
                previousSlectedFilter= "";
                return dispatchFilter(setFilter(""));
            }
            previousSlectedFilter = e.target;
            e.target.classList.add(styles.navLinkFavUsrClassActive);
            dispatchFilter(setFilter(e.target.textContent));
        }
    }
    return <Col xl={3} className="my-3 border-right">
    <h4 className='text-light' 
        onClick={() => setFiltersCollapseH4(!filtersCollapseH4)}
    >Filters <img src={dropDownIcon} alt="" width="25px" /></h4>
    <Collapse in={filtersCollapseH4}>
        <Nav className='flex-xl-column ' onClick={selecetedFilterFunc}>
            <Nav.Link className={styles.navLinkFavUsrClass+' text-light'} >Novels</Nav.Link>
            <Nav.Link className={styles.navLinkFavUsrClass+' text-light'} >Self help</Nav.Link>
            <Nav.Link className={styles.navLinkFavUsrClass+' text-light'}>Engineering</Nav.Link>
            <Nav.Link className={styles.navLinkFavUsrClass+' text-light'}>software development</Nav.Link>
        </Nav>
    </Collapse>
    </Col>;
}
