console.log('Starting notes.js');

const fs = require('fs');

// File to save the notes in
const notesFile = './notes-data.json';
        
var noteHandle = {
    
  addNote: (title, body) => {
    
    // Fetch the notes
    var notes = noteHandle.fetchNotes();
    // Store incoming notes in obj
    var note = {
        title,
        body
    };

    // Check for Duplicates
    var dN = notes.filter( (note) => note.title === title );   
    
    if(dN.length === 0){
      // Add new note to object  
      notes.push(note);
      // Save Notes
      noteHandle.saveNotes(notes);
      noteHandle.response = {note: note, msg: 'Note Added', error: false};
    }else{
      // Return Message
      noteHandle.response = {note: note, msg: 'Note Exsist!', error: true};
    }    
    
    return noteHandle.response;
    
  },  
  getAll: () => {
    return noteHandle.fetchNotes();
  },  
  readNote: (title) => {
    
    var rN = noteHandle.__filterNotes(title, true);
    
    if(rN.length === 1){
      for(i=0;i<rN.length;i++){
        // Return Note
        noteHandle.response = {note: rN[i], msg: 'Found Note!', error: false};
      }
    }else{
        // Nothing found
        //response = {};
        noteHandle.response = {note: {title}, msg: 'No Note Found', error: true};
    }
    
    return noteHandle.response;
    
  },  
  removeNote: (title) => {
    
    // Find The Note to Remove
    var tN = noteHandle.__filterNotes(title, false);
    
    if(tN.length < noteHandle.response.length){
        // Save Notes
        noteHandle.saveNotes(tN);
        noteHandle.response = {note: title, msg: 'Removed Note', error: false};
    }else{
        // Nothing found
        noteHandle.response = {note: title, msg: 'Nothing Found', error: true};
    }
    
    return noteHandle.response;
    
  },
  fetchNotes: () => {
    
    try{
      // Read file & parse
      noteHandle.response = JSON.parse(fs.readFileSync(notesFile));
    }catch(e){
      // No file return empty array
      noteHandle.response = {note: null, msg:e, error: true};
    }
    
    return noteHandle.response;
  },
  saveNotes: (notes) => {
    fs.writeFileSync(notesFile, JSON.stringify(notes));    
  },
  __filterNotes: (notes, bool) => {
   
    var response;
    var eNotes = noteHandle.fetchNotes();
    
    if(Array.isArray(notes)){
      for(i=0;i < notes.length; i++){
        if(bool){  
          response = eNotes.filter( (eNotes) => eNotes.title === notes[i] );
        }else{
          response = eNotes.filter( (eNotes) => eNotes.title !== notes[i] );  
        }
      }
    }else{
      if(bool){
        response = eNotes.filter( (eNotes) => eNotes.title === notes );
      }else{
        response = eNotes.filter( (eNotes) => eNotes.title !== notes );  
      }    
    }
    
    return response;
  },
  response: {
      note: {},
      msg: '',
      error: false
  }  
  
};

// Export our object
module.exports = noteHandle;
