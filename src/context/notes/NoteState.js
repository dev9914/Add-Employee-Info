import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      // Get all Notes
      const getNotes = async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json)
      }

      // Add a Note
      const addNote = async(FirstName, LastName, Email, Phone, Address)=>{
        const response = await fetch(`${host}/api/notes/addnote`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({FirstName, LastName, Email, Phone, Address})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
      }
      // Delete a Note
      const deleteNote = async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = response.json();
        console.log(json);
        const newNotes = notes.filter((note1)=>{return note1._id!==id});
        setNotes(newNotes);
      }
      // Edit a Note
      const editNote = async(id, FirstName, LastName, Email, Phone, Address, editNote)=>{
        // Api Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({FirstName, LastName, Email, Phone, Address})
        });
        const json = await response.json();
        console.log(json)
        
        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to editNote
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index]
        if(element._id ===id){
          newNotes[index].FirstName = FirstName;
          newNotes[index].LastName = LastName;
          newNotes[index].Email = Email;
          newNotes[index].Phone = Phone;
          newNotes[index].Address = Address;
          break; 
        }
        }
        setNotes(newNotes);
      }

    return (
        <noteContext.Provider value={{notes,setNotes, addNote, deleteNote, editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;