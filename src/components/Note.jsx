import React from "react";
import DeleteIcon from '@material-ui/icons/Delete.js';


function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
    removeFromLocalStorage(props.note)
  }

  function removeFromLocalStorage(note) {
    let notes;

    if (localStorage.getItem('notes') === null) {
      notes = [];
    }
    else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.forEach(function (task, index) {
      if (index === props.id) {
        notes.splice(index, 1);

      }
    });

    localStorage.setItem('notes', JSON.stringify(notes));
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );

}

export default Note;
