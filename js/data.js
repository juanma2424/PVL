//torneo
//equipo
//personaje
var pathMap;
var pathPie;
var pathSemiPie;
var pathBar;
var i =0;


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

sliderT.oninput = function() {
    outputT.innerHTML = this.value;
}



////////////////////////////////////////////////////////////////////////////////////
////////////                   SELECT DE EQUIPO                  ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var sliderE = document.getElementById("selectE");
var outputE = document.getElementById("outputE");
outputE.innerHTML = sliderE.value;

sliderE.oninput = function() {
    outputE.innerHTML = this.value;
}


////////////////////////////////////////////////////////////////////////////////////
////////////                   SELECT DE PERSONAJE                  ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var sliderP = document.getElementById("selectP");
var outputP = document.getElementById("outputP");
outputP.innerHTML = sliderP.value;

sliderP.oninput = function() {
    outputP.innerHTML = this.value;
}


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;


//////INICIO_DEFAULT///////

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


Highcharts.getJSON(FpathBar, function (data) {
   // window.alert ( data.filter(function(n){return n.champion ==='Aatrox';}).map(function(o){return([o.player + o.champion  , o.result])}).slice(0,math.min(30,i)), ),

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
            data: data.filter(function(n){ if(n.champion ==='Aatrox'){i++}; return n.champion ==='Aatrox';}).map(function(o){return([o.player + o.champion  , o.result])}).slice(0,math.min(30,3)), 
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












//////INICIO///////
slider.oninput = function () {

    output.innerHTML = this.value;

    
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






Highcharts.getJSON(FpathBar, function (data) {
    Highcharts.chart('barcontainer', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
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
            data: data,
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




function face() {
    var b = parseInt(pDataScore);
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
