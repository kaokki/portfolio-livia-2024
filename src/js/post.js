export class PostSection extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        fetch('portfolio.json').then(resposta =>{
            return resposta.json();
        }).then ((informacoes)=>{
            //console.log(informacoes.posts);
            //this.innerHTML = '';

            const listaPosts = document.createElement('div');

            for (let i = 0; i < informacoes.posts.length; i++) {

                listaPosts.innerHTML += `
                    <a href="/work.html?name=${informacoes.posts[i].url}&id=${i}" class="animation up">
                        <img src="${informacoes.posts[i].img_thumb}" alt="${informacoes.posts[i].titulo}" />
                        <p>${informacoes.posts[i].titulo}</p>
                    </a>
                `;
            }

            template.innerHTML += `
            <div class="container">
                <h3 class="animation up">Take a look at what I've been working on.</h3> 
                <div class="wrapper-projects">
                ${listaPosts.innerHTML}
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
    }, {
      rootMargin: '150px'
    });

    // Get multiple elements instead of a single one using "querySelectorAll"
    const animacao = document.querySelectorAll('.animation');

    // Loop over the elements and add each one to the observer
    animacao.forEach((element) => animationObserver.observe(element));

  }

    setTimeout(function() {
      animationEffect();
    }, 700);
    
}


}