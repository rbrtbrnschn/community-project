import React from "react";

const Hero = (props) => {
	let {title,sub,color} = props.hero;
	if(!color || color === undefined)color= "is-primary"
	return(
		<section class={"hero is-fullheight "+color}>
		  <div class="hero-body">
		    <div class="container">
		      <h1 class="title">
			{title}
		      </h1>
	      	<h2 class="subtitle">
			{sub}
		      </h2>
		    </div>
		  </div>
		</section>
	)
}

export default Hero;
