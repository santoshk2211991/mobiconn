
import Ember from 'ember';
import LoginSession from '../mixins/login-session';
import DashyObj from '../configuration/dashboard';

export default Ember.Controller.extend(LoginSession,{

	widgetsArray:[],

	init:function(){
			this.set('widgetsArray',DashyObj.create().get('widget'));
	}
});