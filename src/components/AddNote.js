import React,{useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";
import "./addNote.css";

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    
    const [note, setNote] = useState({FirstName:"", LastName:"", Email: "", Phone: "", Address: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.FirstName,note.LastName,note.Email,note.Phone,note.Address);
        setNote({FirstName:"", LastName:"", Email: "", Phone:"", Address: ""});
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div className="mainContainer">
      <div className="container my-4">
        <h1 className="h1">Add Employee info</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="FirstName" className="form-label label">
              First Name
            </label>
            <input
            autocomplete="off"
              type="text" name="FirstName"
              className="form-control input"
              id="FirstName"
              aria-describedby="emailHelp"
              onChange={onChange} minLength={3} required value={note.FirstName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="LastName" className="form-label label">
             Last Name
            </label>
            <input autocomplete="off"
              type="text"
              className="form-control input"
              id="LastName" name="LastName" onChange={onChange} minLength={5} required value={note.LastName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label label">
             Email
            </label>
            <input autocomplete="off"
              type="text"
              className="form-control input"
              id="Email" name="Email" onChange={onChange} value={note.Email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="form-label label">
             Phone
            </label>
            <input autocomplete="off"
              type="text"
              className="form-control input"
              id="Phone" name="Phone" onChange={onChange} value={note.Phone}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Address" className="form-label label">
             Address
            </label>
            <input autocomplete="off"
              type="text"
              className="form-control input"
              id="Address" name="Address" onChange={onChange} value={note.Address}
            />
          </div>
          <div className="addnote">
          <button disabled={note.FirstName.length<3 || note.LastName.length<5 || note.Phone.length<10} type="submit" className="btn addnote" onClick={handleClick}>
            Add
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
