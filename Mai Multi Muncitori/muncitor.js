function m_inmul(n, m, p, a, b, c, linie_start, linie_stop)
{
	for (var i=linie_start; i<linie_stop; i++)
		for (var j=0; j<p; j++){
			c[i][j]=0;
			for (var k=0; k<m; k++)
				c[i][j] += a[i][k] * b[k][j];
		}
}

onmessage = function(e){
    var sarcina = JSON.parse(e.data);
    m_inmul(sarcina.n, sarcina.m, sarcina.p, sarcina.a, sarcina.b, sarcina.c, sarcina.linie_start, sarcina.linie_stop);
    this.postMessage(JSON.stringify(sarcina.c));
}