import React, { useState, useRef, useEffect} from "react"

const Create = () => {
	const [state,setState] = useState({});
	const fullNameRef = useRef();
	const usernameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const handleOnSubmit = () => {
		
		// Refs
		const fullName = fullNameRef.current.value
		const username = usernameRef.current.value
		const email = emailRef.current.value
		const password = passwordRef.current.value;
		
		let errs = [];

		check(username, email, password);
		//checkUsername(username);
		//checkEmail(email);
		//checkPassword(password);
		async function check(username,email,password){
			try{
			const validUsername = await checkUsername(username);
			const validEmail = await checkEmail(email);
			const validPassword = checkPassword(password);
			const user = {fullName: fullName, username: validUsername, email: validEmail, password: validPassword}
			createUser(user);
			}
			catch(err){
				if(err)throw new Error(err);
			}

		}
		async function checkUsername(username){
			try{
			if(!username){errs.push("No username.");}
			if(username.length<6){errs.push("Username not long enough.");}
			if(username.includes(" ")){errs.push("Username cannot have spaces.");}
			if(errs.length>0)return;
			const response = await fetch("/api/player/find/username/"+username);
			const data = await response.json();
			console.log("data:",data)
			if(data.status === 404){
				return username;
			}
			else{errs.push("username is taken."); return;}
			}
			catch(err){
				throw new Error(err);
			}
			finally{
				errs.forEach(console.log);
				//if(errs.length>0)throw new Error("Invalid Username");
			}


		}
		async function checkEmail(email){
			let errs = [];
			try{
			if(!email.includes("@")){errs.push("Missing '@'")}
			if(!email.includes(".")){errs.push("Missing '.'")}
			if(email.endsWith(".")){errs.push("Missing com/de/etc.")}
			if(email.length<4){errs.push("Too short.")}
			if(errs.length>0)return;
			const response = await fetch("/api/user/find/email/"+email.toLowerCase());
			const data = await response.json();
			if(data.status === 404){
				return email;
			}
			}
			catch(err){
				throw new Error(err);
			}
			finally{
				errs.forEach(console.log);
				//if(errs.length>0)throw new Error("Invalid Email")
			}


		}
		function checkPassword(password){
			let errs = [];
			try{
				if(password.length<6)errs.push("Password must be longer than 6 characters.");
				if(errs.length>0)return;
				return password;
			
			}catch(err){
				if(err)throw new Error(err);
			}
			finally{
				errs.forEach(console.log);
				//if(errs.length>0)throw new Error("Invalid Password");
			}
		}
		async function createUser(user){
			let err = false;	
				const {fullName, username,email,password } = user;
				Object.values(user).forEach((stuff)=>{
					if(stuff === undefined){err = true;}
				});
				const options = {
					method: "POST",
					headers:{
						"Content-Type":"application/json"
					},
					body: JSON.stringify(user)
				}
				if(err){
					console.log("Input was wrong");
					return;
				}
				const response = await fetch("/api/user/new",options);
				const data = await response.json(); 	
				return data;

			
		
		}
	}
	





	return(
		<div>
			<h2>Create Account</h2>
			<input type="text" placeholder="full name" ref={fullNameRef}></input>
			<p></p>
			<input type="username" placeholder="username" ref={usernameRef}></input>
			<p></p>
			<input type="email" placeholder="email" ref={emailRef}></input>
			<p></p>
			<input type="password" placeholder="password" ref={passwordRef}></input>
			<p></p>
			<input type="submit" onClick={handleOnSubmit}></input>
		</div>
		
	)	
}

export default Create;

