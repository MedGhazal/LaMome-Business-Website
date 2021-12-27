function onClickHandeler() {


	for (const link of document.querySelectorAll(".navlanguages a")) {

		link.addEventListener("click", function(event) {

			document.querySelectorAll(".navlanguages a")
				.forEach(el => document.querySelector(`.${el.getAttribute('href').substring(1)}`)
					.style.display = 'none'
				);

			document.querySelector(`.${event.currentTarget.getAttribute('href').substring(1)}`).style.display = 'block';

			showSlides(1);

			console.log(`.${event.currentTarget.getAttribute('href').substring(1)}`)

			document.querySelectorAll(".navlanguages a").forEach(el => el.classList.remove("active"));

			link.classList.add('active');
		});

	}

}

document.querySelector(".fr-section").style.display = "block"
onClickHandeler();

var slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) { showSlides(slideIndex += n); }

function currentSlide(n) { showSlides(slideIndex = n); }

function showSlides(n) {

	var slides = document.querySelectorAll(".owner.fade");

	for (var i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	if (document.querySelector(".fr-section").style.display === "block") {

		slides = document.querySelectorAll(".owner.fade.fr");

	}

	else if (document.querySelector(".eng-section").style.display === "block") {

		slides = document.querySelectorAll(".owner.fade.eng");

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
