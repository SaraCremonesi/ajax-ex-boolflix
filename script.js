$(document).ready(function() {

  $(document).on('click', 'button.search',
    function() {
      chiamataAjax();
    });



    function chiamataAjax() {
      $.ajax(
        {
          url: 'https://api.themoviedb.org/3/search/movie',
          method: 'GET',
          data: {
            api_key: 'e99307154c6dfb0b4750f6603256716d',
            query: $('input.search-bar').val()
          },
          success: function(dataResponse) {
          var filmCorrispondenti = dataResponse.response;
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
