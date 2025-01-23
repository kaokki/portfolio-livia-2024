export class SideBar extends HTMLElement {
    constructor() {
        super();

        let template = document.createElement('template');
        template.innerHTML = `
        <a href="/" class="logo">Livia Meserlian</a>
        <button class="menu-btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav class="menu">
            <ul>
                <li><a class="about on" href="/#about">About</a></li>
                <li><a class="skills" href="/#skills">Skills</a></li>
                <li><a class="projects" href="/#projects">Projects</a></li>
                <li><a class="contact" href="/#contact">Contact</a></li>
            </ul>
        </nav>
        <div class="sidebar__contact">
            <p>livia@yakistudio.com</p>
            <p>+55 11 986899402</p>
            <div class="social">
                <a href="#" class="mail">Mail</a>
                <a href="#" class="linkedin">Linkedin</a>
                <a href="#" class="git">Github</a>
            </div>
        </div>
        <div class="menu_bg"></div>
        `;

        //const shadowRoot = this.attachShadow({ mode: "open" });
        this.appendChild(template.content.cloneNode(true));
}

connectedCallback(){

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


    const sections = document.querySelectorAll(".section");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 5) {
            current = section.getAttribute("id");
            }
        });

        //console.log(current);

        menuLinks.forEach((li) => {
            li.classList.remove("on");
            if (li.classList.contains(current)) {
            li.classList.add("on");
            } else {
            li.classList.remove("on");
            }
        });
    });


}


}
