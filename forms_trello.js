import {endpoint, apiKey} from "./modules/settings";

//---------------------------INIT------------------------------------//

window.addEventListener("load", init);

function init(){
    setUpForm();
    getTrelloList();
}

//---------------------------FORM------------------------------------//

function setUpForm(){
const form = document.querySelector("form");
window.form = form;
const elements = form.elements;
window.elements = elements;
console.log(elements)


form.setAttribute("novalidate", true);
form.addEventListener("submit", (e) => {
    e.preventDefault();
     //loop through each of the elements. Whenever user clicks submit, we clear all invalid classes
     const formElements = form.querySelectorAll("input");
     //verify if they are valid
     formElements.forEach((el)=>{
    //for each we remove the invalid class
    el.classList.remove("invalid");
     })

    if (form.checkValidity()){
        //send to api
        console.log("send to api")
        postTrelloList({
            title: form.elements.title.value,
            description: form.elements.description.value,
            deadline: form.elements.deadline.value

        });
        form.reset();
    } else {
   //if theres an issue, show the user error message
       formElements.forEach((el)=>{
       if(!el.checkValidity()){
               el.classList.add("invalid");
           }
       })

    }

});

}

//---------------------------TEMPLATE------------------------------------//
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


//---------------------------POST------------------------------------//

function postTrelloList(newTask){

    const postData = JSON.stringify(newTask);
    fetch(endpoint + "rest/trello", {
    method: "post",
    headers: {
    "Content-Type": "application/json; charset=utf-8",
    "x-apikey": apiKey,
    "cache-control": "no-cache",
},
body: postData,
})
.then((res) => res.json())
.then((data) => {
  console.log(data);
  showTrelloList(data);
});

}

function showTrelloList(data){
    console.log("show trello list")
}


//---------------------------GET------------------------------------//

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
.then((data) => data.forEach(showTasks))

};
