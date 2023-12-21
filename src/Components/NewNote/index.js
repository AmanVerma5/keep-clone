

import React, { useEffect, useRef } from "react";
import "./style.css";
import { useState } from "react";

const NewNote=({add})=>{
    const [isOpen,setIsOpen]=useState(false)
    const inputRef=useRef();
    const [title,setTitle]=useState('');
    const [textarea,setTextArea]=useState('');

    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                // Clicked outside the input area
                setIsOpen(false);
              }
        }

        document.addEventListener('click',handleClickOutside)
    },[inputRef])

    function saveNote(){
        if(title===''){
            window.alert("Title cannot be empty")
            return;
        }
        add(title,textarea);
        setTitle('');
        setTextArea('');
    }

    return(
        <>
          {isOpen?
            <div className="note-input" ref={inputRef}>
                <input type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                <textarea placeholder="Take a note..." rows={4} onChange={(e)=>setTextArea(e.target.value)} value={textarea}/>
                <button onClick={saveNote}>Add Note</button>
            </div>:
        <div className="note-bar">
            <input type="text" placeholder="Take a note..." onClick={()=>setIsOpen(true)}/>
        </div>
        }
        </>
    )
}

export default NewNote;