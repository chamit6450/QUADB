fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    const dataContainer = document.getElementById('data-container');
    data.forEach(item => {
      const dataItem = document.createElement('div');
      dataItem.className = 'data-item';
      dataItem.innerHTML = `
        <h2>${item.name}</h2>
        <p>Last: ${item.last}</p>
        <p>Buy: ${item.buy}</p>
        <p>Sell: ${item.sell}</p>
        <p>Volume: ${item.volume}</p>
        <p>Base Unit: ${item.base_unit}</p>
      `;
      dataContainer.appendChild(dataItem);
    });
  })
  .catch(error => {
    console.error(error);
  });