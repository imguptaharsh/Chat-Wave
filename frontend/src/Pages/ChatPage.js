import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text } from '@chakra-ui/react';

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get('/api/chats');
      setChats(data);
      setError(null);
    } catch (error) {
      setError('Error fetching chats');
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    // <div>
    //   {error ? (
    //     <Text>{error}</Text>
    //   ) : (
    //     chats.map((chat) => (
    //       <div key={chat.name}>
    //         <div>
    //           {chat.name}{' '}
    //           {chat.messages.map((message, index) => (
    //             <div key={index}>{message.text}</div>
    //           ))}
    //         </div>
    //       </div>
    //     ))
    //   )}
    // </div>
    <div>h</div>
  );
};

export default ChatPage;
