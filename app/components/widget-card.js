import Ember from 'ember';

export default Ember.Component.extend({
	widgetName:"",
	init() {
    	this._super(...arguments);
  	},
	didUpdateAttrs() {
		this._super(...arguments);
		this.set('errors', []);
	},
	didInsertElement() {
	  this._super(...arguments);
	  console.log(this.set('widgetName',this.get('type').widgetName));
	  if(this.get('type').widgetName == 'Gmaps'){
	   this.$().find('.content').append('<div id="map"></div>');
	   var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 12.9716, lng: 77.5946},
          zoom: 10
        });

	    var impactCoordinates = [
              new google.maps.LatLng(12.9716, 77.5946),
              new google.maps.LatLng(12.90,77.5946),
                             ];
            var ImpactPath = new google.maps.Polyline({
              path: impactCoordinates,
              strokeColor: "#0000",
              strokeOpacity: 1.0,
              strokeWeight: 2
            });

            ImpactPath.setMap(map);


	    var loc1 = new google.maps.LatLng(12.9716, 77.5946);
        var loc2 = new google.maps.LatLng(12.90,77.5946);
	   var distance=google.maps.geometry.spherical.computeDistanceBetween (loc1, loc2);
	   var uiDistance = parseFloat(distance/1000).toFixed(2);

	   this.$().find('.content').append('<h3 style="z-index:1000000"> Distance Between your points'+ uiDistance + "Kms  </h3>");
	  }
	},

});
