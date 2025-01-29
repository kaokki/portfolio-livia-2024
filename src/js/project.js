export class InternaProjeto extends HTMLElement {
    constructor() {
        super();

        // pegando o numero do projeto
        const url_atual = window.location.href;
        const parts = url_atual.split('id=');
        const projetoNum = parts.pop() || parts.pop();

        const template = document.createElement('template');

        fetch('portfolio.json').then(resposta =>{
            return resposta.json();
        }).then ((informacoes)=>{

            const ProjInfos = informacoes.posts[projetoNum];

            //listas skills

            const listaSkill = document.createElement('ul');

            for (let i = 0; i < ProjInfos.details.length; i++){
                listaSkill.innerHTML += `
                <li>
                     ${ProjInfos.details[i]}
                </li>
                `;
            }


            //listas descrições fim

            
            
            //galeria


            const divGaleria = document.createElement('div');
            const imgDiv = document.createElement('div');
            const img2Div = document.createElement('div');
            const textDiv = document.createElement('div');
            const videoDiv = document.createElement('div');
            const videoDiv2 = document.createElement('div');
            let classCol = '';

            for (let i = 0; i < ProjInfos.galeria.length; i++){
                //se tiver 2 colunas
                ProjInfos.galeria[i].img2 || ProjInfos.galeria[i].video2 ? classCol = 'flex' : classCol = '';

                if(ProjInfos.galeria[i].img) {
                    imgDiv.innerHTML = `
                        <img src="" data-image="${ProjInfos.galeria[i].img}" alt="${ProjInfos.titulo}">
                        `;
                } else {
                    imgDiv.innerHTML = '';
                }

                if(ProjInfos.galeria[i].img2) {
                    img2Div.innerHTML = `
                        <img src="" data-image="${ProjInfos.galeria[i].img2}" alt="${ProjInfos.titulo}">
                        `;
                } else {
                    img2Div.innerHTML = '';
                }

                if(ProjInfos.galeria[i].video) {

                    videoDiv.innerHTML = `
                        <div class="video ${ProjInfos.galeria[i].props[0].class}" style="--bg-color: ${ProjInfos.galeria[i].props[0].bgcolor};">
                            <video width="100%" autoplay muted loop>
                                <source src="${ProjInfos.galeria[i].video}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div
                        `;
                } else {
                    videoDiv.innerHTML = '';
                }

                if(ProjInfos.galeria[i].video2) {
                    videoDiv2.innerHTML = `
                        <div class="video ${ProjInfos.galeria[i].props[1].class}" style="--bg-color: ${ProjInfos.galeria[i].props[1].bgcolor};">
                            <video width="100%" autoplay muted loop>
                                <source src="${ProjInfos.galeria[i].video2}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div
                        `;
                } else {
                    videoDiv2.innerHTML = '';
                }

                //se tiver texto
                if(ProjInfos.galeria[i].desc) {

                    const galeriaDescTitle = document.createElement('div');
                    const galeriaDescText = document.createElement('div');

                    if(ProjInfos.galeria[i].desc.title){
                        galeriaDescTitle.innerHTML = `
                        <h4>${ProjInfos.galeria[i].desc.title}</h4>
                        `;
                    }
                    if(ProjInfos.galeria[i].desc.text){
                        galeriaDescText.innerHTML = `
                        <p>${ProjInfos.galeria[i].desc.text}</p>
                        `;
                    }
                    textDiv.innerHTML = `
                        <div class="desc">
                            ${galeriaDescTitle.innerHTML}
                            ${galeriaDescText.innerHTML}
                        </div>
                        `;
                } else {
                    textDiv.innerHTML = '';
                }

                divGaleria.innerHTML += `
                <div class="loading"></div>
                <div>
                    ${textDiv.innerHTML}
                    <div class="${classCol}">
                        ${imgDiv.innerHTML}
                        ${img2Div.innerHTML}
                        ${videoDiv.innerHTML}
                        ${videoDiv2.innerHTML}
                    </div>
                </div>
                `;
            }



            //galeria fim

            //botoes
            const siteLink = document.createElement('div');
            const gitLink = document.createElement('div');
            const botoesDiv = document.createElement('div');

            if(ProjInfos.links) {
                if(ProjInfos.links.website){
                    siteLink.innerHTML = `
                    <a href="${ProjInfos.links.website}" class="site"><span>Go to website</span></a>
                    `;
                }
                if(ProjInfos.links.github){
                    gitLink.innerHTML = `
                    <a href="${ProjInfos.links.github}" class="git"><span>Go to Github</span></a>
                    `;
                }
                botoesDiv.innerHTML=`
                    <div class="btns">
                        ${siteLink.innerHTML}    
                        ${gitLink.innerHTML}
                    </div>
                `
            }

            //botoes fim

            document.title = `Livia Meserlian Porftolio - ${ProjInfos.titulo}`;

            template.innerHTML += `
            <div class="container">
                <h2>${ProjInfos.titulo}</h2>
                <div class="detail">
                    <div class="text">
                        <h3>Overview & Responsibilities</h2>
                        <p>${ProjInfos.descricao_interna}</p>
                        ${botoesDiv.innerHTML}
                    </div>
                    <div class="skill-list">
                        <div>
                            <h3>Date</h3>
                            <p>${ProjInfos.Date}</p>
                        </div>
                        <div>
                            <h3>Skills</h3>
                            <ul>
                            ${listaSkill.innerHTML}
                            </ul>
                        </div>
                        
                    </div>
                </div>

                <div class="gallery">
                    ${divGaleria.innerHTML}
                </div>
            </div>
                `;

                this.appendChild(template.content.cloneNode(true));    
        })
}

connectedCallback(){

    setTimeout(function() {

        
      // loading imgs
      const galleryObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.src = entry.target.getAttribute('data-image');
            const loading = entry.target.parentElement.parentElement.previousElementSibling;
            entry.target.addEventListener('load', function() {
              loading.style.display = 'none';
            });
            return;
          }
        });
      });
  
      const galleryImgs = document.querySelectorAll('.gallery img');
      galleryImgs.forEach((element) => galleryObserver.observe(element));


      //loading videos
      const galleryVideoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.parentElement.classList.add('show');
  
            const loading = entry.target.parentElement.parentElement.parentElement.previousElementSibling;
            loading.style.display = 'none';
            return;
          }
        });
      });
  
      const galleryVideos = document.querySelectorAll('.gallery video');
      galleryVideos.forEach((element) => galleryVideoObserver.observe(element));

      }, 500);
    
}

}