
window.addEventListener('load', ()=>{
    if('serviceWorker'in navigator){

        navigator.serviceWorker.register('sw.js')
            .then(registration =>{
                console.log('serviceWorker register success', registration);
            })
            .catch(error => {
                console.log('serviceWorker register fall', error);
            });
    }
});