//All files are loaded when we start or refresh the document so script.js file will be loaded

//these variables are created at first
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn=document.getElementById("del-btn")
const saveBtn=document.getElementById("save-btn")
const leadsFromLocalStoragae=JSON.parse(localStorage.getItem("myLeads")) 


//if you have saved any links previously then it will print them otherwise the the myLeads array will be null and do not call the renderLeads() function

//getting myLeads as an array from local storage
if(leadsFromLocalStoragae){ //if array is not empty then call the render() fuction
    myLeads=leadsFromLocalStoragae
    renderLeads(myLeads)
}

//When called, first it will make a empty string named listItems
//then it will add all the links of myLeads array in that string
//then it will assign that string to the innerHTML of unordered list of HTML and that will print them in the DOM as a list of links
function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
        console.log(leads[i])+" "
    }
    ulEl.innerHTML = listItems  
}

//when you enter the link and click on save button then it will-
//first push that link in myLeads array
//save that link in local storage
//call renderLeads() fucntion for printing them in the DOM
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)

    //pushing myLeads array as an string in localStorage
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    inputEl.value = ""
    renderLeads(myLeads)
})



saveBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

//when delete button will get clicked,
//first it will clear myLeads array and local storage
//for clearing the DOM it will call renderLeads() functoin and bacause myLeads array is empty so render() will print nothing and DOM will get cleared
delBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads=[]
    renderLeads(myLeads)
})

