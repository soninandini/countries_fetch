document.addEventListener('DOMContentLoaded',function(){
    function fetching(){
         const urlparam = new URLSearchParams(window.location.search);
         const countryCode = urlparam.get('country');
         fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
         .then(response => response.json())
         .then(countryData =>{
            const country = countryData[0];
            console.log(country);
            displaycountrydetails(country);
            if(country.borders){
                fetchNeighborCountries(country.borders);
            }
         })
         .catch(error => console.error('error fetching details:',error));
    }
    function displaycountrydetails(country){
    const countryNameElem = document.getElementById('country_name');
        const countryImageElem = document.getElementById('country_image');
        const nativeNameElem = document.getElementById('native_name');
        const capitalElem = document.getElementById('country_capital');
        const populationElem = document.getElementById('country_population');
        const regionElem = document.getElementById('country_region');
        const subregionElem = document.getElementById('country_subregion');
        const areaElem = document.getElementById('country_area');
        const codeElem = document.getElementById('country_code');
        const languagesElem = document.getElementById('country_languages');
        const currenciesElem = document.getElementById('country_currencies');
        const timezonesElem = document.getElementById('country_timezones');

        countryNameElem.textContent = country.name.common;
        countryImageElem.src = country.flags.svg;
        nativeNameElem.textContent = `Native Name: ${Object.values(country.name.nativeName)[0]?.common || 'N/A'}`;
        capitalElem.textContent = `Capital: ${country.capital?.[0] || 'N/A'}`;
        populationElem.textContent = `Population: ${country.population.toLocaleString()}`;
        regionElem.textContent = `Region: ${country.region}`;
        subregionElem.textContent = `Sub-region: ${country.subregion}`;
        areaElem.textContent = `Area: ${country.area} Km²`;
        codeElem.textContent = `Country Code: +${country.idd.root}${country.idd.suffixes?.[0] || ''}`;
        languagesElem.textContent = `Languages: ${Object.values(country.languages).join(', ')}`;
        currenciesElem.textContent = `Currencies: ${Object.values(country.currencies)[0]?.name || 'N/A'}`;
        timezonesElem.textContent = `Timezones: ${country.timezones.join(', ')}`;
    } 
    
    function fetchNeighborCountries(neighborCodes) {
        const neighborContainer = document.getElementById('neighbor-countries');
        if (!neighborContainer) {
            console.error('Element with ID "neighbor-countries" not found.');
            return;
        }

        neighborCodes.forEach(function(code) {
            fetch(`https://restcountries.com/v3.1/alpha/${code}`)
                .then(response => response.json())
                .then(neighborData => {
                    const neighbor = neighborData[0];
                    const neighborFlag = `
                        <div class="neighbor-country">
                            <img src="${neighbor.flags.svg}" alt="${neighbor.name.common} flag" title="${neighbor.name.common}" />
                        </div>
                    `;
                    neighborContainer.innerHTML += neighborFlag;
                })
                .catch(error => console.error(`Error fetching details for neighbor country code ${code}:`, error));
        });
    }
   

    fetching();
});