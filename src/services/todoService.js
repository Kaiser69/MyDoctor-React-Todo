const KEYS ={
    todoList:'todoList',
    todoListId: 'todoListId'
}

export const getTodoCollection = () => ([
    { id: '1', title: 'Job'},
    { id: '2', title: 'Family'},
    { id: '3', title: 'Other'},
])

export function insertTodoList(data) {
    let todoLists = getAllTodoLists();
    data['id'] = generateTodoListId()
    todoLists.push(data)
    localStorage.setItem(KEYS.todoLists, JSON.stringify(todoLists))
}

export function updateTodoList(data) {
    let todoLists = getAllTodoLists();
    let recordIndex = todoLists.findIndex(x => x.id == data.id);
    todoLists[recordIndex] = { ...data }
    localStorage.setItem(KEYS.todoLists, JSON.stringify(todoLists));
}

export function deleteTodoList(id) {
    let todoLists = getAllTodoLists();
    todoLists = todoLists.filter(x => x.id != id)
    localStorage.setItem(KEYS.todoLists, JSON.stringify(todoLists));
}
         

export function generateTodoListId() {
    if (localStorage.getItem(KEYS.todoListId) == null)
       localStorage.setItem(KEYS.todoListId, '0')
     var id = parseInt(localStorage.getItem(KEYS.todoListId))
     localStorage.setItem(KEYS.todoListId, (++id).toString())
     return id;  
}


export function getAllTodoLists() {
    
    if(localStorage.getItem(KEYS.todoLists) == null)
       localStorage.setItem(KEYS.todoLists, JSON.stringify([]))
   let todoLists =  JSON.parse(localStorage.getItem(KEYS.todoLists));
   
   let tasks = getTodoCollection();
   return todoLists.map(x => ({
       ...x,
       task: tasks[x.sortingId -1].title
   }))
}

