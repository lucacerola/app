(function () {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('user-profile');

    var modalSource = document.getElementById('modal-template').innerHTML,
        modalTemplate = Handlebars.compile(modalSource),
        modalPlaceholder = document.getElementById('modal-modal');

    //var artists = document.getElementById('user-input-1').innerHTML;

    var inputsSource = document.getElementById('inputs-template').innerHTML,
        inputsTemplate = Handlebars.compile(inputsSource),
        inputsPlaceholder = document.getElementById('inputs');

    //var bandNameSource = document.getElementById('band-name-template').innerHTML,
        //bandNameTemplate = Handlebars.compile(bandNameSource),
        //bandNamePlaceholder = document.getElementById('band-name');

    var oauthSource = document.getElementById('oauth-template').innerHTML,
        oauthTemplate = Handlebars.compile(oauthSource),
        oauthPlaceholder = document.getElementById('oauth');

    var params = getHashParams();
   
    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;

    if (error) {
        alert('There was an error during the authentication');
    } else {
        if (access_token) {
            // render oauth info
            oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
            });

            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                   // $("#get-artist-list").show();
                    $('#login').hide();
                    $('#loggedin').show();
                }
            });

            $.ajax({
                success: function (response) {
                    inputsPlaceholder.innerHTML = inputsTemplate(response);
                    $('#login').hide();
                    $('#loggedin').show();
                }
            })

            $(document).ready("#button").click(function () {
                var artists = document.getElementById('user-input-1').value;
            $.ajax({
                url: 'https://api.spotify.com/v1/search',
                method: 'GET',
                dataType: 'json',
                data: {
                    q: artists,
                    type: 'playlist',
                    limit: 5,
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    modalPlaceholder.innerHTML = modalTemplate(response);
                    $('#login').hide();
                    $('#loggedin').show();
                }
                })
                });
            /*$.ajax({
                url: 'https://api.spotify.com/v1/search',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    bandNamePlaceholder.innerHTML = bandNameTemplate(response);
                    // $("#get-artist-list").show();
                    $('#login').hide();
                    $('#loggedin').show();
                }
            });*/

        } else {
            // render initial screen
            $('#login').show();
            $('#loggedin').hide();
        }

       /* document.getElementById('obtain-new-token').addEventListener('click', function () {
            $.ajax({
                url: '/refresh_token',
                data: {
                    'refresh_token': refresh_token
                }
            }).done(function (data) {
                access_token = data.access_token;
                oauthPlaceholder.innerHTML = oauthTemplate({
                    access_token: access_token,
                    refresh_token: refresh_token
                });
            });
        }, false); */

        /* $(".getArtist").click(function() {
            var artistSource = document.getElementById('artist-template').innerHTML,
                artistTemplate = Handlebars.compile(artistSource),
                artistListPlaceholder = document.getElementById('artist-list');
            $.ajax({
                url: 'https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    artistListPlaceholder.innerHTML = artistTemplate(response);
                    console.log(response);
                } 
            });
        }); */
    }
    
})();

