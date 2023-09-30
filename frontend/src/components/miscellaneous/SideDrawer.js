import {
  Box,
  Button,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Drawer,
  Input,
  DrawerBody,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useChatState } from "../../Context/ChatProvider";
import { ProfileModal } from "./ProfileModel";
import { useHistory } from "react-router-dom";
import axious from "axios";
import { ChatLoading } from "../ChatLoading";
import { UserListItem } from "../UserAvatar";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const history = useHistory();
  const { user, setSelectedChat, chats, setChats } = useChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Search field is empty",
        status: "warning",
        duration: 5000,
        isClosable: true,
        postion: "top-right",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axious.get(`/api/user?search=${search}`, config);
      console.log(search);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-center",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axious.post(`/api/chat/`, { userId }, config);
      if (!chats.find((chat) => chat._id === data.id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-center",
      });
    }
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bg="transparent"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="0.5px"
        borderColor="gray"
      >
        <Tooltip label="Search Users to chat" placement="bottom-end">
          <Button bg="transparent" color="white" onClick={onOpen}>
            <SearchIcon />
            <Text d={{ base: "none", md: "flex" }} px="4" color="white">
              Search your friends
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" color="white">
          Chat-Wave
        </Text>
        <div>
          <Menu>
            <MenuButton px="1">
              <BellIcon fontSize="2xl" m="1" color="white" />
            </MenuButton>
            {/* <MenuList>
            </MenuList> */}
          </Menu>
          <Menu>
            <MenuButton
              bg="transparent"
              as={Button}
              rightIcon={<ChevronDownIcon color="white" />}
            >
              <Avatar size="sm" cursor="pointer" name={user.name} />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <ProfileModal user={user}></ProfileModal>
                My Profile
              </MenuItem>
              {/* <ProfileModal></ProfileModal> */}
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
