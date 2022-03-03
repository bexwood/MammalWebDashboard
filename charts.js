
const CHART1a1 = document.getElementById('KPI1ag1').getContext('2d'); // get the KPI1.1 canvas
// const CHART1a2 = document.getElementById('KPI1ag2').getContext('2d'); // get the KPI1.1 canvas

const CHART1b1 = document.getElementById('KPI1bg1').getContext('2d'); // get the KPI1.1 canvas
// const CHART1b2 = document.getElementById('KPI1bg2').getContext('2d'); // get the KPI1.1 canvas

const CHART2a1 = document.getElementById('KPI2ag1').getContext('2d'); // get the KPI1.1 canvas
// // const CHART2a2 = document.getElementById('KPI2ag2').getContext('2d'); // get the KPI1.1 canvas

const CHART2b1 = document.getElementById('KPI2bg1').getContext('2d'); // get the KPI1.1 canvas
// // // const CHART2b2 = document.getElementById('KPI2bg2').getContext('2d'); // get the KPI1.1 canvas

const CHART3a1 = document.getElementById('KPI3ag1').getContext('2d'); // get the KPI1.1 canvas
// const CHART3a2 = document.getElementById('KPI3ag2').getContext('2d'); // get the KPI1.1 canvas

const CHART3d1 = document.getElementById('KPI3dg1').getContext('2d'); // get the KPI1.1 canvas
// const CHART3d2 = document.getElementById('KPI3dg2').getContext('2d'); // get the KPI1.1 canvas

/* $.ajax({
    type: "GET",
    url: 'calculations.json',
    dataType: 'json',
    success: function (result) {
        const Chart1a1 = new Chart(CHART1a1, {
            type: 'line',
            data: {
                labels:  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Number of Images for Classification',
                    data: result["1a"]["byMonth"],
                    backgroundColor: ['#F7931D'],
                    borderColor:['#F7931D'],
                    borderWidth: 1.5
                }]
               
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            }
        });
    }
}) */



// chart 1a - line 
const Chart1a1 = new Chart(CHART1a1, {
    type: 'line',
    data: {
        labels:  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Number of Images for Classification',
            data: [0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                '#F7931D'
            ],
            borderColor:[
            '#F7931D'
            ],

            borderWidth: 1.5
        }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
}
});  

// chart 1b - line 
const Chart1b1 = new Chart(CHART1b1, {
    type: 'line',
    data: {
        labels:  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'classifying images',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
            backgroundColor: [
                '#F7931D'
            ],
            borderColor:[
            '#F7931D'
            ],
            borderWidth: 1.5
        }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
}
});

// chart 2a - line 
const Chart2a1 = new Chart(CHART2a1, {
    type: 'line',
    data: {
        labels:  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Number of camera-days',
            data:  [0, 0, 7278, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
            backgroundColor: [
                '#E15183'
            ],
            borderColor:[
                '#E15183'
            ],
            borderWidth: 1.5
        }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
}
});

// chart 2b - line 
const Chart2b1 = new Chart(CHART2b1, {
    type: 'line',
    data: {
        labels:  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Number of image sequences uploaded',           
            data:  [0, 0, 6674, 0, 0, 0, 0, 0, 0, 0, 0, 0]  ,
            backgroundColor: [
                '#E15183'
            ],
            borderColor:[
                '#E15183'
            ],
            borderWidth: 1.5
        }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
}
});

// chart 3a - line 
const Chart3a1 = new Chart(CHART3a1, {
    type: 'line',
    data: {
        labels:  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Number of classification "events"',
            data:  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  ,
            backgroundColor: [
                '#0C6638'
            ],
            borderColor:[
                '#0C6638'
            ],
            borderWidth: 1.5
        }]
    },
    options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
}
});


// chart 3d - bar 
const Chart3d1 = new Chart(CHART3d1, {
    type: 'bar',
    data: {
        labels:  ['Badger','Blackbird (Eurasian)','Domestic cat','Carrion crow','Domestic dog','Grey squirrel','Magpie (Eurasian)','Rabbit','Red fox','Roe deer', 'Woodpigeon', 'Brown (European) hare', 'Hedgehog (Western)','Pheasant (common)','Red deer','Small rodent (unknown species)','Pine marten','Nothing','Human','Other',"Don't Know",'Like', 'Otter'],
        datasets: [{
            label: 'Number of animals (mammals/birds) identified',
            data:  [226, 79, 3, 1, 21, 152, 26, 685, 106, 12035, 6, 2, 3, 55, 8, 83, 11, 2762, 806, 51, 60, 3]  ,
            backgroundColor: [
                '#0C6638'
            ],
            borderColor:[
                '#0C6638'
            ],
            
        }]
    },
    options: {
    responsive: true,
    beginAtZero: true,
    plugins: {
      legend: {
        position: 'top',
      },
    }
}
});