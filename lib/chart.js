import { css, html, LitElement, unsafeCSS } from "lit-element";
import {
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip
} from "chart.js";
import "chartjs-adapter-date-fns";
import { cs } from "date-fns/locale";
import { formatDate, formatMoney } from "./format.js";

Chart.register(
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip
);

Chart.defaults.font.size = 12;
Chart.defaults.font.family = "'Montserrat', sans-serif";

const CANVAS_ID = "hlidac-shopu-chart";
const red = "#ff8787";
const blue = "#5c62cd";

const createChartData = (currentPrice, originalPrice) => ({
  labels: currentPrice.map(p => p.x),
  datasets: [
    {
      data: originalPrice,
      label: "Uváděná původní cena",
      stepped: "after",
      backgroundColor: "#ffffff00",
      borderColor: blue,
      borderWidth: 2,
      borderCapStyle: "round",
      fill: false,
      pointRadius: 0,
      spanGaps: false
    },
    {
      data: currentPrice,
      label: "Doplněná prodejní cena",
      stepped: "after",
      backgroundColor: "#ffffff00",
      borderColor: red,
      borderWidth: 1,
      borderDash: [5, 10],
      borderCapStyle: "round",
      fill: false,
      pointRadius: 0,
      spanGaps: true
    },
    {
      data: currentPrice,
      label: "Prodejní cena",
      stepped: "after",
      backgroundColor: "#ffffff00",
      borderColor: red,
      borderWidth: 2,
      borderCapStyle: "round",
      fill: false,
      pointRadius: 0,
      spanGaps: false
    }
  ]
});

const tooltipFormatter = {
  title(items) {
    const date = new Date(items[0].dataPoint.x);
    return formatDate(date);
  },
  label(item) {
    if (item.datasetIndex === 0) {
      return `Uváděná původní cena: ${formatMoney(item.dataPoint.y)}`;
    } else if (item.datasetIndex === 1) {
      return `Prodejní cena: ${formatMoney(item.dataPoint.y)}`;
    }
  },
  labelColor(item) {
    const color = item.datasetIndex > 0 ? red : blue;

    return {
      backgroundColor: color
    };
  }
};

function configureScales(currentPrice) {
  const values = currentPrice.filter(p => p.y !== null).map(p => p.y);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const count = currentPrice.length;
  const stepSize = Math.floor(count / 12) || 1;
  return {
    x: {
      type: "time",
      time: {
        unit: "day",
        stepSize,
        displayFormats: { day: "d. MMM ’yy" }
      },
      adapters: { date: { locale: cs } }
    },
    y: {
      type: "linear",
      suggestedMax: max + 0.1 * max,
      suggestedMin: min - 0.1 * min,
      ticks: { callback: formatMoney }
    }
  };
}

export class PriceChart extends LitElement {
  static get properties() {
    return {
      chart: { type: Object },
      data: { type: Object }
    };
  }

  get canvasContext() {
    const canvas = this.renderRoot.getElementById(CANVAS_ID);
    return canvas.getContext("2d");
  }

  firstUpdated(props) {
    if (!this.data) return;

    const { currentPrice, originalPrice } = this.data;
    this.chart = new Chart(this.canvasContext, {
      type: "line",
      data: createChartData(currentPrice, originalPrice),
      options: {
        scales: configureScales(currentPrice),
        tooltips: {
          mode: "index",
          intersect: false,
          titleFont: { color: "#1d3650" },
          bodyFont: { color: "#1d3650" },
          bodySpacing: 4,
          backgroundColor: "#fcf4a7",
          borderColor: "#fbea61",
          borderWidth: 2,
          xPadding: 12,
          yPadding: 8,
          caretSize: 12,
          callbacks: tooltipFormatter
        }
      }
    });
  }

  static get styles() {
    return css`
      .hs-legend {
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
      }
      .hs-legend__point {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        margin-right: 5px;
        margin-top: 2px;
      }
      .hs-legend__point--original-price {
        background-color: ${unsafeCSS(blue)};
      }
      .hs-legend__point--current-price {
        background-color: ${unsafeCSS(red)};
        margin-left: 8px;
      }
    `;
  }

  render() {
    // TODO: if (!this.data)
    return html`
      <div>
        <div class="hs-legend">
          <div class="hs-legend__point hs-legend__point--original-price"></div>
          <span>Uváděná původní cena</span>
          <div class="hs-legend__point hs-legend__point--current-price"></div>
          <span>Prodejní cena</span>
        </div>
        <canvas id="${CANVAS_ID}" width="100%"></canvas>
      </div>
    `;
  }
}

customElements.define("hs-chart", PriceChart);