<template>
  <div v-if="isInitialized" class="chart" :style="chartStyles">
    <ChartLayout
      :chart-height="chartHeight"
      :chart-width="chartWidth"
      :grid-height="gridHeight"
      :grid-width="gridWidth"
      :chart-padding-bottom="chartPaddingBottom"
      :grid-cell-size="gridCellSize"
      :subcolumn-vertical-distance="subcolumnVerticalDistance"
      :subcolumn-min-height="subcolumnMinHeight"
      :columns="finalColumns"
    />
    <ChartLegend class="chart__legend" :columns="finalColumns" />
  </div>
</template>

<script>
import ChartLayout from '@/components/Chart/ChartLayout/ChartLayout';
import ChartLegend from '@/components/Chart/ChartLegend';
import * as d3 from 'd3-scale';

export default {
  name: 'Chart',

  components: {
    ChartLayout,
    ChartLegend,
  },

  data() {
    return {
      isInitialized: false,
      chartData: null,

      columnNames: ['income', 'expenses'],
      legendNames: {
        income: 'Income/revenue',
        expenses: 'Expenses',
      },

      yScale: null,

      columnWidth: 92,
      chartHeight: 460,
      chartWidth: 334,
      gridHeight: 440,
      gridWidth: 334,
      chartPaddingTop: 9.5,
      chartPaddingBottom: 9.5,
      gridCellSize: 21,
      subcolumnVerticalDistance: 3,
      subcolumnMinHeight: 4,
    };
  },

  computed: {
    chartStyles() {
      return {
        height: `${this.chartHeight}px`,
      };
    },
    finalColumns() {
      if (!this.isInitialized) {
        return [];
      }

      return this.chartData.columns.map((column, idx) => {
        const { name, records, sumValue } = column;
        const minHeight = records.length * 4 + records.length * 3;

        return {
          name,
          legendName: this.legendNames[name],
          left: this.xScale(idx),
          width: this.columnWidth,
          height: Math.max(this.yScale(sumValue), minHeight),
          records,
          sumValue,
        };
      });
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    async initialize() {
      await this.fetchChart();
      this.fixMissingColumns();
      this.transformChartData();
      this.calculateChart();
      this.isInitialized = true;
    },
    async fetchChart() {
      const response = await fetch('/mock.json');
      this.chartData = await response.json();
    },
    fixMissingColumns() {
      this.columnNames.map(colName => {
        if (this.chartData[colName] === undefined) {
          this.chartData[colName] = [];
        }
      });
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
    },
    calculateChart() {
      const yDomain = this.getYDomain();
      this.yScale = d3
        .scaleLinear()
        .domain(yDomain)
        .range([0, this.gridHeight - this.chartPaddingTop - this.chartPaddingBottom]);
    },
    getYDomain() {
      const sumValues = this.chartData.columns.map(c => c.sumValue);
      return [0, Math.max(...sumValues)];
    },
    xScale(idx) {
      const colsQty = 2;
      const paddingsQty = colsQty + 1;

      const freeSpace = this.chartWidth - this.columnWidth * colsQty;
      const padding = freeSpace / paddingsQty;
      return padding + idx * padding + idx * this.columnWidth;
    },
  },
};
</script>

<style lang="scss">
.chart {
  &__legend {
    margin-top: 10px;
  }
}
</style>
