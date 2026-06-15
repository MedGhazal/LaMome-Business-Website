/* =================================================================
   LA MOME Business — app.js
   Language switching via a single data-attribute on #content.
   No inline display styles: CSS owns all presentation.
   ================================================================= */

'use strict';

/* ---- Contact-form placeholders per language ---- */
var PLACEHOLDERS = {
    'fr-content':  { name: 'Nom',    tel: 'Téléphone',     email: 'E-Mail',                message: 'Message' },
    'eng-content': { name: 'Name',   tel: 'Phone number',  email: 'E-Mail',                message: 'Message' },
    'ar-content':  { name: 'الاسم',  tel: 'رقم الهاتف',    email: 'بريد الالكتروني',       message: 'رسالة'   }
};

/* Map the content class to the short token used in the data-attribute. */
var LANG_TOKEN = { 'fr-content': 'fr', 'eng-content': 'en', 'ar-content': 'ar' };

/* ---- Core: switch language by setting one attribute ---- */
function setLanguage(languageTag) {
    if (!LANG_TOKEN[languageTag]) { languageTag = 'fr-content'; }

    var content = document.getElementById('content');
    var token = LANG_TOKEN[languageTag];

    // One attribute drives all show/hide via CSS.
    content.dataset.lang = token;
    content.setAttribute('dir', token === 'ar' ? 'rtl' : 'ltr');
    content.setAttribute('lang', token === 'en' ? 'en' : token);

    // Form placeholders.
    var p = PLACEHOLDERS[languageTag];
    var name = document.querySelector('input[name=name]');
    var tel = document.querySelector('input[type=tel]');
    var email = document.querySelector('input[type=email]');
    var message = document.querySelector('textarea');
    if (name)    { name.placeholder = p.name; }
    if (tel)     { tel.placeholder = p.tel; }
    if (email)   { email.placeholder = p.email; }
    if (message) { message.placeholder = p.message; }

    // Keep deep links carrying the language hash.
    document.querySelectorAll('.add-language-suffix').forEach(function (el) {
        el.href = el.href.split('#')[0] + '#' + languageTag;
    });

    // Reflect active state on the language switchers.
    document.querySelectorAll('.language-link-small, .language-link').forEach(function (el) {
        el.classList.toggle('active', el.getAttribute('href') === '#' + languageTag);
    });

    // Re-sync the showcase slider to the active language.
    showSlides(slideIndex);
}

/* ---- Read the active language token from the attribute ---- */
function currentLang() {
    var content = document.getElementById('content');
    return (content && content.dataset.lang) ? content.dataset.lang : 'fr';
}

/* ---- Initialise from URL hash (supports deep links) ---- */
function initializePage() {
    var hash = window.location.hash.replace('#', '');
    if (hash === 'fr-content' || hash === 'eng-content' || hash === 'ar-content') {
        setLanguage(hash);
    } else {
        setLanguage('fr-content');
    }
    initServiceModals();
    initOwnerModal();
}

/* ---- Language switcher click handlers ---- */
function bindLanguageLinks() {
    document.querySelectorAll('.language-link, .language-link-small').forEach(function (link) {
        link.addEventListener('click', function (event) {
            setLanguage(event.currentTarget.getAttribute('href').substring(1));
        });
    });
}

/* =================================================================
   Showcase slider
   ================================================================= */
var slideIndex = 1;
var slideIndexCollaborators = 1;

function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }
function plusSlidesCollaborators(n) { showSlidesCollaborators(slideIndexCollaborators += n); }
function currentSlideCollaborators(n) { showSlidesCollaborators(slideIndexCollaborators = n); }

function showSlides(n) {
    var slides = document.querySelectorAll('.showcase-text');
    var dots = document.getElementsByClassName('dot');
    if (slides.length === 0) { return; }

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('is-active');
        if (dots[i]) { dots[i].className = dots[i].className.replace(' active', ''); }
    }
    slides[slideIndex - 1].classList.add('is-active');
    if (dots[slideIndex - 1]) { dots[slideIndex - 1].className += ' active'; }
}

function showSlidesCollaborators(n) {
    var slides = document.querySelectorAll('.collaborator');
    if (slides.length === 0) { return; }

    if (n > slides.length) { slideIndexCollaborators = 1; }
    if (n < 1) { slideIndexCollaborators = slides.length; }

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('is-active');
    }
    slides[slideIndexCollaborators - 1].classList.add('is-active');
}

/* =================================================================
   Mobile menu toggle
   ================================================================= */
