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
  useToast
} from "@chakra-ui/react";
import { color } from "framer-motion";
import axios from "axios";
import {useHistory} from "react-router-dom";
function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const postDetails = (pic) => {
    setPicLoading(true);
    if (pic===undefined) {
       toast({
        title: "No Image Selected",
        description: "Please select an image",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if(pic.type==='image/jpeg'||pic.type==='image/png'||pic.type==='image/jpg'){
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-wave");
      data.append("cloud_name",process.env.CLOUDINARY_CLOUD_NAME);
      fetch(`https://api.cloudinary.com/v1_1/dl2ny1j0y/image/upload`,{
        method:'post',
        body:data
      }).then((res)=>res.json())
        .then((data)=>{
        setPic(data.url.toString());
        console.log(data.url.toString());
        setPicLoading(false)
        }
        ).catch((err)=>{
          console.log(err)
          setPicLoading(false)
        })
        } else{
          toast({
            title: "No Image Selected",
            description: "Please select an image",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
          return;
        }
  };


  const handleClick = () => setShow(!show);

  const submitHandler = async() => {
    if(!name || !email || !password || !confirmPassword){
      toast({
        title: "Please Fill All The Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
      return;
    }
    console.log(name, email, password, confirmPassword, pic);
    // store the data to our database
    try{
      const  config={
        headers:{
          "Content-Type":"application/json",
        }
      };
      const {data}= await axios.post(
        "/api/user",
        {name,email,password,pic},
        config
      );
      console.log(data);
      toast({
        title: "Account Created Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setPicLoading(false);
      history.push('/chats');
    } catch(e){
      console.log(e);
      toast({
        title: "Something Went Wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
   
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired color="white">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          color='white' // Set the text color to white
  borderRadius='3xl'
  _placeholder={{ color: 'gray.300' }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired color="white">
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          color='white' // Set the text color to white
  borderRadius='3xl'
  _placeholder={{ color: 'gray.300' }}
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
      
      <FormControl id="password" isRequired color="white">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Set Your Password"
            color="white" // Set the text color to white
            borderRadius="3xl"
            _placeholder={{ color: "gray.300" }}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
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



      <FormControl id='pic' isRequired  color='white'>
        <FormLabel>Upload your Picture</FormLabel>
        <Input type='file' p={1.5} 
        borderRadius='3xl'
        accept='image/*'
        onChange={(e)=>{postDetails(e.target.files[0])}}>
        </Input>
    </FormControl>
      {/* <FormControl id="pic" color="white" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.style.display = "none";
              input.addEventListener("change", (event) => {
                postDetails(event.target.files[0]);
              });
              document.body.appendChild(input);
              input.click();
              document.body.removeChild(input);
            }
          }}
        >
          Choose a image
        </Checkbox>
      </FormControl> */}
      <Button
        colorScheme="gray"
        style={{ marginTop: 15 }}
        width="100%"
        borderRadius="3xl"
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
