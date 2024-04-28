import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import "./addNote.css"

const Notes = () => {
  let navigate = useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id:"", eFirstName:"", eLastName:"", eEmail: "", ePhone:"", eAddress:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, eFirstName:currentNote.FirstName, eLastName: currentNote.LastName, eEmail:currentNote.Email, ePhone: currentNote.Phone, eAddress: currentNote.Address});
  };
  const handleClick = (e) => {
    editNote(note.id, note.eFirstName, note.eLastName, note.eEmail, note.ePhone, note.eAddress);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="editnotes">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <label htmlFor="eFirstName" className="form-label" >
                    firstName
                  </label>
                  <input
                    type="text"
                    name="eFirstName"
                    className="form-control input"
                    id="eFirstName"
                    aria-describedby="emailHelp"
                    onChange={onChange} value={note.eFirstName} minLength={3} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eLastName" className="form-label">
                    LastName
                  </label>
                  <input
                   value={note.eLastName}
                    type="text"
                    className="form-control input"
                    id="eLastName"
                    name="eLastName"
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eEmail" className="form-label">
                    Email
                  </label>
                  <input
                   value={note.eEmail}
                    type="text"
                    className="form-control input"
                    id="eEmail"
                    name="eEmail"
                    onChange={onChange} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ePhone" className="form-label">
                    Phone
                  </label>
                  <input
                   value={note.ePhone}
                    type="text"
                    className="form-control input"
                    id="ePhone"
                    name="ePhone"
                    onChange={onChange} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eAddress" className="form-label">
                    Address
                  </label>
                  <input
                   value={note.eAddress}
                    type="text"
                    className="form-control input"
                    id="eAddress"
                    name="eAddress"
                    onChange={onChange} 
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button" ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary" disabled={note.eFirstName.length<3 || note.eLastName.length<5  || note.ePhone.length<10}>
                Update Note
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3">
          <h2 className="h2">Your Notes</h2>
          <div className="container mx-2">
          {notes.length===0 && "No Notes to display" }
          </div>
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
