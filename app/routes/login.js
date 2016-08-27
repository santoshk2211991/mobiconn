import Ember from 'ember';
import LoginSession from '../mixins/login-session';

export default Ember.Route.extend(LoginSession,{

	model: function(){
		return {"username":"keerthi","password":"xyz"}
	},
	init:function(){
		var self=this;
		
		console.log(this.initLogin().then(function(data){
			if(data.msg === "Success")
				self.transitionTo('dashboard')
		}));


	
		firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			  		self.set('loginType','firebase');
					self.transitionTo('dashboard');
			  } 
		});			
	},
	actions:{
		
	}	
});


  