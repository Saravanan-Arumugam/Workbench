import "./bodycontent.html"
import "../calendar/fullcalendar"
import "../createmodal/addremaindermodal"
import "../deletemodal/deletemodal"

import { Appointments } from "../../../api/collections"

Template.bodyContent.helpers({
    appointments() {
        var lstEvents = [];
        var lstAppointment = Appointments.find().fetch();

        lstAppointment.forEach((appointment) => {
            var appId = appointment._id;
            var atitle = appointment.title;
            var astart = appointment.start;
            var acolor = appointment.color;

            var apItem = {'id': appId, 'title': atitle, 'start': moment(astart).format('YYYY-MM-DDThh:mm:ss'), 'color': acolor }

            lstEvents.push(apItem);
        });

        return lstEvents;
    },

    Username() {
        return Meteor.user().username;
    }
});