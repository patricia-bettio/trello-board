import {endpoint, apiKey} from "./modules/settings";


function getTrelloList(){
   
    fetch(endpoint + "rest/trello", {
    method: "get",
    headers: {
    "accept": "application/json",
    "x-apikey": apiKey,
    "cache-control": "no-cache",
}
})
.then((res) => res.json())
.then(buildTrelloList)

};

function buildTrelloList(data){
    console.log(data)
    data.forEach(showTasks);
  
}

function showTasks(singleTask){
    console.log(singleTask)
    console.log(singleTask.title)
    //1.get template
    const template = document.querySelector("template").content;
    //2.clone it
    const copy = template.cloneNode(true);
    //parent
    const parent = document.querySelector("#toDoTasks");
    //console.log(document.querySelector("main"))
    console.log(document.querySelector("#toDoTasks"))
    //copy into the template
    copy.querySelector("p.title").textContent = singleTask.title;
    copy.querySelector("p.description").textContent = singleTask.description;
    copy.querySelector("p.deadline").textContent = singleTask.deadline;
    //filters (to do, in prog, done)

    //3.append
    parent.appendChild(copy);   
    
}

getTrelloList();