<template>
  <div class="chart-layout" :style="styles">
    <TooltipContainer :position="tooltipPosition">
      <template v-if="hoveredItem" #tooltip-content>
        <ChartLayoutTooltipContent
          :records="hoveredItem.records"
          :heading="hoveredItem.columnName"
        />
      </template>

      <Grid :height="gridHeight" :width="gridWidth" :step="gridCellSize">
        <div class="chart-layout__body" :style="chartBodyStyles">
          <ChartLayoutColumn
            v-for="(column, idx) in columns"
            :key="column.name"
            :column-index="idx"
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
        <div class="chart-layout__zero-line" :style="zeroLineStyles" />
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
    gridCellSize: {
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
      };
    },
    chartBodyStyles() {
      return {
        height: `${this.gridHeight}px`,
      };
    },
    zeroLineStyles() {
      return {
        bottom: `${this.chartPaddingBottom}px`,
      };
    },
  },

  methods: {
    handleMouseEnter({ position, activeSubcolumnName }, column) {
      const records = column.records.map(r => ({ ...r, isActive: r.name === activeSubcolumnName }));

      this.hoveredItem = { records, columnName: column.name };
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
  &__zero-line {
    width: 100%;
    position: absolute;
    border-bottom: 1px dashed #737c8c;
  }
}
</style>
