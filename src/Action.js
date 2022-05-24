import React, { useState } from "react";
import axios from "axios";
// import useColorModeValue from 'react';
import { Button, chakra, Box, Image, Flex } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

export default function Action() {
  //Our meme array
  const [memes, setMeme] = useState([]);
  const [title, setTitle] = useState("Get Data");
  const [hidden, setHiddne] = useState(false);

  function handleClick() {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        // console.log(response);
        const final = response.data.data.memes;
        setMeme(final);
        //Remove comments for better view of data
        // console.log(final);
        // console.log(memes);
        setTitle("Clear data");
        setHiddne(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function clear() {
    // console.log("In Clear");
    setMeme([]);
    setHiddne(false);
    setTitle("Get data");
  }

  return (
    <div>
      <Center>
        <Button
          colorScheme="blue"
          style={{ marginTop: "5px" }}
          onClick={hidden ? clear : handleClick}
        >
          {title}
        </Button>
      </Center>

      <br />
      <br />

      <ul style={{ listStyle: "none" }}>
        {memes.map((message) => (
          <Center>
            <li lis key={message.id}>
              <Flex
                // bg={useColorModeValue("#F9FAFB", "gray.600")}
                p={50}
                w="full"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  w="xs"
                  // bg={useColorModeValue("white", "gray.800")}
                  bg="black"
                  shadow="lg"
                  rounded="lg"
                  overflow="hidden"
                  mx="auto"
                >
                  <Image
                    w="full"
                    h={56}
                    fit="cover"
                    src={message.url}
                    alt={message.name}
                  />

                  <Box py={5} textAlign="center">
                    <chakra.span
                      fontSize="md"
                      // color={useColorModeValue("gray.700", "gray.200")}
                    >
                      {message.name}
                    </chakra.span>
                  </Box>
                </Box>
              </Flex>
            </li>
          </Center>
        ))}
      </ul>
    </div>
  );
}
