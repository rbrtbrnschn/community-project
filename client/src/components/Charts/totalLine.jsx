import React from 'react';
import { Line } from 'react-chartjs-2'

const TotalLine = props => {
    const { tasks } = props;

    const handleData = (tasks) => {
        let datasets = []
        tasks.forEach((t, index) => {
            let data = []
            const timestamps = t.timestamps.filter(s => {
                if (s.streak) return s;
            })
            const keys = timestamps.map((t) => t.key);
            const streaks = timestamps.map((t) => t.streak);

            timestamps.forEach((s, i) => {
                data.push({ x: new Date(keys[i]), y: streaks[i] })
            })
            let r = Math.random() * 250, g = Math.random() * 250, b = Math.random() * 250;
            datasets.push({
                label: tasks[index].title,
                data: data,
                borderDash: [10, 5],
                backgroundColor: `rgba(${r},${g},${b},0.5)`,
                borderColor: `rgba(${r},${g},${b},1)`,
                backThickness: 10
            })

        })

        return { datasets: datasets }
    }

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

    return <Line data={handleData(tasks)} options={handleOptions(tasks)} />
}

export default TotalLine;