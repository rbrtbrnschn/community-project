import React from "react";

const Hero = (props) => {
	let {title,sub,color} = props.hero;
	if(!color || color === undefined)color= "is-primary"
	return(
		<section className={"hero is-fullheight "+color}>
		  <div className="hero-body">
		    <div className="container">
		      <h1 className="title">
			{title}
		      </h1>
	      	<h2 className="subtitle">
			{sub}
		      </h2>
		    </div>
		  </div>
		</section>
	)
}

export default Hero;
