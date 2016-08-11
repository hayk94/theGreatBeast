import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Tasks} from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated = function(){
   this.state = new ReactiveDict();
};
//This might not work so in that case change to this

// Template.body.onCreated(function bodyOnCreated() {
//   this.state = new ReactiveDict();
// });


Template.body.helpers({
  tasks() {
    return Tasks.find({}, {sort: { createdAt: -1 } });
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
