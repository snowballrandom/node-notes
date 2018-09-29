console.log('Starting...');

const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');


const notes = require('./notes.js');
const argv = yargs.argv;

//var command = process.argv[2];

const app = {
    
    start: () => {
        
        response = app.response;
        
        switch(argv._[0]){
            case 'add':
                console.log('Adding Note...');
                app.add();
                break;
            case 'list':
                console.log('Fetching Note...');
                app.list();
                break;
            case 'read':
                console.log('Searching Note(s)...');
                app.read();
                break;
            case 'remove':
                console.log('Removing Note(s)...');
                app.remove();
                break;      
            default:
                app.response.msg = 'Command ** "'+argv._[0]+'" ** Not reconized';
                app.response.error = true;
                break;
        }
        
        return response;
    },
    
    add: () => {
        app.response.data = notes.addNote(argv.title, argv.body);
        if(app.response.data.error){
           app.response.msg = 'Unable To Add New Note(s)!';
           app.response.error = true;
        }else{
           app.response.msg = 'Added New Note!'; 
        }
    },
    list: () => {
        app.response.data = notes.getAll();
        if(app.response.data.error){
          app.response.msg = 'Unable To Fetech Note(s).';
          app.response.error = true;
        }else{
          app.response.msg = 'Note(s) Feteched.';   
        }
    },
    read: () => {
        app.response.data = notes.readNote(argv.title);

        if(app.response.data.error){
          app.response.msg = 'Error Fetching Note';
          app.response.error = true;
        }else{
          app.response.msg = 'Note Feteched.';
        }          
    },  
    remove: () => {
        app.response.data = notes.removeNote(argv.title);
        if(app.response.data.error){
          app.response.msg = 'Unable To Find Note(s)';    
        }else{
          app.response.msg = 'Found & Removed Note(s)';  
        }        
    },    
    response: {
        data: {},
        msg: '',
        error: false
    }
};

response = app.start();

console.log(response);
