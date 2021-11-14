// SEQUENCE OF WORK:
// 1. Grab DOM elements to work with:
// 2. Write an event listener to call function on input
// 3. Create function searchStates.
// 4. Filter through this array of objects and use Regex to find matches for the input, and pass results to a function outputHtml() for display on DOM.
// 5. Create a function outputHtml to show the results of our matches in html:




// 1. Grab DOM elements to work with:
const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

// 3. Create function searchStates
// This will use async await because we'll be using fetch API.

const searchStates = async searchText => {
    const res = await fetch("./data/states.json");
    const states = await res.json();

//  console.log(states);
// };
    //     // so we pass in our search.value from the Event listener and use async to show that this function will be retrieving data using fetch, and then parsing what is returned using .json(), so each step must wait for the other to complete.
    //     // console.log shows the complete list array of states objects and all their properties. We're checking against abbr and name.

    // 4. Filter through this array of objects and use Regex to find matches for the input, and pass results to a function outputHtml() for display on DOM.

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
            // use template literal to pass the searchText var as start of regex (^) with flags g global and i ignore case
        return state.name.match(regex) || state.abbr.match(regex);
            // return all matches for state name or abbreviation.
    });

    console.log(matches);
        // test in console. See m returns 8 matches, i returns 4, etc
        // notice that as we backspace to erase input, it returns an array of all 50 states names/abbr. 
        // We don't want that, so add a condition just after the matches function, still within searchStates, to set matches to an empty array and matchList DOM element to no text content:
    
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = "";
    }

    // Now pass this matches array to a new function to show results in html:
    outputHtml(matches);

};

// 5. Create a function outputHtml to show the results of our matches in html:

const outputHtml = matches => {
    if (matches.length > 0) {
        // const html = matches.map(match =>
        //     `<div class="card card-body mb-1"><h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4><small>Lat: ${match.lat} / Long: ${match.long}</small></div>`
        //     );
        //     // This text literal MUST run on like this, or will return /n new line characters 
        // console.log(html);

        // // This returns an array of html strings, but use .join("") to turn it into a string of pure html ready to go into the DOM.
        const html = matches.map(match =>
            `<div class="card card-body mb-1"><h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4><small>Lat: ${match.lat} / Long: ${match.long}</small></div>`
        ).join("");
        
        // console.log(html);

        matchList.innerHTML = html;
    }

}; // end outputHtml


// 2. Write an event listener
// Every time we type a letter in the input box, it should fire off an Event that calls a function.

// Add Event Listener:
search.addEventListener('input', ()=>searchStates(search.value));
    // Each input (keystroke) will fire off an Event to call a searchStates function, and pass in the value property of the search object (not the whole object).
    // Next we have to create the function searchStates above this Event Listener. 

