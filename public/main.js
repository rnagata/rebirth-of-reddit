'use strict';

const redditReq = new XMLHttpRequest();
redditReq.addEventListener('load', test);
redditReq.open('GET', `https://www.reddit.com/r/javascript.json`);
redditReq.send();

function test(){
  const redditObj = JSON.parse(this.responseText);
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const time = document.querySelector("#time");
  const views = document.querySelector("#views");

  title.innerHTML = redditObj.data.children[0].data.title;
  author.innerHTML = `by ${redditObj.data.children[0].data.author}`; 
  let utcSeconds = redditObj.data.children[0].data.created;
  console.log(utcSeconds);
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  console.log(d);
  time.innerHTML = d.toUTCString();
  //views.innerHTML = redditObj returns null for every view_count, as it's disabled. Generate
  // random number?


  
  
}