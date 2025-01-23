import { SideBar } from "/src/js/sidebar.js";
import { AboutSection } from "/src/js/about.js";
import { SkillsSection } from "/src/js/skills.js";
import { PostSection } from "/src/js/post.js";
import { InternaProjeto } from "/src/js/project.js";
import { InternaRelacionados } from "/src/js/relacionados.js";

customElements.define('side-bar', SideBar);
customElements.define('about-section', AboutSection);
customElements.define('skills-section', SkillsSection);
customElements.define('post-section', PostSection);
customElements.define('project-page', InternaProjeto);
customElements.define('projeto-relacionado', InternaRelacionados);







// efeito de animaçao

// function animationEffect(){
//     const animationObserver = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('on');
//           return;
//         }
//       });
//     }, {
//       rootMargin: '150px'
//     });

//     const animacao = document.querySelectorAll('.animation');
//     animacao.forEach((element) => animationObserver.observe(element));
//   }

//   setTimeout(function() {
//     animationEffect();
//   }, 700);


  //carregar js das paginas

const url_atual = window.location.href;
const parts_url = url_atual.split('/');
const url_path = parts_url.pop() || parts_url.pop();

if(url_path.includes('work')){    

  //retirar o on do menu
  const menuLinks = document.querySelectorAll('.sidebar .menu ul li a');
  menuLinks.forEach((li) => {
    li.classList.remove("on");
  });

} else {
    // FOLLOWING MOUSE

    const move = document.getElementById("move");

    document.body.onpointermove = event => {
        const { clientX, clientY } = event;

        move.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        
        }, {duration: 1000, fill: "forwards"})
    }

}