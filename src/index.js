
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"

import {
    Dashboard,
    LoginScreen,
    RegisterScreen,
    AuthLoadingScreen,
   
} from "./screens"

const Router = createStackNavigator({
    LoginScreen,
    AuthLoadingScreen,
    RegisterScreen,
    Dashboard
},{
    initialRouteName : "LoginScreen",
   
})

export default createAppContainer(Router)