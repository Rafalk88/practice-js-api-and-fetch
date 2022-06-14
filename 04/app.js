document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM');

    const btnEl = document.querySelector('.form')
    const pLat = document.querySelector('.weather__lat')
    const pLng = document.querySelector('.weather__lng')
    const pSumm = document.querySelector('.weather__summary')
    const pTemp = document.querySelector('.weather__temperature')

    btnEl.addEventListener('submit', activateAPI)

    function activateAPI (e) {

        e.preventDefault()

        const [lat, lng] = e.target.elements

        pLat.innerText = lat.value
        pLng.innerText = lng.value

        const key = 'e3a83e239a6c43cab8f3dd2ba8584cde'
        const units = 'I'
            
        const promise = fetch(`https://api.weatherbit.io/v2.0/current?key=${key}&lat=${lat.value}&lon=${lng.value}&lang=pl&units=${units}`)

        promise
            .then(resp => {
                
                if (resp.ok) { return resp.json() }

            })
            .then(obj => {

                pSumm.innerText = obj.data[0].weather.description
                pTemp.innerText = obj.data[0].temp

            })
            .catch(err => console.log(err))
            .finally(() => {

                console.log('Odpytywanie API zakończone')

            })

    }

}