// ===========================
// Loader
// ===========================

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 1500);
});


// ===========================
// Fade Animation
// ===========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(".card,.ganpati,.content,.invite")
.forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});


// ===========================
// Button Ripple Effect
// ===========================

document.querySelectorAll(".btn,.map-btn").forEach(button=>{

button.addEventListener("click",function(e){

const x=e.clientX-this.offsetLeft;
const y=e.clientY-this.offsetTop;

const ripple=document.createElement("span");

ripple.classList.add("ripple");

ripple.style.left=x+"px";
ripple.style.top=y+"px";

this.appendChild(ripple);

setTimeout(()=>{
ripple.remove();
},600);

});

});


// ===========================
// Floating Sparkles
// ===========================

function createSparkle(){

const sparkle=document.createElement("div");

sparkle.className="sparkle";

sparkle.style.left=Math.random()*window.innerWidth+"px";

sparkle.style.animationDuration=
Math.random()*3+3+"s";

sparkle.style.opacity=Math.random();

sparkle.style.width=
sparkle.style.height=
Math.random()*8+4+"px";

document.body.appendChild(sparkle);

setTimeout(()=>{

sparkle.remove();

},6000);

}

setInterval(createSparkle,350);


// ===========================
// Scroll Progress
// ===========================

const progress=document.createElement("div");

progress.className="progress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const total=
document.documentElement.scrollHeight-window.innerHeight;

const percent=
(window.scrollY/total)*100;

progress.style.width=percent+"%";

});


// ===========================
// Hero Zoom Effect
// ===========================

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero");

const value=window.scrollY*0.0004;

hero.style.transform=`scale(${1+value})`;

});


// ===========================
// Floating Ganpati
// ===========================

const img=document.querySelector(".ganpati img");

if(img){

setInterval(()=>{

img.animate([
{transform:"translateY(0px)"},
{transform:"translateY(-15px)"},
{transform:"translateY(0px)"}
],{

duration:3000,
iterations:1

});

},3000);

}


// ===========================
// Shine Effect
// ===========================

document.querySelectorAll(".btn").forEach(btn=>{

setInterval(()=>{

btn.classList.add("shine");

setTimeout(()=>{

btn.classList.remove("shine");

},1000);

},4000);

});


// ===========================
// Welcome Animation
// ===========================

setTimeout(()=>{

document.querySelector(".content h1").animate([

{
letterSpacing:"0px",
opacity:0
},

{
letterSpacing:"4px",
opacity:1
}

],{

duration:1500,
fill:"forwards"

});

},1700);


// ===========================
// Console Message
// ===========================

console.log(
"%c Ganpati Bappa Morya 🙏",
"color:#d4af37;font-size:24px;font-weight:bold;"
);