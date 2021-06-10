class Translation {
    constructor() {
        this.ptBR = [
            { element: '.menu-projects', content: 'Projetos' },
            { element: '.menu-about', content: 'Sobre' },
            { element: '.menu-howto', content: 'Como usar' },
        ];

        this.enUS = [
            { element: '.menu-projects', content: 'Projects' },
            { element: '.menu-about', content: 'About' },
            { element: '.menu-howto', content: 'How to Use' },
        ];

        this.onTranslate = null;

        this.PT_BR = 'pt-BR';
        this.EN_US = 'en-US';
        this.currentLang = this.EN_US;
    }


    add(element, enUS, ptBR) {
        if (!element) {
            console.error('No html element was passed!');
            return;
        }
        if (!enUS) {
            console.warn('No english translation was set for ' + element);
        }
        if (!ptBR) {
            console.warn('No portuguese translation was set for ' + element);
        }

        this.enUS.push({ element, content: enUS });
        this.ptBR.push({ element, content: ptBR });
    }

    translateDocument(language) {
        let textArray;
        if (language === this.PT_BR) {
            textArray = this.ptBR;
            this.currentLang = this.PT_BR
        }
        else if (language === this.EN_US) {
            textArray = this.enUS;
            this.currentLang = this.EN_US
        }
        else {
            console.error('Invalid Language!')
            return;
        }

        let elements;
        for (const txt of textArray) {
            if (txt.element) {
                elements = document.querySelectorAll(txt.element);

                if (elements) {
                    for (let e of elements) {
                        e.innerHTML = txt.content;
                    }
                }
            }
        }

        if (this.onTranslate) {
            this.onTranslate();
        }
    }

    redirect(path, hash, newTab) {
        const prevPath = window.location.origin === "https://avrgroup.github.io" ? '/OrBI/' : '/';

        if (!hash) {
            hash = '';
        }
        const newURL = window.location.origin + prevPath + path + '?lang=' + this.currentLang + hash;
        if (newTab) window.open(newURL, '_blank');
        else window.location.href = newURL;
    }
}

const TRANSLATION = new Translation();


window.addEventListener('load', () => {
    const url = new URLSearchParams(window.location.search);
    const lang = url.get('lang');

    if (lang && lang === 'pt-BR') {
        TRANSLATION.translateDocument(TRANSLATION.PT_BR);
    }
    else {
        TRANSLATION.translateDocument(TRANSLATION.EN_US);
    }
}, { once: true })