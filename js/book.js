// load books
const loadBooks = () => {
    const bookName = document.getElementById('input-book-name').value;
    document.getElementById('input-book-name').value = '';
    console.log(bookName);
    const url = `https://openlibrary.org/search.json?q=${bookName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showBooks(data));
};

// no book found
const noBookFound = displayValue => {
    document.getElementById('no-book-found').style.display = displayValue;
    document.getElementById('show-books').textContent = '';
};

// book found 
const bookFound = (displayValue, totalBooksFound) => {
    document.getElementById('book-found').style.display = displayValue;
    document.getElementById('book-found').innerHTML = `<h3>${totalBooksFound} books found</h3>`;
};

// show books result
const showBooks = books => {
    console.log(books);

    if (books.numFound === 0) {
        // if book not found
        noBookFound('block');
        bookFound('none', 0)
    }
    else {
        // total book found
        const totalBooksFound = books.numFound;
        bookFound('block', totalBooksFound)
        noBookFound('none');

        const showBooksContainer = document.getElementById('show-books');

        // clear previous result
        showBooksContainer.textContent = '';

        const bookList = books.docs;
        bookList.forEach(book => {
            // get book image
            const bookImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card">
                <img src="${bookImage}" class="card-img-top" alt="image not found">
                <div class="card-body">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th scope="row">Book Name : </th>
                                <td>${book.title}</td>
                            </tr>
                            <tr>
                                <th scope="row">Author : </th>
                                <td>${book.author_name ? book.author_name[0] : 'not found'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Publisher : </th>
                                <td>${book.publisher ? book.publisher[0] : 'not found'}</td>
                            </tr>
                            <tr>
                                <th scope="row">Published Year : </th>
                                <td>${book.first_publish_year ? book.first_publish_year : 'not found'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
            showBooksContainer.appendChild(div);
        });
    };
};
