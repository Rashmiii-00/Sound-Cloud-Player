/* 1. search */

var UI = {}
UI.enterClick = function(){
    var search = document.querySelector('.search');
    search.addEventListener('click', function(){
        var inputValue = document.querySelector(".input-search").value;
        //console.log(inputValue);
        
        SoundCloudAPI.getTrack(inputValue);

    })
    


}

UI.submitButton = function(){
    document.querySelector(".js-search").addEventListener("keyup", enter);
    function enter(e){
        if(e.which == 13){
            var inputValue = document.querySelector(".input-search").value;
            SoundCloudAPI.getTrack(inputValue);
        }
    }

}

UI.enterClick();
UI.submitButton();

/* 2. soundcloud query API */

var SoundCloudAPI = {}

SoundCloudAPI.init = function() {
    
    SC.initialize({
        client_id: '195d273fb18f4a9a75ebda65c1aa2631'
      });
      //195d273fb18f4a9a75ebda65claa2631
      //cd9be64eeb32d1741c17cb39e41d254d

}
SoundCloudAPI.init()

SoundCloudAPI.getTrack = function(inputValue){

    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
    q: inputValue
    }).then(function(tracks) {
    console.log(tracks);
    SoundCloudAPI.renderTrack(tracks);
    });

    // reset the div
    var searchResult = document.querySelector(".js-search-results");
    searchResult.innerHTML = "";

}
//SoundCloudAPI.getTrack('Rilo Kiley')


/* 3. display the cards */
SoundCloudAPI.renderTrack = function(tracks){

    tracks.forEach(function(track){

        //create divs for making a card
    var card = document.createElement("div");
    card.classList.add('card');
    var jsResults = document.querySelector(".js-search-results");
    jsResults.appendChild(card);
    
    //image
    var imageDiv  = document.createElement("div");
    imageDiv.classList.add("image");

    var image_img  = document.createElement("img");
    image_img.classList.add("image_img");
    imageDiv.appendChild(image_img);
    card.appendChild(imageDiv);
    image_img.src = track.artwork_url || "http://lorempixel.com/100/100/abstract/" ;

    //content
    var content = document.createElement("div");
    content.classList.add("content");
    card.appendChild(content);

    //header
    var header = document.createElement("div");
    header.classList.add("header");
    content.appendChild(header);
    header.innerHTML = '<a href="' + track.permalink_url + '"target="_blank">' + track.title  + '</a>';
    /*
    var a = document.createElement("a");
    header.appendChild(a);
    var link= document.createTextNode("Science Vs. Romance");
    a.appendChild(link);
    a.title = "Science Vs. Romance";
    a.href = "https://soundcloud.com/barsuk-records/rilo-kiley-science-vs-romance";
    a.target= "_blank";
    */

    //ui bottom
    var ui = document.createElement("div");
    card.appendChild(ui);
    ui.classList.add("ui","bottom","attached","button","js-button");

    var addIcon = document.createElement("i");
    ui.appendChild(addIcon);
    addIcon.classList.add("add","icon");

    var button = document.createElement("span");
    ui.appendChild(button);
    button.innerHTML = '<span>Add to playlist</span>'
    button.addEventListener('click', function(){
        SoundCloudAPI.getEmbed(track);
    });


    });
        
}
//SoundCloudAPI.renderTrack();


/** 4. add to playlist and play */
SoundCloudAPI.getEmbed = function(track){
    console.log("click");
    SC.initialize({
        client_id: '195d273fb18f4a9a75ebda65c1aa2631D'
      });
      
      var track_url = track.permalink_url;
      SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
        sideBar = document.querySelector('.js-playlist');
        

        var box = document.createElement('div');
        box.innerHTML = oEmbed.html;

        // to save the previous playlist
        sideBar.insertBefore(box, sideBar.firstChild);
        localStorage.setItem("key", sideBar.innerHTML);
      });
}

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");

//clear playlist
/*
var clear = document.querySelector(".clear");
clear.addEventListener('click', function(){
    console.log("clear");
    var sideBar = document.querySelector('.js-playlist');
    localStorage.removeItem(sideBar.innerHTML);
})
*/