function toggleMenu() {
    var hamburger = document.getElementById('hamburger');
    if (!hamburger) { return; }
    hamburger.addEventListener('click', function () {
        var logo = document.getElementById('lamome-business-logo');
        var sideNav = document.getElementById('side-nav-panel');
        var sideLang = document.getElementById('side-language-nav');
        if (logo)    { logo.classList.toggle('is-hidden'); }
        if (sideNav) { sideNav.classList.toggle('is-open'); }
        if (sideLang){ sideLang.classList.toggle('is-open'); }
    });
}

/* =================================================================
   Shared modal — one open/close path. Services and the owner bio both use it.
   ================================================================= */
var Modal = (function () {
    var modal, iconSlot, titleSlot, bodySlot, dialog, closeBtn, lastFocused;

    function cache() {
        if (modal) { return true; }
        modal = document.getElementById('modal');
        if (!modal) { return false; }
        iconSlot  = modal.querySelector('.modal-icon');
        titleSlot = modal.querySelector('.modal-title');
        bodySlot  = modal.querySelector('.modal-body');
        dialog    = modal.querySelector('.modal-dialog');
        closeBtn  = modal.querySelector('.modal-close');

        modal.querySelectorAll('[data-close]').forEach(function (el) {
            el.addEventListener('click', close);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('open')) { close(); }
        });
        return true;
    }

    /* opts: { iconHTML, title, bodyHTML?, bodyText?, rtl } */
    function open(opts) {
        if (!cache()) { return; }
        iconSlot.innerHTML = opts.iconHTML || '';
        titleSlot.textContent = opts.title || '';
        if (typeof opts.bodyHTML === 'string') {
            bodySlot.innerHTML = opts.bodyHTML;
        } else {
            bodySlot.textContent = opts.bodyText || '';
        }
        dialog.setAttribute('dir', opts.rtl ? 'rtl' : 'ltr');

        lastFocused = document.activeElement;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function close() {
        if (!modal) { return; }
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocused && typeof lastFocused.focus === 'function') { lastFocused.focus(); }
    }

    return { open: open, close: close, cache: cache };
})();

var TOKEN_TO_CLASS = { 'fr': 'fr-content', 'en': 'eng-content', 'ar': 'ar-content' };

/* ---- Service cards → modal (plain text) ---- */
function initServiceModals() {
    if (!Modal.cache()) { return; }

    document.querySelectorAll('.service-element').forEach(function (card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        function openCard() {
            var cls = TOKEN_TO_CLASS[currentLang()] || 'fr-content';
            var icon = card.querySelector('i');
            var title = card.querySelector('h3.' + cls);
            var body = card.querySelector('p.' + cls);
            Modal.open({
                iconHTML: icon ? '<i class="' + icon.className + '"></i>' : '',
                title: title ? title.textContent : '',
                bodyText: body ? body.textContent : '',
                rtl: cls === 'ar-content'
            });
        }

        card.addEventListener('click', openCard);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCard(); }
        });
    });
}

/* ---- Owner bio → modal (innerHTML to keep <br><br> breaks) ---- */
function initOwnerModal() {
    var section = document.getElementById('owner');
    if (!section || !Modal.cache()) { return; }

    var trigger = section.querySelector('.owner-readmore');
    if (!trigger) { return; }

    trigger.addEventListener('click', function () {
        var cls = TOKEN_TO_CLASS[currentLang()] || 'fr-content';
        var name = section.querySelector('h2.' + cls) || section.querySelector('h2.fr-content');
        var bio = section.querySelector('.presentation-text p.' + cls);
        Modal.open({
            iconHTML: '',
            title: name ? name.textContent : '',
            bodyHTML: bio ? bio.innerHTML : '',
            rtl: cls === 'ar-content'
        });
    });
}

/* =================================================================
   Loader → reveal content
   ================================================================= */
function initialLoad() {
    var loader = document.getElementById('loader-container');
    var bar = document.getElementById('loader-bar');
    if (bar) {
        bar.style.transition = 'width 0.8s cubic-bezier(0.4,0,0.2,1)';
        bar.style.width = '75%';
    }
    if (loader) {
        setTimeout(showPage, 900);
    } else {
        showPage();
    }
}

function showPage() {
    var loader = document.getElementById('loader-container');
    var content = document.getElementById('content');
    var bar = document.getElementById('loader-bar');

    if (bar) { bar.style.width = '100%'; }

    if (loader) {
        loader.style.transition = 'opacity 0.4s ease';
        loader.style.opacity = '0';
        setTimeout(function () { loader.style.display = 'none'; }, 400);
    }
    if (content) { content.classList.add('is-visible'); }

    initializePage();
}

/* =================================================================
   Boot
   ================================================================= */
bindLanguageLinks();
toggleMenu();
showSlidesCollaborators(slideIndexCollaborators);
