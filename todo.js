const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];

eventListener();

function eventListener(){//Tüm listenerlerın anası
    
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(){
    if (confirm("Tüm todolar silinecek. Emin misiniz ?")) {
        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style", "display : block");
        }
    
    });

}
function deleteTodo(e){
    if (e.target.className==="fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silinmiştir.")
    }
}
function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo===deleteTodo) {
            todos.splice(index,1);//indexe gelince sonra bir tane siliyor
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){
    const newTodo=todoInput.value.trim();
    
    if(newTodo ===""){
        showAlert("danger","Lütfen bir Todo giriniz");
    }
    else if (checkTodos(newTodo)) {
        showAlert("warning","Bu todo zaten var")
    }
    else if (newTodo!="") 
        {
        addTodoToUI(newTodo);
        addTodoToStrorage(newTodo);
        showAlert("success","Todo Başarıyla Girildi");
    }
    

    /* 
    <div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
</div>
    */
    e.preventDefault();
}
function checkTodos(todos){
    answer=false;
    list=document.querySelectorAll(".list-group-item");
    list.forEach(function(item){
        if (item.textContent===todos) {
            answer=true;
        }
    });
    return answer;
}
function getTodosFromStorage(){//Storagedan todoları alma
    let todos;

    if (localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStrorage(newTodo){
    let todos=getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    setTimeout(function() {
        alert.remove();
    }, 1000);
}

function addTodoToUI(newTodo){//Inputu UIye ekleme
    
//ListItem oluşturma
const listItem=document.createElement("li");
listItem.className="list-group-item d-flex justify-content-between";
//Link Oluşturma
const link=document.createElement("a");
link.href="#";
link.className="delete-item";
link.innerHTML="<i class = 'fa fa-remove'></i>";
//Text Node Ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);
todoList.appendChild(listItem);
todoInput.value="";
}