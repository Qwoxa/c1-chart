<template>
  <div class="chart">
    <ChartContent />
    <ChartLegend />
  </div>
</template>

<script>
import ChartContent from '@/components/Chart/ChartContent';
import ChartLegend from '@/components/Chart/ChartLegend';

export default {
  name: 'Chart',

  components: {
    ChartContent,
    ChartLegend,
  },
};
</script>

<style lang="scss">
.chart {
}
</style>
