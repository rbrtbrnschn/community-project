import React, {Component} from "react"
import { useHistory } from "react-router-dom";

const Test = () => {
	const history = useHistory();
	const handleOnClick = async () => {
		const request = await fetch("/api/sample/test2");
		const data = await request.json();
		if(data.ok)history.push("/success");
		if(!data.ok)history.push("/error");
	}
	
		return(
			<div>
				<a onClick={handleOnClick}>Click Me</a>
			</div>
		)
	
}

export default Test;
