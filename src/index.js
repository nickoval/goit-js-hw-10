import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

let name = '';

const refs = {
  inputName: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputName.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  refs.countryInfo.textContent = evt.target.value.trim();
  console.log(evt.target.value.trim());
  fetchCountries(evt.target.value.trim());
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      // console.log(response);
      return response.json();
    })
    .then(countryData => {
      console.log(countryData);
      dataAnalysis(countryData);
      // refs.countryInfo.innerHTML = markup;
      // const markup = countryCardMarkup(country);
      // console.log('fetchCountries ~ markup', markup);
    });
  // fetch(
  //   `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  // )
  //   .then(response => {
  //     response.json();
  //     console.log(response);
  //     // Response handling
  //   })
  //   // .then(data => {})
  //   .catch(error => {
  //     // Error handling
  //     console.log(error);
  //   });
}

// fetchCountries('peru');

// https://restcountries.com/v2/all?fields=name,capital,currencies

function dataAnalysis(data) {
  if (data.length > 10) {
    Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1) {
    console.log('Some countryes');
    refs.coutnryList.insertAdjacentHTML('beforeend', markupCountries);
  } else if (data.length === 1) {
    console.log('ONE country !!!');
    refs.coutnryInfo.insertAdjacentHTML('beforeend', markupCountry);
  }
}

function markupCountries(countries) {
  const markup = countries
    .map(country => `<h2 class='country-name'>${country.name.oficial}</h2>`)
    .join('');
}

function markupCountry(countries) {
  const markup = countries.map(
    country =>
      `  <img src='${country.flags.svg}' alt='${country.capital}' /> <h2 class='country-name'>${country.name.oficial}</h2>  <p class='country-capital'><b>Capital: </b>${country.capital}</p>
  <p class='country-population'><b>Population: </b>${country.population}</p>
  <p class='country-population'><b>Languages: </b>${country.languages}</p>`
  );
}
