import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab"
import Zoom from "@material-ui/core/Zoom"

function CreateArea(props) {

  let [isExpanded,setExpanded] = useState(false);


  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    if (note.title === "" || note.title.match(/^ *$/) != null) {
      alert("Enter something in the title box");
      setNote({
        title: "",
        content: ""
      })
      return;
    }
    if (note.content === "" || note.content.match(/^ *$/) != null) {
      alert("Enter something in the content box");
      setNote({
        title: "",
        content: ""
      })
      return;
    }
    props.onAdd(note);
    storeInLocalStorage(note);
    setNote({
      title: "",
      content: ""
    });
  }

  function storeInLocalStorage(note) {
    let notes;
    if (localStorage.getItem('notes') === null) {
      notes = [];
    }
    else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function expand(){
    setExpanded(true);
  }


  return (
    <div>
      <form className="create-note">
        {isExpanded?<input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />:null}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded?3:1}
        />
        <Zoom in={isExpanded}>
        <Fab onClick={submitNote}><AddIcon /> </Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
