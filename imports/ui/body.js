import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';
import './body.css';

// Template.body.onCreated = function(){
//    this.state = new ReactiveDict();
// };
//This might not work so in that case change to this
// the above didnt work so this is the way

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe("tasks");

// mousetracker
  console.log('I log');
  (function() {
//     "use strict";
    var dot;
    // Add a dot to follow the cursor
      dot = document.createElement('div');
      dot.className = "dot";
      dot.style.left = 0 + "px";
      dot.style.top = 0 + "px";
      //dot.style.left = event.pageX + "px";
      //dot.style.top = event.pageY + "px";
      document.body.appendChild(dot);

    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
      var eventDoc, doc, body, pageX, pageY;

      event = event || window.event; // IE-ism

      // If pageX/Y aren't available and clientX/Y
      // are, calculate pageX/Y - logic taken from jQuery
			// Calculate pageX/Y if missing and clientX/Y available
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
      }
        dot.style.left = event.pageX + "px";
        dot.style.top = event.pageY + "px";

    }
  })();
  //mouse tracker


}); // onCreated


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
