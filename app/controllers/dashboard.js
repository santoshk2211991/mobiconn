
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
	cloud:{
	"widgetType":"util",
	 "widgetID":1234,
	 "widgetSize":"small-x",
	 "widgetName":"DB"
	},
	location:{
	 "widgetType":"util",
	 "widgetID":1235,
	 "widgetSize":"small-x",
	 "widgetName":"Location Tracker"
	},

	init:function(){
			this.set('widgetsArray',DashyObj.create().get('widget'));
	},
	
});