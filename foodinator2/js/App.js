var newRandom = "randomGericht";
var loginStatus = false;

var newRandomRecipes = ["Gulasch","Schnitzel","Suppe","Salat","Reis","Nudeln", "Pizza"];
var favorites = new Array();

var ratingGood = true;
var ratingMiddle = true;
var ratingBad = true;

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

var startNavClicked = function() {
    document.getElementById("home_nav").addEventListener("click",function(e) {
        navbarMiddleStyle();

        $('#startseiten_inhalt').show();
        $('.results').hide();

    });
}

var recipeNavClicked = function() {
    document.getElementById("recipe_search_nav").addEventListener("click",function(e) {
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
        setRezepteErgebnissSeiteSingle(name,art);

    });
}

var onFavoriteButtonClick = function() {

    $(".favoriteButton").click(function() {
    id = this.id;
    newId = "favorite" + id;
    newClass = "favoriteContent"
    $("#resultpage_inhalt"+id).clone().attr("id",newId).attr("class",newClass).appendTo("#website_content");

    $('.favoriteContent').hide();
    });
}

var onFavoritesClick = function() {
    $("#favoriten_button").click(function() {

         $('#resultpage_inhalt').hide();
         $('.results').hide();
         $('#startseiten_inhalt').hide();
         $('.favoriteContent').show();
    });
}

var setRezepteErgebnissSeiteSingle = function(name,art) {


    $('#resultpage_inhalt1').show();
    $('#startseiten_inhalt').hide();
    $('.favoriteContent').hide();

	var beispielrezepte = new Array();
	var rezept1= new Rezept(name, Math.floor((Math.random() * 5) + 1), "Mittel", art);
	beispielrezepte.push(rezept1);

	document.getElementById("rezept_name1").innerHTML = beispielrezepte[0].name;
	document.getElementById("rezept_menueart1").innerHTML = beispielrezepte[0].menueart;
	document.getElementById("rezept_aufwand1").innerHTML = beispielrezepte[0].aufwand;
	document.getElementById("rezept_rating1").src = getRatingPic(beispielrezepte[0].rating);

}

var setRecipePage = function() {
    $('.results').show();
    $('#startseiten_inhalt').hide();
    $('.favoriteContent').hide();


    var beispielrezepte = new Array();





    for(i=0;i<6;i++) {

        var rezept = new Rezept(newRandomRecipes[i], Math.floor((Math.random() * 5) + 1), "Mittel", "Art");

        beispielrezepte.push(rezept);

        console.log(beispielrezepte);

    }

    for(i=1;i<6;i++) {
        if(ratingGood == true && ratingMiddle == true && ratingBad == true)
        {
        document.getElementById("rezept_name"+i).innerHTML = beispielrezepte[i-1].name;
        document.getElementById("rezept_menueart"+i).innerHTML = beispielrezepte[i-1].menueart;
        document.getElementById("rezept_aufwand"+i).innerHTML = beispielrezepte[i-1].aufwand;
        document.getElementById("rezept_rating"+i).src = getRatingPic(beispielrezepte[i-1].rating);
        }

        if(ratingGood == true && ratingMiddle == true && ratingBad == false)
        {
            if(beispielrezepte[i-1].rating > 2) {
            document.getElementById("rezept_name"+i).innerHTML = beispielrezepte[i-1].name;
            document.getElementById("rezept_menueart"+i).innerHTML = beispielrezepte[i-1].menueart;
            document.getElementById("rezept_aufwand"+i).innerHTML = beispielrezepte[i-1].aufwand;
            document.getElementById("rezept_rating"+i).src = getRatingPic(beispielrezepte[i-1].rating);
            }
        }

        if(ratingGood == true && ratingMiddle == false && ratingBad == false)
        {
            if(beispielrezepte[i-1].rating > 3) {
                document.getElementById("rezept_name"+i).innerHTML = beispielrezepte[i-1].name;
                document.getElementById("rezept_menueart"+i).innerHTML = beispielrezepte[i-1].menueart;
                document.getElementById("rezept_aufwand"+i).innerHTML = beispielrezepte[i-1].aufwand;
                document.getElementById("rezept_rating"+i).src = getRatingPic(beispielrezepte[i-1].rating);
            }
        }
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

var checkFilters = function() {
    $('#filterGood').prop('checked', true);
    $('#filterMiddle').prop('checked', true);
    $('#filterBad').prop('checked', true);


    document.getElementById("filterGood").addEventListener("change",function(e) {
         if( $('#filterGood').prop('checked') == false)
         {
             ratingGood = false;
         }
         else {
             ratingGood = true;
         }
         })

    document.getElementById("filterMiddle").addEventListener("change",function(e) {
        if( $('#filterGood').prop('checked') == true)
        {
            ratingMiddle = false;
        }

        else {
            ratingMiddle = true;
        }
    })

    document.getElementById("filterBad").addEventListener("change",function(e) {
        if( $('#filterGood').prop('checked') == true)
        {
            ratingBad = false;
        }

        else {
            ratingBad = true;
        }
    })

}

var updateLayout = function() {
    $('.results').hide();
    $('#navbar_left_logged_in').hide();

}


var App = {
    init: function () {
	onCloudSearchButtonClicked(); 
	onRecipeSearchButtonClicked();
	onLoginButtonClicked();
    onLogoutButtonClicked();
	onShuffleButtonClicked();
    onRandomRecipeClicked();

    onFavoriteButtonClick();
    onFavoritesClick();
    onFavoritesClick();

    startNavClicked();
    recipeNavClicked();
    cloudNavClicked();
    profileNavClicked();

	navbarMiddleStyle();
	updateRandomSpeisen();
    updateLayout();
	
    checkFilters();





		}
}




	


