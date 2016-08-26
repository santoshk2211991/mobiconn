
import Ember from 'ember';
import LoginSession from '../mixins/login-session';
import DashyObj from '../configuration/dashboard';

export default Ember.Controller.extend(LoginSession,{

	widgetsArray:[],
	sample:{
	 "widgetType":"game",
	 "widgetID":123,
	 "widgetSize":"small-x",
	 "widgetName":"Game-Randy"
	},

	init:function(){
			this.set('widgetsArray',DashyObj.create().get('widget'));
	}
});