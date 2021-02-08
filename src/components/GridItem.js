import React from "react";
import '../App.css';

class GridItem extends React.Component{
	constructor(props){
		super(props);
	}
  render(){
  	//console.log(this.props.index);
    return(
	        <div class="cell" onClick={()=>{
	        	this.props.handleClick(this.props.index)
	        }}>{this.props.value}</div>
      );
  }
}

export default GridItem;
