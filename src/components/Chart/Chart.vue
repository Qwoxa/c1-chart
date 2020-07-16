<template>
  <div class="chart">
    <ChartLayout
      v-if="isInitialized"
      :chartHeight="chartHeight"
      :chartWidth="chartWidth"
      :gridHeight="gridHeight"
      :gridWidth="gridWidth"
      :chartPaddingBottom="chartPaddingBottom"
      :columns="finalColumns"
    />
    <ChartLegend :columns="finalColumns" />

    <ChartDescription />
  </div>
</template>

<script>
import ChartLayout from '@/components/Chart/ChartLayout/ChartLayout';
import ChartDescription from '@/components/Chart/ChartDescription';
import ChartLegend from '@/components/Chart/ChartLegend';
import * as d3 from 'd3-scale';

export default {
  name: 'Chart',

  components: {
    ChartLayout,
    ChartDescription,
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

      xScale: null,
      yScale: null,

      columnWidth: 92,
      chartHeight: 460,
      chartWidth: 334,
      gridHeight: 440,
      gridWidth: 334,
      chartPaddingTop: 8,
      chartPaddingBottom: 8,
    };
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
          legendName: this.legendNames[name],
          left: this.xScale(name),
          width: this.columnWidth,
          height: this.yScale(sumValue),
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
      this.xScale = d3
        .scaleBand()
        .padding(0.35)
        .domain(this.columnNames)
        .range([0, this.chartWidth])
        .round(true);

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
  },
};
</script>

<style lang="scss">
.chart {
}
</style>
