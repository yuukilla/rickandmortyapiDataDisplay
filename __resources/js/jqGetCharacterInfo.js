/**
 * API Request URL Builing
 */
const baseURL = "https://rickandmortyapi.com/api/character/";
const characterID = document.location.pathname.split('/')[2]

const apiCharacterURL = baseURL + characterID;

/** END API Request URL Build */

/**
 * Get&Display characterData* from API with AJAX
 */
$.ajax({
    type: "GET",
    url: apiCharacterURL,
    success: function (response) {
        if ( response.status == "Alive" ) {
            var statusColor = "text-success";
        } else if ( response.status == "Dead" ) {
            var statusColor = "text-danger";
        } else {
            var statusColor = "text-secondary"
        }
        var strHTMLCard = `
            <div class="card bg-light text-dark rounded m-0 p-0 mb-5" style="width: 48rem;">
                <div class="card-body d-flex p-0 m-0">
                    <img src="${response.image}" alt="...">
                    <div class="m-3 w-100">
                        <h3 class="card-title">${response.name}</h3>
                        <h6 class="card-title">
                            <span class="${ statusColor }">&#9679;</span>
                            ${response.status} - ${response.species} - ${response.gender}
                        </h6>
        
                        <div class="d-flex align-items-center h-75" >
                            <div>
                                <div class="mb-3">
                                    <p class="card-text text-muted mb-0">Last known location:</p>
                                    <a href="/location/${response.location.url.split('/')[5]}" class="link-primary card-text">${response.location.name}</a>
                                </div>
                                <div>
                                    <p class="card-text text-muted mb-0">First seen in:</p>
                                    <a href="/location/${response.origin.url.split('/')[5]}" class="link-primary card-text">${response.origin.name}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $("#main").append( strHTMLCard );

    }
});
/** END Get&Display characterData* */

/**
 * Get&Display episodes* from API with AJAX
 */
// $.ajax({
//     type: "GET",
//     url: apiCharacterURL,
//     success: function (response) {
//         $.each(response.episode, function(key, val) {
//             var data = ($.ajax({
//                 type: "GET",
//                 url: val,
//                 success: function( data ) {
                    
//                     return data;
//                 }
//             }));
//             console.log( data )
//         })
//     }
// })

// var epsData = ( function () {
//     var data = ( function() {
//         $.ajax({
//             type: "GET",
//             url: apiCharacterURL,
//             success: function ( response ) {
//                 var data = ( function () { $.each( response.episode, function (key, val) {
//                     var data = ( function () {
//                         $.ajax({
//                             type: "GET",
//                             url: val,
//                             success: function(data){
//                                 return data;
//                             }
//                         });
//                     })();
//                     return data;
//                 } )})();
//                 return data;
//             }
//         });
//     } );
//     return data;
    
// })(apiCharacterURL);
// console.log();

var epsData = function( URL ) {

    var episData = ( function() { $.ajax({
        type: "GET",
        url: URL,
        success: function ( response ) {
            var data = null;
            data = ($.each( response.episode, function (key, val) {
                $.ajax({
                    type: "GET",
                    url: val,
                    success: function ( epData ) {
                        return epData;
                    }
                })
            } ));
            return data;
        }
    }) } )();

    return episData;
};
