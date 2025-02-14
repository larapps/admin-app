import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';


ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props){

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
    },
  };

  const generateColors = (count) => {
    return Array.from({ length: count }, () => {
      const r = Math.floor(Math.random() * 100 + 50); // Red (150-255)
      const g = Math.floor(Math.random() * 100 + 50); // Green (150-255)
      const b = Math.floor(Math.random() * 100 + 50); // Blue (150-255)
      return `rgb(${r}, ${g}, ${b})`; // Return the color as an RGB string
    });
  };

  const generateBorderColors = (lightColors) => {
    return lightColors.map((color) => {
      // Extract RGB values from the light color
      const [r, g, b] = color
        .match(/\d+/g) // Extract RGB values
        .map((value) => Math.max(0, parseInt(value) - 50)); // Darken by 50
      return `rgb(${r}, ${g}, ${b})`;
    });
  };

  const backgroundColors = generateColors(props.labels.length);
  const borderColors = generateBorderColors(backgroundColors);

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        data: props.data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
        borderColors: borderColors,
        borderWidth: 1,
      },
    ],
  };

    return (
        <>

            <Pie
                data={data}
                options={options}
            />

<div style={{ marginTop: "20px" }}>
        {data.labels.map((label, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: data.datasets[0].backgroundColor[index],
                marginRight: "8px",
              }}
            ></div>
            <span>{label}</span>
          </div>
        ))}
      </div>
        </>
    )
}

export default PieChart;