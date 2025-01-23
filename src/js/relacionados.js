export class InternaRelacionados extends HTMLElement {
    constructor() {
        super();


        const template = document.createElement('template');


        //pegar index do proj atual
        const url_atual = window.location.href;
        const parts = url_atual.split('projeto=');
        const projetoNum = parts.pop() || parts.pop();

        fetch('portfolio.json').then(resposta =>{
            return resposta.json();
        }).then ((informacoes)=>{

            // pegar lista das indexs do projeto - o projeto atual
            var projNum = [];
            for (let i = 0; i < informacoes.posts.length; i++){
                projNum.push(i);
            }
            projNum = projNum.filter(item => item !== Number.parseInt(projetoNum))
            //console.log(projNum);
            //randomizar lista de index
            const shuffle = (array) => { 
                return array.map((a) => ({ sort: Math.random(), value: a }))
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value); 
            }; 
            const shuffledArr = shuffle(projNum);
            //console.log(shuffledArr);
            //selecionar 2 primeiros projetos da lista
            const relacionado1 = shuffledArr[0];
            const relacionado2 = shuffledArr[1];
            const relacionado3 = shuffledArr[2];
            const relacionado4 = shuffledArr[3];
            //console.log(relacionado1, relacionado2);
            const listaRelacionados = [relacionado1, relacionado2, relacionado3, relacionado4];

            for (let i = 0; i < listaRelacionados.length; i++){
                //console.log(informacoes.posts[listaRelacionados[i]].url);

                template.innerHTML += `
                    <a href="/project.html?name=${informacoes.posts[listaRelacionados[i]].url}&id=${listaRelacionados[i]}" class="animation up">
                        <img src="${informacoes.posts[listaRelacionados[i]].img_thumb}" alt="${informacoes.posts[listaRelacionados[i]].titulo}">
                        <p>${informacoes.posts[listaRelacionados[i]].titulo}</p>
                    </a>
                `;
            }

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
