async function fetchExampleData() {
    try {
        const response = await fetch('/example/get-example-data');
        const data = await response.json();
        document.getElementById('dataResult').textContent = data.message;
    } catch (error) {
        document.getElementById('dataResult').textContent = 'Error fetching data';
    }
}
