import React, { useState } from 'react'
import './ChatScreen.css'
import { Avatar } from '@material-ui/core'

function ChatScreen() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      name: 'Flynn',
      image:
        'https://i.pinimg.com/originals/9b/1f/7f/9b1f7fb26329f0fb1bf6cd9a65063f4f.jpg',
      message: 'hi there??',
    },
    {
      name: 'Ellen',
      image:
        'https://i.pinimg.com/originals/9b/1f/7f/9b1f7fb26329f0fb1bf6cd9a65063f4f.jpg',
      message: 'hi there??',
    },
    {
      message: 'hi there??',
    },
    {
      message: 'hi there??',
    },
    {
      message: 'hi there??',
    },
  ])

  const handleSend = (e) => {
    e.preventDefault()
    setMessages([...messages, { message: input }])
    setInput('')
  }

  return (
    <div className='chatScreen'>
      <p className='chatScreen__timestamp'>
        YOU MATCHED WITH FLYNN ON 01/10/20
      </p>
      {messages.map((message) =>
        message.name ? (
          <div className='chatScreen__message'>
            <Avatar
              className='chatScreen__image'
              alt={message.name}
              src={message.image}
            />
            <p className='chatScreen__text'>{message.message}</p>
          </div>
        ) : (
          <div className='chatScreen__message'>
            <p className='chatScreen__textUser'>{message.message}</p>
          </div>
        )
      )}
      <form className='chatScreen__input'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='chatScreen__inputField'
          placeholder='Type a message...'
          type='text'
        />
        <button
          onClick={handleSend}
          type='submit'
          class='chatScreen__inputButton'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatScreen
