class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const prevPath = window.location.origin === "https://avrgroup.github.io" ? '/OrBI/' : '/';

        this.innerHTML = `
    <style>
        .bar1,
        .bar2,
        .bar3 {
            width: 25px;
            height: 3px;
            background-color: #333;
            margin: 3px 0;
            transition: 0.4s;
        }

        .bg {
            background-color: rgba(238, 238, 238, 1)
        }

        /* Rotate first bar */
        .change .bar1 {
            -webkit-transform: translateY(6px) rotate(-45deg);
            transform: translateY(6px) rotate(-45deg);
        }

        /* Fade out the second bar */
        .change .bar2 {
            opacity: 0;
        }

        /* Rotate last bar */
        .change .bar3 {
            -webkit-transform: translateY(-6px) rotate(45deg);
            transform: translateY(-6px) rotate(45deg);
        }

        .selected {
            background-color: lightgray;
        }

        .flag {
            width: 1.75em;
        }

        .nav-lang-option {
            display: inline-block;
            text-align: center;
            width: 47.5%;
            padding: 0.25em;
            text-decoration: none;
        }

        #navFlag {
            width: 5em;
            text-align: center;
            --margin-right: 0.5em;
        }

        #navFlag::before {
            position: relative;
            content: "";
            top: 0.75em;
            right: var(--margin-right);
            border: 6px solid transparent;
            border-color: #000 transparent transparent transparent;
        }

        #navFlag.active:before {
            border-color: transparent transparent #000 transparent;
            top: -0.75em;
        }

        #lang-options {
            position: absolute;
            right: 20em;
            width: 12em;
            background-color: white;
        }

        #lang-options a {
            display: block;
            text-align: center;
            text-decoration: none;
            padding: 5px;
        }
    </style>

    <div class="w3-top">
        <div id="wrapper" class="w3-bar w3-wide ">
            <!-- Float links to the right. Hide them on small screens -->
            <div id="nav" class="w3-right w3-hide-small w3-hide-medium">
                <a id="navFlag" href="javascript:void(0);" onclick="toggleNavFlag()"
                    class="w3-bar-item w3-button ">
                    <img id="select-flag" class="flag" src="${prevPath}img/flags/us-icon.png">
                </a>

                <a href="javascript: TRANSLATION.redirect('', '#about')" class="w3-bar-item w3-button menu-about">About</a>
                <a href="javascript: TRANSLATION.redirect('', '#projects')" class="w3-bar-item w3-button menu-projects">Projects</a>
                <a href="javascript: TRANSLATION.redirect('', '#howto')" class="w3-bar-item w3-button menu-howto">How to Use</a>
            </div>

            <!-- Burger Menu-->
            <a class=" menu-icon w3-bar-item w3-hide-large w3-right" href="javascript:void(0);"
                onclick="toggleFunction()" title="Toggle Navigation Menu">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </a>

            <!-- Navbar on small screens -->
            <div id="navSmall" class="w3-bar-block w3-hide w3-hide-large w3-padding w3-border-bottom">
                <a href="javascript: TRANSLATION.redirect('', '#about')" class="w3-bar-item w3-button menu-about" onclick="toggleFunction()">About</a>
                <a href="javascript: TRANSLATION.redirect('', '#projects')" class="w3-bar-item w3-button menu-projects" onclick="toggleFunction()">Projects</a>
                <a href="javascript: TRANSLATION.redirect('', '#howto')" class="w3-bar-item w3-button menu-howto" onclick="toggleFunction()">How to Use</a>

                <!-- Languages sub-section -->
                <a href="javascript:void(0)" class="w3-bar-item "></a>
                <a href="javascript:void(0)" class="nav-lang-option us-option selected"
                    onclick="changeSelectedLanguage('en-US');">
                    <img class="flag" src="${prevPath}img/flags/us-icon.png">
                </a>
                <a href="javascript:void(0)" class="nav-lang-option pt-option"
                    onclick="changeSelectedLanguage('pt-BR');">
                    <img class="flag" src="${prevPath}img/flags/br-icon.png">
                </a>
            </div>
        </div>

        <div id="lang-options" class="w3-hide w3-hide-medium w3-hide-small w3-card">
            <a href="javascript:void(0)" onclick="changeSelectedLanguage('en-US');"
                class="us-option selected">
                <img class="flag" src="${prevPath}img/flags/us-icon.png"/>
                English
            </a>
            <a href="javascript:void(0)" onclick="changeSelectedLanguage('pt-BR');"
                class="pt-option">
                <img class="flag" src="${prevPath}img/flags/br-icon.png"/>
                Portuguese
            </a>
        </div>
    </div>
      `;
    }
}

function toggleFunction() {
    const navSmall = document.getElementById("navSmall");
    const wrapper = document.getElementById("navSmall")
    const icon = document.querySelector('.menu-icon');

    icon.classList.toggle('change');

    navSmall.classList.toggle('w3-show');

    wrapper.classList.toggle('bg');
}

function toggleNavFlag() {
    document.querySelector('#navFlag').classList.toggle('active');
    document.querySelector('#lang-options').classList.toggle('w3-show');
}

function changeSelectedLanguage(lang) {
    const flag = document.querySelector('#navFlag');
    const prevPath = window.location.origin === "https://avrgroup.github.io" ? '/vrtools/' : '/';

    const pt = document.querySelectorAll('.pt-option');
    const us = document.querySelectorAll('.us-option');

    if (lang === 'pt-BR') {
        TRANSLATION.translateDocument(TRANSLATION.PT_BR)
        document.querySelector('#select-flag').src = `${prevPath}img/flags/br-icon.png`;

        pt.forEach(e => { e.classList.add('selected'); });
        us.forEach(e => { e.classList.remove('selected'); });
    }
    else if (lang === 'en-US') {
        TRANSLATION.translateDocument(TRANSLATION.EN_US);
        document.querySelector('#select-flag').src = `${prevPath}img/flags/us-icon.png`;

        pt.forEach(e => { e.classList.remove('selected'); });
        us.forEach(e => { e.classList.add('selected'); });
    }

    if (window.history.pushState) {
        const newURL = window.location.origin + window.location.pathname + '?lang=' + TRANSLATION.currentLang + window.location.hash;
        window.history.pushState({ path: newURL }, '', newURL)
    }

    flag.classList.remove('active');
    document.querySelector('#lang-options').classList.remove('w3-show');
}

// Change style of navbar on scroll
window.onscroll = navbarScroll

function navbarScroll() {
    var navbar = document.getElementById("wrapper");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.classList.add('w3-white', 'w3-animate-top', 'w3-card')
    } else {
        navbar.classList.remove('w3-white', 'w3-animate-top', 'w3-card')
    }
}

window.onload = function () {
    const url = new URLSearchParams(window.location.search);
    const lang = url.get('lang');

    if (lang && lang === 'pt-BR') {
        changeSelectedLanguage('pt-BR')
    }
    else {
        changeSelectedLanguage('en-US')
    }
}

customElements.define('navbar-component', Navbar);