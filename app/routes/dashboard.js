import Ember from 'ember';
import LoginSession from '../mixins/login-session';


export default Ember.Route.extend(LoginSession,{
	sessionDetails:"adsasd",
	session: Ember.inject.service('session'),

	init:function(){
		var self=this;

			try{
			this.initLogin().then(function(data){
				console.log(data);
				if(data.msg === "Failure")
					self.transitionTo('login');
			});
			}catch(ex){

			}
		
	},
	model: function() {
       
    },
    actions:{

    	click_logout:function(){
    		var self = this;
    		this.logout().then(function(data){
    			if(data.msg === "Success")
					self.transitionTo('login');
    		})
    	}
    }
});
