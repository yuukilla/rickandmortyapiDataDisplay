<?php

require_once __DIR__ . "/../__resources/php/render.php";

render( "__header", array( "title" => "Rick&Morty Locations" ) );

if ( count( explode( "/", $_SERVER['REQUEST_URI'] ) ) == 2 ) {
    render( "location_list" );
    render( "__footer", array( "strMethod" => "locs" ) );
} else {
    render( "location_details" );
    render( "__footer", array( "strMethod" => "locinfo" ) );
}