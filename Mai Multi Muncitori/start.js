document.getElementById("id_button").addEventListener("click", start);

function start()
{
	var n = document.getElementById("id_n").value;
	var m = document.getElementById("id_m").value;
	var p = document.getElementById("id_p").value;

	var muncitor = new Worker("sef.js");
	muncitor.onmessage = function(e){
		document.getElementById("id_run_time").innerHTML = e.data / 1000;
	}	
	muncitor.postMessage(n + ' ' + m + ' ' + p);
}