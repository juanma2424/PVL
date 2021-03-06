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

var G_ONE;
var G_TWO;
var G_THREE;



var FpathMap = 'https://raw.githubusercontent.com/juanma2424/PVL/master/DATA/NUEVO/map.json';
var FpathData = 'https://raw.githubusercontent.com/juanma2424/PVL/master/DATA/NUEVO/visualLOL.json';
var FpathFile = 'https://raw.githubusercontent.com/juanma2424/PVL/master/DATA/NUEVO/File.json';



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
////////////                    BARRA DE GRAFICO 1               ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var sliderGO = document.getElementById("myRangeBar");
var outputGO = document.getElementById("demoBar");
outputGO.innerHTML = sliderGO.value;
G_ONE =sliderGO.value;
sliderGO.oninput = function () {
    outputGO.innerHTML = this.value;
    G_ONE = this.value;
    generateGF1();
}

////////////////////////////////////////////////////////////////////////////////////
////////////                    BARRA DE GRAFICO 2               ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var sliderGT = document.getElementById("myRangeBarTwo");
var outputGT = document.getElementById("demoBarTwo");
outputGT.innerHTML = sliderGT.value;
G_TWO =sliderGT.value;
sliderGT.oninput = function () {
    outputGT.innerHTML = this.value;
    G_TWO = this.value;
    generateGF3();
}

////////////////////////////////////////////////////////////////////////////////////
////////////                    BARRA DE GRAFICO 3               ///////////////////
////////////////////////////////////////////////////////////////////////////////////
var sliderGTT = document.getElementById("myRangeBarT");
var outputGTT = document.getElementById("demoBarT");
outputGTT.innerHTML = sliderGTT.value;
G_THREE =sliderGT.value;
sliderGTT.oninput = function () {
    outputGTT.innerHTML = this.value;
    G_THREE = this.value;
    generateGF2();
}


////////////////////////////////////////////////////////////////////////////////////
////////////                    CARGA PRINCIPAL                  ///////////////////
////////////////////////////////////////////////////////////////////////////////////
generateCharts()
GenerateMap() 




////////////////////////////////////////////////////////////////////////////////////
////////////                    CRAFICO UNO                      ///////////////////
////////////////////////////////////////////////////////////////////////////////////

