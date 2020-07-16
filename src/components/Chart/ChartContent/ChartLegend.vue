<template>
  <div class="chart-legend" :style="styles">
    <div
      v-for="column in columns"
      :key="column.name"
      class="chart-legend__item"
      :style="getColumnStyles(column)"
    >
      {{ capitalize(column.name) }}
    </div>
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
    columns: {
      type: Array,
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
  background-color: yellow;

  &__item {
    position: absolute;
    text-align: center;
  }
}
</style>
