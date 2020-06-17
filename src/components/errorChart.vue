<script>
// CommitChart.js
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  mixins: [reactiveProp],
  props: ['data'],
  extends: Line,
  mounted () {
    this.renderChart(this.chartData, 
    {
      responsive: true, maintainAspectRatio: false,
      scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 1
                }
            }]
        }
    })
  }
}
</script>