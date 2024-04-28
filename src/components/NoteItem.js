import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext";
import "./addNote.css"

const NoteItme = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;
    return (
    <div className="col-md-3 my-3">
      <div className="card noteitem">
        <div className="card-body">
          <h5 className="card-title">{note.FirstName}</h5>
          <p className="card-text">
            {note.Address}
          </p>
          <i onClick={()=>{deleteNote(note._id)}} className="fa-sharp fa-solid fa-trash mx-2"></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItme;
