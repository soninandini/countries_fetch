
document.getElementById('searchbar').addEventListener('input', filterCountries);

function filterCountries() {
    const searchTerm = document.getElementById('searchbar').value.toLowerCase();
    const countryCards = document.querySelectorAll('.country_cards');

    countryCards.forEach(card => {
        const countryName = card.querySelector('h2').textContent.toLowerCase();
        if (countryName.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

fetch('https://restcountries.com/v3.1/all')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log(data);
    const countryDiv = document.querySelector('#country_cards');
    data.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country_cards');

        const countryFlag = document.createElement('div');
        countryFlag.classList.add('country_flag');
        countryFlag.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.common}">`;

        const countryDetails = document.createElement('div');
        countryDetails.classList.add('country_details');
        countryDetails.innerHTML = `<h2>${country.name.common}</h2>
                                    <p>Currency: ${country.currencies ? Object.values(country.currencies)[0].name : 'N/A'}</p>
                                    <p class="date">Current date and time: ${new Date().toLocaleString()}</p>
                                    <div class ="buttons"><button onclick="showmap(${country.latlng[0]}, ${country.latlng[1]})">Show Map</button>
                               <button onclick = "openDetails('${country.cca3}')">Details</button></div>`;

       

        countryCard.appendChild(countryFlag);
        countryCard.appendChild(countryDetails);
        countryDiv.appendChild(countryCard);
    });
})
.catch(error => {
    console.error('There is a problem with the fetch operation', error);
});

function showmap(lat, lng) {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
}
function openDetails(cca3){
    window.location.href = `detail.html?country=${cca3}`;
}
