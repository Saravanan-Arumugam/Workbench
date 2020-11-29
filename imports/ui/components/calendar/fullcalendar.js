import { Session } from 'meteor/session'
import { Template } from 'meteor/templating'

import "./fullcalendar.html"
import "./fullcalendar.css"
import "../../../globalhelpers/globalhelpers"

Template.fullCalendar.onRendered(() => {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var lstEvents = [];

    Meteor.call('getAppointments', function (error, result) {

        if (error) {
            console.log(error);
        }
        else {

            lstEvents = result;

            $('#calendarDiv').fullCalendar({
                header: {
                    timeZone: 'UTC',
                    right: 'basicDay, basicWeek, month',
                    center: 'title',
                    left: 'today prev,next'
                },
                editable: true,
                weekends: true,
                dayMaxEvents: true,
                events: lstEvents,
                dayClick: function (date) {
                    Session.set('eventDate', date.format());
                    $("#addModal").modal();
                },
                eventClick: function (appointment) {
                    var appointmentDetails = {'id': appointment.id, 'title': appointment.title, 'description': appointment.description, 'start': moment(appointment.start).format('YYYY-MM-DDThh:mm:ss') }
                    Session.set('appointmentDetails', appointmentDetails);
                    $("#deleteModal").modal();
                },
            });
        }
    });
});


