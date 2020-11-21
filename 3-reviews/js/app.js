// local reviews data
const reviews = [
  {
    id: 1,
    author: "Mark Elliot Zuckerberg",
    image: "images/image1.jpg",
    job: "Facebook Founder",
    text:
      "Mark Elliot Zuckerberg is an American media magnate, internet entrepreneur, and philanthropist. He is known for co-founding Facebook, Inc. and serves as its chairman, chief executive officer,",
  },
  {
    id: 2,
    author: "Sergey Brin",
    image: "images/images2.jpg",
    job: "Google Founder",
    text:
      "The company's rapid growth since incorporation has triggered a chain of products, acquisitions, and partnerships beyond Google's core search engine (Google Search). It offers services designed for work and",
  },
  {
    id: 3,
    author: "Bill Gates",
    image: "images/image3.jpg",
    job: "co-founder of Microsoft Corporation.",
    text:
      "Website. gatesnotes.com. Signature. William Henry Gates III (born October 28, 1955) is an American business magnate, software developer, and philanthropist. He is best known as the co-founder of Microsoft Corporation.",
  },
  {
    id: 4,
    author: "Guido van Rossum",
    image: "images/image4.jpg",
    job: "python founder",
    text:
      "Guido van Rossum (Dutch: [ˈɣido vɑn ˈrɔsʏm, -səm]; born 31 January 1956) is a Dutch programmer best known as the creator of the Python programming language, for which he was the Benevolent dictator for life (BDFL) until he stepped down from the position in July 2018.",
  },
  {
    id: 5,
    author: "Sara Jones",
    image: "images/person-1.jpeg",
    job: "UX designer",
    text:
      "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
];
// select items
const image = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prvButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const randomButton = document.querySelector(".random-btn");

// set starting item
let currentItem = 0;

// load intial item
window.addEventListener('DOMContentLoaded',function(){
 showPerson();
})

// show person based on item 
function showPerson(){
const item = reviews[currentItem];
image.src = item.image;
author.textContent = item.author;
job.textContent = item.job;
info.textContent = item.text;
}

// show next person
nextButton.addEventListener('click', function(){
  currentItem++;
  if(currentItem>reviews.length-1){
   currentItem = 0
  }
   showPerson();
 
})
// show prev person
prvButton.addEventListener('click', function(){
   currentItem--;
   if (currentItem <0) {
     currentItem = reviews.length -1;
   }
   showPerson();
})

// show random person
randomButton.addEventListener('click',function(){
  currentItem = generateRandomNumber();
  showPerson();
})

// random number generate
function generateRandomNumber(){
  return Math.floor(Math.random()*reviews.length)
}