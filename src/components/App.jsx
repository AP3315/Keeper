import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import React from "react";

import axios from 'axios';
// const APIUrl = 'http://localhost:1500'; 
const APIUrl = 'https://keeper-backend-fmo1.onrender.com/'; 



function App() {

    // var noteList=[{title:'aa', content:'aa'}];
    const [editingNote, setEditingNote]=React.useState(null);


    const [noteList, updatedNoteList] = React.useState([]);
    async function addNotes(note) {
        // console.log('note', note, editingNote);
        // console.log('noteList', [...noteList, note]);

        // updatedNoteList([...noteList, note]); //this will only update the current
        // note's content and title and there we wont have id and date for instanlty added
        // note and there update the ui with db returned value as done 4 line below 


        if(editingNote){
            try{
                // console.log('u', APIUrl+ '/addNote');
                const idOfNote=editingNote.id;
                console.log(idOfNote);  //below is also ok
                // const response=await axios.patch(APIUrl+ '/editNote', {note, editingNote});
                const response=await axios.patch(APIUrl+ '/editNote/'+ idOfNote, note);
                console.log('edit', response.data);
                const currUpdNote=response.data[0];//optimistic update
                const newNoteList=noteList.map(n=> n.id===currUpdNote.id? currUpdNote: n);
                updatedNoteList(newNoteList);
                setEditingNote(null);
            }
            catch(err){
                console.log(err, 'error while adding note');
            }
        }
        else{
            try{
                // console.log('u', APIUrl+ '/addNote');
                const response=await axios.post(APIUrl+ '/addNote', note);
                console.log('add', response.data[0]);
                //optimistic update
                updatedNoteList([...noteList, response.data[0]]);//✔✔✅✅☑☑
            }
            catch(err){
                console.log(err, 'error while adding note')
            }
        }
        
    }
    console.log('jjj',noteList);


    //1.
    React.useEffect(function () {
        async function fetchData() { 
            try{
                const response = await axios.get(APIUrl + '/allNotes');
                // console.log('l', response.data);
                const dataList=response.data;
                // dataList.forEach((ele)=>{  nonsense, you already have a list just call updatedNoteList
                //     noteList.push(ele);  this will be called only once that too initially
                // })             //hence just write below line
                if (Array.isArray(dataList)) 
                    updatedNoteList(dataList);
                // console.log('l', noteList);
            }
            catch(err){
                console.log(err, 'error in fetching data');
            }
            
        }
        fetchData();
    },[]//imp otherwise editing of currently added note wont be possible
    ) 
    //or 2.
    // React.useEffect(() => {
    //     async function fetchData() {
    //         const response = await axios.get(APIUrl + '/allNotes');
    //         console.log('l', response.data);
    //     }
    //     fetchData();
    // },[]
    // ) 
    //or 3.
    // React.useEffect(() => {
    //     (async () => {    
    //         const response = await axios.get(APIUrl + '/allNotes');
    //         console.log('l', response.data);
    //     })
    //     ();   // IIFE (Immediately Invoked Function Expression)
    // },[]
    // )  
    //or 4.
    // React.useEffect(() => {
    //     const fetchData = async ()=> {
    //         const response = await axios.get(APIUrl + '/allNotes');
    //         console.log('l', response.data);
    //     }
    //     fetchData();
    // },[]
    // ) 
    //or 5.
    // React.useEffect(() => {  //old javascript .then now is async/await
    //     axios.get(APIUrl + '/allNotes').then((response)=>{
    //         console.log('l', response.data);
    //     })
    // },[]
    // ) 
    //or 6.
    // this gives warning here and error in browser
    // React.useEffect(fetchData, []);
    // async function fetchData() {
    //     const response = await axios.get(APIUrl + '/allNotes');
    //     console.log('l', response.data);
    // }
    


    // async function getAllNotes(){
    //     console.log('fe',APIUrl+'/allNotes');
    //     const response= await axios.get(APIUrl+'/allNotes');

    //     console.log('l', response.data);
    //     // return 
    // }

    async function deleteNote(id) {
        console.log('id', id);
        try{
            const response= await axios.delete(APIUrl+ '/deleteNote/'+id );
            console.log('d',response.data)

            // below code is necessary to update UI instatntly after deletion of a note 
            //and this is only for that purpose exclusively
            const newList = noteList.filter((note) => { //optimistic update
                console.log('inD', note.id);
                return note.id != id;
            });
            console.log('new', newList);
            updatedNoteList(newList);
        }
        catch(err){
            console.log(err, 'error while deleting note')
        }
        
    }

    function editNote(id){
        // console.log(id);
        // const noteToEdit=noteList.filter((note)=>note.id===id)
        // // console.log(noteToEdit);
        // setEditingNote(noteToEdit[0]);

        // getting error since filter return array so must write noteToEdit[0]
        //noteToEdit  will give obviously

        const noteToEdit=noteList.find((note)=>note.id===id)
        // console.log(noteToEdit);
        setEditingNote(noteToEdit);

    }

    return (
        <div>
            <Header />
            <CreateArea callAdd={addNotes} edNotee={editingNote}/>
            <div className='Notes'>
                {noteList.map((note, index) => {
                    {/* console.log(index); */}
                    return <Note
                        key={index}
                        id={note.id}
                        title={note.title}   //since it is not property of note like title and content
                        content={note.content}
                        delete={deleteNote}
                        edit={editNote}
                        date={note.created_at}
                    />
                })}
            </div>
            <Footer />
            {/* {getAllNotes()}this is mess all async works should be inside useEffects */}
        </div>
    );
}

export default App;


// var a={title:'a', content:'sds'};
// var b=[{id:1, title:'sa', content:'aa'}]
// // var c=[b, ...a]
// // console.log(c);
// var c=[a, ...b];
// console.log(c);
