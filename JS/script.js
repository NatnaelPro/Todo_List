document.querySelector('#add').addEventListener('click', function(){
    insertIntoLocalStore(document.querySelector('input').value);
    document.querySelector('input').value = "";
    location.reload();
})


document.querySelector('#clear_all').addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})


function insertIntoLocalStore(inputList){
    if(JSON.parse(localStorage.getItem('lists')) != null){
        let lists = JSON.parse(localStorage.getItem('lists'));
        let tempId = parseInt(localStorage.getItem('id'));
        lists.push({id: tempId, list: inputList, states: 'progress'});
        localStorage.setItem('lists', JSON.stringify(lists));
        tempId++;
        localStorage.setItem('id', tempId);
        displayLastItem();
    }else{
        let lists = [];
        localStorage.setItem('id', '1');
        let id = parseInt(localStorage.getItem('id'));
        lists.push({id: id, list: inputList, states: 'progress'}) 
        localStorage.setItem('lists', JSON.stringify(lists));
        id++;
        localStorage.setItem('id', id);
        displayLastItem();
    }
}

displayLists();

function displayLists(){
    let lists = JSON.parse(localStorage.getItem('lists'));
    if(lists != null)
    for(let val of lists){
        let newDiv = document.createElement('div');
        newDiv.classList.add('list');
        document.querySelector('.todoList').appendChild(newDiv);

        let checkMarkIcon = document.createElement('div');
        checkMarkIcon.classList.add('check_mark');
        newDiv.appendChild(checkMarkIcon);

        

        let inputElement = document.createElement('input');
        inputElement.type = 'hidden';
        inputElement.value = val.id;
        newDiv.appendChild(inputElement);

        let inputElementStates = document.createElement('input');
        inputElementStates.type = 'hidden';
        inputElementStates.value = val.states;
        newDiv.appendChild(inputElementStates);



        let span = document.createElement('span');
        span.classList.add('list_content');
        span.innerText = "  " + val.list;
        newDiv.appendChild(span);

        if(val.states == 'finished'){
            let newImg = document.createElement('img');
            newImg.src = 'Images/checkmark-multi-size.ico.cur';
            checkMarkIcon.appendChild(newImg);
            checkMarkIcon.nextElementSibling.nextSibling.nextSibling.style.textDecoration = 'line-through';
        }
    } 
}

function displayLastItem(){
    let lists = JSON.parse(localStorage.getItem('lists'));
    if(lists != null){
        let newDiv = document.createElement('div');
        newDiv.classList.add('list');
        document.querySelector('.todoList').appendChild(newDiv);

        let checkMarkIcon = document.createElement('div');
        checkMarkIcon.classList.add('check_mark');
        newDiv.appendChild(checkMarkIcon);

        let inputElement = document.createElement('input');
        inputElement.type = 'hidden';
        inputElement.value = lists[lists.length - 1].id;
        newDiv.appendChild(inputElement);

        let inputElementStates = document.createElement('input');
        inputElementStates.type = 'hidden';
        inputElementStates.value = lists[lists.length - 1].states;
        newDiv.appendChild(inputElementStates);


        let span = document.createElement('span');
        span.classList.add('list_content');
        span.innerText = "  " + lists[lists.length - 1].list;
        newDiv.appendChild(span);
    }
}

let element = document.getElementsByClassName('check_mark')

for(let val of element){
    val.addEventListener('click', function(){
        let newImg = document.createElement('img');
        let id = val.nextElementSibling.value;
        let states = val.nextSibling.nextSibling.value;
        let tempArr = JSON.parse(localStorage.getItem('lists'));
        let arr = [];
        for(let val2 of tempArr){
            if(val2.id == id && states == 'progress'){
                arr.push({id: val2.id, list: val2.list, states: 'finished'});
                newImg.src = 'Images/checkmark-multi-size.ico.cur';
                this.appendChild(newImg);
                val.nextSibling.nextSibling.value = 'finished';
                val.nextElementSibling.nextSibling.nextSibling.style.textDecoration = 'line-through';
            }else if(val2.id == id && states == 'finished'){
                val.removeChild(val.firstElementChild);
                val.nextSibling.nextSibling.value = 'progress';
                arr.push({id: val2.id, list: val2.list, states: 'progress'});
                val.nextElementSibling.nextSibling.nextSibling.style.textDecoration = 'none';
            }else{
                arr.push({id: val2.id, list: val2.list, states: val2.states});
            }
        }
        localStorage.setItem('lists', JSON.stringify(arr));
    });
}

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let date = new Date();
document.querySelector(".today_date").innerText = date.getDate();
document.querySelector(".month").innerText = months[date.getMonth()]
document.querySelector(".year").innerText = date.getFullYear();
document.querySelector(".time").innerText = new Intl.DateTimeFormat('default', {hour12: true, hour: 'numeric', minute: 'numeric'}).format(date);
