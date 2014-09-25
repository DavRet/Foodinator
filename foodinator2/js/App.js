var newRandom = "randomGericht";
var loginStatus = false;
var startseiteAngezeigt = true;
var rezepteseiteAngezeigt = false;
var cloudsearchseiteAngezeigt = false;
var profilseiteAngezeigt = false;

function Rezept(name, rating, aufwand, menueart) {
  this.name = name;
  this.rating = rating;
  this.aufwand = aufwand;
  this.menueart = menueart;
}

// Hier wird der angezeigte Menüpunkt der Navigationsleiste (Startseite/Rezepte/CloudSearch/Profil) gekennzeichnet
var navbarMiddleStyle = function() {
	var home_nav = document.getElementById("home_nav");
	var rezept_nav = document.getElementById("recipe_search_nav");
	var cloud_nav = document.getElementById("cloud_search_nav");
	var profile_nav = document.getElementById("profile_nav");

    // test

	if (startseiteAngezeigt) {
		home_nav.style.color = "#99cc67";
		home_nav.style.backgroundColor = "#336601";
	} else {
		home_nav.style.color = "#336601";
		home_nav.style.backgroundColor = "#99cc67";
		$("#home_nav").mouseenter(function() {
    		$(this).css("background", "#336601").css("color", "#99cc67");
		}).mouseleave(function() {
    		$(this).css("background", "#99cc67").css("color", "#336601");
		});
	}
	if (rezepteseiteAngezeigt) {
		rezept_nav.style.color = "#99cc67";
		rezept_nav.style.backgroundColor = "#336601";
	} else {
		rezept_nav.style.color = "#336601";
		rezept_nav.style.backgroundColor = "#99cc67";
		$("#recipe_search_nav").mouseenter(function() {
    		$(this).css("background", "#336601").css("color", "#99cc67");
		}).mouseleave(function() {
    		$(this).css("background", "#99cc67").css("color", "#336601");
		});
	}
	if (cloudsearchseiteAngezeigt) {
		cloud_nav.style.color = "#99cc67";
		cloud_nav.style.backgroundColor = "#336601";
	} else {
		cloud_nav.style.color = "#336601";
		cloud_nav.style.backgroundColor = "#99cc67";
		$("#cloud_search_nav").mouseenter(function() {
    		$(this).css("background", "#336601").css("color", "#99cc67");
		}).mouseleave(function() {
    		$(this).css("background", "#99cc67").css("color", "#336601");
		});
	}
	if (profilseiteAngezeigt) {
		profile_nav.style.color = "#99cc67";
		profile_nav.style.backgroundColor = "#336601";
	} else {
		profile_nav.style.color = "#336601";
		profile_nav.style.backgroundColor = "#99cc67";
		$("#profile_nav").mouseenter(function() {
    		$(this).css("background", "#336601").css("color", "#99cc67");
		}).mouseleave(function() {
    		$(this).css("background", "#99cc67").css("color", "#336601");
		});
	}
}

var updateRandomSpeisen = function() {
	updateHauptspeisen();
	updateVorspeisenAndNachspeisen();
}

//Hier muss noch ein RandomGenerator rein der aus der Datenbank random Hauptspeisen reinlädt
var updateHauptspeisen = function() {
		for (i = 1; i < 7; i++) {
		document.getElementById("hauptspeise_gericht" + i).innerHTML = newRandom + i;
		}
}

//Hier muss noch ein RandomGenerator rein der aus der Datenbank random Nach/Vorspeisen reinlädt
var updateVorspeisenAndNachspeisen = function() {
		for (i = 1; i < 5; i++) {
			document.getElementById("nachspeise_gericht" + i).innerHTML = newRandom + i;
		};
		for (i = 1; i < 5; i++) {
			document.getElementById("vorspeise_gericht" + i).innerHTML = newRandom + i;
		};
}

//Wenn der Shuffle Button geklickt wird, werden durch updateHauptspeisen und updateVorspeisenAndNachspeisen erneut random Gerichte geladen
var onShuffleButtonClicked = function() {
		document.getElementById("shuffle_button").onclick = function() {
		newRandom = "anderesRandom";
		updateRandomSpeisen();
	}
}

//Rezept Suche Button wird geklickt
var onRecipeSearchButtonClicked = function() {
	document.getElementById("normal_search_button").onclick = function() {
		startseiteAngezeigt = false;
		rezepteseiteAngezeigt = true;
		cloudsearchseiteAngezeigt = false;
		profilseiteAngezeigt = false;
		navbarMiddleStyle();
	}
}

//Cloud-Search Button wird geklickt
var onCloudSearchButtonClicked = function() {
	document.getElementById("cloud_search_button").onclick = function() {
		startseiteAngezeigt = false;
		rezepteseiteAngezeigt = false;
		cloudsearchseiteAngezeigt = true;
		profilseiteAngezeigt = false;
		navbarMiddleStyle();
	}
}

//Einlogg-Button wird geklickt

var onLoginButtonClicked = function() {
	document.getElementById("login_button").onclick = function() {
		$(document).ready(function(){
        	$("#navbar_left").load("navbar_left_logged_in.html");
    	});
	}
}

var recipeNavClicked = function() {
    document.getElementById("recipe_search_nav").addEventListener("click",function(e) {
        console.log("recipe clicked");
        startseiteAngezeigt = false;
        rezepteseiteAngezeigt = true;
        cloudsearchseiteAngezeigt = false;
        profilseiteAngezeigt = false;
        navbarMiddleStyle();
    });
}

var cloudNavClicked = function() {
    document.getElementById("cloud_search_nav").addEventListener("click",function(e) {
        console.log("cloud clicked");
        startseiteAngezeigt = false;
        rezepteseiteAngezeigt = false;
        cloudsearchseiteAngezeigt = true;
        profilseiteAngezeigt = false;
        navbarMiddleStyle();
    });
}

var setRezepteErgebnissSeite = function() {
	var beispielrezepte = new Array();
	var rezept1= new Rezept("Gulasch", "2", "Mittel", "Hauptgericht");
	beispielrezepte.push(rezept1);

	document.getElementById("rezept_name").innerHTML = beispielrezepte[0].name;
	document.getElementById("rezept_menueart").innerHTML = beispielrezepte[0].menueart;
	document.getElementById("rezept_aufwand").innerHTML = beispielrezepte[0].aufwand;
	document.getElementById("rezept_rating").src = getRatingPic(beispielrezepte[0].rating);

}

var getRatingPic = function(rating) {
	var imgsrc = null;
	if (rating <=2) {
		imgsrc = "img/roter_daumen.png";
	} else if (rating == 3) {
		imgsrc = "img/gelber_daumen.png";
	} else if(rating > 3) {
		imgsrc = "img/gruener_daumen.png";
	}
	return imgsrc;
}


var App = {
    init: function () {
	onCloudSearchButtonClicked(); 
	onRecipeSearchButtonClicked();
	onLoginButtonClicked();
	onShuffleButtonClicked();

    recipeNavClicked();
    cloudNavClicked();

	setRezepteErgebnissSeite();

	navbarMiddleStyle();
	updateRandomSpeisen();
	


		document.getElementById("cloud_search_nav").onclick = function() {
			document.getElementById("startseiten_inhalt").style.visibility='hidden';
		}}
}




	


