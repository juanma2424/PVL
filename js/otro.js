var pathMap;
var pathPie;
var pathSemiPie;
var pathBar;
var pData = "1";
var pDataScore = 0 ;

var FpathMap = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONMAP/2015M.json';
var FpathPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONPIE/2015P.json';
var FpathSemiPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONSEMIPIE/2015SP.json';
var FpathBar = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/BARJSON/2015BAR.json';



var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;




Highcharts.getJSON(FpathMap, function (data) {

    //Prevent logarithmic errors in color calulcation
    data.forEach(function (p) {
        p.value = (p.value < 1 ? 1 : p.value);
    });

    // Initiate the chart
    var chart = Highcharts.mapChart('container', {
        chart: {
            map: 'custom/world'
        },

        title: {
            text: 'Happiest countries in the world 2015'
        },

        plotOptions: {
            series: {
                point: {
                    events: {
                        select: function () {
                            var text = 'Selecteeed ' + this.code3+ ' (' + this.value + '/km²)',
                                chart = this.series.chart;
                                pData = this.name;
                                pDataScore = this.value;
                                lol();
                            if (!chart.selectedLabel) {
                                chart.selectedLabel = chart.renderer.label(text, 0, 320)
                                    .add();
                            } else {
                                chart.selectedLabel.attr({
                                    text: text
                                });
                            }
                        },
                        unselect: function () {
                            var text = 'Unselected ' + this.name + ' (' + this.value + '/km²)',
                                chart = this.series.chart;
                            if (!chart.unselectedLabel) {
                                chart.unselectedLabel = chart.renderer.label(text, 0, 300)
                                    .add();
                            } else {
                                chart.unselectedLabel.attr({
                                    text: text
                                });
                            }
                        }
                    }
                }
            }
        },

        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true
        },

        colorAxis: {
            min: 400,
            max: 800,
            type: 'logarithmic'
        },

        series: [{
            data: data,
            joinBy: ['iso-a3', 'code3'],
            name: 'Happiness',
            allowPointSelect: true,
            states: {
                hover: {
                    color: '#a4edba'
                },
                select: {
                    color: '#EFFFEF',
                    borderColor: 'black',
                    dashStyle: 'dot'
                }
            },
            tooltip: {
                valueSuffix: ''
            }
        }]
    });
   
});


function lol(){
   var b = parseInt(pDataScore);
   var rango = b;

   if(rango>=700){
    document.getElementById("myImg1").src = "DATA/IMG/happy.png";
   }
   if( (rango>=500) && (rango<700 ) ){
    document.getElementById("myImg1").src = "DATA/IMG/poker.png";
   }
   if( (rango<500)){
    document.getElementById("myImg1").src = "DATA/IMG/sad.png";
   }
   
}
