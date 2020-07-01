$(document).ready(function() {

  // Gestione ricerca film al click del button
  $(document).on('click', 'button.search',
    function() {
      chiamataAjax();
    });

    // Gestione ricerca film alla pressione del tasto enter
    $(document).on('keypress', 'input.search-bar',
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        chiamataAjax();
      };
    });



// *************FUNZIONI****************

    // Creo una funzione per la chiamata Ajax dei film
    function chiamataAjax() {
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
          trovaFilm(filmCorrispondenti);
        },
        error: function() {
          alert('Errore');
        }
      }
    )};

    // Creo una funzione per stampare i film a schermo con Handlebars
    function trovaFilm(filmDaTrovare) {
      var source = $('#entry-template-film').html()
      var template = Handlebars.compile(source)

      for (var i = 1; i <= filmDaTrovare.length; i++) {
        var film = filmDaTrovare[i];
        var html = template(film);
        $('.container').append(html);
      }
    }
});
