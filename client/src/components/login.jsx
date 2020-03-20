import React, {useRef,useState,useEffect} from "react"
import {useHistory} from "react-router-dom"

const Login = () => {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const history = useHistory();	
	const handleOnSubmit = async () => {
		if(usernameRef.current.value === "")return;
		if(passwordRef.current.value === "")return;
		console.log(usernameRef.current.value,passwordRef.current.value);
		const options = {
			method: "POST",
			headers:{
				"Content-Type":"application/json"
			},
			body: JSON.stringify({username: usernameRef.current.value, password: passwordRef.current.value})
		}
		const response = await fetch("/api/auth/local/login",options);
		const data = await response.json();
		if(!data)throw new Error("Bad Login");
		if(data.ok)history.push("/");
	}
	return(
		<div>
			<h2>Login</h2>
			<input type="username" placeholder="username" ref={usernameRef}></input>
			<p></p>
			<input type="password" placeholder="password" ref={passwordRef}></input>
			<p></p>
				<input type="submit" onClick={handleOnSubmit}></input>
			<p></p>
			<a href="/createAccount">Create Account</a>
		</div>
	)
}

export default Login; 
