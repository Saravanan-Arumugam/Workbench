import { Template } from 'meteor/templating';
import '../imports/ui/layout';

import { Accounts } from 'meteor/accounts-base';
 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});