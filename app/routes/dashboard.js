import Ember from 'ember';
import LoginSession from '../mixins/login-session';


export default Ember.Route.extend(LoginSession,{
	sessionDetails:"adsasd",
	session: Ember.inject.service('session'),

	init:function(){
		console.log(this.get('session'))
		var self=this;
		this.initLogin().then(function(data){
			if(data.msg === "Failure")
				self.transitionTo('login')
	
		});
		
	},
	model: function() {
       
    }
});
