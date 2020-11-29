import { Session } from 'meteor/session'
import './deletemodal.html'


Template.deleteAppointmentModal.helpers({
    appointment (){
        return Session.get('appointmentDetails');
    }
});

Template.deleteAppointmentModal.events({
    'click .btndelete': function(event) {
        var eventDetails = Session.get('appointmentDetails');
        Meteor.call('deleteAppointment', eventDetails.id, function(error, result){
            window.location.reload();
        })
    }
});