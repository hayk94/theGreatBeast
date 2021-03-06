import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

// Template.body.onCreated = function(){
//    this.state = new ReactiveDict();
// };
//This might not work so in that case change to this
// the above didnt work so this is the way

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("tasks");
});


Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({checked: { $ne:true } }, { sort: { createdAt: -1 } });
    }
    //otherwise, return all of the tasks
    return Tasks.find({}, {sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({checked: { $ne: true } }).count();
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
        //  Tasks.insert({
        //    text,
        //    createdAt: new Date(),//current time
        //    owner: Meteor.userId(),
        //    username: Meteor.user().username,
        //  });
      Meteor.call('tasks.insert',text);
     //clear form
     target.text.value ='';
     console.log(Meteor.user());
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
