import Ember from 'ember';

export default Ember.Mixin.create({
	changedLogin:"false",
	userDetails:Em.Object.create({}),
	session: Ember.inject.service('session'),
	loginType:null,
	dbRef:null,

	initLogin:function(){
	var self=this;
	
	if(firebase.auth().currentUser == null || firebase.auth().currentUser.email == ""){
		console.log("inside")
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
	}
	else
	{
		return new Ember.RSVP.Promise(function(resolve) {
			resolve({ msg: 'Success' });
		});	
	}    
 
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
	click_mixin:function(isFireBase,email,password){


		if(!isFireBase){
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
		else
		{

			return new Ember.RSVP.Promise(function(resolve) {
				var res=resolve
				firebase.auth().onAuthStateChanged(function(user) {
					  if (user) {
			    		res({ msg: 'Success' });
					  } 
				});	

				firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  res({ msg: 'Failure' });
				  // ...
				});

			});
		}
   		
	},
	register:function(uname,pwd){
		return new Ember.RSVP.Promise(function(resolve) {
			var res=resolve
			return firebase.auth().createUserWithEmailAndPassword(uname, pwd).catch(function(error) {
			  res({ msg: 'Failure' });
			});
		})
	},
	logout:function(){

		return new Ember.RSVP.Promise(function(resolve) {
			var res=resolve
			if(firebase.auth().currentUser != null){
				return firebase.auth().signOut().then(function() {	
				 res({ msg: 'Success' });
				}, function(error) {
				  res({ msg: 'Failure' });
				});
			}
			else
			{
				
			}
		});
	},
	init:function(){
		this._super(...arguments);
		this.set("dbRef",firebase.database().ref());
	}
	

});

