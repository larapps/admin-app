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
    return [ `rgb(235, 95, 26)`, `rgb(246, 164, 23)`, `rgb(254, 207, 22)`, `rgb(102, 198, 222)`, `rgb(52, 179, 231)`, `rgb(67, 138, 201)`, `rgb(42, 84, 161)`, `rgb(132, 58, 142)`, `rgb(236, 93, 146)`, `rgb(231, 39, 79)`, `rgb(75, 177, 96)`, `rgb(193, 192, 192)`, `rgb(48, 192, 240)`, `rgb(15, 55, 114)`, `rgb(79, 70, 151)`, `rgb(163, 208, 156)`, `rgb(239, 236, 134)`, `rgb(115, 201, 222)`, `rgb(206, 103, 41)`, `rgb(231, 57, 67)` ];
    // return Array.from({ length: count }, () => {
    //   const r = Math.floor(Math.random() * 100 + 50); // Red (150-255)
    //   const g = Math.floor(Math.random() * 100 + 50); // Green (150-255)
    //   const b = Math.floor(Math.random() * 100 + 50); // Blue (150-255)
    //   return `rgb(${r}, ${g}, ${b})`; // Return the color as an RGB string
    // });
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