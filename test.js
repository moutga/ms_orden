const o = require("./models").orden;

(async function(){

	let no = await o.findWhere({id:2});
	console.log(no);

}());
