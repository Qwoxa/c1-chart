<template>
  <div class="chart-layout" :style="styles">
    <TooltipContainer :position="tooltipPosition">
      <template v-if="hoveredItem" #tooltip-content>
        <ChartLayoutTooltipContent
          :column="hoveredItem.column"
          :subColumn="hoveredItem.subColumn"
        />
      </template>

      <Grid
        :height="gridHeight"
        :width="gridWidth"
        :start-point-height="0.45"
        :start-point-width="0.45"
        :step="18.4"
      >
        <div class="chart-layout__body" :style="chartBodyStyles">
          <ChartLayoutColumn
            v-for="(column, idx) in columns"
            :key="column.name"
            :column-index="idx + 1"
            :width="column.width"
            :left="column.left"
            :height="column.height"
            :grid-height="gridHeight - chartPaddingBottom"
            :records="column.records"
            :value="column.sumValue"
            @mouseenter="handleMouseEnter($event, column)"
            @mouseleave="handleMouseLeave"
          />
        </div>
      </Grid>
    </TooltipContainer>
  </div>
</template>

<script>
import Grid from '@/components/Base/Grid';
import TooltipContainer from '@/components/Base/TooltipContainer';
import ChartLayoutTooltipContent from '@/components/Chart/ChartLayout/ChartLayoutTooltipContent';
import ChartLayoutColumn from '@/components/Chart/ChartLayout/ChartLayoutColumn';

export default {
  name: 'ChartLayout',

  components: {
    ChartLayoutColumn,
    TooltipContainer,
    ChartLayoutTooltipContent,
    Grid,
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

  data() {
    return {
      hoveredItem: null,
      tooltipPosition: null,
    };
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

  methods: {
    handleMouseEnter({ position, subColumn }, column) {
      this.hoveredItem = { subColumn, column };
      this.tooltipPosition = position;
    },
    handleMouseLeave() {
      this.hoveredItem = null;
      this.tooltipPosition = null;
    },
  },
};
</script>

<style lang="scss">
.chart-layout {
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
