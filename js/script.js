// Image Slider

let images=[
"images/tajmahal.jpg",
"images/goa.jpg",
"images/kerala.jpg",
"images/ladakh.jpg"
];

let i=0;

setInterval(function(){

let slide=document.getElementById("slide");

if(slide){

i++;

if(i>=images.length)
i=0;

slide.src=images[i];

}

},3000);


// Responsive Navbar

const menu=document.querySelector(".menu");

const nav=document.querySelector(".nav-links");

if(menu){

menu.onclick=function(){

nav.classList.toggle("active");

}

}


// Search

function searchPlace(){

let place=document.getElementById("search").value.toLowerCase();

if(place=="taj mahal")
location.href="gallery.html";

else if(place=="goa")
location.href="gallery.html";

else if(place=="kerala")
location.href="gallery.html";

else if(place=="ladakh")
location.href="gallery.html";

else

alert("Destination not found");

}


// Contact Form Validation

const form=document.getElementById("contactForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

let name=document.getElementById("name").value.trim();

let email=document.getElementById("email").value.trim();

let message=document.getElementById("message").value.trim();

if(name==""||email==""||message==""){

alert("Please fill all fields");

return;

}

const user={

name:name,
email:email,
message:message

};

localStorage.setItem("Contact",JSON.stringify(user));

alert("Form Submitted Successfully!");

form.reset();

});

}