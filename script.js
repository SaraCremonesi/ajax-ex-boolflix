$(document).ready(function() {

  // Gestione ricerca film al click del button
  $(document).on('click', 'button.search',
    function() {
      searchFilm();
      searchTvSeries();
      $('.container-film').html('');
      $('input.search-bar').val('');
    });

    // Gestione ricerca film alla pressione del tasto enter
    $(document).on('keypress', 'input.search-bar',
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        searchFilm();
        searchTvSeries();
        $('.container-film').html('');
        $('input.search-bar').val('');
      };
    });



// *************FUNZIONI****************

    // Creo una funzione per la chiamata Ajax delle serie tv
    function searchTvSeries() {
      $.ajax(
        {
          url: 'https://api.themoviedb.org/3/search/tv',
          method: 'GET',
          data: {
            api_key: 'e99307154c6dfb0b4750f6603256716d',
            query: $('input.search-bar').val()
          },
          success: function(dataResults) {
          var serieTvCorrispondenti = dataResults.results;

          // Stampo i film con Handlebars
          var source = $('#entry-template-serietv').html()
          var template = Handlebars.compile(source)

            if (serieTvCorrispondenti.length > 0) {
              for (var i = 0; i < serieTvCorrispondenti.length; i++) {
              var serieTv = serieTvCorrispondenti[i];
              var context = {
                "name": serieTv.name,
                "original_name": serieTv.original_name,
                "original_language": serieTv.original_language,
                "vote_average": serieTv.vote_average
              }
              var html = template(context);
              $('.container-film').append(html);
            }
          } else if (serieTvCorrispondenti = []) {
            var messaggioErrore = 'Nessuna serie tv corrispondente';
                var source = $('#error-template').html()
                var template = Handlebars.compile(source)
                var context = {
                  "messaggio": messaggioErrore
                  }
                var html = template(context);
                $('.container-film').append(html);
          }
        },
        error: function() {
          var messaggioErrore = 'Inserisci il titolo di un film o di una serie tv';
          var source = $('#error-template').html()
          var template = Handlebars.compile(source)
          var context = {
            "messaggio": messaggioErrore
            }
          var html = template(context);
          $('.container-film').append(html);
        }
      }
    )};

    // Creo una funzione per la chiamata Ajax dei film
    function searchFilm() {
      $.ajax(
        {
          url: 'https://api.themoviedb.org/3/search/movie',
          method: 'GET',
          data: {
            api_key: 'e99307154c6dfb0b4750f6603256716d',
            query: $('input.search-bar').val()
          },
          success: function(dataResults) {
          var filmCorrispondenti = dataResults.results;

          // Stampo i film con Handlebars
          var source = $('#entry-template-film').html()
          var template = Handlebars.compile(source)

            if (filmCorrispondenti.length > 0) {
              for (var i = 0; i < filmCorrispondenti.length; i++) {
              var film = filmCorrispondenti[i];
              var context = {
                "title": film.title,
                "original_title": film.original_title,
                "original_language": film.original_language,
                "vote_average": film.vote_average
              }
              var html = template(context);
              $('.container-film').append(html);
            }
          } else if (filmCorrispondenti = []) {
            var messaggioErrore = 'Nessun film corrispondente';
                var source = $('#error-template').html()
                var template = Handlebars.compile(source)
                var context = {
                  "messaggio": messaggioErrore
                  }
                var html = template(context);
                $('.container-film').append(html);
          }
        },
        error: function() {
          var messaggioErrore = 'Inserisci il titolo di un film o di una serie tv';
          var source = $('#error-template').html()
          var template = Handlebars.compile(source)
          var context = {
            "messaggio": messaggioErrore
            }
          var html = template(context);
          $('.container-film').append(html);
        }
      }
    )};
    }
});
