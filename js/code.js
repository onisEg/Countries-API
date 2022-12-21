let countriesList = []
let filteredCountries = []
const getCountries = () => {
    let anotherLoader = false;
    fetch('https://restcountries.com/v3.1/all').then((res) => res.json())
    .then(res => {
        countriesList = res;
        showCountries(countriesList);
    }).catch( error => {
        throw error;
    }).finally( () => {
        anotherLoader = false;
    })
}


const showCountries = list => {
    const tableBody = document.getElementById('country-list-body')
    let countriesListRow = ''
    tableBody.innerHTML = ''
    list.forEach(country => {
        countriesListRow += `<tr>
                            <td>${country.name.official}</td>
                            <td>${country.independent ? 'Yes' : 'No'}</td>
                            <td>${country.capital}</td>
                            <td>${country.region}</td>
                        </tr>`
    })
    tableBody.innerHTML = countriesListRow
}


//tried to compine three function in one put it didn't work i am still trying

// function onStringFilterChange(event) {
//     const SearchString = event.srcElement.value.toLowerCase()
//     if ( SearchString ) {
//         if (filteredCountries){
//             const countries = filteredCountries.slice()
//             filteredCountries = countries.filter(country => {
//                 if(country.capital)
//                  return country.capital[0].toLowerCase().includes(SearchString)|| 
//                 country.name.official.toLowerCase().includes(SearchString) ||
//                 country.region.toLowerCase().includes(SearchString)})
            
//             showCountries(filteredCountries)
//         }
//         else {
//         const countries = countriesList.slice()
       
//         filteredCountries = countries.filter(country => {
//             if(country.capital)
//              return country.capital[0].toLowerCase().includes(SearchString)|| 
//             country.name.official.toLowerCase().includes(SearchString) ||
//             country.region.toLowerCase().includes(SearchString)})
        
//         showCountries(filteredCountries)
//         }
//     } else {
//         showCountries(countriesList)
//     }
// }


// function onNameFilterChange(event) {
//     const nameSearchString = event.srcElement.value.toLowerCase()
//     if ( nameSearchString ) {
//         if (filteredCountries.length > 0){
//             const countries = filteredCountries.slice()
//             filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(nameSearchString))
//             showCountries(filteredCountries)
//         }
//         else {
//         const countries = countriesList.slice()
//         filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(nameSearchString))
//         showCountries(filteredCountries)
//         }
//     } else {
//         showCountries(countriesList);
//     }
// }

// function onRegionFilterChange(event) {
//     const RegionsearchString = event.srcElement.value.toLowerCase()
//     if ( RegionsearchString ) {
//         if(filteredCountries.length > 0){
//             const countries = filteredCountries.slice()
//             filteredCountries = countries.filter(country => country.region.toLowerCase().includes(RegionsearchString))
//             showCountries(filteredCountries)
//         }
//         else {
//             const countries = countriesList.slice()
//             filteredCountries = countries.filter(country => country.region.toLowerCase().includes(RegionsearchString))
//             showCountries(filteredCountries)
//         }
//     } else {
//         showCountries(countriesList)
//     }
// }

// function onCapitalFilterChange(event) {
//     const capitalSearchString = event.srcElement.value.toLowerCase()
//     if ( capitalSearchString ) {
//         if(filteredCountries.length > 0){
//             const countries = filteredCountries.slice()
//             filteredCountries = countries.filter(country => {
//                 if(country.capital)
//                  return country.capital[0].toLowerCase().includes(capitalSearchString)})
//             showCountries(filteredCountries)
//         }
//         else {
//             const countries = countriesList.slice()
//             filteredCountries = countries.filter(country => {
//                 if(country.capital)
//                 return country.capital[0].toLowerCase().includes(capitalSearchString)})
//         showCountries(filteredCountries)
//         }  
//     } else {
//         showCountries(countriesList)
//     }
// }

// function onIndependentFilterChange(event) {  // needs some fixing
//     const searchTwoValues = event.srcElement.value
//         // if (searchTwoValues == 'all'){
//         //     showCountries(countriesList)
//         // }
//         // else {
//             if(filteredCountries.length > 0){
//                 const countries = filteredCountries.slice();
//                 filteredCountries = countries.filter(country => country.independent == JSON.parse(searchTwoValues));
//                 showCountries(filteredCountries);
//             } else{
//                 const countries = countriesList.slice();
//                 filteredCountries = countries.filter(country => country.independent == JSON.parse(searchTwoValues));
//                 showCountries(filteredCountries);
//             }
//        // }
//  }

const filters = {
    name: null,
    region: null,
    independent: null,
    capital: null
}
function onFilterChange(event, filterName) {
    const searchString = event.srcElement.value.toLowerCase();
    filters[filterName] = searchString || null;
    applyFilter();
}

function applyFilter() {
    // const filteredCountries = countriesList.filter( country => { return country.official.name.includes('islamic') });
    const filteredCountries = countriesList.filter( country => {
        return  (filters.name ? country.name.official.toLowerCase().includes(filters.name) : true) && 
                (filters.region ? country.region.toLowerCase().includes(filters.region) : true) &&
                (filters.independent !== null ? country.independent === (filters.independent === 'true' ? true : false) : true) &&
                (filters.capital ? (country.capital ? country.capital[0].toLowerCase().includes(filters.capital) : false) : true);
    });
    showCountries(filteredCountries);
}

 $('#clear').click(function() {
    $('.filter-field').val('');
    showCountries(countriesList)
 })

const addEvents = () => {
    const nameField = document.getElementById('country-name')
    const regionField = document.getElementById('region')
    const capitalField = document.getElementById('capital')
    const independentField = document.getElementById('independent')
    
    nameField.addEventListener('change', function(event) {
        onFilterChange(event, 'name');
    });
    regionField.addEventListener('change', function(event) {
        onFilterChange(event, 'region');
    });
    capitalField.addEventListener('change', function(event) {
        onFilterChange(event, 'capital');
    });
    independentField.addEventListener('change', function(event) {
        onFilterChange(event, 'independent');
    });
}

addEvents()
getCountries()
