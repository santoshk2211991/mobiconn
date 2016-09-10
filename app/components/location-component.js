import Ember from 'ember';
import LoginSession from '../mixins/login-session';

export default Ember.Component.extend(LoginSession,{
	locRefDb:null,
	mlocation: Ember.inject.service('location'),
	session: Ember.inject.service('session'),
	init:function(){
		this._super(...arguments); 
		this.set("locRefDb",this.get('dbRef'));
	},
	didInsertElement:function(){
			console.log("In did insert location component");
			let ref = this.get("locRefDb");
			let self= this;
			ref.on("value", function(snapshot) {
				console.log(snapshot.val()["message-unique"]["test-user-id"]);
				var collectionPie=self.get('mlocation').setMasterData(snapshot.val()["message-unique"]["test-user-id"]);
				console.log(collectionPie)
				self.get('session').trigger('pieData', collectionPie);
			});
	}

});
