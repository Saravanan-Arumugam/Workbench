import '../imports/api/collections';
import { Appointments } from '../imports/api/collections';

Meteor.methods({

    getMessage: function () {
        return 'Test message from server';
    },

    getAppointments: function () {
        var lstEvents = [];
        var lstAppointment = Appointments.find({username:Meteor.user().username}).fetch();

        lstAppointment.forEach((appointment) => {
            var aId = appointment._id;
            var aTitle = appointment.title;
            var aDescription = appointment.description;
            var aStart = appointment.start;
            var aColor = appointment.color;

            var apItem = {
                'id': aId
                , 'title': aTitle
                , 'description': aDescription
                , 'start': moment(aStart).format('YYYY-MM-DDThh:mm:ss')
                , 'color': aColor
            }

            lstEvents.push(apItem);
        });

        return lstEvents;
    },

    deleteAppointment: function (appId) {
        if (appId) {
            var appointment = Appointments.find({ _id: appId }).fetch();
            if (appointment) {
                console.log('Deleting appointment...:' + appointment[0]._id);
                Appointments.remove(appointment[0]._id);
            }
            return appointment;
        }
    },

    insertAppointment: function (apptDetails) {
        if (apptDetails) {
            var appointment = {
                'id': apptDetails.id
                , 'title': apptDetails.title
                , 'description': apptDetails.description
                , 'start': moment(apptDetails.start).format('YYYY-MM-DDThh:mm:ss')
                , 'end': moment(apptDetails.end).format('YYYY-MM-DDThh:mm:ss')
                , 'color': apptDetails.color
                , 'owner': Meteor.userId()
                , 'username': Meteor.user().username
            }

            Appointments.insert(appointment);
        }
    }
});
