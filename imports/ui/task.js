import { Meteor } from 'meteor/meteor';

import {Template} from 'meteor/templating';

import {Tasks} from '../api/tasks.js';

import './task.html';



Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  "click .toggle-checked": function(event){
     //set the checked property to the opposite of its current value
        //    Tasks.update(this._id, {
        //      $set:{
        //         checked: ! this.checked
        //      },
        //  });
        Meteor.call('tasks.setChecked', this._id, !this.checked);
 },
 'click .delete'() {
      //  Tasks.remove(this._id);
      Meteor.call('tasks.remove', this._id);
 },
 'click .toggle-private'(){
   Meteor.call('tasks.setPrivate', this._id, !this.private);
 }
});







  Template.task.onCreated(function bodyOnCreated() {
    // mousetracker
      // console.log('I log');
      (function() {
    //     "use strict";
        var dot = document.getElementById('dot');
        // var dot;
        // Add a dot to follow the cursor
          // dot = document.createElement('div');
          // dot.className = "dot";
          dot.style.left = 0 + "px";
          dot.style.top = 0 + "px";
          //dot.style.left = event.pageX + "px";
          //dot.style.top = event.pageY + "px";
          // document.body.appendChild(dot);

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
          if (!Meteor.userId()) {

            dot.style.left = event.pageX + "px";
            dot.style.top = event.pageY + "px";
          }         //if userId
        }
      })();//func mousetracker
// console.log(Meteor.userId());
      // TODO: send the pageX and pageY to the db and then get them from the db and assign to another element
        // TODO: try with reactive-var first
          // TODO: Get the user list
        // TODO: Create a new collection
        // TODO: send the pageX and pageY
        // TODO: get the pageX and pageY

      //mouse tracker
  }); // onCreated
