var newRandom = "randomGericht";
var loginStatus = false;

var newRandomRecipes = ["Gulasch","Schnitzel","Suppe","Salat","Reis","Nudeln", "Pizza"];

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


		$("#home_nav").mouseenter(function() {
    		$(this).css("background", "#336601").css("color", "#99cc67");
		}).mouseleave(function() {
    		$(this).css("background", "#99cc67").css("color", "#336601");
		});


		$("#recipe_search_nav").mouseenter(function() {
    		$(this).css("background", "#336601").css("color", "#99cc67");
		}).mouseleave(function() {
    		$(this).css("background", "#99cc67").css("color", "#336601");
		});


		$("#cloud_search_nav").mouseenter(function() {
    		$(this).css("background", "#336601").css("color", "#99cc67");
		}).mouseleave(function() {
    		$(this).css("background", "#99cc67").css("color", "#336601");
		});


		$("#profile_nav").mouseenter(function() {
    		$(this).css("background", "#336601").css("color", "#99cc67");
		}).mouseleave(function() {
    		$(this).css("background", "#99cc67").css("color", "#336601");
		});

}

var updateRandomSpeisen = function() {
	updateHauptspeisen();
	updateVorspeisenAndNachspeisen();
}

//Hier muss noch ein RandomGenerator rein der aus der Datenbank random Hauptspeisen reinlädt
var updateHauptspeisen = function() {
		for (i = 1; i < 7; i++) {
		document.getElementById("hauptspeise_gericht" + i).innerHTML = newRandomRecipes[Math.floor((Math.random() * 5) + 1)];
		}
}

//Hier muss noch ein RandomGenerator rein der aus der Datenbank random Nach/Vorspeisen reinlädt
var updateVorspeisenAndNachspeisen = function() {
		for (i = 1; i < 5; i++) {
			document.getElementById("nachspeise_gericht" + i).innerHTML = newRandomRecipes[Math.floor((Math.random() * 5) + 1)];
		};
		for (i = 1; i < 5; i++) {
			document.getElementById("vorspeise_gericht" + i).innerHTML = newRandomRecipes[Math.floor((Math.random() * 5) + 1)];
		};
}

//Wenn der Shuffle Button geklickt wird, werden durch updateHauptspeisen und updateVorspeisenAndNachspeisen erneut random Gerichte geladen
var onShuffleButtonClicked = function() {
		document.getElementById("shuffle_button").onclick = function() {
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

        $('#startseiten_inhalt').hide();
        $('.results').show();

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
               document.getElementById("navbar_left_logged_in").style.display = 'block';
               document.getElementById("navbar_left_filters").style.display = 'block';
                document.getElementById("navbar_left_not_logged_in").style.display = 'none';
            }
        }

    //Auslogg-Button wird geklickt

var onLogoutButtonClicked = function() {
        document.getElementById("logout_button").onclick = function() {
                document.getElementById("navbar_left_logged_in").style.display = 'none';
                document.getElementById("navbar_left_filters").style.display = 'none';
               document.getElementById("navbar_left_not_logged_in").style.display = 'block';
            }
}

var recipeNavClicked = function() {
    document.getElementById("recipe_search_nav").addEventListener("click",function(e) {
        startseiteAngezeigt = false;
        rezepteseiteAngezeigt = true;
        cloudsearchseiteAngezeigt = false;
        profilseiteAngezeigt = false;
        navbarMiddleStyle();

        setRecipePage();

    });
}

var cloudNavClicked = function() {
    document.getElementById("cloud_search_nav").addEventListener("click",function(e) {
        console.log("cloud clicked");


        $('#startseiten_inhalt').hide();
        $('.results').hide();

        // $('#cloud_search_nav').toggleClass('toggled');

        document.getElementById("cloud_search_nav").style.color = "#99cc67";
        document.getElementById("cloud_search_nav").backgroundColor = "#336601";

    });
}

    var profileNavClicked = function() {
        document.getElementById("profile_nav").addEventListener("click",function(e){
                console.log("profile clicked");

            profilseiteAngezeigt = true;
            navbarMiddleStyle();

            $('.results').hide();
            $('#startseiten_inhalt').hide();

                })
        }

var onRandomRecipeClicked = function() {

    $(".gericht").click(function() {
        id = this.id;
        name = document.getElementById(id).innerText;
        art = document.getElementById(id).title;
        setRezepteErgebnissSeite(name,art);

    });
}

var setRezepteErgebnissSeite = function(name,art) {

    document.getElementById('resultpage_inhalt').style.display = 'block';
    $('#startseiten_inhalt').hide();

	var beispielrezepte = new Array();
	var rezept1= new Rezept(name, Math.floor((Math.random() * 5) + 1), "Mittel", art);
	beispielrezepte.push(rezept1);

	document.getElementById("rezept_name").innerHTML = beispielrezepte[0].name;
	document.getElementById("rezept_menueart").innerHTML = beispielrezepte[0].menueart;
	document.getElementById("rezept_aufwand").innerHTML = beispielrezepte[0].aufwand;
	document.getElementById("rezept_rating").src = getRatingPic(beispielrezepte[0].rating);

}

var setRecipePage = function() {
    $('.results').show();
    $('#startseiten_inhalt').hide();



    var beispielrezepte = new Array();


    for(i=2;i<6;i++) {
    newId = "resultpage_inhalt" + i;
    $("#resultpage_inhalt").clone().attr("id",newId).appendTo("#website_content");
    }


    $('#website_content').add('<div>Insert Div Content</div>');

    for(i=0;i<7;i++) {

        var rezept = new Rezept(newRandomRecipes[i], Math.floor((Math.random() * 5) + 1), "Mittel", "Art");
        beispielrezepte.push(rezept);

        document.getElementById("rezept_name").innerHTML = beispielrezepte[i].name;
        document.getElementById("rezept_menueart").innerHTML = beispielrezepte[i].menueart;
        document.getElementById("rezept_aufwand").innerHTML = beispielrezepte[i].aufwand;
        document.getElementById("rezept_rating").src = getRatingPic(beispielrezepte[i].rating);
    }

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

var updateLayout = function() {
    console.log("update");
    $('.results').hide();

    document.getElementById("cloud_search_nav").onclick = function() {
        document.getElementById("startseiten_inhalt").style.visibility='hidden';
    }
}


var App = {
    init: function () {
	onCloudSearchButtonClicked(); 
	onRecipeSearchButtonClicked();
	onLoginButtonClicked();
    onLogoutButtonClicked();
	onShuffleButtonClicked();
    onRandomRecipeClicked();

    recipeNavClicked();
    cloudNavClicked();
    profileNavClicked();

	navbarMiddleStyle();
	updateRandomSpeisen();
    updateLayout();
	






		}
}




	


