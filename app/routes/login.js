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
		
	},
	actions:{
		click_login:function(){
			var self=this;
			this.click_mixin().then(function(data){
				if(data.msg === "Success")
				self.transitionTo('dashboard')
			});
		}
	}	
});


  