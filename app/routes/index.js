import Ember from 'ember';

export default Ember.Route.extend({
redirect: function(){
        // this.transitionTo('weather');
        console.log('entering');
        this.transitionTo('dashboard');

    }
	
});
