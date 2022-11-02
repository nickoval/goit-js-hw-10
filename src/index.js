import './css/styles.css';

const DEBOUNCE_DELAY = 300;


const refs = {
  searchName : document.querySelector('#search-box'),
  countryList :  document.querySelector('.country-list'),
  countryInfo : document.querySelector('.country-info'),

}

// searchName.addEventListener('input', ()=>{});


function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`)
  .then(response => {
    response.json();
    console.log(response);
    // Response handling
  })
  // .then(data => {})
  .catch(error => {
    // Error handling
    console.log(error);
  });
}

fetchCountries('sw');

// https://restcountries.com/v2/all?fields=name,capital,currencies