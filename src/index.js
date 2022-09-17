import 'regenerator-runtime';
import $ from 'jquery';
import './styles/style.css';
import './script/component/judul-app.js';

const getBookInfo = () => {
  const searchvalue = document.getElementById('get').value;
  document.querySelector('#bookhasil').innerHTML = '';
  console.log(searchvalue);
  const alamatUrl = 'https://www.googleapis.com/books/v1/volumes?';

  $.ajax({
    url: alamatUrl,
    dataType: 'json',
    data: {
      q: searchvalue,
    },
    success: function (hasil) {
      let books = hasil.items;
      if (hasil.totalItems > 0) {
        $.each(books, function (i, data) {
          $('#bookhasil').append(
            `
            <div id="booklist" class="book">
            <img class="thumbnail-buku" src="${data.volumeInfo.imageLinks.thumbnail}" alt="${data.volumeInfo.title}" />
            <div class="info-buku">
              <h2>Title : ${data.volumeInfo.title}</h2>
              <p>Author : ${data.volumeInfo.authors}</p>
              <p>Publisher : ${data.volumeInfo.publisher}</p>
              <p>Published Date : ${data.volumeInfo.publishedDate}</p>
              <p>Categories : ${data.volumeInfo.categories}</p>
              <a href="${data.volumeInfo.previewLink}">>>Preview</a>
            </div>
          </div>
      `
          );
        });
      } else {
        $('#booklist').html(
          `
            <h3 class='bukunotfound' >Buku tidak ditemukan</h3>
        `
        );
      }
    },
    type: 'GET',
  });
};

document.querySelector('#tombolcari').addEventListener('click', getBookInfo, false);
