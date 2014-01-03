/*!
 * MIT licensed
 * Copyright (C) 2013 Tim Holman, http://tholman.com
 */

/*********************************************
 *
 *********************************************/

function App() {

    var _this = this;

	var pane = false;
	var pageHeight = window.innerHeight; // px
	var cardHeight = Math.ceil( window.innerHeight / 4 ); // px
	var cardWidth = Math.ceil( window.innerWidth / 8 ); // px

	var nav;

	var nameSlider;
	var nameSliderText;

    // Tiles
    var minWidth = 240;
    var maxWidth = 300;

    this.scrollSystem;

    this.init = function() {

        // Randomize Pane Order

        randomize();

        _this.scrollSystem = new ScrollSystem();
        _this.scrollSystem.init();

        $( '.panes' ).show();

        $( '.grid' ).click( function() {
            $( '.tiles' ).addClass( 'active' );
        });

        $( '.tile' ).click( function() {
            var letter = this.className.split( ' ' )[1];
            _this.scrollSystem.scrollTo( letter, false );

            $( '.tiles' ).removeClass( 'active' );
        })

        // Initial screen sizing
        this.resize();

        // Make this happen onload
        $( window ).load(function() {

            // Loaded
            setTimeout( function() {
                $( '.loading' ).addClass( 'loaded' );
            }, 500 );

            // Hide completely
            setTimeout( function() {
                $( '.loading' ).addClass( 'hide' );
            }, 1600 );
        });

        $( '.trigger' ).mouseenter( function() {

            $( this ).parent().parent().addClass( 'active' );
        });

        $( '.trigger' ).mouseleave( function( event ) {

            $( this ).parent().parent().removeClass( 'active' );
        });
        

        // Resize event!
        window.onresize = function() {
            app.resize();
            _this.scrollSystem.resize();
        }
    }

    // Randomize the order of the patterns.
    var randomize = function() {
        var array = $( '.panes' ).children().toArray();
        var i = array.length,
            j, temp;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        $( '.panes' ).append( array );
    }

    this.resize = function() {

        // Letter positioning.
        $( '.showcase' ).css({
            'margin-top': ( (window.innerHeight - $( '.showcase' ).height() ) / 2 ) - 50 + 'px'
        })

        var element = document.querySelector( '.tiles' );
        var width = element.offsetWidth - ( element.offsetWidth - element.clientWidth );
        console.log( element.offsetWidth, element.clientWidth  );

        // Tile Positioning.
        var maxTiles = Math.floor( width / minWidth );
        var overflow = width % minWidth;
        var divvy = overflow / maxTiles;

        $( '.main-tile' ).width( 2 * ( minWidth + divvy ) );
        $( '.tile' ).width( minWidth + divvy );
    }
}



