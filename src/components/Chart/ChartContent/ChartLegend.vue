<template>
  <div class="chart-legend">
    <div
      v-for="column in columns"
      :key="column.legendName"
      class="chart-legend__item"
      :style="getColumnStyles(column)"
    >
      {{ capitalize(column.legendName) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartLegend',

  props: {
    columns: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getColumnStyles(column) {
      return {
        left: `${column.left}px`,
        width: `${column.width}px`,
      };
    },

    capitalize(str) {
      if (typeof str !== 'string') return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style lang="scss">
.chart-legend {
  position: relative;

  &__item {
    position: absolute;
    text-align: center;
    font-size: 12px;
  }
}
</style>
