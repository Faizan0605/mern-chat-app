import React from 'react'
import { Tabs } from "@chakra-ui/react"

const Demo = () => {
    const [value, setValue] = useState("login")
    return (
        <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>


            <div>
                <Tabs.Root>
                    <Tabs.List>
                        <Tabs.Trigger value={"login"}>Login</Tabs.Trigger>
                        <Tabs.Trigger>Register</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value={"login"}>fasdfasdf</Tabs.Content>
                    <Tabs.Content>fasdfasdf</Tabs.Content>
                </Tabs.Root>
            </div>
        </Tabs.Root>
    )
}

export default Demo