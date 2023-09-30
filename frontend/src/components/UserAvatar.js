import React from "react";
import { useChatState } from "../Context/ChatProvider";
import { Avatar, Box, Text } from "@chakra-ui/react";

export const UserListItem = ({ handleFunction,user }) => {
  return (
    <Box
      onClick={handleFunction}
      _hover={{ bg: "38B2AC", color: "white" }}
      cursor="pointer"
      borderRadius="lg"
      bg="#E8E8E8"
      color="black"
      alignment="center"
      px={3}
      w={"100%"}
      py={2}
      mb={2}
    >
      <Avatar
        size="sm"
        mr={2}
        src={user.pic}
        cursor="pointer"
        name={user.name}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize='xs'>Email: {user.email}</Text>
      </Box>
    </Box>
  );
};
