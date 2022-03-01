const submit = document.getElementById('submit');
submit.addEventListener('click', async function (event) {
    event.preventDefault();

    let file = document.getElementById("file").files[0];
    let formData = new FormData();

    formData.append("file", file);
    fetch('/upload', {method: "POST", body: formData});

});