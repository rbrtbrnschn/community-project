const nodemailer = require("nodemailer");

async function sendMail(params){
	
	const {to,title,body} = params;
	const transporter = nodemailer.createTransport({
	service: 'gmail',
 	auth: {
        	user: 'doesisaacbeat.me@gmail.com',
        	pass: 'Manfred99'
    	}
	});
	let options = {
		from: "TodoHub <doesisaacbeat.me@gmail.com>",
		to: to,
		subject: title,
		html: body
	}

	 await transporter.sendMail(options, (err,info)=>{
	 	if(err)console.log(err)
		else
	 	  console.log("Email Sent -",__dirname);
	 })


}

module.exports = {sendMail:sendMail}
