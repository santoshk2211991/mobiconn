import Ember from 'ember';

export default Ember.Mixin.create({
	changedLogin:"false",
	userDetails:Em.Object.create({}),
	session: Ember.inject.service('session'),

	initLogin:function(){
	var self=this;

  	return new Ember.RSVP.Promise(function(resolve) {
     	return FB.getLoginStatus(function(response) {
     		console.log(response)
			if(response.status === "connected"){
				self.setUserDetails(response.authResponse.userID);
				resolve({ msg: 'Success' });
			}
			else{
				resolve({ msg: 'Failure' });
			}	

		})
    });
   } ,
	
	setUserDetails : function(userID) {
		var self= this;
		FB.api(
		"/"+userID,
		function (response) {
			if (response && !response.error) {

				self.set('userDetails',response.first_name);
				console.log(self.get('userDetails'));
				self.get('session').trigger('activity', response);

			}
		}
	);	

	},
	getUserDetails : function(){
		return this.get('userDetails');
	},
	click_mixin:function(){
		return new Ember.RSVP.Promise(function(resolve) {
			var res=resolve
			return FB.login(function(response) {
					if(response.status === "connected"){
						res({ msg: 'Success' });
					}
					else{
						res({ msg: 'Failure' });
					}	
			}, {scope: 'email,user_hometown,user_religion_politics,publish_actions,user_likes,user_status,user_about_me,user_location,user_tagged_places,user_birthday,user_photos,user_videos,user_education_history,user_posts,user_website,user_friends,user_relationship_details,user_work_history,user_games_activity,user_relationships'});
			})
   		
	}
	

});

