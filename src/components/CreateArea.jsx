// created this so that i can totally do database stuff seperately from her lecture 


import React from "react";

function CreateArea(props) {

    const [note, updateNote]= React.useState({
        title:'',
        content:''
    });

    function handleInput(event){
        const {name, value}=event.target;
        // console.log(name, value);
        updateNote({...note, [name]:value})
        // console.log(note); 
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log('ca', note);
        props.callAdd(note);
        updateNote({title:'', content:''}); 
    }

    //we need to create useeffect which will invoked whenever any any edit button
    //clicked
    React.useEffect(function (){
        function editNote(){
            if(props.edNotee){
                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });
                updateNote({title:props.edNotee.title, content:props.edNotee.content})
            }
        }
        editNote();
    },[props.edNotee])



    return <div>
        <form onSubmit={handleSubmit}>
            <input name="title" onChange={handleInput} value={note.title} placeholder="Title" required />
            <textarea name="content" onChange={handleInput} value={note.content} placeholder="Write note..." rows="3" required/>
            <button type="submit">{props.edNotee? 'Edit': 'Add' }</button>
            
        </form>
    </div>
}

export default CreateArea;