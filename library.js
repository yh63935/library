let myLibrary = [];
const bookTable = document.querySelector('table');
const dialog = document.querySelector('dialog');
const tableBody = document.querySelector('tbody');

function Book(arr) {
    this.author = arr[0].value;
    this.title = arr[1].value;
    this.pages = arr[2].value;
    this.read = arr[3].value;
    this.rating = arr[4].value;
}

function addBookToLibrary() {
    const submit = document.querySelector('input[type="submit"]');
    submit.addEventListener('click',(e)=> {
        changed = true;
        e.preventDefault();
        let allInputs = Array.from(document.querySelectorAll('input'));
        const newBook = new Book(allInputs);
        myLibrary.push(newBook);

        displayBook();
    })
}

function setTableHeader() {
    // const dummyBook = new Book("", "", "", "", "");
    const tableHeader = document.querySelector('theader')
    const headerRow = document.createElement('tr');
    const dummyBook = new Book(["", "", "", "", ""]);
    for(let key in dummyBook) {
        const headerEl = document.createElement('th');
        headerEl.innerText = key;
        headerRow.appendChild(headerEl)
    }
    tableHeader.appendChild(headerRow);
}

function clearTable() {
    myLibrary = [];
    tableBody.innerHTML = "";
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearTable);

const newBook = document.querySelector('.new-book')

newBook.addEventListener('click', () => {
    dialog.showModal();
})

const closeForm = document.querySelector('.close-form');

closeForm.addEventListener('click', () => {
    dialog.close();
})

// When newBookk is clicked, form should pop up to take in details
// Things to think about, do you want to create form in HTML or create when writing JS?

setTableHeader();

// Display each book in the table
function displayBook() {
    for(let book of myLibrary) {
        let bookRow = bookTable.insertRow();
        for (let prop in book) {
            let bookData = bookRow.insertCell();
            bookData.append(book[prop]);
            tableBody.appendChild(bookRow);
        }
    }
}
addBookToLibrary();
