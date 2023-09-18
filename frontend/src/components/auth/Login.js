import { React, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import {useChatState} from '../../Context/ChatProvider'
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const {setUser}=useChatState();
  const handleClick = () => setShow(!show);

  const guestHandler = () => {
    setEmail("guest@example.com");
    setPassword("guest");
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill All Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email: email,
          password: password,
        },
        config
      );
      // console.log(res);
      toast({
        title: data.name,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (e) {
      toast({
        title: e.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired color="white">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          color="white" // Set the text color to white
          borderRadius="3xl"
          _placeholder={{ color: "gray.300" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired color="white">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Set Your Password"
            value={password}
            color="white" // Set the text color to white
            borderRadius="3xl"
            _placeholder={{ color: "gray.300" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              borderRadius="3xl"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="gray"
        style={{ marginTop: 15 }}
        width="100%"
        borderRadius="3xl"
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        style={{ marginTop: 15 }}
        width="100%"
        borderRadius="3xl"
        onClick={guestHandler}
      >
        Get Guest User Acess
      </Button>
    </VStack>
  );
}

export default Login;
