<template>
  <div class="chart-legend" :style="styles">
    ChartLegend
  </div>
</template>

<script>
export default {
  name: 'ChartLegend',

  props: {
    height: {
      type: Number,
      required: true,
    },
  },

  computed: {
    styles() {
      return {
        height: `${this.height}px`,
      };
    },
  },
};
</script>

<style lang="scss">
.chart-legend {
  background-color: yellow;
}
</style>
