<?php

require_once __DIR__ . '/../__resources/php/render.php';

render( "__header", array( "title" => "Rick&Morty Episodes" ) );

render( "episode_list" );

render( "__footer", array( "strMethod" => "eps" ) );