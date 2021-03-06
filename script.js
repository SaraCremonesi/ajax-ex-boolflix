// **********************PRIMA VERSIONE***********************

$(document).ready(function() {

  // Gestione ricerca film al click del button
  $(document).on('click', 'button.search',
    function() {
      if ($('input.search-bar').val() !== '') {
        search();
        clean();
      }
    });

    // Gestione ricerca film alla pressione del tasto enter
    $(document).on('keypress', 'input.search-bar',
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        if ($('input.search-bar').val() !== '') {
          search();
          clean();
        }
      };
    });

    $(document).on('mouseenter', '.poster-image',
    function() {
      $(this).find('.container-info').removeClass('hidden');
    });

    $(document).on('mouseleave', '.poster-image',
    function() {
      $(this).find('.container-info').addClass('hidden');
    });


// *************FUNZIONI****************

  // Funzione per ricerca film e serie tv
  function search() {
    var apiKey = 'e99307154c6dfb0b4750f6603256716d';
    var query = $('input.search-bar').val();
    var urlMovies = 'https://api.themoviedb.org/3/search/movie';
    var urlSeries = 'https://api.themoviedb.org/3/search/tv';
    getItems(urlMovies, apiKey, query, 'Film');
    getItems(urlSeries, apiKey, query, 'Serie tv');
  }

  // Funzione per pulizia area output
  function clean() {
    $('.container-film').html('');
    $('input.search-bar').val('');
    $('#results-film').html('');
    $('#results-serie-tv').html('');
  }
    // Funzione per la chiamata Ajax
    function getItems(url, key, query, type) {
      $.ajax(
        {
          url: url,
          method: 'GET',
          data: {
            api_key: key,
            query: query
          },
          success: function(dataResults) {
          var itemsFromApi = dataResults.results;

          if (itemsFromApi.length > 0) {
            printItems(itemsFromApi, type);
          } else {
            var messaggioErrore = 'Non ci sono risultati per ' + type + ' con le parole cercate';
            var source = $('#error-template').html();
            var template = Handlebars.compile(source);
            var context = {
              "messaggio": messaggioErrore,
            }
            var html = template(context);
            $('.risultati').append(html);
          }
        },
        error: function() {
          alert('Errore')
        }
      });
    }

    // Funzione per stampare
    function printItems(items, type) {
      var source = $('#template-items').html()
      var template = Handlebars.compile(source)

      var results = items.length;
      if (type === 'Film') {
        $('#results-film').append('Film trovati: ' + results);
      } else {
        $('#results-serie-tv').append('Serie tv trovate: ' + results);
      }

      for (var i = 0; i < items.length; i++) {
        var singleItem = items[i];
        var title;
        var originalTitle;

        if (type === 'Film') {
          title = singleItem.title;
          originalTitle = singleItem.original_title;
          var slash = 'movie/';
        } else {
          title = singleItem.name;
          originalTitle = singleItem.original_name;
          slash = 'tv/';
        }

        var id = 'https://www.themoviedb.org/' + slash + singleItem.id + '-' + title;

        var posterBase = 'https://image.tmdb.org/t/p/w342';
        var posterPath = singleItem.poster_path;
        var poster;

        if (posterPath === null) {
          poster = 'img/red.jpg';
        } else {
          poster = posterBase + posterPath;
        }

        var context = {
          "poster_path": poster,
          "title": title,
          "original_title": originalTitle,
          "original_language": getLanguage(singleItem.original_language),
          "vote_average": getStars(singleItem.vote_average),
          "id": id,
          "overview": singleItem.overview
        }
        var html = template(context);
        $('.container-film').append(html);
      }
    }

    // Funzione per sostituire le bandiere alla lingua
    function getLanguage(originalLanguage) {
      var flags = ['en', 'it'];
      if (flags.includes(originalLanguage)) {
        return '<img src="img/' + originalLanguage + '.svg">'
      } else {
        return originalLanguage;
      }
    }

    // Funzione per trasformare la votazione in stelle
    function getStars(vote) {
      vote = Math.floor(vote/2);
      var stars = '';
      for (var i = 1; i <= 5; i++) {
        if (i <= vote) {
          stars += '<i class="fas fa-star"></i>';
        } else {
          stars += '<i class="far fa-star"></i>';
        }
      }
      return stars;
    }

});

