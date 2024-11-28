import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighChartsAccessibility from "highcharts/modules/accessibility";
import { dashboardEndpoints } from "../utils/apis";
import axios from "axios";

HighChartsAccessibility(Highcharts);

const { GRAPH_API } = dashboardEndpoints;

const departmentMapping = {
  Strategy: "STR",
  Finance: "FIN",
  Quality: "QLT",
  Maintenance: "MAN",
  Stores: "STO",
  HR: "HR",
};

const Project_Chart = () => {
  const [chartData, setChartData] = useState({
    departments: [],
    totalCount: [],
    closerCount: [],
  });

  const TOKEN = localStorage.getItem("token");
  const BEARER_TOKEN = JSON.parse(TOKEN);
  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await axios.get(GRAPH_API, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        console.log(response);
        // send bearer toekn also in the header
        const projectData = response.data;
        const departmentData = {};
        projectData.forEach((item) => {
          const department = item.department;
          if (!departmentData[department]) {
            departmentData[department] = { total: 0, closed: 0 };
          }
          departmentData[department].total = item.totalCount;
          departmentData[department].closed = item.closerCount;
        });

        // Transform categories and ensure they follow the order defined in categoryMapping
        const departments = [];
        const total = [];
        const closed = [];
        for (const [key, value] of Object.entries(departmentMapping)) {
          if (departmentData[key]) {
            departments.push(value);
            total.push(departmentData[key].total);
            closed.push(departmentData[key].closed);
          }
        }

        setChartData({ departments, total, closed });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChart();
  }, []);

  const options = {
    chart: {
      type: "column",
      style: { borderRadius: "10px" },
    },
    title: { text: "" },
    xAxis: {
      categories: chartData.departments,
      accessibility: {
        description: "Departments",
      },
      crosshair: {
        color: "#e4f2f7",
      },
      labels: {
        formatter: function () {
          const categoryIndex = this.pos;
          const total = chartData.total[categoryIndex];
          const closed = chartData.closed[categoryIndex];
          const successPercentage = ((closed / total) * 100).toFixed(0);
          return (
            '<div style="text-align:center;" ><span style="font-weight:900;">' +
            successPercentage +
            '%</span><br><span style="font-weight:700;">' +
            this.value +
            "</span></div>"
          );
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      gridLineWidth: 0,
    },
    tooltip: {
      shared: true,
      formatter: function () {
        let tooltip = `<b>${this.x}</b><br>`;
        this.points.forEach((point) => {
          tooltip += `<span ${
            point.series.name === "Total"
              ? 'style="color:blue;"'
              : 'style="color:green;"'
          }>${
            point.series.name
          }</span>: <span style="font-weight:700;">${point.y.toFixed(
            1
          )} mm</span><br>`;
        });
        return tooltip;
      },
    },
    plotOptions: {
      column: {
        pointPadding: 0.3,
        groupPadding: 0.3,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y}",
          style: {
            color: "black",
          },
        },
      },
    },
    series: [
      {
        name: "Total",
        data: chartData.total,
        color: "blue",
      },
      {
        name: "Closed",
        data: chartData.closed,
        color: "green",
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Project_Chart;
