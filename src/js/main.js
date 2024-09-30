// MENU

const btnMenu = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const menuLinks = document.querySelectorAll('.sidebar .menu ul li a');
const menuBg = document.querySelector('.menu_bg');

btnMenu.addEventListener("click", () => {
    sidebar.classList.toggle('on');
});

menuBg.addEventListener("click", () => {
  sidebar.classList.toggle('on');
});
menuLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
        //e.preventDefault();
        sidebar.classList.toggle('on');
    });
  });


const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 5) {
      current = section.getAttribute("id");
    }
  });

  console.log(current);

  menuLinks.forEach((li) => {
    li.classList.remove("on");
    if (li.classList.contains(current)) {
      li.classList.add("on");
    }
  });
});


// animaçao digitando about

const elements = [
    { el: document.querySelector('span.ast'), delayOn: 0, delayOff: 3000 },
    { el: document.querySelector('span.equal'), delayOn: 2000, delayOff: 4000 },
    { el: document.querySelector('span.plus'), delayOn: 4000, delayOff: 6000 },
    { el: document.querySelector('span.arrow'), delayOn: 6000, delayOff: 8000 },
    { el: document.querySelector('span.colche'), delayOn: 8000, delayOff: 10000 },
];

function toggleClass(element, delayOn, delayOff) {
    setTimeout(() => {
        element.classList.add('on');
    }, delayOn);

    setTimeout(() => {
        element.classList.remove('on');
    }, delayOff);
}

function digitando() {
    elements.forEach(({ el, delayOn, delayOff }) => {
        toggleClass(el, delayOn, delayOff);
    });
}

digitando();
setInterval(digitando, 10000);



// efeito de animaçao

function animationEffect(){
    const animationObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          return;
        }
      });
    }, {
      rootMargin: '150px'
    });

    const animacao = document.querySelectorAll('.animation');
    animacao.forEach((element) => animationObserver.observe(element));
  }

  setTimeout(function() {
    animationEffect();
  }, 700);