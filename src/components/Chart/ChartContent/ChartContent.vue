<template>
  <div v-if="isInitialized" class="chart-content" :style="styles">
    <div class="chart-content__body" :style="chartBodyStyles">
      <ChartColumn
        v-for="(column, idx) in finalColumns"
        :key="column.name"
        :column-index="idx + 1"
        :width="column.width"
        :left="column.left"
        :height="column.height"
        :grid-height="gridHeight"
        :records="column.records"
        :value="column.sumValue"
      />
    </div>

    <ChartLegend :height="legendHeight" :columns="finalColumns" />
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
      yScale: null,
    };
  },

  mounted() {
    this.initialize();
  },

  computed: {
    finalColumns() {
      if (!this.isInitialized) {
        return [];
      }

      return this.chartData.columns.map(column => {
        const { name, records, sumValue } = column;

        return {
          name,
          left: this.xScale(name),
          width: this.columnWidth,
          height: this.yScale(sumValue),
          records,
          sumValue,
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
      this.transformChartData();
      this.calculateChart();
      this.isInitialized = true;
    },
    async fetchChart() {
      const response = await fetch('/mock.json');
      this.chartData = await response.json();
    },
    transformChartData() {
      this.chartData.columns = this.columnNames.map(name => {
        const records = this.chartData[name].map(record => {
          const name = Object.keys(record)[0];
          const value = Object.values(record)[0];
          return { name, value };
        });

        const sumValue = records.reduce((acc, r) => acc + r.value, 0);
        return { name, records, sumValue };
      });

      console.log(this.chartData);
    },
    calculateChart() {
      this.xScale = d3
        .scaleBand()
        .padding(0.35)
        .domain(this.columnNames)
        .range([0, this.chartWidth])
        .round(true);

      const yDomain = this.getYDomain();
      // todo hardcode
      this.yScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([0, this.gridHeight - 5]);
    },
    getYDomain() {
      const sumValues = this.chartData.columns.map(c => c.sumValue);
      return [0, Math.max(...sumValues)];
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
