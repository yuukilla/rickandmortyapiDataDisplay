/**
 * API Reuqest URL Building
 */
var baseURL = "https://rickandmortyapi.com/api/location";

if ( document.location.search == "" ||
    document.location.search.split('=')[1] == undefined)
{
    var strPage = "?page=1";
} else {
    var strPage = document.location.search;
}

var apiSearchURL = baseURL + strPage;
/** END API Request URL Build */

/**
 * Get&Display results* from API with AJAX
 */

$.ajax({
    type: "GET",
    url: apiSearchURL,
    success: function(response) {
        $.each( response.results, function(index, value) {
            var strHTMLCard = `
                <div class="col-md-3 my-2">
                    <div class="card bg-dark text-secondary rounded">
                        <div class="d-flex flex-row">
                            <div class="m-3">
                                <h5 class="card-title mb-3 text-warning"><a data-bs-toggle="modal" data-bs-target="#modal${value.id}" style="cursor: pointer;">${value.name}</a></h5>
                                <p class="text-muted mb-0">Dimension:</p>
                                <p class="card-text text-light">${value.dimension}</p>
                                <p class="text-muted mb-0">Type:</p>
                                <p class="card-text text-light">${value.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $("#main").append(strHTMLCard);
            var strHTMLModal = `
                <div class="modal fade" id="modal${value.id}">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content bg-dark text-light">
                            <div class="modal-header" style="border-bottom: var(--bs-modal-header-border-width) solid var(--bs-dark)">
                                <h3 class="modal-title fs-5">${value.name}</h3>
                                <button type="button" class="btn-close" style="filter: invert(1);" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body bg-dark text-light">
                                <p class="text-muted mb-0">Dimension:</p>
                                <p>${value.dimension}</p>
                                <p class="text-muted mb-0">Type:</p>
                                <p>${value.type}</p>
                                <p class="text-muted mb-0">Residents:
                                    <span>
                                        <button type="button" onClick="toggleResidents(${value.id})" class="btn btn-outline-warning">Show</button>
                                    </span>
                                </p>
                                <table class="table table-dark">
                                    <tbody id="resTable_${value.id}">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $("#modals").append(strHTMLModal);
            
            
        })
        if ( strPage == "?page=1" ) {
            $("#nav").append(`
                <div class="row row mx-0 my-3 p-0">
                    <a href="/location?page=${response.info.next.split('/')[4].split('=')[1]}" class="btn btn-outline-warning">Next page</a>
                </div>
            `)
        }
        else if ( response.info.next == null ) {
            $("#nav").append(`
                <div class="row mx-0 my-3 p-0">
                    <a href="/location?page=${response.info.prev.split('/')[4].split('=')[1]}" class="btn btn-outline-warning">Previous page</a>
                </div>
            `)
        }
        else {
            $("#nav").append(`
                <div class="col mx-3 my-3 p-0 text-end">
                    <a href="/location?page=${response.info.prev.split('/')[4].split('=')[1]}" class="btn btn-outline-warning" style="width: 150px">Previous page</a>
                </div>
                <div class="col mx-3 my-3 p-0 text-start">
                    <a href="/location?page=${response.info.next.split('/')[4].split('=')[1]}" class="btn btn-outline-warning" style="width: 150px">Next page</a>
                </div>
            `)
        }
    }
})

var bolDisplay = false;

function toggleResidents(id)
{
    bolDisplay = !bolDisplay;

    if ( !bolDisplay ) {
        $("#resTable_"+id).empty();
    } else {
        $.ajax({
            type: "GET",
            url: "https://rickandmortyapi.com/api/location/" + id,
            success: function(response) {
                $.each(response.residents, function( index, value ) {
                    $.ajax({
                        type: "GET",
                        url: value,
                        success: function(response) {
                            $("#resTable_" + id).append(`
                                <tr>
                                    <td>
                                        <img src="${response.image}" width=32 height=32>
                                    </td>
                                    <td>
                                        <a href="/character/${response.id}" class="link-primary text-decoration-none">${response.name}</a>
                                    </td>
                                </tr>
                            `)
    
                        }
                    })
                })
            }
        })

    }
    
}