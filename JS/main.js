// Get Form Event 
const form = document.getElementById('form');
form.addEventListener('submit', getLocationInfo);

document.querySelector('body').addEventListener("click", deleteLocation);

function getLocationInfo(e){
    e.preventDefault();

    let zip = document.getElementById('numberInput');
    let zipValue = zip.value;
    
    // Fetching Info Via Zip Code
    fetch(`https://api.zippopotam.us/us/${zipValue}`)
    .then(response => {
        if(response.status != 200){
            let output = document.getElementById('output');
            output.innerHTML = 
            `
            <div class="list-group">
                <li class="list-group-item bg-danger mt-2 text-white">Invalid Zip Code Try Again ! 
                    </li>
                </div>

            `;
            throw Error(response.statusText);
        }
        else{
            return response.json();
        }
    })
    .then(data => {
        let output = '';
        data.places.forEach(place => {
            output += 
            `
            <div class="list-group list-unstyled mt-2">
                <li class="list-group-item bg-success text-white"><b class="location">Location Info</b><span><button class="delete" id="button">X<button></span></li>
                <li class="list-group-item"><b>City :</b> ${place["place name"]}<li>
                <li class="list-group-item"><b>State : </b>${place["state"]}<li>
                <li class="list-group-item"><b>Longitude :</b> ${place["longitude"]}<li>
                <li class="list-group-item"><b>Latitude :</b> ${place["latitude"]}<li>
                </div>

            `;
        })
        // 01203
        document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err));
}

function deleteLocation(e){
    if(e.target.className == 'delete'){
        document.querySelector('.list-group').remove();
        document.getElementById('numberInput').value = '';
    }
}