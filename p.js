let btns =  document.getElementsByTagName("button")
let maindiv = document.getElementById("maindiv")
console.log(btns[2])
//insert data button function
btns[0].onclick = async()=>{
    let response = await fetch("https://fakestoreapi.com/products")
    let data = await response.json()
    alert("data ftehced")
    localStorage.setItem("data",JSON.stringify(data))
    displayData()
}

function displayData(){
    maindiv.innerHTML = ""
    let data =  JSON.parse(localStorage.getItem("data"))
    data.forEach(obj => {
        let innerdiv = document.createElement("div")
        innerdiv.className = "innerdiv"
        innerdiv.innerHTML = `<p>ID:${obj["id"]}</p><p>title : ${obj["title"]}</p>
        <p>price : ${obj["price"]}</p>
        <p>description : ${obj["description"]}</p>
        <p>category : ${obj["category"]}</p>
        <a href="${obj["image"]}">Click here to reveal the image</a>`
        maindiv.appendChild(innerdiv)
    })
}
//search data function
btns[1].onclick = ()=>{
    
    let input_value = document.getElementById("input").value
    let data = JSON.parse(localStorage.getItem("data")) 
    data = data.filter(obj => obj["category"] == input_value)
    displayfilterData(data)
    
}

btns[2].onclick= ()=>{
    let data = JSON.parse(localStorage.getItem("data")) 
    data = data.filter(obj => obj["category"] == "men's clothing")
    displayfilterData(data)
}

btns[3].onclick= ()=>{
    let data = JSON.parse(localStorage.getItem("data")) 
    data = data.filter(obj => obj["category"] == "jewelery")
    displayfilterData(data)
}

btns[4].onclick= ()=>{
    let data = JSON.parse(localStorage.getItem("data")) 
    data = data.filter(obj => obj["category"] == "women's clothing")
    displayfilterData(data)
}
function displayfilterData(data){
    maindiv.innerHTML = ""
    data.forEach((obj,index) =>{
        let innerdiv = document.createElement("div")  
        innerdiv.className ="innerdiv"
        innerdiv.innerHTML =
         `<p>ID:${obj["id"]}</p>
            <p>TITLE: ${obj["title"]}</p>
            <p>PRICE :${obj["price"]}</p>
            <p>DESCRIPTION :${obj["description"]}</p>
            <p>CATEGORY:${obj["category"]}</p>`;
          
            
            let deletebtn =  document.createElement("button")
            deletebtn.innerHTML = "delete"
            deletebtn.onclick = ()=>{
                deleteData(index);
            }
            let more = document.createElement("button") 
            more.innerHTML = "more"
            more.onclick =()=>{
                let newWindow = window.open("", "YouTube", "width=800,height=400");
                newWindow.document.write(`
                    <iframe width="600" height="400" src="https://www.youtube.com/embed/6UtAhQpNs4I?si=9v4STqhZCtipkavx" 
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                    gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                `);
            }
            innerdiv.appendChild(deletebtn)
            innerdiv.appendChild(more)
            maindiv.appendChild(innerdiv) 
        }
    )
}
function deleteData(index){
    let data = JSON.parse(localStorage.getItem("data"))
    data.splice(index,1)
    localStorage.setItem("data",JSON.stringify(data))
    displayfilterData(data)
}
maindiv.appendChild(innerdiv)

window.onload = ()=>{
    let data = JSON.parse(localStorage.getItem("data"))
    if(data.length >0){
        displayData()
    }
    else{
        maindiv.innerText = "no data available"
    }
}
