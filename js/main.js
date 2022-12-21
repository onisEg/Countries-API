

let countriesList = [];
let getCountries = () => {
    let anotherLoader = false;
    fetch("https://restcountries.com/v3.1/all").then((response) => {
        return response.json()
    }).then((date) => {
        countriesList = date;
        showCountries(countriesList)
    }).catch(error => { throw error }).finally(() => { anotherLoader=false})
}


let showCountries = country => {
    // console.table(country);
    let tbody = document.getElementById("tbody");
    let countriesListRow = "";
    tbody.innerHTML = "";
    country.forEach(country => {
        countriesListRow += `
            <tr>
                <td>${country.name.official}</td>
                <td>${country.independent ? 'yes' : 'No'}</td>
                <td>${country.capital}</td>
                <td>${country.region}</td>
            </tr>
        `
    });

    tbody.innerHTML = countriesListRow;
}

// // filter by countery name

// function onNameFilterChange (event){
//     let searchStr = event.target.value.toLowerCase();
//     // console.log(searchStr);
//     if (searchStr) {
//         let countries = countriesList.slice();
//         let filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(searchStr));
//         showCountries(filteredCountries)

//     } else {
//         showCountries(countriesList);
//     }
// }

// // filter by region name
// function onRegionFilterChange(event){
//     let searchStr = event.target.value.toLowerCase();
//     // console.log(searchStr);
//     if (searchStr) {
//         let countries = countriesList.slice();
//         let filteredCountries = countries.filter(country => country.region.toLowerCase().includes(searchStr));
//         showCountries(filteredCountries)

//     } else {
//         showCountries(countriesList);
//     }
// }




// // filter by capital name

// function onCapitalFilterChange() {
//     let inputCapitalName = this.value.toLowerCase();
//     console.log(inputCapitalName);
//     // let countries = countriesList.slice();
//     let filteredCountries = [];
//     let countries = filteredCountries.length ? filteredCountries : countriesList;
//     filteredCountries = countries.filter((country) => {
//         if (country.capital) {
//             return country.capital[0].toString().toLowerCase().includes(inputCapitalName);
//         }
//     })
    
//     showCountries(filteredCountries)
   
// }





// $('input[type="radio"]').change(function () {
//     let value = $('input[type="radio"]:checked').val()
//     let countries = countriesList.slice()
//     let filteredCountries = countries.filter(country => country.independent === JSON.parse(value) );
//     showCountries(filteredCountries)
// });


// =========================================
// update about filter
// the first thing make opject to catch inputs


let filters = {
    name: null,
    region: null,
    independent: null,
    capital: null,
}
function onFilterChange(event, filterName) {
    let searchStr = event.target.value.toLowerCase();
    // console.log(searchStr);
    filters[filterName] = searchStr || null;
    applayFilter();
}

function applayFilter() {
    let filteredCountries = countriesList.filter(country => {
        return (filters.name ? country.name.official.toLowerCase().includes(filters.name) : true) &&
                (filters.region ? country.region.toLowerCase().includes(filters.region) : true) &&
                (filters.independent !== null ? country.independent == (filters.independent === "true" ? true : false) : true) &&
                (filters.capital ? (country.capital ? country.capital[0].toLowerCase().includes(filters.capital) : false) : true);
    });
    showCountries(filteredCountries);
}




$('#freeInput').on("click", function () {
    location.reload()
})




// ==================================
function addEvents() {

    $('#filterName').on("input", (event) => {
        // console.log(event.target.value);
        onFilterChange(event,'name')
    })
    $('#filterRegion').on("input", (event)=> {
        onFilterChange(event,'region')
    });
    $('#capital').on("input", (event) =>{
        onFilterChange(event,'capital')        
        
    });
    $('input[type="radio"]').on("change", (event)=> { 
        onFilterChange(event, 'independent')      
    });

}
addEvents()
getCountries()


