 import React, { Component, memo } from 'react';

import { View, Platform} from 'react-native';
import { WebView } from "react-native-webview";
// for routing

class Pay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false,
            
        }
       
        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;
          
            var patchedPostMessage = function(message, targetOrigin, transfer) { 
              originalPostMessage(message, targetOrigin, transfer);
            };
          
            patchedPostMessage.toString = function() { 
              return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
          
            window.postMessage = patchedPostMessage;
          };
          
          this.patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
          
      }
      componentDidMount(){
       this.setState({amount : this.props.navigation.state.params.amount})
       
      }

    UNSAFE__componentWillMount(){
        this.setState({loading: true});
        
    }

    handleNavigation(event){
        console.log(event)
    }
    handleMessage(event){
        let data = event.nativeEvent.data;
        data = JSON.parse(data);
        if(data.status == 'success'){
            alert(data.reference);
            
        }else{
            this.setState({loading: false});
            alert('Failed, '+ data.message);
            
        }
        
    }
    passValues(){
        //const { amount, paypalFundingDetails} = this.props;
        
        let data = {
            amount : 20,
            orderID: 565656 //orderID
        }
     
        if(!this.state.sent){
            this.refs.webview.postMessage(JSON.stringify(data));
            this.setState({loading: false, sent: true});
        }
        
    }
    render() {
      const test =this.state.amount
      console.log(test)
        return (
            <View style={{flex: 1}}>
           
            {this.state.amount !== null && this.state.amount !== undefined &&
             <WebView
               style={{overflow: 'scroll',flex : 1}}
               source={{ uri: "http://devnaynet.com/pizza-reunion/application/mobile/client/paypal.php?vidiny="+test}} 
               originWhitelist={["*"]}
               mixedContentMode={'always'}
               useWebKit={Platform.OS == 'ios'}
               onError={() => {alert('Error Occured');}}
               onLoadEnd={() => this.passValues()}
               ref="webview"
               thirdPartyCookiesEnabled={true}
               scrollEnabled={true}
               domStorageEnabled={true}
               startInLoadingState={true}
               injectedJavaScript={this.patchPostMessageJsCode}
               allowUniversalAccessFromFileURLs={true}
               onMessage={(event) => this.handleMessage(event)}
               onNavigationStateChange={(event) => this.handleNavigation(event)}
               javaScriptEnabled={true}
             />}
         </View>
        );

    }
}

export default memo(Pay) 