// **********************SECONDA VERSIONE***********************
// $(document).ready(function() {
//
//   // Gestione ricerca film al click del button
//   $(document).on('click', 'button.search',
//     function() {
//       searchFilm();
//       searchTvSeries();
//       $('.container-film').html('');
//       $('input.search-bar').val('');
//     });
//
//     // Gestione ricerca film alla pressione del tasto enter
//     $(document).on('keypress', 'input.search-bar',
//     function() {
//       if (event.which === 13 || event.keyCode === 13) {
//         searchFilm();
//         searchTvSeries();
//         $('.container-film').html('');
//         $('input.search-bar').val('');
//       };
//     });
//
//
// // *************FUNZIONI****************
//
//     // Creo una funzione per la chiamata Ajax delle serie tv
//     function searchTvSeries() {
//       $.ajax(
//         {
//           url: 'https://api.themoviedb.org/3/search/tv',
//           method: 'GET',
//           data: {
//             api_key: 'e99307154c6dfb0b4750f6603256716d',
//             query: $('input.search-bar').val()
//           },
//           success: function(dataResults) {
//           var serieTvCorrispondenti = dataResults.results;
//
//           // Stampo i film con Handlebars
//           var source = $('#entry-template-serietv').html()
//           var template = Handlebars.compile(source)
//
//             if (serieTvCorrispondenti.length > 0) {
//               for (var i = 0; i < serieTvCorrispondenti.length; i++) {
//               var serieTv = serieTvCorrispondenti[i];
//
//               var tvPosterBase = 'https://image.tmdb.org/t/p/w780';
//               var tvPosterPath = serieTv.poster_path;
//               var tvPoster;
//
//               if (tvPosterPath === null) {
//                 tvPoster = 'img/boolflix.jpg';
//               } else {
//                 tvPoster = tvPosterBase + tvPosterPath;
//               }
//
//               var idSerie = 'https://www.themoviedb.org/tv/' + serieTv.id + '-' + serieTv.name;
//
//               var context = {
//                 "poster_path": tvPoster,
//                 "name": serieTv.name,
//                 "original_name": serieTv.original_name,
//                 "original_language": getLanguage(serieTv.original_language),
//                 "vote_average": getStars(serieTv.vote_average),
//                 "overview": serieTv.overview,
//                 "id": idSerie,
//               }
//               var html = template(context);
//               $('.container-film').append(html);
//             }
//             } else if (serieTvCorrispondenti = []) {
//               var messaggioErrore = 'Nessuna serie tv corrispondente';
//                 var source = $('#error-template').html()
//                 var template = Handlebars.compile(source)
//                 var context = {
//                   "messaggio": messaggioErrore
//               }
//
//                 var html = template(context);
//                 $('.container-film').append(html);
//           }
//         },
//         error: function() {
//           var messaggioErrore = 'Inserisci il titolo di un film o di una serie tv';
//           var source = $('#error-template').html()
//           var template = Handlebars.compile(source)
//           var context = {
//             "messaggio": messaggioErrore
//             }
//           var html = template(context);
//           $('.container-film').append(html);
//         }
//       }
//     )};
//
//     // Creo una funzione per la chiamata Ajax dei film
//     function searchFilm() {
//       $.ajax(
//         {
//           url: 'https://api.themoviedb.org/3/search/movie',
//           method: 'GET',
//           data: {
//             api_key: 'e99307154c6dfb0b4750f6603256716d',
//             query: $('input.search-bar').val()
//           },
//           success: function(dataResults) {
//           var filmCorrispondenti = dataResults.results;
//
//           // Stampo i film con Handlebars
//           var source = $('#entry-template-film').html()
//           var template = Handlebars.compile(source)
//
//             if (filmCorrispondenti.length > 0) {
//               for (var i = 0; i < filmCorrispondenti.length; i++) {
//               var film = filmCorrispondenti[i];
//
//               var filmPosterBase = 'https://image.tmdb.org/t/p/w780';
//               var filmPosterPath = film.poster_path;
//               var filmPoster;
//
//               if (filmPosterPath === null) {
//                 filmPoster = 'img/boolflix.jpg';
//               } else {
//                 filmPoster = filmPosterBase + filmPosterPath;
//               }
//
//               var idFilm = 'https://www.themoviedb.org/movie/' + film.id + '-' + film.title;
//
//               var context = {
//                 "poster_path" : filmPoster,
//                 "title": film.title,
//                 "original_title": film.original_title,
//                 "original_language": getLanguage(film.original_language),
//                 "vote_average": getStars(film.vote_average),
//                 "overview": film.overview,
//                 "id": idFilm
//               }
//
//               var html = template(context);
//               $('.container-film').append(html);
//             }
//           } else if (filmCorrispondenti = []) {
//               var messaggioErrore = 'Nessun film corrispondente';
//                 var source = $('#error-template').html()
//                 var template = Handlebars.compile(source)
//                 var context = {
//                   "messaggio": messaggioErrore
//                   }
//                 var html = template(context);
//                 $('.container-film').append(html);
//           }
//         },
//         error: function() {
//           var messaggioErrore = 'Inserisci il titolo di un film o di una serie tv';
//           var source = $('#error-template').html()
//           var template = Handlebars.compile(source)
//           var context = {
//             "messaggio": messaggioErrore
//             }
//           var html = template(context);
//           $('.container-film').append(html);
//         }
//       }
//     )};
//
//         // Funzione per sostituire le bandiere alla lingua
//         function getLanguage(originalLanguage) {
//           var flags = ['en', 'it'];
//           if (flags.includes(originalLanguage)) {
//             return '<img src="img/' + originalLanguage + '.svg" alt="">'
//           } else {
//             return originalLanguage;
//           }
//         }
//
//         // Funzione per trasformare la votazione in stelle
//         function getStars(decimalVote) {
//           integerVote = Math.ceil(decimalVote/2);
//           var stars = '';
//           for (var i = 1; i <= 5; i++) {
//             if (i <= integerVote) {
//               stars += '<i class="fas fa-star"></i>';
//             } else {
//               stars += '<i class="far fa-star"></i>';
//             }
//           }
//           return stars;
//         }
//   });
