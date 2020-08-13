var pathMap;
var pathPie;
var pathSemiPie;
var pathBar;


var FpathMap = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONMAP/2015M.json';
var FpathPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONPIE/2015P.json';
var FpathSemiPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONSEMIPIE/2015SP.json';
var FpathBar = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/BARJSON/2015BAR.json';



var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;


//////INICIO///////

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




Highcharts.getJSON(FpathPie, function (data) {

    Highcharts.chart('piecontainer', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Health in countries 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Health',
            colorByPoint: true,
            data: data
        }]
    });
})





Highcharts.getJSON(FpathSemiPie, function (data) {
    Highcharts.chart('semipiecontainer', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Freedom<br>in<br>countries<br>2015',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Freedom',
            innerSize: '50%',
            data: data
        }]
    });
})





Highcharts.getJSON(FpathBar, function (data) {
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



//////INICIO///////





slider.oninput = function () {

    output.innerHTML = this.value;


    if (slider.value === "2015") {
        pathMap = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONMAP/2015M.json';
        pathPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONPIE/2015P.json';
        pathSemiPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONSEMIPIE/2015SP.json';
        pathBar = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/BARJSON/2015BAR.json';
        document.getElementById("myImg").src = "DATA/IMG/2015.png";


    }
    if (slider.value === "2016") {
        pathMap = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONMAP/2016M.json';
        pathPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONPIE/2016P.json';
        pathSemiPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONSEMIPIE/2016SP.json';
        pathBar = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/BARJSON/2016BAR.json';
        document.getElementById("myImg").src = "DATA/IMG/2016.png";

    }
    if (slider.value === "2017") {
        pathMap = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONMAP/2017M.json';
        pathPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONPIE/2017P.json';
        pathSemiPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONSEMIPIE/2017SP.json';
        pathBar = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/BARJSON/2017BAR.json';
        document.getElementById("myImg").src = "DATA/IMG/2017.png";
    }
    if (slider.value === "2018") {
        pathMap = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONMAP/2018M.json';
        pathPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONPIE/2018P.json';
        pathSemiPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONSEMIPIE/2018SP.json';
        pathBar = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/BARJSON/2018BAR.json';
        document.getElementById("myImg").src = "DATA/IMG/2018.png";
    }
    if (slider.value === "2019") {
        pathMap = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONMAP/2019M.json';
        pathPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONPIE/2019P.json';
        pathSemiPie = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/JSONSEMIPIE/2019SP.json';
        pathBar = 'https://raw.githubusercontent.com/juanma2424/Happy-Web/juanma/DATA/JSON/BARJSON/2019BAR.json';
        document.getElementById("myImg").src = "DATA/IMG/2019.png";
    }




    Highcharts.getJSON(FpathMap, function (data) {

        //Prevent logarithmic errors in color calulcation
        //ZOOM DOBLE CLICK
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
                                    face();/// FACE   <- ACAAAAA
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

    Highcharts.getJSON(pathPie, function (data) {

        Highcharts.chart('piecontainer', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Health in countries ' + slider.value
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Health',
                colorByPoint: true,
                data: data
            }]
        });
    })


    Highcharts.getJSON(pathSemiPie, function (data) {
        Highcharts.chart('semipiecontainer', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Freedom<br>in<br>countries<br>' + slider.value,
                align: 'center',
                verticalAlign: 'middle',
                y: 60
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%'],
                    size: '110%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Freedom',
                innerSize: '50%',
                data: data
            }]
        });
    })

    Highcharts.getJSON(pathBar, function (data) {
        Highcharts.chart('barcontainer', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Happiest countries ' + slider.value
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

    if (rango >= 700) {
        document.getElementById("myImg1").src = "DATA/IMG/happy.png";
    }
    if ((rango >= 500) && (rango < 700)) {
        document.getElementById("myImg1").src = "DATA/IMG/poker.png";
    }
    if ((rango < 500)) {
        document.getElementById("myImg1").src = "DATA/IMG/sad.png";
    }


}
