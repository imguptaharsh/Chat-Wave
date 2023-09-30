import { Modal, ModalHeader, ModalOverlay, useDisclosure,ModalCloseButton,ModalBody,ModalFooter,Button,ModalContent, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useChatState } from '../../Context/ChatProvider';

export const GroupChatModal = ({children}) => {
    const {isOpen, onOpen, onClose}= useDisclosure();
    const [groupChatName,setGroupChatName]=useState("");
    const [selectUsers,setSelectUsers]=useState([]);
    const [search,setSearch]=useState("");
    const [searchResults,setSearchResults]=useState([]);
    const [loading,setLoading]=useState(false);


    const toast= useToast();

    const {user,chats,setChats}=useChatState();


  return (
    <>
    <span onClick={onOpen}></span>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader
            fontSize='35px'
            fontFamily='Work sans'
            d='flex'
            justifyContent='center'> Create Group Chat</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
            </ModalFooter>

        </ModalContent>
    </Modal>
    </>
  )
}
