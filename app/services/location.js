import Ember from 'ember';

export default Ember.Service.extend({

	masterData:null,
	processedDataChart:null,

	setMasterData:function(data){
		this.set('masterData',data);
		return this._calculateData();
	},
	getProcessedData:function(){
		return this.get('processedDataChart');
	},
	_calculateData : function(){
		var dataByTime=this._serializeMasterData();
		//Retrieve date and time 
		return this._filterDataByChart(dataByTime)


	},
	_filterDataByChart:function(date_collection){
		let current_time=0;
		let category_array=[];
		let prev_state = null;
		//Retrieve data by today
		date_collection.forEach(function(item,index){
			let time_in_minutes = parseInt(item["time"].split(":")[0]*60)+parseInt(item["time"].split(":")[1])+parseInt(item["time"].split(":")[2]/60);
			var percentage=(((time_in_minutes-current_time)/60)/24)*100;
			if(current_time == 0 && item["event"] == "Entered"){
				var obj={}
				obj["label"]="Untracked";
				obj["value"]=percentage;
				category_array.push(obj);
				prev_state = item;
				current_time = time_in_minutes;
			}
			else if(current_time == 0 && item["event"] == "Exited"){
				var obj={}
				obj["label"]=item["type"];
				obj["value"]=percentage;
				category_array.push(obj)
				prev_state = item;
				current_time = time_in_minutes;	
			}
			else
			{
				if(prev_state["event"] == item["event"] && prev_state["type"] == item["type"]);
				else if(prev_state["event"] != item["event"] && prev_state["type"] == item["type"] && prev_state["event"] == "Exited"){
					var obj={}
					obj["label"]="Untracked";
					obj["value"]=percentage;
					category_array.push(obj);	
					prev_state = item;
					current_time = time_in_minutes;
				}
				else{
					var obj={}
					obj["label"]=item["type"];
					obj["value"]=percentage;
					category_array.push(obj);
					prev_state = item;
					current_time = time_in_minutes;	
				}
			}

			
		});

		var date = new Date() + "";		
		var current_time_in_string = date.split(" ")[4];
		var current_time_in_minutes = parseInt(current_time_in_string.split(":")[0]*60)+parseInt(current_time_in_string.split(":")[1])+parseInt(current_time_in_string.split(":")[2]/60);
		console.log(current_time_in_minutes)

		if(prev_state["event"] == "Exited"){
			var percentage=((((24*60)-current_time)/60)/24)*100;
			var obj={};
			obj["label"]="Untracked";
			obj["value"]=percentage;
			category_array.push(obj)	
		}
		else
		{
			var percentage1=(((current_time_in_minutes-current_time)/60)/24)*100;
			var obj={}
			obj["label"]=prev_state["type"];
			obj["value"]=percentage1;
			category_array.push(obj);

			var percentage2=((((24*60)-current_time_in_minutes)/60)/24)*100;
			var obj={}
			obj["label"]="Untracked";
			obj["value"]=percentage2;
			category_array.push(obj);	
		}	



		return category_array;
	},
	_serializeMasterData: function(){
		
		let data_collection =[];
		let data_unformatted = this.get('masterData');
		for (var property in data_unformatted){
			if(data_unformatted.hasOwnProperty(property)){
				for (var pair in data_unformatted[property]){
					if(data_unformatted[property].hasOwnProperty(pair)){
						let data_formatted = [];
						console.log(pair.split(" ")[3] + "--" + data_unformatted[property][pair])
						data_formatted["time"]=pair.split(" ")[3];
						data_formatted["event"]=data_unformatted[property][pair].split(":")[0];
						data_formatted["type"]=data_unformatted[property][pair].split(":")[1];
						data_collection.push(data_formatted);
					}	
				}	
			}
		};	
		return data_collection;
	}




});
