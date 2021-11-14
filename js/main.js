// SEQUENCE OF WORK:
// 1. Grab DOM elements to work with:
// 2. Write an event listener to call function on input
// 3. Create function searchStates.
// 4. Filter through this array of objects and use Regex to find matches for the input, and pass results to a function outputHtml() for display on DOM.
// 5. Create a function outputHtml to show the results of our matches in html:

// SEE ANNOTATED_MAIN.JS FOR NOTES

// Assign variables
const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");


// Create functions

const searchStates = async searchText => {
    const res = await fetch("./data/states.json");
    const states = await res.json();

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }

    outputHtml(matches);

};


const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match =>
            `<div class="card card-body mb-1"><h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4><small>Lat: ${match.lat} / Long: ${match.long}</small></div>`
        ).join("");

        matchList.innerHTML = html;
    }
}; // end outputHtml


// Add Event Listener:
search.addEventListener('input', ()=>searchStates(search.value));

