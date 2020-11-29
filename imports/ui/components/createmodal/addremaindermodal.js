import { Session } from 'meteor/session'

import "./addremaindermodal.html"
import "../datepicker/datepicker"
import "./addremaindermodal.css"


Template.addRemainderModal.resetForm = function (event) {
    event.target.eventTitle.value = "";
    event.target.eventDesc.value = "";
};

Template.addRemainderModal.resetTimePicker = function (event) {
    var date = new Date();
    $('#timepicker').timepicker('setTime', date.toLocaleTimeString());
};

Template.addRemainderModal.helpers({
    eventDate() {
        return Session.get('eventDate');
    },
});

Template.addRemainderModal.events({
    'submit form': function (event) {
        event.preventDefault();

        if(event.target.eventType.value == 'none') return false;

        var appointmentTitle = event.target.eventTitle.value;
        var appointmentDesc = event.target.eventDesc.value;
        var appointmentDate = Session.get('eventDate');
        var appointmentTime = Session.get("eventTime");
        var appointmentStartDate = appointmentDate + ' ' + appointmentTime;
        var appointmentColor = event.target.eventType.value;

        var appointment = {
            'title': appointmentTitle
            , 'description': appointmentDesc
            , 'start': moment(appointmentStartDate).format('YYYY-MM-DDThh:mm:ss')
            , 'color': appointmentColor
        }

        Meteor.call('insertAppointment', appointment, function(error,result){
            if(error) {
                console.log(error);
            }
            else {
                window.location.reload();
                console.log('Appointment inserted...');
            }
        });

        Template.addRemainderModal.resetForm(event);

        return false;
    },

    'click .clearform': function (event) {
        $("#createRemForm")[0].reset();
        Template.addRemainderModal.resetTimePicker();
    },
});