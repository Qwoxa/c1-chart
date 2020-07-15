<template>
  <div class="chart">
    <ChartContent />
    <ChartDescription />
  </div>
</template>

<script>
import ChartContent from '@/components/Chart/ChartContent/ChartContent';
import ChartDescription from '@/components/Chart/ChartDescription';

export default {
  name: 'Chart',

  components: {
    ChartContent,
    ChartDescription,
  },
};
</script>

<style lang="scss">
.chart {
}
</style>
