import React, { Component } from 'react';
import {
	View,
 	Text,
 	StyleSheet,
 	Image,
  	TabBarIOS,
 	TouchableOpacity,
 	ListView,
 	AlertIOS,
    RefreshControl,
    Dimensions
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

let total = 0;
let {width,height} = Dimensions.get("window");

class My extends Component{
	constructor(props){
        super(props)
    }
    render(){
		return(
			<View>
				<View style={styles.header}>
					<Text style={{fontSize:20}}>{this.props.name}</Text>
				</View>
			</View>
		)
	}
}

class News extends Component{
	constructor(props){
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource:ds.cloneWithRows([]),
            isRefreshing:false,
            genxin: -1,
            total:total
        }
        this.fetchMoreDate();
    }

     _render(row){
     	let oyear = new Date(parseInt(row.datetime)).getFullYear();
     	let omon = new Date(parseInt(row.datetime)).getMonth();
     	let oday = new Date(parseInt(row.datetime)).getDate();
    	return(
	    	<TouchableOpacity style={{flexDirection:'row',backgroundColor:'white',borderColor:'#ccc',borderBottomWidth:1,padding:15,alignItems:'center',justifyContent:'space-between',flex:1}}>
	    		<View style={{flexDirection:'row'}}>
	    			<Image source={require('./images/news_bg.png')} style={{width:70,height:65}}/>
	    			<View style={{marginLeft:10}}>
	    				<Text style={{fontSize:24,lineHeight:36}}>{row.content}</Text>
	    				<Text style={{fontSize:16,color:'gray',marginTop:5}}>{oyear+"年"+omon+"月"+oday+"日"}</Text>
	    			</View>
	    		</View>
	    		<Image source={require('./images/right.png')}/>
	    	</TouchableOpacity>
	    )
    }

     fetchMoreDate(){
        fetch('http://localhost:8080/api/v1/news/getNewsList')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                total = responseJson.content.numberOfElements
                this.setState({
                	dataSource:this.state.dataSource.cloneWithRows(responseJson.content.content),
                	total: responseJson.content.numberOfElements
                })
            })
            .catch((error) => {
                console.error(error);
          });
    }
    rendernum(){
    	if(!this.state.isRefreshing && this.state.genxin !=-1){

	    	return(
	    		<View style={{position:'absolute',width:width,alignItems:'center',top:70,zIndex:2,backgroundColor:'rgba(0,0,0,.5)',padding:5}}>
					<Text style={{color:'white'}}>跟新{this.state.genxin}条数据</Text>
				</View>
	    	)
	    }
    }
     _fetchMoreDate(){
     	this.setState({
     		isRefreshing:true
     	})
        fetch('http://localhost:8080/api/v1/news/getNewsList')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                	isRefreshing:false,
                	genxin: (responseJson.content.numberOfElements - total),
                	dataSource:this.state.dataSource.cloneWithRows(responseJson.content.content),
                	total: responseJson.content.numberOfElements
                })
                let _this = this
                setTimeout(function  () {
                	_this.setState({
                		genxin:-1
                	})
                },1500)
                total = responseJson.content.numberOfElements;
            })
            .catch((error) => {
                console.error(error);
          });
    }

    render(){
		return(
			<View style={{flex:1}}>
				<View  style={styles.header}>
					<Text style={{fontSize:20}}>{this.props.name}</Text>
				</View>
				{this.rendernum()}
				<ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {this._render.bind(this)}
                    automaticallyAdjustContentInsets={false}
                    enableEmptySections = {true}
                    refreshControl={
                        <RefreshControl
                        	onRefresh={this._fetchMoreDate.bind(this)}
                            refreshing={this.state.isRefreshing}
                            tintColor="#ff0000"
                            title="拼命加载中..."
                            titleColor="#000"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                />
                {
                	this.state.total !== 0?(null):(<Text style={{position:'absolute',top:80,alignSelf:'center'}}>暂无新闻数据</Text>)
                }
			</View>
		)
	}
}

class Seting extends Component{
	constructor(props){
        super(props)
    }
    render(){
		return(
			<View>
				<View style={styles.header}>
					<Text style={{fontSize:20}}>{this.props.name}</Text>
				</View>
			</View>
		)
	}
}

class Index extends Component{
	constructor(props){
        super(props)
        this.state = {
            selectedTab:"home1"
        }
    }
	render(){
		return(
			<View style={{flex:1}}>
			   	<TabNavigator style={{backgroundColor:'#e5e5e5'}}>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'home1'}
					    renderIcon={() => <Image style={styles.icon} source={require("./images/home.png")} />}
		                renderSelectedIcon={() => <Image style={styles.icon} source={require("./images/home_active.png")} />}
		                onPress={() => this.setState({ selectedTab: 'home1' })}
		            >
		            	<My name="首页"/>
					</TabNavigator.Item>

					<TabNavigator.Item
						selected={this.state.selectedTab === 'home2'}
					    renderIcon={() => <Image style={styles.icon} source={require("./images/reading.png")} />}
		                renderSelectedIcon={() => <Image style={styles.icon} source={require("./images/reading_active.png")} />}
		                onPress={() => this.setState({ selectedTab: 'home2' })}
		            >
		            	<News name="新闻"/>
					</TabNavigator.Item>

					<TabNavigator.Item
						selected={this.state.selectedTab === 'home3'}
					    renderIcon={() => <Image style={styles.icon} source={require("./images/music.png")} />}
		                renderSelectedIcon={() => <Image style={styles.icon} source={require("./images/music_active.png")} />}
		                onPress={() => this.setState({ selectedTab: 'home3' })}
		            >
		            	<Seting name="设置"/>
					</TabNavigator.Item>
				</TabNavigator>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	icon : {
		width : 100,
		height : 50
	},
	header : {
		borderColor:'#ccc',
		borderBottomWidth:1,
		backgroundColor: 'white',
		height:70,
		alignItems:'center',
		paddingTop: 35
	}
});






module.exports = Index;