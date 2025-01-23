export class SkillsSection extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        fetch('portfolio.json').then(resposta =>{
            return resposta.json();
        }).then ((informacoes)=>{

            const listaSkill = document.createElement('ul');

            for (let i = 0; i < informacoes.skills.list.length; i++){
                listaSkill.innerHTML += `
                <li>
                     ${informacoes.skills.list[i]}
                </li>
                `;
            }

            const listaExp = document.createElement('ul');

            for (let i = 0; i < informacoes.skills.experience.length; i++){
              listaExp.innerHTML += `
                <li>
                  <p>${informacoes.skills.experience[i].position}</p>
                  <span>${informacoes.skills.experience[i].employer}</span>
                </li>
                `;
            }

            template.innerHTML += `
            <div class="container">
                <div class="text">
                    <h2 class="animation up">${informacoes.skills.detalhes.titulo}</h2>
                    <p class="animation up">${informacoes.skills.detalhes.texto}</p>
                    <div class="skill-list animation up">
                      <h3>My skills</h3>
                      <ul>
                        ${listaSkill.innerHTML}
                      </ul>
                    </div>
                </div>
                <div class="experience animation up">
                    <h3>Experience</h3>
                    <ul>
                      ${listaExp.innerHTML}
                    </ul>
                </div>
            </div>
                `;

                this.appendChild(template.content.cloneNode(true));    
        })
}


connectedCallback(){


  // efeito de animaçao

  function animationEffect(){
    // Create the observer like the examples above
    const animationObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          return;
        }
      });
    });

    // Get multiple elements instead of a single one using "querySelectorAll"
    const animacao = document.querySelectorAll('.animation');

    // Loop over the elements and add each one to the observer
    animacao.forEach((element) => animationObserver.observe(element));

  }

  setTimeout(function() {
      animationEffect();
    }, 500);

    
}

}