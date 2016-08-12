import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const mtis = new Mongo.Collection('MTI');

// Meteor.methods({
//   'mtis.insert'(positions){
//     //  check(text, String);
//      //
//     //  //Make sure the user is logged in before inserting a task
//     //  if (!this.userId) {
//     //    throw new Meteor.Error('not-authorized');
//     //  }
//
//      mtis.insert({
//        x:positions.x,
//        y:positions.y
//      });
//   },
// });
