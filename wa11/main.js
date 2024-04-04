const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');


const imageFilenames = ['pic1.jpeg', 'pic2.jpeg', 'pic3.jpeg', 'pic4.jpeg', 'pic5.jpeg']; 


const altText = {
  'pic1.jpeg': 'Alternative text for pic1',
  'pic2.jpeg': 'Alternative text for pic2',
  'pic3.jpeg': 'Alternative text for pic3',
  'pic4.jpeg': 'Alternative text for pic4',
  'pic5.jpeg': 'Alternative text for pic5'
}; 


imageFilenames.forEach(filename => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/' + filename); 
  newImage.setAttribute('alt', altText[filename]);
  newImage.addEventListener('click', function() {
    displayedImage.setAttribute('src', this.getAttribute('src'));
    displayedImage.setAttribute('alt', this.getAttribute('alt'));
  });
  thumbBar.appendChild(newImage);
});


btn.addEventListener('click', function() {
  if (this.getAttribute('class') === 'dark') {
    this.setAttribute('class', 'light');
    this.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else {
    this.setAttribute('class', 'dark');
    this.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
  }
});

