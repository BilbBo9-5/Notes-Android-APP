window.addEventListener('DOMContentLoaded', (event) => {
    randerStart();
});

function randerStart(){

    let headerSatings = document.querySelector('.header-sating');
    headerSatings.addEventListener('click', openSatings);

    //localStorage.clear();
    if (localStorage.length < 3){
        let defoultArr = ['itemList','timingList','config'];
        for(let i = 0; i < defoultArr.length; i++) {
            let m = defoultArr[i];
            if(typeof localStorage.m === 'undefined'){
                let elem = [];
                arrcontrucktor(elem , defoultArr[i], i, defoultArr);
            }
        }


    } else {
        renderItem();
    }
    function arrcontrucktor(elem, keyName, i, arr){
        localStorage.setItem(keyName, JSON.stringify(elem));
        if(i === arr.length - 1) renderItem();
    }

    function renderItem(){
        reseTimingList();
        let itemsList = JSON.parse (localStorage.getItem ("itemList"));
        if(itemsList.length > 0){
            for(let y = 0; y < itemsList.length; y++){
                let container = document.querySelector('.inner');
                let item = `<p>${itemsList[y][0]}</p>`;
                let plasename = "not-item";
                construcktor(item, container, plasename); //construckt not-item
                item = `<div class="content-togler">${itemsList[y][1]}<div>&#9998;</div></div>`;
                plasename = "togler";
                construcktor(item, container, plasename); //construckt togler

                container = document.querySelectorAll('.not-item')[y];
                item = "&#10006;";
                plasename = "icon";
                construcktor(item, container, plasename); //construckt icon
                construcktListener(container, itemsList, y);
            }
        } else {
            let btn = document.querySelector('.addNew-btn');
            btn.addEventListener("click", addNew);
        }

    }

    function construcktor(arryElem, container, plasename){
        let createElement = document.createElement('div');
        createElement.setAttribute('class', plasename);
        createElement.innerHTML = arryElem;
        container.appendChild(createElement);
    }

    //добавление клика
    function construcktListener(elem, arr, arrIdx){
        elem.addEventListener("click", togl);
        elem.lastElementChild.addEventListener("click", function () {delated(arr, arrIdx);});
        elem.nextSibling.lastElementChild.lastElementChild.addEventListener("click", function () {recorrect(arr, arrIdx);});
        let btn = document.querySelector('.addNew-btn');
        btn.addEventListener("click", addNew);
    }
    //выпадение списка
    function togl(){
        if(this.nextSibling.clientHeight === 0 ){
            this.nextSibling.style =
            `height:${this.nextSibling.firstElementChild.clientHeight}px;transition:0.5s;`;
        } else {
            this.nextSibling.style = "height: 0; transition:0.5s";
        }
    }
    //удаление
    function delated(arr, y){
        event.stopPropagation()
        arr.splice(y, 1);
        localStorage.removeItem("itemList");
        localStorage.setItem("itemList", JSON.stringify(arr));
        let container = document.querySelector('.inner');
        container.innerHTML = '';
        randerStart();
    }
    //исправить запись
    function recorrect(arr, y){
        localStorage.setItem("timingList", JSON.stringify([arr[y], y]));
        addNew();
    }
    //добавить новый
    function addNew(){
        window.location.href = 'addNores.html';
    }
    //дропДаун
    function openSatings(){
        let headerContainer = document.querySelector('.nav-wrapper');
        let listHeight = document.querySelector('.list-height').clientHeight;
        if(headerContainer.clientHeight === 0){
            headerContainer.style = `height:${listHeight}px; transition: 0.5s;`;
            this.style = 'transform: rotateZ(50deg);transition:0.5s;'
        } else {
            this.style = 'transform: rotateZ(0);transition:0.5s;'
            headerContainer.style = `height: 0; padding:0; transition: 0.5s;`;
        }
    }
    //inputs listenrt
    InputsListener();
    function InputsListener(){
        let inputsList = document.querySelectorAll('.input');
        for (let t = 0; t < inputsList.length; t++){
            inputsList[t].oninput = function() {chengeRoot(inputsList, t);}
        }
    }
    function chengeRoot(inputsList, t) {
        if(t === 5){
            document.documentElement.style.setProperty('--' + inputsList[t].classList[0], inputsList[t].value + 'px');
        } else {
            document.documentElement.style.setProperty('--' + inputsList[t].classList[0], inputsList[t].value);
        }
        let oldConfig = JSON.parse (localStorage.getItem ("config"));
        oldConfig.splice([t], 1, [t, inputsList[t].value, inputsList[t].classList[0]]);
        localStorage.removeItem("config");
        localStorage.setItem("config", JSON.stringify(oldConfig));
        console.log(localStorage);
    }
    //root css
    function rootRedar(){
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
    rootRedar();

    //
    function reseTimingList(){
        if(localStorage.timingList.length > 2){
            localStorage.removeItem("timingList");
            localStorage.setItem("timingList", JSON.stringify([]));
            console.log('remove');
        }
    }




















}