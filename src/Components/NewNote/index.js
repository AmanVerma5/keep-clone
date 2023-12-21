// import React, {useState} from "react";

// function NewNote(props) {

//   const [typing, settyping] = useState(false);

//   const [textareaStyle, settextareaStyle] = React.useState({
//     textAlign: "justfiy",
//   });
//   const [content, setcontent] = useState('')
//   const [title, settitle] = useState('');
  
//   function newnoteadded() {
//       {props.add(title,content)};
//       settitle('');
//       setcontent('');
//   }

//   function textareaHeight(e) {
//     settextareaStyle({
//       height: e.target.scrollHeight + "px",
//       textAlign: "justfiy",
//       maxHeight: "500px",
//     });
//   }
//   function titlechanged(e) {
//       settitle(e.target.value);
//   }
//   function contentchanged(e) {
//     settyping(true);
//     setcontent(e.target.value);
// }
//   return (
//     <div className="newnote">
//       <div className="col s12 m6">
//         <div className="card">
//           <div className="card-image">
//             <span className="card-title"></span>
//           </div>
//           <div className="card-content">
//             {typing?<div className="input-title">
//               <input id="email" type="note" onChange={titlechanged} value={title} placeholder="Title" />
//             </div>:null}
//             <p>
//               <textarea
//               value={content}
//               onClick={contentchanged}
//               onChange={contentchanged}
//                 style={textareaStyle}
//                 onInput={textareaHeight}
//                 placeholder="Take a note..."
//                 id="textarea1"
//                 className="materialize-textarea"
//               ></textarea>
//             </p>
//           </div>
//           {typing?<a onClick={newnoteadded} className="btn-floating btn-large halfway-fab waves-effect waves-dark blue">
//             <i className="material-icons">add</i>
//           </a>:null}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewNote;

import React, { useEffect, useRef } from "react";
import "./style.css";
import { useState } from "react";

const NewNote=({add})=>{
    const [isOpen,setIsOpen]=useState(false)
    const inputRef=useRef();
    const [title,setTitle]=useState();
    const [textarea,setTextArea]=useState();

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