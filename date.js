

module.exports = getDate
function getDate(){

  const date = new Date();

  var day = "nice";

var option = {
 weekday:"long",
 day:"numeric",
  month:"long"
};


var day = date.toLocaleDateString("en-US",option);
return day ;
}
