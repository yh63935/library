const myLibrary = [];
const bookAuthor = prompt("Book author?")
const bookTitle = prompt("Book title?")
const bookPages = 36
const bookRead = "Yes"
const bookRating = 10
const bookTable = document.querySelector('table')

myLibrary.push({ author: "c", title: "g", pages: 36, read: "Yes", rating: 10 }) 
myLibrary.push({ author: "h", title: "g", pages: 36, read: "Yes", rating: 10 }) 

function Book(author, title, pages, read, rating) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    return author, title, pages, read, rating;
}

function addBookToLibrary() {
    const newBook = new Book(bookAuthor, bookTitle, bookPages, bookRead, bookRating);
    myLibrary.push(newBook);
}

function setTableHeader() {
    const dummyBook = new Book("", "", "", "", "");
    for(let key in dummyBook) {
        const headerEl = document.createElement('th');
        headerEl.innerText = key;
        bookTable.append(headerEl);
    }
}

function clearTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = "";
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearTable);

setTableHeader();

// Display each book in the table
function displayBook() {
    for(let book of myLibrary) {
        console.log(book)
        let bookRow = bookTable.insertRow();
        for (let prop in book) {
            let bookData = bookRow.insertCell();
            bookData.append(book[prop]);
            console.log(book[prop]);
        }
    }
}
addBookToLibrary();
displayBook();