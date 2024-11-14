let searchInputEl = document.getElementById("searchInput");
let searchResultEl =  document.getElementById("searchResults")
let spinnerEl = document.getElementById("spinner")


function createAndAppendSearchResult(result) {

    let {title, link, description} = result;
    //1.div container --result-item.
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    searchResultEl.appendChild(resultItemEl);


    //2.Anchor Title --result-title.
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";

    resultItemEl.appendChild(resultTitleEl);

    //3.Title Break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    //4.Anchor URL --result-url.
    let resultUrlEl = document.createElement("a");
    resultUrlEl.classList.add("result-url");
    resultUrlEl.href = link;
    resultUrlEl.target = "_blank";
    resultUrlEl.textContent = link;
    resultItemEl.appendChild(resultUrlEl);

    //Line Break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //Paragraph Description. --line-description
    let lineDescriptionEl = document.createElement("p");
    lineDescriptionEl.classList.add("line-description");
    lineDescriptionEl.textContent = description;
    resultItemEl.appendChild(lineDescriptionEl);

}


  

function displayResult(searchResult) {
    spinnerEl.classList.toggle("d-none");
    // let result = searchResult[0]
    for (let result of searchResult) {
        createAndAppendSearchResult(result);
    }
    
}



function searchWikipedia(event){
    if(event.key === "Enter") {
      searchResultEl.textContent = "";
      spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }


        fetch(url, options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        console.log(jsonData);
        let {search_results} = jsonData; 
        displayResult(search_results); 
    });

    }

}

searchInputEl.addEventListener("keydown", searchWikipedia);   