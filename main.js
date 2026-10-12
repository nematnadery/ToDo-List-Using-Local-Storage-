let $ = document
let toDoInput = $.getElementById('todoInput')
let addToDoBtn = $.getElementById('addBtn')
let clearBtn = $.getElementById('clearBtn')
let todoListElem = $.querySelector('.todo-list')

let toDoArray = []
function addBtnHandler(){
    if(toDoInput.value.trim() === ''){
        alert('Please Enter Something!')
    }else{
        let toDoValue = toDoInput.value
        let toDosObj = {
            id: toDoArray.length + 1,
            title: toDoValue,
            state: false
        }
        toDoInput.value = ''
        toDoArray.push(toDosObj)
        setLocalStorage(toDoArray)
        todosGenarator(toDoArray)
        toDoInput.focus()
    }
    
}

function setLocalStorage(todoList){
    localStorage.setItem('todos', JSON.stringify(todoList))
} 

function todosGenarator (todoList) {
    todoListElem.innerHTML = ''
    let todoTitleContanier ,todoTitle, btnsContainer, completeBtn, deleteBtn
    todoList.forEach(function(item){
        
        todoTitleContanier = $.createElement('div')
        todoTitleContanier.className = ('todo-item')

        todoTitle = $.createElement('span')
        todoTitle.className = "todo-text"
        todoTitle.innerHTML = item.title

        btnsContainer = $.createElement('div')
        btnsContainer.className = "todo-actions"
        
        completeBtn = $.createElement('button')
        completeBtn.className = "complete-btn"
        completeBtn.textContent = 'Complete'
        completeBtn.setAttribute('onclick', 'editHnadler(' + item.id + ')')

        deleteBtn = $.createElement('button')
        deleteBtn.className = "delete-btn"
        deleteBtn.textContent = 'delete'
        deleteBtn.setAttribute('onclick', 'removeTodo(' + item.id + ')')

        if(item.state){
            completeBtn.textContent = 'UnComplete'
            todoTitle.className = "uncompelete todo-text"
            todoTitleContanier.style.backgroundColor = '#80f89aa7'
        }
        btnsContainer.append(completeBtn, deleteBtn)
        todoTitleContanier.append(todoTitle,btnsContainer)
        todoListElem.append(todoTitleContanier)

    })
}

function editHnadler(todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    toDoArray = localStorageTodos
    toDoArray.forEach(function(item){
        if(item.id === todoId){
            item.state = !item.state
        }
    })

    setLocalStorage(toDoArray)
    todosGenarator(toDoArray)
}

function removeTodo(todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    toDoArray = localStorageTodos
    let mainTodoIndex = toDoArray.findIndex(function(item){
        return item.id === todoId
    })
    toDoArray.splice(mainTodoIndex, 1)
    setLocalStorage(toDoArray)
    todosGenarator(toDoArray)
    
}   

function getLocalStorage(){
    let LocalStorageTodos = JSON.parse(localStorage.getItem('todos'))
    if(LocalStorageTodos){
        toDoArray = LocalStorageTodos
    }else{
        toDoArray = []
    }
    todosGenarator(toDoArray)
}

function clearBtnHandler(){
    toDoArray = []
    localStorage.removeItem('todos')
    todosGenarator(toDoArray)
}
function enterHnadler(event){
    if (event.which == 13){
        addBtnHandler()
    }
}




toDoInput.addEventListener('keydown', enterHnadler)
clearBtn.addEventListener('click', clearBtnHandler)
window.addEventListener('load', getLocalStorage)
addToDoBtn.addEventListener('click', addBtnHandler)
