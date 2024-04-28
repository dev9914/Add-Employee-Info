const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const { Schema} = mongoose;

// ROUTE 1: Get All the Notes using : GET "/api/notes/fetchallnotes". NO login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server error");
    }
});

// ROUTE 2: Add a new Note using : POST "/api/notes/addnote". NO login required
router.post(
  "/addnote",fetchuser,
  [
    body("FirstName", "Enter a valid first name").isLength({ min: 3 }),
    body("LastName", "Enter a valid last name").isLength({
      min: 3,
    }),
    body("Email", "Enter a valid Email").isLength({ min: 3 }),
    body("Phone", "Enter a valid phone").isLength({ min: 10 }),
    body("Address", "Enter a valid Address").isLength({ min: 3 }),

  ],async (req, res) => {
    try {
        const {FirstName, LastName,Email,Phone,Address} = req.body;
        // If there are errors, return Bad request and the errors
        const error = validationResult(req);
        if (!error.isEmpty()) {
          return res.status(400).json({ error: error.array() });
        }
        const note = new Notes({
            FirstName, LastName,Email,Phone,Address,user: req.user.id
        })
        const saveNotes = await note.save();
        res.json(saveNotes);
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Update an existing Note using : PUT "/api/notes/updatenote". login required
router.put(
  "/updatenote/:id" ,fetchuser,
  async (req, res) => {
    try {
      const {FirstName, LastName, Email ,Phone, Address} = req.body;
      // Create a newNote object
      const newNote = {};
      if(FirstName){newNote.FirstName = FirstName};
      if(LastName){newNote.LastName = LastName};
      if(Email){newNote.Email = Email};
      if(Phone){newNote.Phone = Phone};
      if(Address){newNote.Address = Address};
  
      //Find the note to be updated and update it 
      let note = await Notes.findById(req.params.id);
      if(!note){return res.status(400).send("Not Found")};
  
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
      }
  
      note = await Notes.findByIdAndUpdate
      (req.params.id, {$set: newNote}, {new:true})
      res.json({note});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

// ROUTE 4: Delete an existing Note using : Delete "/api/notes/deletenote". Login required
router.delete(
  "/deletenote/:id" ,fetchuser,
  async (req, res) => {
    try {
      //Find the note to be delete and delete it 
      let note = await Notes.findById(req.params.id);
      if(!note){return res.status(400).send("Not Found")};
      // Allow deletion only if user owns this Note
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
      }
  
      note = await Notes.findByIdAndDelete
      (req.params.id)
      res.json({"success": "Note has been deleted", note: note});
   
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

module.exports = router;
