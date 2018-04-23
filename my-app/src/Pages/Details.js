import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import axios from 'axios';

class Details extends Component {
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
       this.props.history.push({
        pathname: "/",       
      });
  }

  render() {
   
    return (
      <React.Fragment>
       <AppBar position="static" color="default">
          <Toolbar>
            <IconButton onClick={(e) => this.backToList()}>
              <Icon color="secondary">
                keyboard_backspace
              </Icon>
            </IconButton>
            <Typography variant="title">
              Judo Ranking                    
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="container">
        <Grid container spacing={8}>
            <Grid item xs={4}>  
              <img src={`https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/profiles/350/${this.props.match.params.id}.jpg`} width="150px" />
            </Grid>
            <Grid item xs={5}>  
               <div className="infoRow">
                <label>Family name: </label> <span>{this.state.competitor.family_name}</span>
               </div>
                <div className="infoRow">
                <label>Given name: </label> <span>{this.state.competitor.given_name}</span>
               </div>
               <div className="infoRow">
                <label>Gender: </label> <span>{this.state.competitor.gender}</span>
               </div>
                <div className="infoRow">
                <label>Age: </label> <span>{this.state.competitor.age}</span>
               </div>
               <div className="infoRow">
                <label>Categories: </label> <span>{this.state.competitor.categories}</span>
               </div>
               <div className="infoRow">
                <label>Fav. Technique: </label> <span>{this.state.competitor.ftechique}</span>
               </div>
               <div className="infoRow">
                <label>Belt: </label> <span>{this.state.competitor.belt}</span>
               </div>
              
            </Grid>
            <Grid item xs={3}>  
              <img className="countryImgBig" src={`https://judobase.ijf.org/assets/img/flags/r-80x60/${this.state.competitor.country_short ? this.state.competitor.country_short.toLowerCase() : 'blank'}.png`} />
              <div>
                <span className="countrySpan"><b>{this.state.competitor.country_short}</b></span>
              </div>
            </Grid>
        </Grid>

         
        </div>
      </React.Fragment>
    );
  }
}

export default Details;