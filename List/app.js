const api = 'https://jsonplaceholder.typicode.com/users/'

const dowloadUsers=async()=>{


    const response = await fetch(api)
    const data = await response.json()
    localStorage.setItem("users",JSON.stringify(data))
    
}

const download = document.getElementById("download")
    download.addEventListener("click",async()=>{
        await dowloadUsers()
        const list = document.getElementById("list")
        list.innerHTML = ""
        renderUsers()

    })

const getUsers=async()=>{
    const users = localStorage.getItem("users")
    
    if(users){
        const usersArray = JSON.parse(users);
        usersArray.sort((a, b) => (a.username > b.username) ? 1 : -1);
        return usersArray;
    }
    else{
        await dowloadUsers()
        return getUsers()
    }


}

const deleteUser=async(id)=>{
    const users = await getUsers()
    const newUser = users.filter((user)=>user.id!=id)
    localStorage.setItem("users",JSON.stringify(newUser))
    
}

const returCard=(user)=>{
    return `
    <div> 

        <div class="name">Name: ${user.name}</div>
        <div class="container"> <img src="./assets/icono.jpg" class="card-img"> </div>
        <div class="">Website: ${user.website}</div>
        <div class="">Phone: ${user.phone}</div>
        <div class="">Email: ${user.email}</div>


    </div>
    
    `
}
const returCardFull=(user)=>{
    return `
        <dialog open>
            <div>

                <div class="name">Name: ${user.name}</div>
                <div class="container"> <img src="./assets/icono.jpg" class="card-img"> </div>
                <div class="">Website: ${user.website}</div>
                <div class="">Phone: ${user.phone}</div>
                <div class="">Email: ${user.email}</div>
                <div class="">Username: ${user.username}</div>
                <div class="">City: ${user.address.city}</div>
                <div class="">Street: ${user.address.street}</div>
                <div class="">Company: ${user.company.name}</div>

            </div>
        <from method = dialog>
        <div class="containerButton"><button id="button">Back</button></div>
        </from>
        </dialog>
    
    `

}

const renderUsers=async()=>{
    const users = await getUsers()
    const list = document.getElementById("list")
    users.forEach(user=> {
        
        const div = document.createElement("div")
        const button = document.createElement("div")
        const card = document.createElement("card")
        button.innerHTML=`
        <div id="delete" class="containerDelete"><img src="./assets/boton-x.png" class= "deleteButton"></div>
        `
        button.addEventListener("click",async()=>{
            await deleteUser(user.id)
            list.innerHTML = ""
            renderUsers()
            
        })
        div.classList.add("card")
        card.innerHTML = returCard(user)
        card.addEventListener("click",()=>{
            list.innerHTML = returCardFull(user)
            const back = document.getElementById("button")
            back.classList.add("classButton")
            back.addEventListener("click",()=>{
                list.innerHTML = ""
                renderUsers()
            })
        })
        div.appendChild(card)
        div.appendChild(button)
        list.appendChild(div)
    });
}


renderUsers()

