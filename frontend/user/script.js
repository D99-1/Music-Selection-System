// Random cover art for testing
randomCoverArt()
function randomCoverArt() {
    var sampleData = [
        {"name":"Thick of It","artist":"KSI","coverArt":"https://i.scdn.co/image/ab67616d0000b2734b8b52a487c842534619501a"},
        {"name":"Not Like Us","artist":"Kendrick Lamar","coverArt":"https://i.scdn.co/image/ab67616d0000b2731ea0c62b2339cbf493a999ad"},
        {"name":"APT","artist":"Bruno Mars & Rose","coverArt":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtdFKy0-55Y_MDK3P4qdJ2WMHxMsVJXLDcYg&s"},
        {"name":"FE!N","artist":"Travis Scott","coverArt":"https://m.media-amazon.com/images/I/31XnTeYznHL._UXNaN_FMjpg_QL85_.jpg"},
        {"name":"Woh","artist":"Badshah, Dino James, and Ikka Singh","coverArt":"https://i.scdn.co/image/ab67616d00001e0277fc60111160bea52849ad66"},
        {"name":"Blond","artist":"Frank Ocean","coverArt":"https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526"},
    ];

    var randomIndex = Math.floor(Math.random() * sampleData.length);
    var randomIndex2 = Math.floor(Math.random() * sampleData.length);

    let suggestions = document.getElementsByClassName("suggestion")

    for (let i = 0; i < suggestions.length; i++) {
        suggestions[i].children[0].src = sampleData[i].coverArt;
    }

    document.getElementById("current-album-cover").src = sampleData[randomIndex].coverArt;
    document.getElementById("current-song-title").innerHTML = sampleData[randomIndex].name;
    document.getElementById("current-artist-name").innerHTML = sampleData[randomIndex].artist;

    document.getElementById("up-next-album-cover").src = sampleData[randomIndex2].coverArt;
    document.getElementById("up-next-song-title").innerHTML = sampleData[randomIndex2].name;
    document.getElementById("up-next-artist-name").innerHTML = sampleData[randomIndex2].artist;
}

$("#search").focusin(function() {
    $("#songs").slideUp(300);
    $("#suggestion-row2").slideUp(300);
    $("#search-cross-icon").attr("src","./assets/close.png");
    $("#search-cross-btn").prop("disabled",false);
});

$("#search-cross-btn").click(function() {
    $("#songs").slideDown(300);
    $("#suggestion-row2").slideDown(275);
    $("#search-cross-icon").attr("src","./assets/search.png");
    $("#search-cross-btn").prop("disabled",true);
    $("#search-results").html("");
});

var typingTimer;                
var doneTypingInterval = 500; 
var $input = $('#search input');

$input.on('keyup paste', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });
  
  $input.on('keydown', function () {
    clearTimeout(typingTimer);
  });
  
  function doneTyping () {
    if ($("#search input").val() === "") {
        return;
    }
    fetch(`http://localhost:3000/search?search=${$("#search input").val()}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("search-results").innerHTML = "";
        let songs = data.content;
        songs.forEach(song => {
            let songDiv = document.createElement("div");
            songDiv.classList.add("search-result");
            songDiv.innerHTML = `
                            <img src="${song.thumbnails[0].url}" alt="album-cover" class="album-cover">
                            <div class="song-info">
                                <h2 class="song-title">${song.name}</h2>
                                <h3 class="artist-name">${song.artist.name ? song.artist.name:song.album.name}</h3>
                            </div> 
            `;
            document.getElementById("search-results").appendChild(songDiv);
        });
    });
  }