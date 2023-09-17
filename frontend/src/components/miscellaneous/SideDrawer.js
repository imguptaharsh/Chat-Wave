import { Box, Button, Text, Tooltip, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider } from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useChatState } from "../../Context/ChatProvider";
import { ProfileModal } from "./ProfileModel";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {user} =useChatState();

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
        <Tooltip
          label="Search Users to chat"
          placement="bottom-end"
        >
          <Button bg="transparent" color="white">
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
            <MenuButton bg='transparent' as={Button} rightIcon={<ChevronDownIcon color='white'/>}>
            <Avatar size='sm' cursor='pointer'name={user.name}/>

            </MenuButton>
            <MenuList>
                <MenuItem><ProfileModal user={user}></ProfileModal>
                My Profile</MenuItem>
                {/* <ProfileModal></ProfileModal> */}
                <MenuDivider/>
                <MenuItem>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
