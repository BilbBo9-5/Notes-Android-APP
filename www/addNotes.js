







window.addEventListener('DOMContentLoaded', async (event) => {
    /*if('serviceWorker'in navigator){
        try {
            const reg = await navigator.serviceWorker.register('sw.js')
            console.log('serviceWorker register success', reg);
        } catch (e){
            console.log('serviceWorker register fall');
        }
    }*/
    console.log('DOM fully loaded and parsed');
    randerStart();
});
function randerStart(){

    let oldList = JSON.parse (localStorage.getItem ("itemList"));
    let lastketsItem = oldList.length
    let timingList = JSON.parse (localStorage.getItem ("timingList"));
    let m ;
    document.querySelectorAll('[data-tiny-editor]').forEach(editor =>
        editor.addEventListener('input', e =>
            m = e.target.innerHTML
        )
    );


    function CssRedar(){
        let ranrerList = JSON.parse (localStorage.getItem ("config"));
        if(ranrerList.length > 0){
            for(let t = 0; t < ranrerList.length; t++){
                if(ranrerList[t][0] === 5){
                    document.documentElement.style.setProperty('--' + ranrerList[t][2], ranrerList[t][1] + 'px');
                } else {
                    document.documentElement.style.setProperty('--' + ranrerList[t][2], ranrerList[t][1]);
                }
            }
        }
    }
    CssRedar();
    if(timingList.length > 0){
        document.querySelector('.notes-name').value = timingList[0][0];
        document.querySelector('[data-tiny-editor]').innerHTML = timingList[0][1];
        m = timingList[0][1];
        lastketsItem = timingList[1];
    }
    /*listener add*/
    construcktListener();
    function construcktListener(){
        let btn = document.querySelector('.addNew-btn');
        btn.addEventListener("click", addNew);


    }
    /*add new item*/
    function addNew(){
        window.location.href = 'index.html';
        let input = document.querySelector('.notes-name').value;
        localStorage.setItem("timingList", JSON.stringify([]));

        localStorage.removeItem("itemList");
        oldList.splice([lastketsItem], 1, [input, m]);
        localStorage.setItem("itemList", JSON.stringify(oldList));
        clear();
    }

    //clar
    function clear(){
        document.querySelector('.notes-name').value = '';
        m = '';
    }























}

