document.addEventListener('DOMContentLoaded', () => {
    // Navigation and Section Switching
    const dashboardLink = document.getElementById('dashboard-link');
    const chatLink = document.getElementById('chat-link');
    const settingsLink = document.getElementById('settings-link');

    const dashboardSection = document.getElementById('dashboard');
    const chatSection = document.getElementById('chat');
    const settingsSection = document.getElementById('settings');

    function showSection(section) {
        dashboardSection.classList.remove('active');
        chatSection.classList.remove('active');
        settingsSection.classList.remove('active');
        section.classList.add('active');
    }

    dashboardLink.addEventListener('click', () => {
        showSection(dashboardSection);
        setActiveLink(dashboardLink);
    });

    chatLink.addEventListener('click', () => {
        showSection(chatSection);
        setActiveLink(chatLink);
    });

    settingsLink.addEventListener('click', () => {
        showSection(settingsSection);
        setActiveLink(settingsLink);
    });

    function setActiveLink(link) {
        dashboardLink.classList.remove('active');
        chatLink.classList.remove('active');
        settingsLink.classList.remove('active');
        link.classList.add('active');
    }

    // Chat Functionality
    const chatList = document.getElementById('chat-list');
    const chatTitle = document.getElementById('chat-title');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message');
    const newChatInput = document.getElementById('new-chat');
    const addChatBtn = document.getElementById('add-chat');

    let chats = [];
    let currentChat = null;

    function renderChats() {
        chatList.innerHTML = '';
        chats.forEach((chat, index) => {
            const li = document.createElement('li');
            li.textContent = chat.name;
            li.addEventListener('click', () => selectChat(index));
            chatList.appendChild(li);
        });
    }

    function renderMessages() {
        chatMessages.innerHTML = '';
        if (currentChat) {
            currentChat.messages.forEach(message => {
                const div = document.createElement('div');
                div.textContent = message;
                chatMessages.appendChild(div);
            });
        }
    }

    function selectChat(index) {
        currentChat = chats[index];
        chatTitle.textContent = currentChat.name;
        renderMessages();
    }

    sendMessageBtn.addEventListener('click', () => {
        if (currentChat && messageInput.value.trim()) {
            currentChat.messages.push(messageInput.value.trim());
            messageInput.value = '';
            renderMessages();
        }
    });

    addChatBtn.addEventListener('click', () => {
        if (newChatInput.value.trim()) {
            chats.push({ name: newChatInput.value.trim(), messages: [] });
            newChatInput.value = '';
            renderChats();
        }
    });

    // To-Do List Functionality
    const todoList = document.getElementById('todo-list');
    const newTodoInput = document.getElementById('new-todo');
    const addTodoBtn = document.getElementById('add-todo');
    const todoEditIcon = document.createElement('span');
    
    todoEditIcon.classList.add('edit-icon');
    document.getElementById('todo-box').appendChild(todoEditIcon);

    let todos = [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo;
            li.addEventListener('click', () => removeTodo(index));
            todoList.appendChild(li);
        });
    }

    function removeTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    addTodoBtn.addEventListener('click', () => {
        if (newTodoInput.value.trim()) {
            todos.push(newTodoInput.value.trim());
            newTodoInput.value = '';
            renderTodos();
        }
    });

    todoEditIcon.addEventListener('click', () => {
        newTodoInput.classList.toggle('hidden');
        addTodoBtn.classList.toggle('hidden');
    });

    // Grocery List Functionality
    const groceryList = document.getElementById('grocery-list');
    const newGroceryInput = document.getElementById('new-grocery');
    const addGroceryBtn = document.getElementById('add-grocery');
    const groceryEditIcon = document.createElement('span');
    
    groceryEditIcon.classList.add('edit-icon');
    document.getElementById('grocery-box').appendChild(groceryEditIcon);

    let groceries = [];

    function renderGroceries() {
        groceryList.innerHTML = '';
        groceries.forEach((grocery, index) => {
            const li = document.createElement('li');
            li.textContent = grocery;
            li.addEventListener('click', () => removeGrocery(index));
            groceryList.appendChild(li);
        });
    }

    function removeGrocery(index) {
        groceries.splice(index, 1);
        renderGroceries();
    }

    addGroceryBtn.addEventListener('click', () => {
        if (newGroceryInput.value.trim()) {
            groceries.push(newGroceryInput.value.trim());
            newGroceryInput.value = '';
            renderGroceries();
        }
    });

    groceryEditIcon.addEventListener('click', () => {
        newGroceryInput.classList.toggle('hidden');
        addGroceryBtn.classList.toggle('hidden');
    });

    // Message Board Functionality
    const messageBoard = document.getElementById('message-board');
    const newMessageInput = document.getElementById('new-message');
    const messageImageInput = document.getElementById('message-image');
    const postMessageBtn = document.getElementById('post-message');
    const messageBoardEditIcon = document.createElement('span');
    
    messageBoardEditIcon.classList.add('edit-icon');
    document.getElementById('message-board-box').appendChild(messageBoardEditIcon);

    let messages = [];

    function renderBoardMessages() {
        messageBoard.innerHTML = '';
        messages.forEach(message => {
            const div = document.createElement('div');
            if (message.text) {
                const p = document.createElement('p');
                p.textContent = message.text;
                div.appendChild(p);
            }
            if (message.image) {
                const img = document.createElement('img');
                img.src = message.image;
                img.alt = "Message Image";
                img.style.maxWidth = "100%";
                div.appendChild(img);
            }
            messageBoard.appendChild(div);
        });
    }

    postMessageBtn.addEventListener('click', () => {
        const newMessage = {};
        if (newMessageInput.value.trim()) {
            newMessage.text = newMessageInput.value.trim();
            newMessageInput.value = '';
        }
        if (messageImageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                newMessage.image = event.target.result;
                messages.push(newMessage);
                renderBoardMessages();
            };
            reader.readAsDataURL(messageImageInput.files[0]);
            messageImageInput.value = '';
        } else {
            messages.push(newMessage);
            renderBoardMessages();
        }
    });

    messageBoardEditIcon.addEventListener('click', () => {
        newMessageInput.classList.toggle('hidden');
        messageImageInput.classList.toggle('hidden');
        postMessageBtn.classList.toggle('hidden');
    });

    // Initial render
    renderChats();
    renderTodos();
    renderGroceries();
    renderBoardMessages();

    // Initially hide input boxes and buttons
    newTodoInput.classList.add('hidden');
    addTodoBtn.classList.add('hidden');
    newGroceryInput.classList.add('hidden');
    addGroceryBtn.classList.add('hidden');
    newMessageInput.classList.add('hidden');
    messageImageInput.classList.add('hidden');
    postMessageBtn.classList.add('hidden');
});
