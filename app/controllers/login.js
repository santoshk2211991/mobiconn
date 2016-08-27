import Ember from 'ember';
import LoginSession from '../mixins/login-session';


export default Ember.Controller.extend(LoginSession,{
  soundVolume: 1,
  actions:{
		click_sample: function(){
			var self=this;
			let _email = this.get('emailid');
			let _pwd = this.get('pwd');
			this.register(_email,_pwd).then(function(data){
				console.log("not registered");
			});
		},
		click_login:function(isFireBase){
			var self=this;
			let _email = this.get('email');
			let _pwd = this.get('passwd');
			this.click_mixin(isFireBase,_email,_pwd).then(function(data){
				if(data.msg === "Success")
				self.transitionToRoute('dashboard')
			});
		}
  }
});