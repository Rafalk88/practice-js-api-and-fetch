document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM');

    const btnEl = document.querySelector('button')
    const spanEl = document.querySelector('span')

    btnEl.addEventListener(

        'click',
        function () {

            const promise = fetch('https://api.ipify.org/')

            promise
                .then(resp => resp.text())
                .then(ip => spanEl.innerText = ip)
                .catch(err => console.log(err))
                .finally(() => {

                    console.log('Odpytywanie API zakończone')

                })

        }

    )
    

}