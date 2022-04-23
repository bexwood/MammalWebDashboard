const CHART1a1 = document.getElementById('KPI1ag1').getContext('2d'); // get the KPI1.1 canvas

const CHART1b1 = document.getElementById('KPI1bg1').getContext('2d'); // get the KPI1.1 canvas

const CHART2a1 = document.getElementById('KPI2ag1').getContext('2d'); // get the KPI1.1 canvas

const CHART2b1 = document.getElementById('KPI2bg1').getContext('2d'); // get the KPI1.1 canvas

const CHART3a1 = document.getElementById('KPI3ag1').getContext('2d'); // get the KPI1.1 canvas

const CHART3d1 = document.getElementById('KPI3dg1').getContext('2d'); // get the KPI1.1 canvas


// chart 1a - line
const Chart1a1 = new Chart(CHART1a1, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Number of Images for Classification',
            backgroundColor: [
                '#F7931D'
            ],
            borderColor: [
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'classifying images',
            backgroundColor: [
                '#F7931D'
            ],
            borderColor: [
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Number of camera-days',
            backgroundColor: [
                '#E15183'
            ],
            borderColor: [
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Number of image sequences uploaded',
            backgroundColor: [
                '#E15183'
            ],
            borderColor: [
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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Number of classification "events"',
            backgroundColor: [
                '#0C6638'
            ],
            borderColor: [
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
        datasets: [{
            label: 'Number of animals (mammals/birds) identified',
            backgroundColor: [
                '#0C6638'
            ],
            borderColor: [
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

fetch('http://localhost:3389/data')
    .then(x => x.json())
    .then(x => {
        let months = rotateLabels();
        Chart1a1.data.datasets[0].data = x['1a'][0].byMonth;
        Chart1a1.data.labels = months;
        Chart1a1.update();
        document.getElementById('KPI1_lastYear').innerHTML = x['1a'][0].lastYear;
        document.getElementById('KPI1_allTime').innerHTML = x['1a'][0].allTime;


        Chart1b1.data.datasets[0].data = x['1b'][0].byMonth;
        Chart1b1.data.labels = months;
        Chart1b1.update();
        document.getElementById('KPI1b_lastYear').innerHTML = x['1b'][0].lastYear;
        document.getElementById('KPI1b_allTime').innerHTML = x['1b'][0].allTime;

        Chart2a1.data.datasets[0].data = x['2a'][0].byMonth;
        Chart2a1.data.labels = months;
        Chart2a1.update();
        document.getElementById('KPI2a_lastYear').innerHTML = x['2a'][0].lastYear;
        document.getElementById('KPI2a_allTime').innerHTML = x['2a'][0].allTime;

        Chart2b1.data.datasets[0].data = x['2b'][0].byMonth;
        Chart2b1.data.labels = months;
        Chart2b1.update();
        document.getElementById('KPI2b_lastYear').innerHTML = x['2b'][0].lastYear;
        document.getElementById('KPI2b_allTime').innerHTML = x['2b'][0].allTime;

        Chart3a1.data.datasets[0].data = x['3a'][0].byMonth;
        Chart3a1.data.labels = months;
        Chart3a1.update();
        document.getElementById('KPI3a_lastYear').innerHTML = x['3a'][0].lastYear;
        document.getElementById('KPI3a_allTime').innerHTML = x['3a'][0].allTime;

        Chart3d1.data.datasets[0].data = x['3d'][0].animalsBySpecies.map(x => x[1]);
        Chart3d1.data.labels = x['3d'][0].animalsBySpecies.map(x => x[2]);
        Chart3d1.update();

        document.getElementById('KPI3d_NoAnimals').innerHTML = x['3d'][0].numberAnimals;
        document.getElementById('KPI3d_NoSpecies').innerHTML = x['3d'][0].numberSpecies;


        document.getElementById('KPI4aii_number').innerHTML = x['1a'][0].lastYear;
        document.getElementById('KPI1_allTime').innerHTML = x['1a'][0].allTime;


    });


fetch('http://localhost:3389/dataUpload')
    .then(x => x.json())
    .then(x => {
        document.getElementById('KPI4ai_number').innerHTML = x['4ai'][0].number;
        document.getElementById('KPI4ai_proportion').innerHTML = x['4ai'][0].proportion;

        document.getElementById('KPI4aii_number').innerHTML = x['4aii'][0].number;
        document.getElementById('KPI4aii_proportion').innerHTML = x['4aii'][0].proportion;


        document.getElementById('KPI4bi_number').innerHTML = x['4bi'][0].number;
        document.getElementById('KPI4bi_proportion').innerHTML = x['4bi'][0].proportion;

        document.getElementById('KPI4bii_number').innerHTML = x['4bii'][0].number;

        document.getElementById('KPI5a_number').innerHTML = x['5a'][0].number;

        document.getElementById('KPI5b_number').innerHTML = x['5b'][0].number;

        document.getElementById('KPI5c_number').innerHTML = x['5c'][0].number;

        document.getElementById('KPI5d_number').innerHTML = x['5d'][0].number;

        document.getElementById('KPI5e_number').innerHTML = x['5e'][0].number;

        document.getElementById('KPI6_number').innerHTML = x['6a'][0].number;
        document.getElementById('KPI6_total').innerHTML = x['6b'][0].value;
        document.getElementById('KPI6_other').innerHTML = x['6c'][0].value;

        //document.getElementById('timestamp4').innerHTML = '<i>Last updated: ' + x['date'] + '</i>';
        //document.getElementById('timestamp5').innerHTML = '<i>Last updated: ' + x['date'] + '</i>';
        //document.getElementById('timestamp6').innerHTML = '<i>Last updated: ' + x['date'] + '</i>';
});

fetch('http://localhost:3389/dataProp')
    .then(x => x.json())
    .then(x => {
        document.getElementById('timestamp4').innerHTML = '<i>Last updated: ' + x['date'] + '</i>';
        document.getElementById('timestamp5').innerHTML = '<i>Last updated: ' + x['date'] + '</i>';
        document.getElementById('timestamp6').innerHTML = '<i>Last updated: ' + x['date'] + '</i>';
});

const rotateLabels = () => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < new Date().getMonth()+1; i++) {
        let tempMonth = months[0];

        for (let j = 0; j < months.length; j++) {
            if (j !== months.length - 1) {
                months[j] = months[j + 1];
            } else {
                months[j] = tempMonth;
            }
        }
    }

    return [...months];
}
