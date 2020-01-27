import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class AddStudent extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      skills:''
    } 
    this.addItems = this.addItems.bind(this) 
  }

  addItems(){
  // let skill = this.state.skills.split(',');
  // let final_state = this.state;
  // final_state['skills'] = skill;
  this.props.studentinfo(this.state);
  this.setState({
    firstName:'',
    lastName:'',
    skills:''
  })

 
  }


  render() {
    return (
      <div className="">
        <div className='form'>
        
        <input type='text' className=''  value={this.state.firstName} placeholder='First-Name' onChange={(event)=>this.setState({firstName:event.target.value})} />
        
        <input type='text' className='' value={this.state.lastName} placeholder='Last-Name'onChange={(event)=>this.setState({lastName:event.target.value})} />
        
        <input type='text' className='' value={this.state.skillssw} placeholder='skill=Python,html'onChange={(event)=>this.setState({skills:event.target.value})} />
        <button onClick={this.addItems}>Add</button>

        
        </div>
      </div>
    );
  }
}

class SearchName extends Component{

  render(){
    return(
      <div className='search'> 
         <input type="text" onChange={(event) => this.props.searchinfo(event.target.value)}  placeholder="Search for names.." ></input>
      </div>
    )}
}

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.item.firstName,
      lastName: this.props.item.lastName,
      update: false,
      skills: this.props.item.skills
      
    };
    this.editDetails = this.editDetails.bind(this);
    this.deleteDetails = this.deleteDetails.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.refresh = this.refresh.bind(this)
  }

  editDetails() {
    this.setState(
      {
        update: true

      }
    );
    // let url = 'http://127.0.0.1:8000/student/list/'+ this.props.item.id.toString();
    // axios.get(url)
    // .then(res => {
      // console.log(res);
    // })  ;
  }

  refresh() {
    axios.get("http://127.0.0.1:8000/student/list/")
    .then(res => {
      this.setState({ students: res.data });
    });
  }

  componentDidMount() {
    this.refresh();
  
  }

  deleteDetails(id){
    axios.delete('http://127.0.0.1:8000/student/list/delete/'+id.toString()+'/')
    .then(res => {
      this.refresh();
    });
  }

  updateDetails(id){
    axios.put('http://127.0.0.1:8000/student/list/update/'+id.toString()+'/', this.state)
    .then(res => {
      this.refresh();
    });
  }


  render() {
    let item = this.props.item;
    console.log("STudent Component:",item)
    return (
      <tr >
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                <ul>
                  {item.skills_list.map((item,index)=>

                    <li key={index}>{item}</li>                  
                  )
                  }
                  </ul>
                 
                  </td>
                  <td>
                    <button onClick={(event) =>this.editDetails(item.id)}>Edit</button>
                    {this.state.update ?
                    (
                      <div className='pop-up-form'>
        
                      <input type='text' className=''  value={this.state.firstName} placeholder='First-Name' onChange={(event)=>this.setState({firstName:event.target.value})} />
                      <input type='text' className='' value={this.state.lastName} placeholder='Last-Name'onChange={(event)=>this.setState({lastName:event.target.value})} />

                      <input type='text' className='' value={this.state.skills} onChange={(event)=>this.setState({skills:(event.target.value).toString()})} />
                      <button onClick={(event)=>this.updateDetails(item.id)}>Update</button>
              
                      
                      </div>
                    ):null}
                    
                    <button onClick={(event) => this.deleteDetails(item.id)}>Delete</button>
                  </td>
              </tr>  
    )
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      students : [],
      searchname:''
    }

    this.addStudent = this.addStudent.bind(this)
    this.sortedfirstname= this.sortedfirstname.bind(this)
    this.sortedlastName= this.sortedlastName.bind(this)
    this.sortedskills= this.sortedskills.bind(this)
    this.searchItem= this.searchItem.bind(this)
    this.refreshList = this.refreshList.bind(this)
    // this.deleteDetails = this.deleteDetails.bind(this)
  }

  addStudent(text)
  {
    // this.setState({
    //   students: [...this.state.students,text]
    // });
    
    axios.post("http://127.0.0.1:8000/student/list/create/",text).then(res => {
      this.refreshList();
    });

   
    // .then(res => {
    //   this.setState({ students: res.data });
    // })

  }


  sortedfirstname(){
    let sortedfirstName= this.state.students.sort(function(a,b){
      let x = a.firstName.toLowerCase();
      let y = b.firstName.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    this.setState(
      {
        students:sortedfirstName
        
        })
      
  }

  sortedlastName(){
    let sortedlastName= this.state.students.sort(function(a,b){
     return a.lastName.localeCompare(b.lastName)})
   this.setState({
       students:sortedlastName
       
       })
     
  }

  sortedskills(){
  let sortedskills = this.state.students.sort(function(a,b){
      if (a.skills.length > b.skills.length) {
        return -1;
      }
      if (a.skills.length < b.skills.length) {
        return 1;
      }
      return 0;
    });
 
 
  this.setState({
    students:sortedskills
    });
  }

  searchItem(text){
    this.setState({
      searchname:text
    })
  } 

  refreshList() {
    axios.get("http://127.0.0.1:8000/student/list/")
    .then(res => {
      this.setState({ students: res.data });
    });
  }

  componentDidMount() {
    this.refreshList();
  
  }
  render() {

    return (
      <div className="App">
        <AddStudent studentinfo={this.addStudent} />
        <SearchName searchinfo={this.searchItem}/>       
        <table >
          <thead>
          <tr className="table-row">
            <th onClick={this.sortedfirstname}>Firstname</th>
            <th onClick={this.sortedlastName} >Lastname</th> 
            <th onClick={this.sortedskills} >Skills</th>
            <th>Operation</th>
           
          </tr> 
          </thead>
          <tbody>
            
            {this.state.students.filter(name => {
                  return name.firstName.toLowerCase().includes(this.state.searchname.toLowerCase()) ||
                  name.lastName.toLowerCase().includes(this.state.searchname.toLowerCase());
                })
              .map((item,index)=>(
                // console.log("student", item);
                <Student key={index} item={item} />
                
          ))}
       </tbody>
       </table>  
               
      </div>
    );
  }
}






export default App;
