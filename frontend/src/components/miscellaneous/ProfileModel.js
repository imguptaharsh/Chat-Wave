import { ViewIcon } from "@chakra-ui/icons";
import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
//   Lorem,
  Button,
  Image,
  Text
} from "@chakra-ui/react";
import React from "react";

export const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
           console.log(user.pic)

  return (
    <>
      {children ? (
        <sapn onClick={onOpen}></sapn>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        ></IconButton>
      )}
      <Modal size='lg' iscentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize='30px'
          fontFamily='Work sans'
          d='flex'
          justifyContent='center'
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Image
           borderRadius='full'
           boxSize='150px'
           src={user.pic}
           alt={user.name}
           >
           </Image>
           <Text fontSize={{base:"20px",md:'25px'}} fontFamily='Work sans'>
           Email: {user.email}
           </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
