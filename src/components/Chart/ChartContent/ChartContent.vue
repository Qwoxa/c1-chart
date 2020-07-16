<template>
  <div class="chart-content" :style="styles">
    <ChartGrid
      :height="gridHeight"
      :width="gridWidth"
      :start-point-height="0.45"
      :start-point-width="0.45"
      :step="18.4"
    >
      <div class="chart-content__body" :style="chartBodyStyles">
        <ChartColumn
          v-for="(column, idx) in columns"
          :key="column.name"
          :column-index="idx + 1"
          :width="column.width"
          :left="column.left"
          :height="column.height"
          :grid-height="gridHeight - chartPaddingBottom"
          :records="column.records"
          :value="column.sumValue"
        />
      </div>
    </ChartGrid>
  </div>
</template>

<script>
import ChartGrid from '@/components/Chart/ChartGrid';
import ChartColumn from '@/components/Chart/ChartContent/ChartColumn';

export default {
  name: 'ChartContent',

  components: {
    ChartColumn,
    ChartGrid,
  },

  props: {
    chartHeight: {
      type: Number,
      required: true,
    },
    chartWidth: {
      type: Number,
      required: true,
    },
    gridHeight: {
      type: Number,
      required: true,
    },
    gridWidth: {
      type: Number,
      required: true,
    },
    chartPaddingBottom: {
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
};
</script>

<style lang="scss">
.chart-content {
  &__body {
    position: relative;

    &:after {
      content: '';
      display: block;
      width: 100%;
      position: absolute;
      bottom: 8px;
      border-bottom: 1px dashed #737c8c;
    }
  }
}
</style>
