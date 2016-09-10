import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	pieDataValue:null,
	init:function(){
		this._super(...arguments); 
		console.log("Pie Chart Init");
		this.get('session').on('pieData', this, 'renderGraph');
	},
	didInsertElement:function(){
		//this.setGraph();
	},
	
	setGraph:function(pieData){
	
		console.log("In Set graph");

		var w = 300;
		var h = 300;
		var r = h/2;
		var color = d3.scale.category20c();

		

		var data = pieData;
				          
		var vis = d3.select('#pie-chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
		var pie = d3.layout.pie().value(function(d){return d.value;});

		// declare an arc generator function
		var arc = d3.svg.arc().outerRadius(r);

		// select paths, use arc generator to draw
		var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
		arcs.append("svg:path")
	    .attr("fill", function(d, i){
	        return color(i);
	    })
	    .attr("d", function (d) {
	        // log the result of the arc generator to show how cool it is :)
	        console.log(arc(d));
	        return arc(d);
	    });

		// add the text
		arcs.append("svg:text").attr("transform", function(d){
				d.innerRadius = 0;
				d.outerRadius = r;
	    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
	    return data[i].label;}
			);
		},
		setAbnormalGraph:function(pieData){


			var pie = new d3pie("pie-chart", {
	"header": {
		"title": {
			"text": "Location tracker",
			"fontSize": 22,
			"font": "verdana"
		},
		"subtitle": {
			"text": "",
			"color": "#999999",
			"fontSize": 10,
			"font": "verdana"
		},
		"titleSubtitlePadding": 12
	},
	"footer": {
		"text": "",
		"color": "#999999",
		"fontSize": 11,
		"font": "open sans",
		"location": "bottom-center"
	},
	"size": {
		"canvasHeight": 300,
		"canvasWidth": 300,
		"pieOuterRadius": "88%"
	},
	"data": {
		"content": pieData
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"format": "value"
		},
		"mainLabel": {
			"font": "verdana"
		},
		"percentage": {
			"color": "#e1e1e1",
			"font": "verdana",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#e1e1e1",
			"font": "verdana"
		},
		"lines": {
			"enabled": true,
			"color": "#cccccc"
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	}
	});




		},


		renderGraph:function(pieData){
		console.log("value")	
		this.set('pieDataValue',pieData);
		this.setAbnormalGraph(pieData);
		}
});
