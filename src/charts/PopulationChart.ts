import { Chart } from 'chart.js';
import 'chartjs-plugin-streaming';

export class PopulationChart {
  constructor(settings = PopulationChart.DEFAULT_SETTING) {
    const canvas = document.createElement('canvas');

    settings.container.appendChild(canvas);

    this.chart = new Chart(canvas.getContext('2d'), {
      type: 'line',               // 'line', 'bar', 'bubble' and 'scatter' types are supported
      data: {
        datasets: [{
          data: []            // empty at the beginning
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'realtime',   // x axis will auto-scroll from right to left
            realtime: {         // per-axis options
              duration: 20000,    // data in the past 20000 ms will be displayed
              delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
              pause: false,       // chart is not paused
              ttl: false      // data will be automatically deleted as it disappears off the chart
            }
          }]
        },
        plugins: {
          streaming: {            // per-chart option
            frameRate: 30       // chart is drawn 30 times every second
          }
        }
      }
    });
  }

  private chart: Chart;

  public onReceive(event) {
    // append the new data to the existing chart data
    this.chart.data.datasets[0].data.push({
      x: event.timestamp,
      y: Math.random()
    });

    // update chart datasets keeping the current animation
    this.chart.update({
      preservation: true
    });
  }

  private static get DEFAULT_SETTING() {
    return {
      container: document.body,
      title: 'Population',
      width: 1000,
      height: 500
    };
  }
}
