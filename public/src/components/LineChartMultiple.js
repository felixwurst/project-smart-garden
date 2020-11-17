import React from 'react';
import Chart from 'chart.js';

// chart style options
Chart.defaults.global.defaultFontFamily = "Ubuntu";
Chart.defaults.global.legend.display = false;
Chart.defaults.global.defaultFontColor = 'white';

class LineChartMultiple extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        // get canvas
        const myChartRef = this.chartRef.current.getContext("2d");
        // set gradient line
        let gradientLine = myChartRef.createLinearGradient(0, 0, 0, 100);
        gradientLine.addColorStop(0, "rgb(255, 0, 0)");
        gradientLine.addColorStop(.2, "rgb(0, 168, 230)");
        gradientLine.addColorStop(.8, "rgb(0, 168, 230)");
        gradientLine.addColorStop(1, "rgb(255, 0, 0)");
        const hData = this.props.data[0].map(d => d.value);
        const tData = this.props.data[1].map(d => d.value);
        this.myChart = new Chart(myChartRef, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                min: 0,
                                padding: 10,
                                fontSize: 12
                            },
                            type: 'time',
                            time: {
                                unit: 'day'
                            },
                            gridLines: {
                                color: 'rgba(255, 255, 255, .3)'
                            },
                            drawBorder: true,
                            borderWidth: .5
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                padding: 10,
                                fontSize: 12
                            },
                            gridLines: {
                                color: 'rgba(255, 255, 255, .3)'
                            },
                            borderWidth: .5
                        }
                    ]
                }
            },
            data: {
                labels: this.props.data.map(d => d.time),
                datasets: [{
                    label: 'humidity',
                    data: hData,
                    fill: 'none',
                    backgroundColor: 0,
                    pointRadius: 2,
                    borderColor: gradientLine,
                    borderWidth: 1,
                    lineTension: 0
                },
                {
                    label: 'temperature',
                    data: tData,
                    fill: 'none',
                    backgroundColor: 0,
                    pointRadius: 2,
                    borderColor: gradientLine,
                    borderWidth: 1,
                    lineTension: 0
                }]
            },
            plugins: {
                indexlabels: {
                    fontSize: function (context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);
                        return {
                            size: size
                        };
                    }
                }
            }
        });
        this.myChart.data.labels = this.props.data[0].map(d => d.time);
        this.myChart.update();
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default LineChartMultiple;