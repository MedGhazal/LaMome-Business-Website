const name = document.querySelector('input[name=name]');
const tel = document.querySelector('input[type=tel]');
const email = document.querySelector('input[type=email]');
const message = document.querySelector('textarea');

const data = {
	"french": { 'name': 'Nom', 'email': 'E-Mail', 'message': 'Message', 'tel': 'Téléphone' },
	"english": { 'name': 'Name', 'email': 'E-Mail', 'message': 'Message', 'tel': 'Phone number' },
	"arabic": { 'name': 'الاسم', 'email': 'بريد الالكتروني', 'message': 'رسالة', 'tel': 'رقم الهاتف' },
}

name.placeholder = data['french']['name'];
tel.placeholder = data['french']['tel'];
email.placeholder = data['french']['email'];
message.placeholder = data['french']['message'];

function onClickHandeler() {
	for (const link of document.querySelectorAll(".language-link, .language-link-small")) {
		link.addEventListener("click", function(event) {
			document.querySelectorAll(".language-link, .language-link-small")
				.forEach(el => document.querySelectorAll(
					`.${el.getAttribute('href').substring(1)}, .${el.getAttribute('href').substring(1)}-block`)
					.forEach(
						el => el.style.display = 'none'
					)
				);
			document.querySelectorAll(`.${event.currentTarget.getAttribute('href').substring(1)}`)
				.forEach(
					el => el.style.display = 'inline-block'
			);
			document.querySelectorAll(`.${event.currentTarget.getAttribute('href').substring(1)}-block`)
				.forEach(
					el => el.style.display = 'block'
			);
			if (`${event.currentTarget.getAttribute('href').substring(1)}` === 'fr-content') {
				name.placeholder = data['french']['name'];
				tel.placeholder = data['french']['tel'];
				email.placeholder = data['french']['email'];
				message.placeholder = data['french']['message'];
			}
			else if (`${event.currentTarget.getAttribute('href').substring(1)}`=== 'ar-content') {
				name.placeholder = data['arabic']['name'];
				tel.placeholder = data['arabic']['tel'];
				email.placeholder = data['arabic']['email'];
				message.placeholder = data['arabic']['message'];
			}
			else if (`${event.currentTarget.getAttribute('href').substring(1)}` === 'eng-content') {
				name.placeholder = data['english']['name'];
				tel.placeholder = data['english']['tel'];
				email.placeholder = data['english']['email'];
				message.placeholder = data['english']['message'];
			}
			document.querySelectorAll(".language-link-small").forEach(el => el.classList.remove("active"));
			link.classList.add('active');
		});
	}
}

document.querySelector(".fr-content").style.display = "inline"

onClickHandeler();
var slideIndex = 1;
var slideIndexCollaborators = 1;

showSlidesCollaborators(slideIndexCollaborators);
showSlides(slideIndex)
toggelMenu();

function plusSlides(n) { showSlides(slideIndex += n); }

function currentSlide(n) { showSlides(slideIndex = n); }

function plusSlidesCollaborators(n) { showSlidesCollaborators(slideIndexCollaborators += n); }

function currentSlideCollaborators(n) { showSlidesCollaborators(slideIndexCollaborators = n); }

function showSlides(n) {
	var slides = document.querySelectorAll(".showcase-text");
	if (slides.length != 0) {
		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		if (document.querySelector(".fr-content").style.display === "block") {
			slides = document.querySelectorAll(".showcase-text.fr");
		}
		else if (document.querySelector(".eng-content").style.display === "block") {
			slides = document.querySelectorAll(".showcase-text.eng");
		}
		var dots = document.getElementsByClassName("dot");
		if (n > slides.length) { slideIndex = 1; }
		if (n < 1) { slideIndex = slides.length }
		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[slideIndex-1].style.display = "grid";
		dots[slideIndex-1].className += " active";
	}
}

function showSlidesCollaborators(n) {
	var slides = document.querySelectorAll(".collaborator");
	if (slides.length!=0) {
		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		if (n > slides.length) { slideIndexCollaborators = 1; }
		if (n < 1) { slideIndexCollaborators = slides.length }
		for (var i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slides[slideIndexCollaborators-1].style.display = "grid";
	}
}
const menuItems = document.querySelectorAll('.side-nav-panel');
function toggelMenu() {
	hamburgerMenu = document.querySelector('.hamburger-menu')

	hamburgerMenu.addEventListener("click", function(event) {

		if (document.querySelector(".side-nav-panel").style.display === 'grid') {
			document.querySelector(".side-nav-panel").style.display = 'none';
		} else {
			document.querySelector(".side-nav-panel").style.display = 'grid';
		}


	});
}
