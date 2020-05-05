
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"

import {
    LoginScreen,
    RegisterScreen,
    AuthLoadingScreen
} from "./screens"

const Router = createStackNavigator({
    LoginScreen,
    AuthLoadingScreen,
    RegisterScreen
},{
    initialRouteName : "LoginScreen",
   
})

export default createAppContainer(Router)