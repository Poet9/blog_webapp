import React from 'react';

export default function pageNoteFound({ active }) {
    active(false);

    return <div className='notFoundPage'>
        <h1 className=' display-3'>This page does not exist</h1>
    </div>;
}
