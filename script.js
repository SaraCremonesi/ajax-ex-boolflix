$(document).ready(function() {

  // Gestione ricerca film al click del button
  $(document).on('click', 'button.search',
    function() {
      searchFilm();
      $('.container-film').html('');
      $('input.search-bar').val('');
    });

    // Gestione ricerca film alla pressione del tasto enter
    $(document).on('keypress', 'input.search-bar',
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        searchFilm();
        $('.container-film').html('');
        $('input.search-bar').val('');
      };
    });



// *************FUNZIONI****************

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
        },
        error: function() {
          var messaggioErrore = 'La ricerca non ha prodotto risultati';
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
});
