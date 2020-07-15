<template>
  <div v-if="isInitialized" class="chart-content" :style="styles">
    <div class="chart-content__body" :style="chartBodyStyles">
      <ChartColumn
        v-for="column in columns"
        :key="column.name"
        :width="column.width"
        :left="column.left"
        :height="column.height"
        :grid-height="gridHeight"
      />
    </div>

    <ChartLegend :height="legendHeight" />
  </div>
</template>

<script>
import * as d3 from 'd3-scale';

import ChartColumn from '@/components/Chart/ChartContent/ChartColumn';
import ChartLegend from '@/components/Chart/ChartContent/ChartLegend';

export default {
  name: 'ChartContent',

  components: {
    ChartColumn,
    ChartLegend,
  },

  data() {
    return {
      isInitialized: false,

      columnWidth: 92,
      chartHeight: 460,
      chartWidth: 334,
      gridHeight: 440,
      gridWidth: 334,

      chartData: null,
      columnNames: ['income', 'expenses'],
      bandwidth: 0,

      xScale: null,
    };
  },

  mounted() {
    this.initialize();
  },

  computed: {
    columns() {
      return this.columnNames.map(name => {
        return {
          name,
          left: this.xScale(name),
          width: this.columnWidth,
          height: 10,
        };
      });
    },
    legendHeight() {
      return this.chartHeight - this.gridHeight;
    },
    styles() {
      return {
        width: `${this.chartWidth}px`,
        height: `${this.chartHeight}px`,
      };
    },
    chartBodyStyles() {
      return {
        height: `${this.gridHeight}px`,
      };
    },
  },

  methods: {
    async initialize() {
      await this.fetchChart();
      this.calculateChart();
      this.isInitialized = true;
    },
    async fetchChart() {
      const response = await fetch('/mock.json');
      this.chartData = await response.json();
    },
    calculateChart() {
      this.xScale = d3
        .scaleBand()
        .padding(0.35)
        .domain(this.columnNames)
        .range([0, this.chartWidth])
        .round(true);

      console.log(this.xScale.bandwidth());
    },
  },
};
</script>

<style lang="scss">
.chart-content {
  outline: 1px solid black;

  &__body {
    position: relative;
  }
}
</style>
