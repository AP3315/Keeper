import React from "react";

function Note(props) {

    // console.log('id', props.id); this id exist only herefor timebeing 
    //its not the property of note like title and content
    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            
            <button onClick={()=>{props.delete(props.id)}}>
                DELETE
            </button>

            <button onClick={()=>{props.edit(props.id)}}>
                EDIT
            </button>

            {/* <p>{new Date(props.date).toLocaleDateString()}</p> */}
            <p className="date">{new Date(props.date).toLocaleString('en-IN')}</p>
        </div>
    );
}

export default Note;
