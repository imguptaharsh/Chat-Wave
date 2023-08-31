import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

function HomePage() {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="Gray.600"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" color="white" fontFamily="Oswald" >
        Chat Wave
        </Text>
      </Box>

      <Box bg='gray.600' w="100%" p={4}>
        <Tabs
          variant="soft-rounded"
          borderRadius="3xl"
          borderWidth="0.5px"
          borderColor="white"
          colorScheme="gray"
        >
          <TabList  m='1em'>
            <Tab width="50%" color='white'>Login</Tab>
            <Tab width="50%"  color='white'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Login */}
              <Login></Login>
            </TabPanel>
            <TabPanel>
              {/* Sign Up */}
              <Signup></Signup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
