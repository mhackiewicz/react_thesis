import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import axios from 'axios';
import loader from '../images/loader.svg';
import List from 'material-ui/List';

import CompetitorsItem from './components/CompetitorsItem'; 




class CompetitorsList extends Component {
  state = {
    competitors: [],
    countries: [],
    weightsM: [],
    weightsW: [],
    country: 0,
    curr_weightId: '',
    mensCategory: true, 
    womensCategory: false, 
    loader: false,
    allCompetitors: []
  };

  componentWillMount() {               
      console.time("RenderList");  
  }

  componentDidMount() { 
    this.showLoader();  
    let vm = this;
    Promise.all([      
      this.getData({
        action: 'country.get_list'       
      }),
      this.getData({
        action: 'wrl.weights',
        groupby: 'gender'      
      })
    ]).then(function(values){
        console.log('values',values);
      
        vm.setState({ countries: values[0].data })
        vm.setState({ weightsM: values[1].data.genders.m })
        vm.setState({ weightsW: values[1].data.genders.f })
       
        vm.filterData(true);

       
    })
  }

  filterData = (all=false) => {
    console.time("filterList");  
    this.showLoader();
    let vm = this;
    let gender = 'm';
    if(this.state.womensCategory){
      gender = 'f'
    }

    let params = {
      categories: this.state.curr_weightId,
      gender: gender,
      limit: 300,
      part: 'info,points',
      action: 'wrl.by_category',
      id_country: this.state.country
    }

    if(this.state.curr_weightId !== '') {
      delete params.gender
    }else{
      delete params.categories
    }


    this.getData(
      params
    ).then(function(value){
      
        let competitors = []
        let categories = value.data.categories

        for(let index in categories){
          categories[index].competitors.map((competitor) => {
            if(competitor.id_person)
            competitors.push(competitor)
          })
        }

        vm.setState({ 
          competitors: competitors.sort((a,b)=> {
            let keyA = parseInt(a.points)
            let keyB = parseInt(b.points)
            if(keyA < keyB) return 1;
            if(keyA > keyB) return -1;
            return 0;
          }) 
        },()=>{
          if(all){
             vm.setState({ allCompetitors: competitors});
          }
          vm.hideLoader();
          console.timeEnd("RenderList");
          console.timeEnd("filterList");  
        })

       
    });
  }
    

   getData = (data) => {
    let vm = this;
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
        console.time("Get data")
        axios.get("https://data.ijf.org/api/get_json", {
          params: params
        })
        .then(res => {
          resolve(res);
           console.timeEnd("Get data");
        }).catch(function (error) {
          vm.hideLoader();
          reject();
          console.timeEnd("Get data");
          console.log(error);
        });
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value },()=>{
      this.filterData();
    });

  }
  
  weightCategoryClick = (id, event) => {    
    
    if(id<8){
     this.setState({ mensCategory: true}) 
     this.setState({ womensCategory: false}) 
    }else{
      this.setState({ mensCategory: false}) 
      this.setState({ womensCategory: true}) 
    }
    this.setState({ curr_weightId: id},()=>{
      this.filterData();
    })
  }

  weightGenderClick = (gender, event) => {
    
    if(gender === 'male'){
       this.setState({ mensCategory: true}) 
       this.setState({ womensCategory: false})
    }else{
      this.setState({ mensCategory: false}) 
      this.setState({ womensCategory: true}) 
    }
    this.setState({ curr_weightId: ''},()=>{
      this.filterData();
    })
    
  }

  showLoader = () => {
    this.setState({loader: true})
  }

  hideLoader = () => {
    this.setState({loader: false})    
  }

  findCompetitor = (e) => {   
    let text = e.currentTarget.value;
    console.log(text);
    
       
    this.setState({
      competitors: this.state.allCompetitors.filter(competitor => {
        let name = competitor.family_name +' '+ competitor.given_name;
        return name.toLowerCase().includes(text.toLowerCase());
      })
    },()=>{
      this.setState({ mensCategory: true}) 
      this.setState({ womensCategory: false})
      this.setState({ curr_weightId: ''})
      this.setState({ country: 0})
    });   


  }
  

  render() {   
    return (
      <div className="List">
        <div className={`loader ${this.state.loader ? '' : 'hide'}`}>
          <img src={loader}/>
        </div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Judo Ranking
               <Input inputProps={{'aria-label': 'Description'}} placeholder="Szukaj" className="find-input" onChange={this.findCompetitor}/>               
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="container">
          <Grid container spacing={8}>
            <Grid item xs={4}>              
                <InputLabel htmlFor="name-disabled">Countries</InputLabel>
                <Select value={this.state.country} displayEmpty name="country" onChange={this.handleChange }>
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {this.state.countries.map(country => <MenuItem key={country.id_country} value={country.id_country}>{country.ioc}-{country.name}</MenuItem>)}              
                </Select>                              
            </Grid>
            <Grid item xs={8}>
              <InputLabel htmlFor="name-disabled">Weights</InputLabel>
               <Grid container spacing={8}>
                  <Grid item xs={6}>   
                     <Button variant="raised" size="small" onClick={(e) => this.weightGenderClick('male',e)}  color={this.state.mensCategory ? 'default': 'primary'}>
                       MEN
                    </Button>
                    {this.state.weightsM.map(weight =>
                      <Button 
                        key={weight.id_weight} 
                        onClick={(e) => this.weightCategoryClick(weight.id_weight,e)} 
                        variant="raised" 
                        size="small" 
                        color={this.state.curr_weightId === weight.id_weight ? 'default': 'primary' }>
                        {weight.weight_name}
                      </Button> 
                    )}           
                  </Grid>

                   <Grid item xs={6}> 
                     <Button variant="raised" size="small" onClick={(e) => this.weightGenderClick('female',e)} color={this.state.womensCategory ? 'default': 'primary'}>
                       WOMAN
                    </Button>  
                    {this.state.weightsW.map(weight =>
                      <Button 
                        key={weight.id_weight} 
                        onClick={(e) => this.weightCategoryClick(weight.id_weight,e)} 
                        variant="raised" 
                        size="small" 
                        color={this.state.curr_weightId === weight.id_weight ? 'default': 'primary' }>
                        {weight.weight_name}
                      </Button> 
                    )}  
                  </Grid>
               </Grid>
             
             
            </Grid>
            <Grid item xs={12}>
              <List className="competitorList">
               {this.state.competitors.map((competitor,index) => (
                  <CompetitorsItem key={index} competitor={competitor} index={index} history={this.props.history}/>
                ))}
              </List>
              <h3>{this.state.competitors.length === 0 ? 'no result': ''}</h3>
            </Grid>
          </Grid>
         
        </div>
      </div>
    );
  }
}

export default CompetitorsList;
