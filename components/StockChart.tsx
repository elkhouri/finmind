'use client';

import Box from '@mui/material/Box';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ChartsDataProvider } from '@mui/x-charts/ChartsDataProvider';
import { ChartsSurface } from '@mui/x-charts/ChartsSurface';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { useDisplayStock, useDisplayYearlyIncrease } from '../stores/stock';

export default function StockChart() {
  const stockData = useDisplayStock();
  const yearlyIncrease = useDisplayYearlyIncrease();

  const series = [
    {
      type: 'bar',
      yAxisId: 'revenue',
      label: '每月營收',
      color: '#E8AF00',
      data: stockData.map((day) => day.revenueShort),
      highlightScope: { highlight: 'item' },
    },
    {
      type: 'line',
      yAxisId: 'price',
      color: '#CB4B4B',
      label: '單月營收年增率 (%)',
      data: yearlyIncrease.map((day) => day.increase),
      highlightScope: { highlight: 'item' },
      labelMarkType: 'square',
    },
  ] as AllSeriesType[];

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <ChartsDataProvider
        series={series}
        xAxis={[
          {
            id: 'date',
            data: stockData.map((day) => new Date(day.date)),
            scaleType: 'band',
            valueFormatter: (value, context) => {
              if(context.location === 'tick') return new Date(value).getFullYear().toString()
              else return new Date(value).toLocaleDateString();},
            height: 30,
          },
        ]}
        yAxis={[
          { id: 'price', scaleType: 'linear', position: 'right', width: 50 },
          {
            id: 'revenue',
            scaleType: 'linear',
            position: 'left',
            valueFormatter: (value) => value.toLocaleString(),
            width: 'auto',
          },
        ]}
      >
        <ChartsLegend direction="horizontal" />
        <ChartsSurface>
        {/* <ChartsAxisHighlight x="line" /> */}
        <BarPlot />
        <LinePlot />

        <LineHighlightPlot />
        <ChartsXAxis
          axisId="date"
          tickInterval={(value, index) => {
            return value.getMonth() === 0 || index === 0;
          }}
          tickLabelStyle={{
            fontSize: 10,
          }}
        />
        <ChartsYAxis
          label="單月營收年增率 (%)"
          axisId="price"
          tickLabelStyle={{ fontSize: 12 }}
        />
        <ChartsYAxis
          label="每月營收"
          axisId="revenue"
          tickLabelStyle={{ fontSize: 12 }}
        />
        <ChartsTooltip />
      </ChartsSurface>
      </ChartsDataProvider>
    </Box>
  );
}
