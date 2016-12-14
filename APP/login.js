import React, { Component } from 'react';
import {
	View,
 	Text,
 	StyleSheet,
 	Image,
 	WebView,
 	TextInput,
 	TouchableOpacity
} from 'react-native';
let Index = require('./index')

class login extends Component{
	constructor(props){
        super(props)
        this.state={
        	onoff: true 
    	}
    }
    change(){
    	this.setState({
    		onoff: !this.state.onoff
    	})	
 	}
	fetchMoreDate(){
		this.props.navigator.push({
            name:"入口",
            component:Index
        })
		fetch('http://localhost:8080/api/v1/i/userLogin',{
			 method: 'POST',
			 headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			  },
			  body: 'username=value1&password=value2'
			})
		.then((response) => {
			console.log(response)
		})
      	
    }
	render(){
		return(
			<View style={styles.container}>
				<Text style={{color:'white',fontSize:20}}>赛克通</Text>
				{
					this.state.onoff == true?(
					<View style={styles.login}>
						<View style={styles.input_wrap}>
							<Image 
								source={require('./images/individual_center.png')}
								style={styles.icon}
							/>
							<TextInput
								style={styles.input}
								placeholder="用户名/密码/手机号"
								placeholderTextColor='rgba(255,255,255,.3)'
								clearButtonMode='while-editing'
								underlineColorAndroid='transparent'
								autoCorrect={false}
								autoCapitalize={'none'}
							/>
						</View>
						<View style={styles.input_wrap}>
							<Image 
								source={require('./images/mima.png')}
								style={styles.icon}
							/>
							<TextInput
								style={styles.input}
								placeholder=" 6~18位密码"
								placeholderTextColor='rgba(255,255,255,.3)'
								clearButtonMode='while-editing'
								underlineColorAndroid='transparent'
								autoCorrect={false}
								autoCapitalize={'none'}
							/>
						</View>
						<View style={{flexDirection:'row-reverse'}}>
							<TouchableOpacity><Text style={{color:'white',borderBottomWidth:1,marginTop:10,marginBottom:20}}>忘记密码</Text></TouchableOpacity>
						</View>
						<View style={{backgroundColor:'rgb(137,191,4)',height:30,marginBottom:20}}>
							<TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={this.fetchMoreDate.bind(this)}><Text style={{color:'white'}}>登陆</Text></TouchableOpacity>
						</View>
						<View style={{backgroundColor:'#8ff2a9',height:30,marginBottom:20}}>
							<TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={this.change.bind(this)}><Text style={{color:'white'}}>注册</Text></TouchableOpacity>
						</View>
					</View>):(
						<View style={styles.login}>
						<View style={styles.input_wrap}>
							<Image 
								source={require('./images/individual_center.png')}
								style={styles.icon}
							/>
							<TextInput
								style={styles.input}
								placeholder="用户名/密码/手机号"
								placeholderTextColor='rgba(255,255,255,.3)'
								clearButtonMode='while-editing'
								underlineColorAndroid='transparent'
								autoCorrect={false}
								autoCapitalize={'none'}
							/>
						</View>
						<View style={styles.input_wrap}>
							<Image 
								source={require('./images/mima.png')}
								style={styles.icon}
							/>
							<TextInput
								style={styles.input}
								placeholder=" 6~18位密码"
								placeholderTextColor='rgba(255,255,255,.3)'
								clearButtonMode='while-editing'
								underlineColorAndroid='transparent'
								autoCorrect={false}
								autoCapitalize={'none'}
							/>
						</View>
						<View style={{flexDirection:'row',marginTop:20,justifyContent:'center'}}>
							<Text style={{color:'white',fontSize:12}}>注册代表你已经同意</Text><Text style={{color:'green',fontSize:12}}>塞克通用户协议</Text>
						</View> 
						<View style={{backgroundColor:'rgb(137,191,4)',height:30,marginBottom:20,marginTop:20}}>
							<TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'white'}}>注册</Text></TouchableOpacity>
						</View>
						<View style={{backgroundColor:'#8ff2a9',height:30,marginBottom:20}}>
							<TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={this.change.bind(this)}><Text style={{color:'white'}}>返回登陆</Text></TouchableOpacity>
						</View>
					</View>
					)	
				}			
			</View>
		)
	}
}


const styles = StyleSheet.create({
container:{
	flex: 1,
	alignItems:'center',
	justifyContent:'center',
	backgroundColor: 'rgba(0,0,0,.8)',
},
login:{
	width:300,
},
input_wrap:{
	position:'relative',
	flexDirection:'row',
	borderWidth: 1,
	borderColor:'white',
	borderRadius:6,
	marginTop: 20
},
input:{
	flex:1,
	height:40,
	color:'white',
	paddingLeft:5,
},
icon:{
	width:30,
	height:30,
	marginTop:5,
	marginLeft:10,
	marginRight:10,
}

})









module.exports = login;