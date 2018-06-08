jQuery(document).ready(function() {
	
	"use strict";
	// Your custom js code goes here.
    $(window).resize(function () {
        $('#main').height($('#main').width());
    });
});