function generateGF1(){
//GRAFICO DE BARRAS
Highcharts.getJSON(FpathData, function (data) {
    //window.alert(TempSelecT)
        Highcharts.chart('barcontainer', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Porcentaje de victorias de los jugadores y personajes'
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
                    text: 'Winrate'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Winrate <b>{point.y:.1f}</b>'
            }, 
            series: [{
                name: 'Winrate',
                data: data.filter(function(n){  return (n.champion === TempSelecP || TempSelecP == 'All')}).filter(function(n){  return (n.league === TempSelecT || TempSelecT == 'All')}).filter(function(n){  return (n.team === TempSelecE || TempSelecE == 'All')}).sort( predicateBy("result") ).map(function(o){return([o.player + " - "+o.champion  , o.result])}).slice(0, G_ONE), 
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
////////////                    CRAFICO DOS                      ///////////////////
////////////////////////////////////////////////////////////////////////////////////


function generateGF2(){
       //GRAFICO DE CIRCULAR
       Highcharts.getJSON(FpathFile, function (data) {

        Highcharts.chart('piecontainer', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Popularidad de personajes'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.1f} juegos</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                    }
                }
            },
            series: [{
                name: 'Cantidad de juegos',
                colorByPoint: true,
                data: data.filter(function(n){  return (n.league === TempSelecT)}).filter(function(n){  return (n.team === TempSelecE)}).sort( predicateBy("result") ).map(function(o){return([o.champion  , o.result])}).slice(0,5),
            }]
        });
    })

}


////////////////////////////////////////////////////////////////////////////////////
////////////                    CRAFICO TRES                     ///////////////////
////////////////////////////////////////////////////////////////////////////////////

function generateGF3(){
    Highcharts.getJSON(FpathData, function (data) {
        //window.alert(TempSelecT)
            Highcharts.chart('semipiecontainer', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Daño promedio realizado'
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
                        text: 'Daño a campeones'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Daño: <b>{point.y:.1f}hp</b>'
                }, 
                series: [{
                    name: 'Daño Realizado',
                    data: data.filter(function(n){  return (n.champion === TempSelecP || TempSelecP == 'All')}).filter(function(n){  return (n.league === TempSelecT || TempSelecT == 'All')}).filter(function(n){  return (n.team === TempSelecE || TempSelecE == 'All')}).sort( predicateBy("damagetochampions") ).map(function(o){return([o.player + " - "+o.champion  , o.damagetochampions])}).slice(0,15), 
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
                text: 'LOL PLAYERS'
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
                text: 'LOL PLAYERS'
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
    changeCountryFilter()
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
function changeCountryFilter(){
    var other = "All"
    var tempRegion = "All"
    if (codeCountry == "China"){
        window.alert("LPL: De este torneo han salido 2 de los campeones mundiales, Invictus Gaming y FunPlus Phoenix, logrando ser la segunda región con mas ganadres a nivel mundial.")
        tempRegion = "LPL"
    }else if(codeCountry == "United States of America"){
        window.alert("LCS: Fue el primer torneo regional de League of Legends, creado por la organización Riot Games, los cuales tambien son los creadores del juego.")
        tempRegion = "LCS"
    }else if(codeCountry == "Canada"){
        window.alert("LCS: Fue el primer torneo regional de League of Legends, creado por la organización Riot Games, los cuales tambien son los creadores del juego.")
        tempRegion = "LCS"
    }else if(codeCountry == "Spain"){
        window.alert("LEC: Previamente conocido como EW LCS, es el torneo europeo de mayor nivel y el equipo que ha dominado la escena ha sido G2 Esports, logrando ser multiples veces subcampeon del mundial.")
        tempRegion = "LEC"
    }else if(codeCountry == "Germany"){
        window.alert("LEC: Previamente conocido como EW LCS, es el torneo europeo de mayor nivel y el equipo que ha dominado la escena ha sido G2 Esports, logrando ser multiples veces subcampeon del mundial.")
        tempRegion = "LEC"
    }else if(codeCountry == "France"){
        window.alert("LEC: Previamente conocido como EW LCS, es el torneo europeo de mayor nivel y el equipo que ha dominado la escena ha sido G2 Esports, logrando ser multiples veces subcampeon del mundial.")
        tempRegion = "LEC"
    }else if(codeCountry == "United Kingdom"){
        window.alert("LEC: Previamente conocido como EW LCS, es el torneo europeo de mayor nivel y el equipo que ha dominado la escena ha sido G2 Esports, logrando ser multiples veces subcampeon del mundial.")
        tempRegion = "LEC"
    }else if(codeCountry == "Italy"){
        window.alert("LEC: Previamente conocido como EW LCS, es el torneo europeo de mayor nivel y el equipo que ha dominado la escena ha sido G2 Esports, logrando ser multiples veces subcampeon del mundial.")
        tempRegion = "LEC"
    }else if(codeCountry == "Russia"){
        window.alert("LCL: Este torneo es centrado en Rusia y fue muy dominante en los primeros años del juego, pero a lo largo de los años ha perdido mucha fuerza en comparación a otra regiones.")
        tempRegion = "LCL"
    }else if(codeCountry == "Brazil"){
        window.alert("BRCC: El torneo Brasileño de League of Legends llevó al primer equipo latinoamericano al mundial, y hasta hace poco era el torneo más prestigioso de latinoamerica.")
        tempRegion = "BRCC"
    }else if(codeCountry == "Mexico"){
        window.alert("LLA: Es el torneo que combina las regiones de latinoamerica norte y latinoamerica sur. Está situado en Mexico y para participar en este se debe acender por medio de torneos locales en diferentes países.")
        tempRegion = "LLA"
    }else if(codeCountry == "Australia"){
        window.alert("OLP: Por más que el torneo de oceanía, centrado en Australia, no ha llegado a ganar en competencias mundiales, siempre que llegan usan combinaciones de personajes atipicas e interesantes.")
        tempRegion = "OPL"
    }
    outputT.innerHTML = tempRegion
    sliderT.value = tempRegion
    TempSelecT = tempRegion


    outputP.innerHTML = other
    sliderP.value = other
    TempSelecP = other

    outputE.innerHTML = other
    sliderE.value = other
    TempSelecE = other





    generateCharts()
}


////////////////////////////////////////////////////////////////////////////////////
////////////                    GENEARTE FIGURAS                 ///////////////////
////////////////////////////////////////////////////////////////////////////////////
function generateCharts(){

    //GRAFICO DE BARRAS
    Highcharts.getJSON(FpathData, function (data) {
        //window.alert(TempSelecT)
            Highcharts.chart('barcontainer', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Porcentaje de victorias de los jugadores y personajes'
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
                        text: 'Winrate'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Winrate <b>{point.y:.1f}</b>'
                }, 
                series: [{
                    name: 'Winrate',
                    data: data.filter(function(n){  return (n.champion === TempSelecP || TempSelecP == 'All')}).filter(function(n){  return (n.league === TempSelecT || TempSelecT == 'All')}).filter(function(n){  return (n.team === TempSelecE || TempSelecE == 'All')}).sort( predicateBy("result") ).map(function(o){return([o.player + " - "+o.champion  , o.result])}).slice(0, G_ONE), 
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

        //GRAFICO DE CIRCULAR
        Highcharts.getJSON(FpathFile, function (data) {

            Highcharts.chart('piecontainer', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Popularidad de personajes'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y:.1f} juegos</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                        }
                    }
                },
                series: [{
                    name: 'Cantidad de juegos',
                    colorByPoint: true,
                    data: data.filter(function(n){  return (n.league === TempSelecT || (TempSelecE != 'All' && TempSelecT === 'All'))}).filter(function(n){  return (n.team === TempSelecE)}).sort( predicateBy("result") ).map(function(o){return([o.champion  , o.result])}).slice(0,5),
                }]
            });
        })


           //GRAFICO DE BARRAS
    Highcharts.getJSON(FpathData, function (data) {
        //window.alert(TempSelecT)
            Highcharts.chart('semipiecontainer', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Daño promedio realizado'
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
                        text: 'Daño a campeones'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Daño: <b>{point.y:.1f}hp</b>'
                }, 
                series: [{
                    name: 'Daño Realizado',
                    data: data.filter(function(n){  return (n.champion === TempSelecP || TempSelecP == 'All')}).filter(function(n){  return (n.league === TempSelecT || TempSelecT == 'All')}).filter(function(n){  return (n.team === TempSelecE || TempSelecE == 'All')}).sort( predicateBy("damagetochampions") ).map(function(o){return([o.player + " - "+o.champion  , o.damagetochampions])}).slice(0,15), 
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