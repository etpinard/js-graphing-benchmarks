/* global Plotly:false, $:false */


suite('scatter markers 1e5', function() {

    benchmark('plotly.js', function() {

        Plotly.plot('graph', [{
            type: 'scattergl',
            mode: 'markers',
            x: this.x,
            y: this.y
        }]);

    });

    benchmark('highcharts', function() {
        // taking from http://jsfiddle.net/highcharts/utvok2zo/

        $('#graph').highcharts({
            chart: { zoomType: 'xy' },
            xAxis: {
                min: 0,
                max: 100,
                gridLineWidth: 1
            },
            yAxis: {
                // Renders faster when we don't have to compute min and max
                min: 0,
                max: 100,
                minPadding: 0,
                maxPadding: 0
            },
            title: {
                text: 'Scatter chart with ' + Highcharts.numberFormat(this.xy.length, 0, ' ') + ' points'
            },
            legend: {
                enabled: false
            },
            series: [{
                type: 'scatter',
                color: 'rgba(152,0,67,0.1)',
                data: this.xy,
                marker: {
                    radius: 1
                },
                tooltip: {
                    followPointer: false,
                    pointFormat: '[{point.x:.1f}, {point.y:.1f}]'
                },
            }]
        });
    });

}, {

    setup: function() {
        // number of points to plot
        var N = 1e5;

        var x = this.x = new Array(N);
        var y = this.y = new Array(N);
        var xy = this.xy = [];

        for(var i = 0; i < N; i ++) {
            var xx = Math.pow(Math.random(), 2) * 100;
            var yy = Math.pow(Math.random(), 2) * 100;

            x[i] = xx;
            y[i] = yy;
            xy.push([xx, yy]);
        }

        this.graphDiv = document.createElement('div');
        this.graphDiv.id = 'graph';
        document.body.appendChild(this.graphDiv);
    },

    teardown: function() {
        document.body.removeChild(this.graphDiv);
        this.graphDiv = null;
    },

    onCycle: function(event) {
        var benchmark = event.target;
        console.log('cycle', benchmark.name, 1 / benchmark.hz);
    }
});
