import React, { useState, useEffect } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";

const ChartComponent = (props) => {
  const { task, tasks } = props;

  const handleData = (task) => {
    /*const timestamps = task.timestamps.filter((t) => {
      if (t.streak) return t;
    });

    const keys = timestamps.map((t) => t.key);
    const streaks = timestamps.map((t) => t.streak);

    const data = timestamps.map((t, i) => {
      return { x: new Date(keys[i]), y: streaks[i] };
    });
    */
	  let datasets = []
	  tasks.forEach((t,index)=>{
	  	let data = []
	  	const timestamps = t.timestamps.filter(s=>{
	  		if(s.streak)return s;
	  	})
		const keys = timestamps.map((t)=>t.key);
		const streaks = timestamps.map((t)=>t.streak);

		timestamps.forEach((s,i)=>{
			data.push({x: new Date(keys[i]),y:streaks[i]})
		})
		  let r = Math.random()*250,g = Math.random()*250, b = Math.random() * 250;
		datasets.push({
			label:tasks[index].title,
			data: data,
			borderDash: [10,5],
			backgroundColor: `rgba(${r},${g},${b},0.5)`,
			borderColor: `rgba(${r},${g},${b},1)`,
			backThickness: 10
		})

	  })
    
    return {
      datasets: datasets,
    };
  };

  const handleOptions = (task) => ({
    responsive: true,
    title: {
      display: false,
      text: task.title,
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: "week",
            unit: "day",
            tooltipFormat: "ll",
          },
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "value",
          },
        },
      ],
    },
    legend: { display: false },
  });

  return (<div>
			<p className="title is-4">{task.title}</p>
	  		<p className="subtitle">Streak: {task.streak}</p>
			<Line options={handleOptions(task)} data={handleData(task)} /> </div>);
};

export default ChartComponent;
