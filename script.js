/* ========= SMOOTH SCROLL BUTTON ========= */
function scrollToSection(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({behavior:"smooth"});
}

/* ========= CONTACT FORM ========= */
document.querySelector(".contact-form")?.addEventListener("submit",e=>{
  e.preventDefault();
  alert("Pesan berhasil dikirim");
});

/* ========= NAVBAR SHRINK ========= */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll",()=>{
  if(navbar)
    navbar.classList.toggle("shrink",window.scrollY>50);
});

/* ========= SCROLL REVEAL ========= */
function reveal(){
  document.querySelectorAll(".reveal").forEach(el=>{
    const pos = el.getBoundingClientRect().top;
    if(pos < window.innerHeight - 120)
      el.classList.add("active");
  });
}
window.addEventListener("scroll",reveal);
reveal();

/* ========= SCROLL PROGRESS BAR ========= */
window.addEventListener("scroll",()=>{
  const h=document.documentElement;
  const sc= h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
  const bar=document.getElementById("progressBar");
  if(bar) bar.style.width=sc+"%";
});

/* ========= CURSOR GLOW + DYNAMIC GRADIENT ========= */
const glow=document.querySelector(".cursor-glow");
document.addEventListener("mousemove",e=>{
  if(glow){
    glow.style.left=(e.clientX-100)+"px";
    glow.style.top=(e.clientY-100)+"px";
  }

  document.documentElement.style.setProperty("--x",e.clientX+"px");
  document.documentElement.style.setProperty("--y",e.clientY+"px");
});

/* ========= THEME TOGGLE ========= */
document.getElementById("themeToggle")?.addEventListener("click",()=>{
  alert("Mode light dimatikan. Saat ini hanya dark mode yang aktif.");
});

/* ========= 3D TILT CARD ========= */
document.querySelectorAll(".card").forEach(card=>{
  const inner=card.querySelector(".card-inner");
  if(!inner) return;

  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;

    inner.style.transition="transform .1s ease";
    inner.style.transform=
      `rotateY(${x*14}deg) rotateX(${-y*14}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave",()=>{
    inner.style.transition="transform .35s ease";
    inner.style.transform="rotateX(0) rotateY(0) translateY(0)";
  });
});

/* ========= TYPING EFFECT ========= */
const typing=document.getElementById("typing");
if(typing){
  const words=["Imanuel Calvin H"];
  let i=0,j=0,del=false;

  (function type(){
    const w=words[i];
    typing.textContent=w.slice(0,j);

    if(!del && j++===w.length) del=true;
    if(del && j--===0){del=false;i=(i+1)%words.length;}

    setTimeout(type,del?70:130);
  })();
}

/* ========= PARALLAX ========= */
document.addEventListener("mousemove",e=>{

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  const moveX = (e.clientX - cx) * 0.01;
  const moveY = (e.clientY - cy) * 0.01;

  document.querySelectorAll(".parallax").forEach(el=>{
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

});

/* ========= SOFT PAGE EASING ========= */
document.addEventListener("scroll",()=>{
  const y = window.scrollY;
  document.body.style.backgroundPositionY = (y * .02)+"px";
});

/* ========= SKILL MODAL ========= */
const modal = document.getElementById("skillModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".skill").forEach(skill=>{
  skill.addEventListener("click",()=>{
    modalTitle.textContent = skill.querySelector("span").textContent;
    modalDesc.textContent = skill.getAttribute("data-desc");
    modal.style.display = "flex";
  });
});

closeModal?.addEventListener("click",()=>{
  modal.style.display = "none";
});

modal?.addEventListener("click",e=>{
  if(e.target===modal){
    modal.style.display="none";
  }
});

/* ========= SKILL EXPAND ========= */
document.querySelectorAll(".skill").forEach(skill=>{
  skill.addEventListener("click",()=>{

    // tutup skill lain (opsional)
    document.querySelectorAll(".skill").forEach(s=>{
      if(s!==skill) s.classList.remove("active");
    });

    skill.classList.toggle("active");
  });
});

document.querySelectorAll(".skill").forEach(skill=>{
  skill.addEventListener("mouseenter",()=>{
    skill.style.transitionDelay=".05s";
  });
  skill.addEventListener("mouseleave",()=>{
    skill.style.transitionDelay="0s";
  });
});

document.querySelectorAll(".skill").forEach(skill=>{
  skill.addEventListener("click",()=>{
    if(skill.classList.contains("active")){
      skill.style.transform="scale(.995)";
      setTimeout(()=>skill.style.transform="",120);
    }
  });
});

/* ========= CERTIFICATE CAROUSEL ========= */

const track = document.querySelector(".cert-track");
const cards = document.querySelectorAll(".cert-card");
const next = document.querySelector(".cert-btn.next");
const prev = document.querySelector(".cert-btn.prev");
const dotsWrap = document.querySelector(".cert-dots");

let index = 0;

function updateCarousel(){
  track.scrollTo({
    left: cards[index].offsetLeft,
    behavior: "smooth"
  });

  document
    .querySelectorAll(".cert-dots span")
    .forEach((d,i)=> d.classList.toggle("active",i===index));
}

cards.forEach(()=> dotsWrap.innerHTML += `<span></span>`);
updateCarousel();

next?.addEventListener("click",()=>{
  index = (index+1) % cards.length;
  updateCarousel();
});

prev?.addEventListener("click",()=>{
  index = (index-1+cards.length) % cards.length;
  updateCarousel();
});

setInterval(()=>{
  index = (index+1) % cards.length;
  updateCarousel();
},5000);

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", ()=>{
  navMenu.classList.toggle("active");
});

document.querySelectorAll("#navMenu a").forEach(link=>{
  link.addEventListener("click", ()=>{
    navMenu.classList.remove("active");
  });
});
