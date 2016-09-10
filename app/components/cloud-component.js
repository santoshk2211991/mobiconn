import Ember from 'ember';
import LoginSession from '../mixins/login-session';

export default Ember.Component.extend(LoginSession,{

	locRefDb:null,
	chartData:null,
	session: Ember.inject.service('session'),
	init:function(){
		this._super(...arguments); 
		this.set("locRefDb",this.get('dbRef'));
		 console.log(this.get('someParentRelevantName'))
	},
	didInsertElement:function(){
		let ref = this.get("locRefDb");
		let self= this;
		ref.on("value", function(snapshot) {
		  console.log(snapshot.val());
		  console.log(snapshot.val().message["user-posts"]["test-user-id"]);
		  let batCollection = [];
		  let batObjColl = snapshot.val()["message"]["user-posts"]["test-user-id"];
		  console.log(batObjColl);
			

			for (var property in batObjColl) {
				if (batObjColl.hasOwnProperty(property)) {
					batCollection.push(batObjColl[property]);
				}
			}
		  let ChartCollection = [];

			batCollection.forEach(function(item,index){
				//console.log(item["timeStamp"].split(" ")[1].split(":")[1])
				ChartCollection.push({"x":item["timeStamp"].split(" ")[1].split(":")[1],'y':item["batteryUsage"]*100});
			});
			console.log(self.get('session'))

			self.get('session').trigger('chartData', ChartCollection);
			
	

		
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
	}
});
