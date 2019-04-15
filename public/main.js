'use strict';

let subReddits = [`https://www.reddit.com/r/Unity3D.json`, `https://www.reddit.com/r/blender.json`,
`https://www.reddit.com/r/javascript.json`, `https://www.reddit.com/r/CivVI.json`,
`https://www.reddit.com/r/Battletechgame.json`, `https://www.reddit.com/r/Cooking.json`, 
`https://www.reddit.com/r/space.json`, `https://www.reddit.com/r/Guitar.json`, 
`https://www.reddit.com/r/FullmetalAlchemist.json`, `https://www.reddit.com/r/Sculpture.json`,  ];
let listingsArr = [];
const postsElem =document.querySelector("#posts");
const favButtonNames = ['#fav-button-one', '#fav-button-two', '#fav-button-three'];

favButtonNames.forEach(function(name, index){
  document.querySelector(name).addEventListener('click', () => requestListings(subReddits[index]));
});
document.querySelector('#random-button').addEventListener('click', function(){
  const num = Math.floor(Math.random() * (subReddits.length - 3) + 3);
  requestListings(subReddits[num]);
});
requestListings(subReddits[0]);

function requestListings(subRedditURL){
  postsElem.innerHTML = "";
  const redditReq = new XMLHttpRequest();
  redditReq.addEventListener('load', loadListings);
  redditReq.open('GET', subRedditURL);
  redditReq.send();
}

function loadListings(){
  const listingsObj = JSON.parse(this.responseText);
  listingsArr = listingsObj.data.children;

  listingsArr.forEach(function(data){
    const sectionNames = ['image', 'title', 'subtitle', 'text-snippet'];
    const container = document.createElement('div');
    postsElem.appendChild(container);
    container.className = 'post';
    
    sectionNames.forEach(function(name){
      const section = document.createElement('div');
      container.appendChild(section);
      section.className = name;

      if (name === 'image'){
        const image = document.createElement('img');
        image.className = "picture";
        if (data.data.media_metadata){
          const imageData = data.data.media_metadata;
          image.src = `${imageData[Object.keys(imageData)[0]].s.u}`;
          image.addEventListener('load', (event) => section.appendChild(image));
        }
        if (data.data.url !== null){
          const imageData = data.data.url;
          image.src = `${imageData}`;
          image.addEventListener('load', (event) => section.appendChild(image));
        }
      }

      if (name === 'title'){
        let text = document.createElement('h4');
        section.appendChild(text);
        text.innerHTML = data.data.title;
      }

      if (name === 'subtitle'){
        let text = document.createElement('p');
        section.appendChild(text);
        const time = calculateDate(new Date(), data.data.created);
        text.innerHTML = `by ${data.data.author} \u2022 ${time} \u2022 ${data.data.ups} views`;
      }

      if (name === 'text-snippet'){
        let text = document.createElement('p');
        section.appendChild(text);
        text.innerHTML = data.data.selftext;
      }
    });
  });
}

function calculateDate(current, previous){
  const prevDate = new Date(0);
  prevDate.setUTCSeconds(previous);
  if (prevDate.getFullYear() !== current.getFullYear()){
    // If the post wasn't from this year, then we'd return 'x years ago'
    return;
  }
  if (prevDate.getMonth() !== current.getMonth()){
    // If the post wasn't from this month, then we'd return 'x months ago'
    return;
  }
  if (prevDate.getDay() !== current.getDay()){
    // If the post wasn't from today, then we'd return 'x days ago'
    return;
  }
  let diffRaw = current.getTime() - prevDate.getTime();
  return `${Math.floor((diffRaw / 1000) / 3600)} hours ago`;
}