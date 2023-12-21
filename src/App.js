import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./Components/Header";
import NewNote from "./Components/NewNote";
import Note from "./Components/Note";

function App() {

  const stored=JSON.parse(localStorage.getItem('notes'));
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes,setFilteredNotes]=useState(stored);
  const [notes,setNotes]=useState(()=>{
    if(stored!=null){
      return stored;
    }
    return [
      {
        id:0,
        title:"New Note",
        content:"Hello this is your first note",
        color: '#212125',

      }
    ]
  });

  useEffect(()=>{
    savetoLocalStorage();
    console.log(stored)
  },[stored])

  useEffect(() => {
    // Filter notes based on the search term
    searchTerm==""?setFilteredNotes(notes):(setFilteredNotes(notes.filter((note)=>note.title.toLowerCase().includes(searchTerm.toLowerCase()))))
  }, [searchTerm,notes]);

  function savetoLocalStorage(){
    localStorage.setItem('notes',JSON.stringify(notes))
  }
  function addNewNote(title,content){
    setNotes((prev)=>{
      return [ 
        {
          id:Math.floor(Math.random()*100),
          title:title,
          content:content,
          color: '#212125',
          
        },
        ...prev
      ]
    })
    savetoLocalStorage()
  }
  return (
    <div className="App">
      <Header onSearch={setSearchTerm}/>
      <NewNote add={addNewNote} />
      <div className="display-container">
        {
          filteredNotes && filteredNotes.map((note)=><Note note={note} setNotes={setNotes} />)
        }
      </div>
    </div>
  );
}

export default App;
