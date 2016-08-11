import {Template} from 'meteor/templating';

import {Tasks} from '../api/tasks.js';

import './body.html';


Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});


Template.body.events({
  "submit .new-task": function(event){
     //prevent default submit
     event.preventDefault();
     console.log(event);
     //Get value from form element
     const target = event.target;
     const text = target.text.value;

     //insert a task into the Collection
     Tasks.insert({
       text,
       createdAt: new Date(),//current time
     });

     //clear form
     target.text.value ='';
  }
});
