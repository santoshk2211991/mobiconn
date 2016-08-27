import Ember from 'ember';

export default Ember.Component.extend({
	level:1,
	GAME_LEVEL_BOX_X:4,
	GAME_LEVEL_BOX_Y:4,
	GAME_UI_COLUMN:12,
	gamePositionsArray:[],
	gameNumbersArray:[],
	init() {
    	this._super(...arguments); 
  	},
	didUpdateAttrs() {
		this._super(...arguments);
		this.set('errors', []);
	},
	_calculateBoxesToRender(){
		let level = this.get('level');
		let game_x= this.get('GAME_LEVEL_BOX_X') * level;
		let game_y= this.get('GAME_LEVEL_BOX_Y') * level;
		let game_markup="";
		let columns = this.get('GAME_UI_COLUMN')/game_x;
		for(var i=1;i<=(game_x*game_y);i++){
			game_markup+="<div class='col-lg-"+columns+" grid-randy' id='randy-"+i+"' {{action 'startgame'}}></div>"; 
		}

		return game_markup;
	},
	_fillUpNumbersOnLevels(){

		let level = this.get('level');
		let game_x= this.get('GAME_LEVEL_BOX_X') * level;
		let game_y= this.get('GAME_LEVEL_BOX_Y') * level;
		let game_array=[];
		let ui_array = [];


		for(var i=1 ;i<=(game_x*game_y);i++){
			$("#randy-"+i).html("");
		}

		for(var i=0;i<game_x;i++){
			var random =Math.floor((Math.random() * (game_x*game_y)) + 1);

			while(game_array.indexOf(random) >= 0){	
				random =Math.floor((Math.random() * (game_x*game_y)) + 1);
				continue;
			}
			game_array.push(random);
		}

		this.set('gamePositionsArray',game_array);
		console.log(this.get('gamePositionsArray'));

		for(var i=0;i<game_x;i++){
			var random_ui =Math.floor((Math.random() * game_x) + 1);
			while(ui_array.indexOf(random_ui) >= 0){	
				random_ui =Math.floor((Math.random() * game_x) + 1);
				continue;
			}
			ui_array.push(random_ui);
		}

		console.log(ui_array);	

		for(var i=0 ;i<game_array.length;i++){
			$("#randy-"+game_array[i]).html(i);
			$("#randy-"+game_array[i]).attr("data-value",game_array[i]);
		}


		Ember.run.later((function() {
		  //do something in here that will run in 2 seconds
		  for(var i=1 ;i<=(game_x*game_y);i++){
			$("#randy-"+i).html("");
		  }
		}), 1000);

	},
	_recursivePush(){

	},
	didInsertElement() {
		var self = this;
		this.$(this._calculateBoxesToRender()).appendTo('#randy-container');
		var no_of_correct =0;
		var array_compare = this.get('gamePositionsArray');
		console.log(array_compare)
		/*Click */
		$('.grid-randy').click(function(){
			var array_compare = self.get('gamePositionsArray');
			if($(this).attr('data-value') == array_compare[no_of_correct]){
				$(this).css('background-color','green');
				no_of_correct++;
				if(no_of_correct == self.get('GAME_LEVEL_BOX_X')){
					alert('Game level won')
				}
			}	
			else{
				$(this).css('background-color','red');
				alert('incorrect Game over');
			}	
		})
	},
	actions:{
		startgame:function(){
			this._fillUpNumbersOnLevels();
		},
		click:function(){
			alert('cks')
		}	
	},
	click: function() {
    console.log('click fired! - ' + this.get('name'));
  	}			



});
