import "./navbar.html"
import "./navbar.css"

Template.navBar.helpers({
    Username() {
        return Meteor.user().username;
    }
});