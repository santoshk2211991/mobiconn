export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
   // Wait for Facebook to load before allowing the application
  // to fully boot. This prevents `ReferenceError: FB is not defined`
  application.deferReadiness();


   var fbAsyncInit = function() {
    initFacebook(window.FB);
    loadMaps()
  };

    var initMap = function(){
      initMaps();
      application.advanceReadiness();
    }


  loadFacebookSDK();

  window.fbAsyncInit = fbAsyncInit;
  window.initMap = initMap;



}

function loadFacebookSDK() {
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

function loadMaps(){
 (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBWVwkW5uJb43dUpUjSyppRN8hntLBcmWQ&libraries=geometry&callback=initMap";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'gmaps-sdk'));
}


function initFacebook(FB) {
	FB.init({
		appId      : '1777741749133197',
		status: true,
		cookie: true,
		xfbml: true,
		version    : 'v2.7'
	});
}

function initMaps(){

 
}

export default {
  name: 'fb',
  initialize
};
