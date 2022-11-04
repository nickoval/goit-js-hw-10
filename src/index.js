import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { markupCountriesList, markupCountryInfo } from './renderMarkups';

const DEBOUNCE_DELAY = 300;

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
  fetchCountries(evt.target.value.trim().toLowerCase())
    .then(countryData => {
      // console.log(countryData);
      dataAnalysis(countryData);
    })
    .catch(error => {
      console.log('onInput ~ error', error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function clearAll() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

// Вариант с вынесением разметки в отдельный модуль
// -----------------------------------------
function dataAnalysis(data) {
  clearAll();
  if (data.length > 10) {
    Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1) {
    // renderCountriesList(data);
    refs.countryList.insertAdjacentHTML(
      'beforeend',
      data.map(markupCountriesList).join('')
    );
  } else if (data.length === 1) {
    // renderCountryInfo(data);
    refs.countryInfo.insertAdjacentHTML(
      'beforeend',
      data.map(markupCountryInfo)
    );
  }
}

// function renderCountriesList(countries) {
//   refs.countryList.insertAdjacentHTML(
//     'beforeend',
//     countries.map(markupCountriesList).join('')
//   );
// }

// function renderCountryInfo(countries) {
//   refs.countryInfo.insertAdjacentHTML(
//     'beforeend',
//     countries.map(markupCountryInfo)
//   );
// }
// ========================================

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function dataAnalysis(data) {
//   clearAll();
//   if (data.length > 10) {
//     Notify.failure(
//       'Too many matches found. Please enter a more specific name.'
//     );
//   } else if (data.length > 1) {
//     renderCountriesList(data);
//   } else if (data.length === 1) {
//     renderCountryInfo(data);
//   }
// }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Вариант без дробления функций (как здавалась домашка)
// -------------------------------------------------
// function renderCountriesList(countries) {
//   refs.countryList.insertAdjacentHTML(
//     'beforeend',
//     countries
//       .map(
//         ({ flags, name }) =>
//           ` <li class='country-item'> <img src='${flags.svg}' alt='${name.official}' width='150'/>
//           <h3 class='country-name'>${name.official}</h3> </li>`
//       )
//       .join('')
//   );
// }

// function renderCountryInfo(countries) {
//   refs.countryInfo.insertAdjacentHTML(
//     'beforeend',
//     countries.map(
//       ({ flags, name, capital, population, languages }) =>
//         `  <img src='${flags.svg}' alt='${name.official}' width='200'/>
//             <h2 class='country-name'>${
//               name.official
//             }</h2>  <p class='country-capital'><b>Capital: </b>${capital}</p>
//     <p class='country-population'><b>Population: </b>${population}</p>  <p class='country-languages'><b>Languages: </b>${Object.values(
//           languages
//         )}</p>
//     `
//     )
//   );
// }
// ==========================================================

// //Вариант c дроблением функций
// --------------------------------------------------------
// function renderCountriesList(countries) {
//   refs.countryList.insertAdjacentHTML(
//     'beforeend',
//     countries.map(markupCountriesList).join('')
//   );
// }

// function markupCountriesList({ flags, name }) {
//   return ` <li class='country-item'> <img src='${flags.svg}' alt='${name.official}' width='150'/>
//           <h3 class='country-name'>${name.official}</h3> </li>`;
// }

// function renderCountryInfo(countries) {
//   refs.countryInfo.insertAdjacentHTML(
//     'beforeend',
//     countries.map(markupCountryInfo)
//   );
// }

// function markupCountryInfo({ flags, name, capital, population, languages }) {
//   return `  <img src='${flags.svg}' alt='${name.official}' width='200'/>
//             <h2 class='country-name'>${
//               name.official
//             }</h2>  <p class='country-capital'><b>Capital: </b>${capital}</p>
//     <p class='country-population'><b>Population: </b>${population}</p>  <p class='country-languages'><b>Languages: </b>${Object.values(
//     languages
//   )}</p>
//     `;
// }
// =============================================================================
