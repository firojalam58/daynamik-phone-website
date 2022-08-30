const loadPhone = async(searchFieldText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
    const  res = await fetch(url);
    const data = await res.json()
    displayPhone(data.data, dataLimit)
}

// display phone 
const displayPhone =(phones, dataLimit) =>{

    const phonesContainer = document.getElementById('phoneContainer');
    phonesContainer.textContent = '';
// displayPhone no found 
const noPhone = document.getElementById('text-none');
if( phones.length === 0){
    noPhone.classList.remove("d-none")
}
else{
    noPhone.classList.add('d-none')
}

    // display phone 

    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
    phones = phones.slice(0,10);
   
    showAll.classList.remove('d-none')
}
else{
    showAll.classList.add('d-none')
}


    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>

           
                
            </div>
        </div>
        `;

        phonesContainer.appendChild(phoneDiv)
    });
    toggleSpinner(false)

}

// common function 
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searhFied =document.getElementById('search');
    const searchFieldText = searhFied.value;
    loadPhone(searchFieldText, dataLimit)
}

document.getElementById('btn-search').addEventListener('click', function (){
    processSearch(10)
})

// search input field enter key handler
document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});


const toggleSpinner = isLoader => {
    const loader = document.getElementById('loading');
    if(isLoader){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}



// button showAll

document.getElementById('btn-show').addEventListener('click', function(){
    processSearch()
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res  = await fetch(url)
    const data = await res.json();
    displayPhoneDetails(data.data)
}



const displayPhoneDetails = phone =>{
console.log(phone)
const modalTitle = document.getElementById('phoneDetailsModalLabel');
modalTitle.innerText = phone.name;
const phoneDetailsModal = document.getElementById('phone-details');
phoneDetailsModal.innerHTML = `
    <p>Phone Brand:${phone.brand}</p>
    <p>Release Date:${phone.releaseDate ? phone.releaseDate  : 'No RelaseDate'}</p>
    <p>Storage:${phone.mainFeatures.storage ? phone.mainFeatures.storage :'No Information Found Stroage'}</p>
    <p>Display Size:${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No Display Information Found '}</p>
`;

}
loadPhone('apple')