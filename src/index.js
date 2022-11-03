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
  if (evt.target.value.trim() === '') {
    return clearAll();
  }
  console.log(evt.target.value.trim());
  fetchCountries(evt.target.value.trim().toLowerCase());
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
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function dataAnalysis(data) {
  clearAll();
  if (data.length > 10) {
    Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1) {
    console.log('Some countryes');
    // refs.countryList.innrHTML = data
    //   .map(
    //     country =>
    //       ` <img src='${country.flags.svg}' alt='${country.name.official}' width='150'/> <h3 class='country-name'>${country.name.official}</h3>`
    //   )
    //   .join('');
    refs.countryList.insertAdjacentHTML(
      'beforeend',
      data
        .map(
          country =>
            `  <img src='${country.flags.svg}' alt='${country.name.official}' width='150'/>
          <h3 class='country-name'>${country.name.official}</h3>`
        )
        .join('')
    );
    // refs.countryList.innerHTM = markupCountries(data);
  } else if (data.length === 1) {
    console.log('ONE country !!!');
    //   refs.countryInfo.innerHTML = data.map(
    //     country =>
    //       `  <img src='${country.flags.svg}' alt='${
    //         country.name.official
    //       }' width='200'/>
    //         <h2 class='country-name'>${
    //           country.name.official
    //         }</h2>  <p class='country-capital'><b>Capital: </b>${
    //         country.capital
    //       }</p>
    // <p class='country-population'><b>Population: </b>${
    //   country.population
    // }</p>  <p class='country-languages'><b>Languages: </b>${Object.values(
    //         country.languages
    //       )}</p>
    // `
    //   );
    refs.countryInfo.insertAdjacentHTML(
      'beforeend',
      data.map(
        country =>
          `  <img src='${country.flags.svg}' alt='${
            country.name.official
          }' width='200'/>
            <h2 class='country-name'>${
              country.name.official
            }</h2>  <p class='country-capital'><b>Capital: </b>${
            country.capital
          }</p>
    <p class='country-population'><b>Population: </b>${
      country.population
    }</p>  <p class='country-languages'><b>Languages: </b>${Object.values(
            country.languages
          )}</p>
    `
      )
    );
    // refs.countryInfo.innertHTML = markupCountry(data);
  }
}

function markupCountries(countries) {
  const markup = countries
    .map(country => `<h2 class='country-name'>${country.name.oficial}</h2>`)
    .join('');
  return markup;
}

// function markupCountry(countries) {
//   return countries.map(
//     country =>
//       `  <img src='${country.flags.svg}' alt='${country.capital}' /> <h2 class='country-name'>${country.name.oficial}</h2>  <p class='country-capital'><b>Capital: </b>${country.capital}</p>
//   <p class='country-population'><b>Population: </b>${country.population}</p>
//   `
//   );
// }

function clearAll() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
