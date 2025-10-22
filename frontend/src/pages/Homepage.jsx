import React from 'react'
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { useState } from 'react'

const Homepage = () => {
    const [value, setValue] = useState(0)
    return (
        <Container maxW={'xl'} centerContent>
            <Box
                display={"flex"}
                justifyContent={"center"}
                p={3}
                bg={"white"}
                w={"100%"}
                m={"40px 0 15px 0"}
                borderRadius={"lg"}
                borderWidth={"1px"}
                border={"none"}
                textAlign={"center"}
            >
                <Text fontSize={'4xl'} fontFamily={"Work sans"} fontWeight={'light'} color={"black"}>Talky-Talky</Text>
            </Box>
            <Box
                bg={"white"}
                w={"100%"}
                p={4}
                borderRadius={"lg"}
                borderWidth={"1px"}
                border={"none"}
            >
                <Tabs index={value} onChange={setValue}>
                    <TabList>
                        <Tab>First tab</Tab>
                        <Tab>Second tab</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>First panel</TabPanel>
                        <TabPanel>Second panel</TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage;