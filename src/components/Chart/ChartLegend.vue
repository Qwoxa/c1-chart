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
import capitalize from 'lodash/capitalize';

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

    capitalize,
  },
};
</script>

<style lang="scss">
.chart-legend {
  position: relative;

  &__item {
    line-height: 1;
    position: absolute;
    text-align: center;
    font-size: 10px;
    font-weight: 600;
    color: #737c8c;
  }
}
</style>
