let searchInput = document.getElementById('searchInput');
let searchResults = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

function create(result) {
    let {
        title,
        link,
        description
    } = result;

    //creating box element
    let box = document.createElement('div');
    box.classList.add("result-item");
    searchResults.appendChild(box);
    //creating Title element
    let head = document.createElement('a');
    head.classList.add("result-title");
    head.textContent = title;
    head.href = link;
    head.target = "_blank";
    box.appendChild(head);
    //creating break element
    let br1 = document.createElement('br');
    box.appendChild(br1);
    //creating link element
    let urel = document.createElement('a');
    urel.classList.add("result-url");
    urel.textContent = link;
    urel.target = "_blank";
    urel.href = link;
    box.appendChild(urel);
    //creating break element
    let br2 = document.createElement('br');
    box.appendChild(br2);
    //creating description element
    let para = document.createElement('p');
    para.classList.add("link-description");
    para.textContent = description;
    box.appendChild(para);
}

function display(search_results) {
    spinner.classList.toggle("d-none");
    for (let x of search_results) {
        let result = x;
        create(result);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none");
        searchValue = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                let {
                    search_results
                } = jsondata;
                display(search_results);
            });
    }
}

searchInput.addEventListener("keydown", searchWiki);