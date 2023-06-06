const socket = io(); // Connecting to Backend socket server
let user

//Start Utility Functions
const getHtml = (template) => template.join("\n")

const renderMessage = (message)=>{
    const html = getHtml([
        '<div class="ms-2 mb-3 mt-3 w-50">',
                '<div class="ml-border rounded-bottom bg-success-subtle mw-50 p-3">',
                    '<span class="fw-semibold">Yo: </span>',
                    `<span class="">${message}</span>`,
                '</div>',
            '</div>'
    ])
    return html
}

const renderUserMessage = (username, message) => {
        const html = getHtml([
            '<div class="ms-2 mb-3 mt-3">',
                '<div class="border rounded-bottom bg-body-secondary mw-50 p-3">',
                    `<span class="fw-semibold">${username}:</span>`,
                    `<span class="">${message}</span>`,
                '</div>',
            '</div>'
        ])
        return html
}

//DOM elements
const chatBox = document.getElementById('chat-box')
const messagesBox = document.getElementById('messages-box')

//Toast
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

//Authentication
Swal.fire({
    title: 'Hi! Use a nickname:',
    input: 'text',
    text: 'Choose a nickname',
    inputValidator: (value) => {
        return !value && 'you must enter an nickname to continue'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then((result) => {
    user = result.value
    socket.emit('login', user)
})


//Socket

//Emitters
chatBox.addEventListener('keyup', (event)=> {
    if (event.key === 'Enter') {
        if(chatBox.value.trim().length) {
            socket.emit('message', {user: user, message: chatBox.value})
            chatBox.value = ""
        }
    }
})

// socket listeners
socket.on('welcome', (user)=>{
    Toast.fire({
        icon: 'success',
        title: `${user}, Welcome! You can chat now`
      })
})

socket.on('new-user', (user) => {
    Toast.fire({
        icon: 'info',
        title: `${user} is online`
      })
})

socket.on('message-logs', (data) => {
    const html = getHtml(data.map(item => {
        if (item.user === user){
            return renderMessage(item.message)
        } else {
            return renderUserMessage(item.user, item.message)
        }
    }))
    messagesBox.innerHTML = html
})

