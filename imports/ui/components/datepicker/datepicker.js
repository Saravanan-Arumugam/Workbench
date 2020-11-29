import { Session } from 'meteor/session'
import "./datepicker.html"
import "./datepicker.css"

Template.datePicker.onRendered(function() {
    $('#timepicker').timepicker({
        minuteStep: 1,
        secondStep: 5,
        template: false,
        showMeridian: true
    });
});

Template.datePicker.events({
    'changeTime.timepicker': function(event) {
        Session.set('eventTime',event.time.value);
    }
});