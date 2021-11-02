var aliveSecond = 0;
var heartbeatRate = 5000;

function keepAlive()
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState === 4){
			if(this.status === 200){
				if(this.responseText !==null){
					var date = new Date();
					aliveSecond = date.getTime();
					var json_data = this.responseText;
					var json_obj = JSON.parse(json_data);
					if(json_obj.motion == 1){
						document.getElementById("Motion_id").innerHTML = "Motion Detected";
					}
					else{
						document.getElementById("Motion_id").innerHTML = "No motion";
					}
				}
			}
		}
	};
	request.open("GET", "keep_alive", true);
	request.send(null);
	setTimeout('keepAlive()', heartbeatRate);
}

function time()
{
	var d = new Date();
	var currentSecond = d.getTime();
	if(currentSecond - aliveSecond > heartbeatRate + 1000){
		document.getElementById("Connection_id").innerHTML = "DEAD";
	}
	else{
		document.getElementById("Connection_id").innerHTML = "ALIVE";
	}
	setTimeout('time()', 1000);
}


function handleClick(cb){
	if(cb.checked)
	{
		value = "ON";
	}
	else
	{
		value = "OFF";
	}
	sendEvent(cb.id + "-" + value);
}

function sendEvent(value)
{
	console.log("Send Event called");
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readystate === 4){
			if(this.status === 200){
				if(this.responseText !== null){
				}
			}
		}
	};
	request.open("POST", "status="+value, true);
	request.send(null);
}











