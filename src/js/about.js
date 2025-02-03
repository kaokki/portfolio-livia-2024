export class AboutSection extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        fetch('portfolio.json').then(resposta =>{
            return resposta.json();
        }).then ((informacoes)=>{

            template.innerHTML += `
            <div class="container">
                <div class="type">
                    <span class="ast"><i></i></span>
                    <span class="equal"><i></i></span>
                    <span class="plus"><i></i></span>
                    <span class="arrow"><i></i></span>
                    <span class="colche"><i></i></span>
                    <span class="type-ico"></span>
                </div>
                <h1>${informacoes.about.descricao.titulo}</h1>
                <p>${informacoes.about.descricao.texto}</p>
                <a target="_blank" href="${informacoes.about.resume}">View resume</a>
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

    // animaçao digitando about

    setTimeout(function() {

      animationEffect()

      const elements = [
        { el: document.querySelector('span.ast'), delayOn: 0, delayOff: 3000 },
        { el: document.querySelector('span.equal'), delayOn: 2000, delayOff: 4000 },
        { el: document.querySelector('span.plus'), delayOn: 4000, delayOff: 6000 },
        { el: document.querySelector('span.arrow'), delayOn: 6000, delayOff: 8000 },
        { el: document.querySelector('span.colche'), delayOn: 8000, delayOff: 10000 },
      ];
      
      function toggleClass(el, delayOn, delayOff) {
          setTimeout(() => {
              el.classList.add('on');
          }, delayOn);
      
          setTimeout(() => {
              el.classList.remove('on');
          }, delayOff);
      }
      
      function digitando() {
          elements.forEach(({ el, delayOn, delayOff }) => {
              toggleClass(el, delayOn, delayOff);
          });
      }
      
      digitando();
      setInterval(digitando, 10000);
    }, 500);

  
    
}

}