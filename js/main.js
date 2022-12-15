

let countriesList = [];
fetch("https://restcountries.com/v3.1/all").then((response) => {
    return response.json()
}).then((date) => {
    countriesList = date;
    showCountries(countriesList)
}).catch(error => { throw error }).finally(() => { })


let showCountries = country => {
    // console.table(country);
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    let countriesListRow = "";
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

// filter by countery name 

function onNameFilterChange (event){
    let searchStr = event.target.value.toLowerCase();
    // console.log(searchStr);
    if (searchStr) {
        let countries = countriesList.slice();
        let filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(searchStr));
        showCountries(filteredCountries)

    } else {
        showCountries(countriesList);
    }
}

// filter by region name 
function onRegionFilterChange(event){
    let searchStr = event.target.value.toLowerCase();
    // console.log(searchStr);
    if (searchStr) {
        let countries = countriesList.slice();
        let filteredCountries = countries.filter(country => country.region.toLowerCase().includes(searchStr));
        showCountries(filteredCountries)

    } else {
        showCountries(countriesList);
    }
}




// filter by capital name 

function onCapitalFilterChange(event) {
    let searchStr = event.target.value.toLowerCase();
    console.log(searchStr);
    if (searchStr) {
        let countries = countriesList.slice();
        let filteredCountries = countries.filter(country => country.capital[0].toLowerCase().includes(searchStr));
        showCountries(filteredCountries)

    } else {
        showCountries(countriesList);
    }
}





let addEvents = () => {
    $("#filterName").on("keyup", onNameFilterChange)
    $("#filterRegion").on("keyup", onRegionFilterChange)
    $("#capital").on("keyup", onCapitalFilterChange)
}
addEvents()


$("#yes").on("click", () => {
    let countries = countriesList.slice();
    // let filteredCountries =  countries.filter(country => country.independent.true)
    console.log(countries);

})

$("#no").on("change", () => {
    console.log("no");
})