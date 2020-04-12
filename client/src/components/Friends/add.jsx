import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../config";

const { uri } = config;
const AddFriend = (props) => {
	const [ state, setState ] = useState({input:"",color:"is-link"})
	const handleButtonColor = (color) => {
		setState({...state,color:color})
	setTimeout(()=> {
		setState({...state,color:"is-link"})
	},3000)
	}
	const handleOnChange = e => {
		setState({...state,input:e.target.value})
		console.log(state.input)
	}
	const handleOnSubmit = () => {
		const url = uri.domain+"/api/player/invite/"+state.input;
		console.log(url);
		fetch(url)
		.then(res=>res.json())
		.then(docs=>
			{
				console.log(docs);
				if(!docs.ok){
				handleButtonColor("is-danger")
				}
			if(docs.ok){
			handleButtonColor("is-success")	
			};
			}
		);
	}
	return(
		<div className="field has-addons has-addons-right">
			<p className="control has-icons-left is-expanded">
				<input 
		className="input is-fullwidth" 
		type="text" 
		placeholder="Email / Username" 
		onChange={handleOnChange}
		
		></input>
				<span className="icon is-left">
					<FontAwesomeIcon icon="envelope" />
				</span>
			</p>
			<p className="control">
				<a className={"button "+state.color} onClick={handleOnSubmit}>
				      Invite
				</a>
			</p>
		</div>
	)
}
export default AddFriend;

