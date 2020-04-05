import React, { useEffect } from "react"

const TestPage = () => {
  useEffect(()=>{
    const options = {
      method: "POST",
      headers: {
      	"Content-Type":"application/json"
      },
      body: JSON.stringify({username:"test",password:"test"})
    }
    const url = "http://192.168.2.116:5000/api/auth/local/login"
    fetch(url,options)
    .then(res=>res.json())
    .then(docs=>{
      if(docs.ok){
      const { token } = docs;
      const { key, value, options } = token;
      document.cookie = `${key}=${value};max-age=3600;domain=localhost`
      window.location = "/";
      //window.location = "/"
      }
    });
  },[])
	return(
		<div>
		<p className="title is-2">Test</p>
		</div>
	)
}

export default TestPage;
