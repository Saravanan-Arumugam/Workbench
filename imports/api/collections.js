import { Mongo } from 'meteor/mongo';
 
export const Appointments = new Mongo.Collection('appointments');

//db.appointments.insert({ title: "New Appointment", description: "This is test description", start: new Date(2020, 11, 29, 12), color: "red", createdAt:  new Date() });