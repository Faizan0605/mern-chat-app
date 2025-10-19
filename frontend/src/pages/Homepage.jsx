import React from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { SimpleGrid, Tabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'

const Homepage = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box d="flex" justifyContent="center" p={3} bg={'white'} w='100%' m='40px 0 15px 0' borderRadius='lg' borderWidth='1px' >
                <Text fontSize='4xl' fontFamily='Work Sans' fontWeight={'light'} color='black' textAlign='Center' >Talk-A-Tive</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius={"lg"} color="black" borderWidth={"1px"}>
                <SimpleGrid width="full">
                    <Tabs.Root defaultValue="Login" variant={"subtle"}>
                        <Tabs.List mb='1em' w="100%">
                            <Tabs.Trigger value="Login" w="50%">
                                <LuUser />
                                Login
                            </Tabs.Trigger>
                            <Tabs.Trigger value="Sign Up" w="50%">
                                <LuUser />
                                Sign Up
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="Login">
                            <Login />
                        </Tabs.Content>
                        <Tabs.Content value="Signup">
                            <Signup />
                        </Tabs.Content>


                    </Tabs.Root>
                </SimpleGrid>
            </Box>
        </Container >
    )
}

export default Homepage