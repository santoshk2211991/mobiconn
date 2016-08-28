import Ember from 'ember';

export default Ember.Component.extend({
	
	init() {
		this._super(...arguments); 
  	},
	didInsertElement() {
		var self = this;
	  this._super(...arguments);
	  alert("here");
	  console.log(this);//.set('widgetName',this.get('type').widgetName));	  	  
		// Get a database reference to our posts
		var ref = firebase.database().ref();
		console.log(ref);

		// Attach an asynchronous callback to read the data at our posts reference
		ref.on("value", function(snapshot) {
		  console.log(snapshot.val());
		  console.log(snapshot.val().message["user-posts"]["test-user-id"]);
		  var objs = snapshot.val().message["user-posts"]["test-user-id"].length;
		  console.log(objs);
		  self._initChart(snapshot.val().message["user-posts"]["test-user-id"]);
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

	},			
	_initChart(chartData) {

  var barData = [{
    'x': 10.0,
    'y': 5
  }, {
    'x': 11.0,
    'y': 20
  }, {
    'x': 12.0,
    'y': 10
  }, {
    'x': 13.0,
    'y': 40
  }, {
    'x': 14.0,
    'y': 5
  }, {
    'x': 15.0,
    'y': 60
  }];

  var vis = d3.select('#visualisation'),
    WIDTH = 355,
    HEIGHT = 200,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },
    xRange = d3.scale.ordinal().rangeRoundBands([MARGINS.left, WIDTH - MARGINS.right], 0.1).domain(barData.map(function (d) {
      return d.x;
    })),


    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0,
      d3.max(barData, function (d) {
        return d.y;
      })
    ]),

    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(5)
      .orient("left")
      .tickSubdivide(true);
  
  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);

  vis.selectAll('rect')
    .data(barData)
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return xRange(d.x);
    })
    .attr('y', function (d) {
      return yRange(d.y);
    })
    .attr('width', xRange.rangeBand())
    .attr('height', function (d) {
      return ((HEIGHT - MARGINS.bottom) - yRange(d.y));
    })
    .attr('fill', 'grey')
    .on('mouseover',function(d){
      d3.select(this)
        .attr('fill','blue');
    })
    .on('mouseout',function(d){
      d3.select(this)
        .attr('fill','grey');
    });

	},
	checkBatteryUsage()
	{
		console.log("Checking usage");
	}
});