'use client';

import Box from '@mui/material/Box';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { stockRevenue } from '../lib/mockData';
import { useMemo } from 'react';
import { StockRevenue } from '../stores/stock';

export default function Combining() {
  const stockData = stockRevenue.slice(12);
  const yearlyIncrease = useMemo(() => {
    return stockRevenue.reduce<StockRevenue[]>((acc, month) => {
      const nowDate = new Date(month.date);
      const lastYearDate = new Date(nowDate);
      lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);

      const day = stockRevenue.find(
        (day) =>
          new Date(day.date).getFullYear() === lastYearDate.getFullYear() &&
          new Date(day.date).getMonth() === lastYearDate.getMonth(),
      );

      if (!day) {
        return acc;
      }
      
      const increase = (month.revenue / day.revenue - 1) * 100;
      const newMonth = { ...month, increase };
      acc.push(newMonth);
      return acc;
    }, []);
  }, [stockRevenue])
  console.log('yearlyIncrease', yearlyIncrease);

  const series = [
    {
      type: 'bar',
      yAxisId: 'revenue',
      label: '每月營收',
      color: '#E8AF00',
      data: stockData.map((day) => day.revenue),
      highlightScope: { highlight: 'item' },
    },
    {
      type: 'line',
      yAxisId: 'price',
      color: '#CB4B4B',
      label: '單月營收年增率 (%)',
      data: yearlyIncrease.map((day) => day.increase),
      highlightScope: { highlight: 'item' },
    },
  ] as AllSeriesType[];

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <ChartsContainer
        series={series}
        xAxis={[
          {
            id: 'date',
            data: stockData.map((day) => new Date(day.date)),
            scaleType: 'band',
            valueFormatter: (value, context) => {
              if(context.location === 'tick') return new Date(value).getFullYear().toString()
              else return new Date(value).toLocaleDateString();},
            height: 48,
          },
        ]}
        yAxis={[
          { id: 'price', scaleType: 'linear', position: 'right', width: 50 },
          {
            id: 'revenue',
            scaleType: 'linear',
            position: 'left',
            valueFormatter: (value) => `${(value / 1000).toLocaleString()}`,
            width: 55,
          },
        ]}
      >
        {/* <ChartsAxisHighlight x="line" /> */}
        <BarPlot />
        <LinePlot />

        <LineHighlightPlot />
        <ChartsXAxis
          // label="Date"
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
          tickLabelStyle={{ fontSize: 10 }}
        />
        <ChartsYAxis
          label="每月營收"
          axisId="revenue"
          tickLabelStyle={{ fontSize: 10 }}
        />
        <ChartsTooltip />
      </ChartsContainer>
    </Box>
  );
}
