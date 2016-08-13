import Ember from 'ember';
import LoginSession from '../mixins/login-session';


export default Ember.Component.extend(LoginSession,{
	tagName: 'nav',
	username:"",
	sessionValue: Ember.inject.service('session'),
	init() {
    	this._super(...arguments);
    	this.errors = [];
    	this.get('session').on('activity', this, 'logActivity');
  	},
	didUpdateAttrs() {
		this._super(...arguments);
		this.set('errors', []);
	},
	didInsertElement() {
	  this._super(...arguments);
	  
	 
	},
	logActivity(activity) {
    	console.log(activity);
    	this.set('username',activity.name);
  }
	
});
