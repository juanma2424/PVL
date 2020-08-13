////////////////////////////////////////////////////////////////////////////////////
////////////                        VARIABLES                    ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var pathMap;
var pathPie;
var pathSemiPie;
var pathBar;
var TempSelecT;
var TempSelecE;
var TempSelecP;
var codeCountry;

var FpathMap = 'https://raw.githubusercontent.com/juanma2424/PVL/master/DATA/NUEVO/map.json';
var FpathPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONPIE/2015P.json';
var FpathSemiPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONSEMIPIE/2015SP.json';
var FpathBar = 'https://raw.githubusercontent.com/juanma2424/PVL/master/DATA/NUEVO/BARRAS.JSON';



////////////////////////////////////////////////////////////////////////////////////
////////////                   SELECT DE TORNEO                  ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var sliderT = document.getElementById("selectT");
var outputT = document.getElementById("outputT");
 outputT.innerHTML = sliderT.value;
 TempSelecT = sliderT.value;
 sliderT.oninput = function() {
    outputT.innerHTML = this.value;
    TempSelecT = this.value;
    generateCharts()
  }


////////////////////////////////////////////////////////////////////////////////////
////////////                   SELECT DE EQUIPO                  ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var sliderE = document.getElementById("selectE");
var outputE = document.getElementById("outputE");
outputE.innerHTML = sliderE.value;
TempSelecE = sliderE.value;
sliderE.oninput = function() {
    outputE.innerHTML = this.value;
    TempSelecE = this.value;
    generateCharts()
}


////////////////////////////////////////////////////////////////////////////////////
////////////                   SELECT DE PERSONAJE               ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var sliderP = document.getElementById("selectP");
var outputP = document.getElementById("outputP");
outputP.innerHTML = sliderP.value;
TempSelecP = sliderP.value;
sliderP.oninput = function() {
    outputP.innerHTML = this.value;
    TempSelecP = this.value;
    generateCharts()
}


////////////////////////////////////////////////////////////////////////////////////
////////////                    BARRA DE MAPA                   ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    GenerateMapScale();
}




////////////////////////////////////////////////////////////////////////////////////
////////////                    CARGA PRINCIPAL                  ///////////////////
////////////////////////////////////////////////////////////////////////////////////
generateCharts()
GenerateMap() 


////////////////////////////////////////////////////////////////////////////////////
////////////                    MAPA DEFAULT                     ///////////////////
////////////////////////////////////////////////////////////////////////////////////
function GenerateMap() {
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
                                var text = '',
                                    chart = this.series.chart;
                                    pData = this.name;
                                    pDataScore = this.value;
                                    codeCountry = this.name;
                                    face();
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
                                var text = '',
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
                min: 1,
                max: 1000,
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
}


////////////////////////////////////////////////////////////////////////////////////
////////////                    MAPA SACALA                      ///////////////////
////////////////////////////////////////////////////////////////////////////////////
function GenerateMapScale() {
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
                                var text = '',
                                    chart = this.series.chart;
                                    pData = this.name;
                                    pDataScore = this.value;
                                    codeCountry = this.name;
                                    face();
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
                                var text = '',
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
                min: 1,
                max: 1000,
                type: 'logarithmic'
            },
    
            series: [{
                data: data.filter(function(item){return item.value <= slider.value}),
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
}



////////////////////////////////////////////////////////////////////////////////////
////////////                    FACE MAP                         ///////////////////
////////////////////////////////////////////////////////////////////////////////////
function face() {
    var b = parseInt(pDataScore);
    //codeCountry
    var rango = b;
    if (rango >= 400) {
        document.getElementById("myImg1").src = "DATA/IMG/ORO.png";
    }
    if ((rango >= 200) && (rango < 400)) {
        document.getElementById("myImg1").src = "DATA/IMG/PLATA.png";
    }
    if ((rango < 200)) {
        document.getElementById("myImg1").src = "DATA/IMG/COBRE.png";
    }
}



////////////////////////////////////////////////////////////////////////////////////
////////////                    GENEARTE FIGURAS                 ///////////////////
////////////////////////////////////////////////////////////////////////////////////
function generateCharts(){
    Highcharts.getJSON(FpathBar, function (data) {
        //window.alert(TempSelecT)
            Highcharts.chart('barcontainer', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Happiest countries 2015'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Happieness'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Happiness Rank: <b>{point.y:.1f} millions</b>'
                }, 
                series: [{
                    name: 'Population',
                    data: data.filter(function(n){  return (n.champion == TempSelecT || TempSelecT == 'All')}).sort( predicateBy("result") ).map(function(o){return([o.player + " - "+o.champion  , o.result])}).slice(0,15), 
                    //data.filter(function(item){return item.value <= slider.value}),
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            });
        })
}



////////////////////////////////////////////////////////////////////////////////////
////////////                    SORT                             ///////////////////
////////////////////////////////////////////////////////////////////////////////////
function predicateBy(prop){
    return function(a,b){
       if (a[prop] > b[prop]){
           return -1;
       } else if(a[prop] < b[prop]){
           return 1;
       }
       return 0;
    }
 }