const redditReq = new XMLHttpRequest();
redditReq.addEventListener('load', test);
redditReq.open('GET', `https://www.reddit.com/r/javascript.json`);
redditReq.send();

function test(){
  redditObj = JSON.parse(this.responseText);
  console.log(redditObj);
}