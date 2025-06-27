import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

// X-axis labels for the chart
const labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];

// Data for each metric
const dataMap = {
  'Unsatisfied Demand %': [38000, 20000, 55000, 40000, 90000, 60000, 60000, 35000, 55000, 60000],
  'Charging Growth': [25000, 55000, 40000, 40000, 20000, 65000, 90000, 60000, 35000, 60000],
};

const LineChart = () => {
  // State for selected metric in dropdown
  const [selectedMetric, setSelectedMetric] = useState<'Unsatisfied Demand %' | 'Charging Growth'>('Unsatisfied Demand %');
  // Max point
  const maxValue = Math.max(...dataMap[selectedMetric]);

  // Chart.js data object
  const data = {
    labels,
    datasets: [
      {
        label: selectedMetric,
        data: dataMap[selectedMetric],
        fill: true,
        tension: 0,
        borderColor: '#c8e972',
        backgroundColor: 'rgba(201, 255, 59, 0.1)',
        pointRadius: 5,
        pointHoverRadius: 5,
        // Highlight the max value point
        pointBackgroundColor: dataMap[selectedMetric].map((val) => (val === maxValue ? '#161618' : 'transparent')),
        pointBorderColor: dataMap[selectedMetric].map((val) => (val === maxValue ? '#c8e972' : 'transparent')),
        pointBorderWidth: 3,
      },
    ],
  };

  // Custom plugin
  const hoverPlugin = {
    id: 'hoverPlugin',
    afterDatasetsDraw: (chart: any) => {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const activePoint = chart.tooltip._active[0];
        const ctx = chart.ctx;
        const x = activePoint.element.x;
        const y = activePoint.element.y + 6;
        const radius = activePoint.element.options.radius || 5;
        const baseY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(x, baseY);
        ctx.lineTo(x, y - radius);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#c8e972';
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: { left: 0, right: 0, top: 0, bottom: 0 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        // Custom external tooltip
        external: function (context: any) {
          let tooltipEl = document.getElementById('custom-tooltip');
          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'custom-tooltip';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.zIndex = '999';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.transition = 'all 0.2s ease';
            document.body.appendChild(tooltipEl);
          }

          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
          }

          const dataIndex = tooltipModel.dataPoints?.[0]?.dataIndex;
          const dataset = tooltipModel.dataPoints?.[0]?.dataset?.data;

          if (!dataset || typeof dataIndex !== 'number') return;

          const currentValue = dataset[dataIndex];
          const previousValue = dataIndex > 0 ? dataset[dataIndex - 1] : null;

          // Format value as currency
          const formatCurrency = (value: number) => {
            if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
            return `$${value}`;
          };

          // Calculate percentage difference
          const getDiffPercentage = (curr: number, prev: number) => {
            const diff = ((curr - prev) / prev) * 100;
            return `${Math.abs(diff).toFixed(1)}%`;
          };

          const isIncrease = previousValue !== null && currentValue > previousValue;
          const direction = isIncrease ? '↑' : '↓';
          const arrowColor = isIncrease ? '#c8e972' : '#ef4444';
          const arrowBg = isIncrease ? 'rgba(200, 233, 114, 0.3)' : 'rgba(239, 68, 68, 0.2)';
          const labelText = previousValue ? `${getDiffPercentage(currentValue, previousValue)} ${isIncrease ? 'above' : 'below'} target` : '';

          // Tooltip content
          tooltipEl.innerHTML = `
    <div style="width: 210px; padding: 10px; background: #222324; border: 1px solid #5a5a5a; border-radius: 9px;">
      <div style="display: flex; justify-content: space-between; color: #ffffff; align-items: center; font-size: 1.5rem; font-weight: bold; padding-bottom: 8px;">
        <span>${formatCurrency(currentValue)}</span>
        <button style="border: 1px solid #ccc; border-radius: 9999px; padding: 0 6px; font-size: 0.875rem; background: transparent; color: white;">?</button>
      </div>
      ${
        previousValue !== null
          ? `
        <div>
          <span style="color: ${arrowColor}; background-color: ${arrowBg}; border: 1px solid ${arrowColor}; border-radius: 9999px; padding: 0 3px; margin-right: 4px;">${direction}</span>
          <span style="color: #ccc;">${labelText}</span>
        </div>`
          : ''
      }
    </div>
  `;

          // Position the tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = '1';
          tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          drawTicks: false,
          color: '#313131',
        },
        border: {
          display: true,
          color: '#5A5A5A',
        },
        ticks: {
          color: '#FFFFFF',
          padding: 20,
          font: {
            size: 14,
          },
          maxTicksLimit: 6,
          // Format Y-axis ticks as currency
          callback: (val: number | string) => {
            return `$${(+val / 1000).toFixed(0)}K`;
          },
        },
      },
      x: {
        grid: {
          drawTicks: false,
          drawOnChartArea: false,
        },
        border: {
          display: true,
          color: '#5A5A5A',
        },
        ticks: {
          color: '#FFFFFF',
          padding: 20,
          font: {
            size: 14,
          },
          maxTicksLimit: 7,
        },
      },
    },
  };

  return (
    // Chart container
    <div className="mt-6 w-full max-w-3xl rounded-md border border-[#5A5A5A] bg-[#242424] p-6 pl-0 text-white shadow-md">
      {/* Dropdown row: margin-bottom, flex, right-aligned */}
      <div className="mb-4 flex justify-end">
        {/* Dropdown to switch metrics*/}
        <select
          className="rounded-md border border-[#5A5A5A] bg-[#1f1f1f] px-2 py-1 text-sm"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value as any)}
        >
          {Object.keys(dataMap).map((key) => (
            <option key={key} value={key} className="bg-[#1f1f1f] text-[#BBBBBB]">
              {key}
            </option>
          ))}
        </select>
      </div>
      {/* Line chart */}
      <Line data={data} options={options} plugins={[hoverPlugin]} />
    </div>
  );
};

export default LineChart;
