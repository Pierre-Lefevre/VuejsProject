<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      labels: this.data.labels,
      datasets: [
        {
          backgroundColor: this.data.colors,
          data: this.data.data
        }
      ]
    }, this.options)
  }
}
</script>

<style>

</style>
