onmessage = function(e){
	var vector = e.data.split(' ');
	start(vector[0], vector[1], vector[2]);
}

function create_matrix(n, m)
{
	var a=new Array(n);
	for (var i=0; i<n; i++){
		a[i] = new Float32Array(m);
		for (var j=0; j<m; j++)
			a[i][j]=Math.random();
	}
	return a;
}

function sterge_matrice(a, n)
{
	for (var i=0; i<n; i++)
		a[i].length = 0;
	a.length = 0;
}

function start(n, m, p)
{	
	var a = create_matrix(n, m);
	var b = create_matrix(m, p);
	var c = create_matrix(n, p);
	
	var atunci = new Date().getTime();

	var sarcina = {};
	sarcina.a = a;
	sarcina.b = b;
	sarcina.c = c;
	sarcina.n = n;
	sarcina.m = m;
	sarcina.p = p;
	
	// Creare 4 workers;
	var nr_muncitori = 4;
	var raspuns = new Array(nr_muncitori);

	for(var i = 0; i < nr_muncitori; i++)
	{
		raspuns[i] = false;
		sarcina.linie_start = Math.trunc(i * n / nr_muncitori);
		sarcina.linie_stop = Math.trunc(i + 1) * n / nr_muncitori;

		var muncitor = new Worker("muncitor.js");
		muncitor.buletin = i;
		muncitor.onmessage = function(e){
			// Aici primim matricea rezultata partial
			// va trebuie sa combinam matricile
			raspuns[this.buletin] = true;
			var toata_raspunsurile = true;

			for(var k = 0; k < nr_muncitori; k++)
			if(!raspuns[k])
			{
				toata_raspunsurile = false;
				break;
			}

			if(toata_raspunsurile)
			{
				var acum = new Date().getTime();
				var timp = acum - atunci;
	
				sterge_matrice(a, n);
				sterge_matrice(b, m);
				sterge_matrice(c, n);
	
				postMessage(timp);
			}
		}
		var sir = JSON.stringify(sarcina);
		muncitor.postMessage(sir);
	}
}