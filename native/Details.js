import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import { Toolbar, IconToggle } from 'react-native-material-ui';
import 'react-native-console-time-polyfill';


export default class Details extends React.Component {
  state = {
    competitor: {}
  }

  componentWillMount() {               
      console.time("RenderDetails");  
  }
  componentDidMount() {    
     this.getData({
        action: 'competitor.info',
        id_person: this.props.match.params.id     
      }).then((result) =>{
        this.setState({competitor: result.data}) 
        console.timeEnd("RenderDetails");  
      })
  }

  getData = (data) => {
    let params = {
      access_token: '1c20687f659883d14ef965b0bd94531c39821ef0',
      'params[_ust]': ''
    };

    for(let param in data){    
      if(param === 'categories'){
        params['params['+param+'][]'] = data[param];
      } else{
        params['params['+param+']'] = data[param];

      }
    }

    return new Promise((resolve, reject) => {
        axios.get("https://data.ijf.org/api/get_json", {
          params: params
        })
        .then(res => resolve(res));
    });
  }

  backToList =() => {
      this.props.navigation.navigate("Home");
  }
    render() {
      return (
        <View>          
          <Toolbar
            leftElement={ <IconToggle onPress={(e) => this.backToList()} name="keyboard_backspace"/>}
            centerElement="Judo Ranking"  />
          <Image source={{ uri: `https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/profiles/350/${this.props.match.params.id}.jpg` }} />
          <Text>Family name: {this.state.competitor.family_name}</Text>
          <Text>Given name: {this.state.competitor.given_name}</Text>
          <Text>Gender: {this.state.competitor.gender}</Text>
          <Text>Age: {this.state.competitor.age}</Text>
          <Text>Categories: {this.state.competitor.categories}</Text>
          <Text>Fav. Technique: {this.state.competitor.ftechique}</Text>
          <Text>Belt. Technique: {this.state.competitor.belt}</Text>
          <Image source={{ uri: `https://judobase.ijf.org/assets/img/flags/r-80x60/${this.state.competitor.country_short ? this.state.competitor.country_short.toLowerCase() : 'blank'}.png` }} />
          <Text>{this.state.competitor.country_short}</Text>
        </View>
      );
    }

     
}