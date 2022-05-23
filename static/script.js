

$( document ).ready( function() {
      // Draw all slots
      $('div.slot').each(function(i, d) {
        console.log('slot found: ' + d.id);
        if(d.id === "slot1"){
			funcSpam();
		}
		else{
			funcReal();
		}
        
      });
    });

	function funcSpam(){
		Swal.fire({
  icon: 'error',
  title: 'The news is Fake',
})
	}

	function funcReal(){
		Swal.fire({
  icon: 'success',
  title: 'The news is Real',
})
	}


// DOM selectors
var stars = document.getElementById("stars");
console.log(stars);
const starsCtx = stars.getContext('2d');
const slider = 15;
const output = document.querySelector("#speed");

// global variables
let screen, starsElements, starsParams = { speed: 5, number: 300, extinction: 4 };

// run stars
setupStars();
updateStars();

// handle slider
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
    starsParams.speed = this.value;
};

// update stars on resize to keep them centered
window.onresize = function() {
    setupStars();
};

// star constructor
function Star() {
    this.x = Math.random() * stars.width;
    this.y = Math.random() * stars.height;
    this.z = Math.random() * stars.width;

    this.move = function() {
        this.z -= starsParams.speed;
        if (this.z <= 0) {
            this.z = stars.width;
        }
    };

    this.show = function() {
        let x, y, rad, opacity;
        x = (this.x - screen.c[0]) * (stars.width / this.z);
        x = x + screen.c[0];
        y = (this.y - screen.c[1]) * (stars.width / this.z);
        y = y + screen.c[1];
        rad = stars.width / this.z;
        opacity = 0.5;

        starsCtx.beginPath();
        starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
        starsCtx.arc(x, y, rad, 0, Math.PI * 2);
        starsCtx.fill();
    }
}

// setup <canvas>, create all the starts
function setupStars() {
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [ window.innerWidth * 0.5, window.innerHeight * 0.5 ]
    };
    window.cancelAnimationFrame(updateStars);
    stars.width = screen.w;
    stars.height = screen.h;
    starsElements = [];
    for (let i = 0; i < starsParams.number; i++) {
        starsElements[i] = new Star();
    }
}

//var canvas = document.getElementById('viewport'),
context = stars.getContext('2d');

make_base();

function make_base()
{
  base_image = new Image();
  base_image.src = 'static/news1.jpg';
  base_image.opacity = 0.5;
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0);
  }
}

// function updateStars() {
// 	// starsCtx.fill = "black";
//     // starsCtx.fillRect(0, 0, stars.width, stars.height);
//     starsElements.forEach(function (s) {
//         s.show();
//         s.move();
//     });
//     window.requestAnimationFrame(updateStars);
// }
v