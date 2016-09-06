import Ember from 'ember';

export default Ember.Component.extend({
	// level:1,				//Santosh
	GAME_LEVEL_BOX_X:4,
	GAME_LEVEL_BOX_Y:4,
	GAME_UI_COLUMN:12,
	gamePositionsArray:[],
	gameNumbersArray:[],
	SCORE:0,				//Santosh
	levelChange:0,			//Santosh
	init() {
    	this._super(...arguments); //anything related to components get initialized
    	console.log('game1');
    },
    didUpdateAttrs() {
    	this._super(...arguments);
    	this.set('errors', []);
    	console.log('game2');

    },
    _calculateBoxesToRender(){
    	let level = this.get('level');
		let game_x= this.get('GAME_LEVEL_BOX_X')+level-1 /** level*/;	//Santosh
		let game_y= this.get('GAME_LEVEL_BOX_Y')+level-1 /** level*/;	//Santosh
		let game_markup="";
		let columns = this.get('GAME_UI_COLUMN')/game_x;				//Santosh
		// columns = Math.floor(columns);

		console.log('game_x'+game_x);
		console.log('game_y'+game_y);
		console.log('level_startup'+level);
		for(var i=1;i<=(game_x*game_y);i++){
			//game_markup+="<div class='col-lg-"+columns+" grid-randy' id='randy-"+i+"' {{action 'startgame'}} ></div>"; 
			
			//Santosh
			game_markup+="<div class='grid-randy' style = 'float:left;width:"+(columns*8)+"%' id='randy-"+i+"' {{action 'hit'}} ></div>"; 


		}
		return game_markup;
	},
	_fillUpNumbersOnLevels(){

		let level = this.get('level');
		let game_x= this.get('GAME_LEVEL_BOX_X')+level-1/* * level*/;	//Santosh
		let game_y= this.get('GAME_LEVEL_BOX_Y')+level-1 /** level*/;	//Santosh
		let cur_score= this.get('SCORE') /** level*/;					//Santosh
		let levelChangeFlag = this.get('levelChange');					//Santosh
		let game_array=[];
		let ui_array = [];

		/*Santosh*/
		if (level>1 && cur_score>0 && levelChangeFlag == 0){
			this.set("SCORE",cur_score-1);
			console.log('Score decremented by 1');
		}

		if (levelChangeFlag == 1){
			this.set("levelChange",0);
		}

		/*end Santosh*/
		for(var i=1 ;i<=(game_x*game_y);i++){
			$("#randy-"+i).html("");
			$("#randy-"+i).css('background-color','');					//Santosh

		}

		for(var i=0;i<game_x;i++){
			var random =Math.floor((Math.random() * (game_x*game_y)) + 1);
			console.log(random);

			while(game_array.indexOf(random) >= 0){	
				random =Math.floor((Math.random() * (game_x*game_y)) + 1);
				console.log(random);

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
		}), 2500);

		console.log('game4');


	},
	_recursivePush(){

	},
	didInsertElement() {
		var self = this;
		let level = this.get('level');									//Santosh
		let game_x= this.get('GAME_LEVEL_BOX_X')+level-1 /** level*/;	//Santosh
		let game_y= this.get('GAME_LEVEL_BOX_Y')+level-1 /** level*/;	//Santosh
		this.$(this._calculateBoxesToRender()).appendTo('#randy-container');
		var no_of_correct =0;
		var successColor = 	'#ADFF2F';									//Santosh
		var failureColor = 	'#FF0000';									//Santosh
		// var array_compare = this.get('gamePositionsArray');
		// console.log('array_compare'+array_compare);
		/*Click */

		console.log('length......'+(self.get('gamePositionsArray')).length)

		$('.grid-randy').click(function(){
			console.log('entering randy');

			var array_compare = self.get('gamePositionsArray');

			/*Santosh*/
			if(array_compare.length>0){

				console.log('array_compare'+array_compare);
				console.log('no_of_correct'+no_of_correct);

				/*end Santosh*/
				if($(this).attr('data-value') == array_compare[no_of_correct]){
					$(this).css('background-color',successColor);
					no_of_correct++;


					/*Santosh*/
				// if(no_of_correct == self.get('GAME_LEVEL_BOX_X')){	
					if(no_of_correct == game_x){							
						alert('Game level won');

						let nextLevel = self.level+1;						
						self.set('level',nextLevel);	
						self.set('levelChange',1);							

						self.set('SCORE',(game_x*game_x)+self.get('SCORE'));
						console.log('level=='+self.level);					
					// self._calculateBoxesToRender();					
					$("#randy-container").html("");						
					// self.$(self._calculateBoxesToRender()).appendTo('#randy-container');
					self.set("gamePositionsArray",[]);

					self.didInsertElement();


					/*end Santosh*/
				}
			}	
			else{
				$(this).css({'background-color':failureColor});
				// $(this).css({'background-color':failureColor,'color':failureColor});
				alert('incorrect Game over');

				/*Santosh*/

				let rightPostionsArray = self.get("gamePositionsArray")
				console.log(rightPostionsArray);
				for(var i=0 ;i<rightPostionsArray.length;i++){
					$("#randy-"+rightPostionsArray[i]).html(i);
					$("#randy-"+rightPostionsArray[i]).css('background-color',successColor);
					$("#randy-"+rightPostionsArray[i]).attr("data-value",rightPostionsArray[i]);
				}
				self.set("gamePositionsArray",[]);
				no_of_correct = 0;
				/*end Santosh*/

			}	
		}				//Santosh
		
	}
	)



},
actions:{

	startgame:function(){
		this._fillUpNumbersOnLevels();
			// this.set('levelChange',0);
		},
		hit:function(){
			console.log("here");
		}
	},
	click: function() {
		console.log('click fired! - ' + this.get('name'));
	}			
});
