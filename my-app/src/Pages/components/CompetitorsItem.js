import React, { Component } from 'react';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class CompetitorsItem extends Component {
	componentWillMount() {				       
  		console.time("RenderItem"+this.props.index);	
  	}

	goToDetails = (competitor, event) => {     
      this.props.history.push({
        pathname: "/details/"+competitor.id_person,
        query: {competitor}
      });
  	}

  	
  	componentDidMount() {
		  console.timeEnd("RenderItem"+this.props.index); 
  	}

	render() {   
		var competitor = this.props.competitor;

    	return (
    		<ListItem  dense button onClick={(e)=>this.goToDetails(competitor,e)} >                   
                    <span className="place"><b>{this.props.index + 1}</b></span>
                    <span className="weight"> {`${competitor.weight_name} kg`} </span>
                    <Avatar alt={competitor.pic_name} src={`https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/profiles/350/${competitor.id_person}.jpg`} />
                    <ListItemText primary={`${competitor.family_name} ${competitor.given_name}`} />

                    <span className="country">{competitor.country_short}<img className="countryImg" src={`https://judobase.ijf.org/assets/img/flags/r-80x60/${competitor.country_short.toLowerCase()}.png`} width="25px" height="20px"/></span>
                    <span className="points"><b>{competitor.points}</b></span>
                   
            </ListItem>
    	)
    }
}

export default CompetitorsItem;