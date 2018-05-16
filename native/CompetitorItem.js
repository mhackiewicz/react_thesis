import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-material-ui';


export default class CompetitorItem extends React.Component {
    componentWillMount() {               
      console.time("RenderItem"+this.props.index);  
    }

    goToDetails = (competitor, event) => { 
      this.props.navigation.navigate('Details', {competitor, id:competitor.id_person})}    
      // this.props.history.push({
      //   pathname: "/details/"+competitor.id_person,
      //   query: {competitor}
      // });
    }
    
    componentDidMount() {
      console.timeEnd("RenderItem"+this.props.index); 
    }

    render() {
      var competitor = this.props.competitor;
      return (
        <View>
          <Text>Competitor Item</Text> 
            <ListItem  dense button onPress={(e)=>this.goToDetails(competitor,e)} centerElement={
                <Text style={style.span}>{this.props.index + 1}</Text>
                <Text style={style.span}> {`${competitor.weight_name} kg`} </Text>
                <Avatar alt={competitor.pic_name} src={} />
                <Avatar
                  size={40}
                  image={<Image
                    source={{ uri: `https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/profiles/350/${competitor.id_person}.jpg` }} />
                  } />                    
                <Text style={style.span}>{`${competitor.family_name} ${competitor.given_name}`}</Text
                <Text style={style.span}>{competitor.country_short}</Text>
                <Image style={style.countryImg} source={{ uri: `https://judobase.ijf.org/assets/img/flags/r-80x60/${competitor.country_short.toLowerCase()}.png` }} />                                                    
                <Text style={style.points}>{competitor.points}</Text>    
            }>                                  
            </ListItem>      
        </View>
      );
    }
}

const style = {
    span: {
        font-size: 14;
        margin-right: 20;  
        line-height: 25;
        font-weight: "bold";
    },   
    points: {
        font-size: 14;
        margin-right: 20;  
        line-height: 25;
        width: 40;
    },
    countryImg: {
        vertical-align: "middle";
        width: 25;
        height 20;
    }
};


