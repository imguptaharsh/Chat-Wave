import React from 'react';
// import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { useChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChat from '../components/ChatBox';
import ChatBox from '../components/MyChats';

const ChatPage = () => {
  const {user}= useChatState();
  // console.log
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
      d='flex'
      justifyContent='space-between'
      w='100%' h='91.5vh' p='10px'
      >
        {user && <MyChat/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  );
};

export default ChatPage;
