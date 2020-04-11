import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../config";

const { uri } = config;
const AddFriend = (props) => {
	const [ input, setInput ] = useState("")
	const handleOnChange = e => {
		setInput(e.target.value)
		console.log(input)
	}
	const handleOnSubmit = () => {
		const url = uri.domain+"/api/player/invite/"+input;
		console.log(url);
		fetch(url)
		.then(res=>res.json())
		.then(docs=>
			{
			if(docs.ok){setInput("")};
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
				<a className="button is-link" onClick={handleOnSubmit}>
				      Invite
				</a>
			</p>
		</div>
	)
}
export default AddFriend;

