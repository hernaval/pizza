import React, { memo,useState } from 'react'
import { View, Text } from 'react-native'
import { Appbar, Drawer } from "react-native-paper"
import { DrawerActions } from "react-navigation"
const CustomDrawer = ({navigation}) => {
    const [active, setActive] =  useState(false)
    return (
        <View>
            <View>
                <Appbar.Header>
                    <Appbar.Action
                        icon="menu"
                        onPress={() =>
                            {setActive(true)}
                        }
                    />
                    <Appbar.Content title="First Page" />
                </Appbar.Header>
                <Text>First Page</Text>
                <Text>qsfsdfdf</Text>
                <Text>First Page</Text>
                <Text>qsfsdfdf</Text>
                <Text>First Page</Text>
                <Text>qsfsdfdf</Text>
                <Text>First Page</Text>
                <Text>qsfsdfdf</Text>
                <Text>First Page</Text>
                <Text>qsfsdfdf</Text>
            </View>
            {active ===true &&
            <Drawer.Section style={{position : "absolute", zIndex : 18888,backgroundColor : "red"}} title="Some title">
                <Drawer.Item
                    label="First Item"
                    
                    onPress={() =>{} }
                />
                <Drawer.Item
                    label="Second Item"
                  
                    onPress={() => {}}
                />
            </Drawer.Section>
            }
        </View>
    )
}

export default memo(CustomDrawer)
