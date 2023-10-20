// Initialize the library and DOM elements
const myLibrary = (function() {
    // Private data
    let libraryBooks = [];

    function getLibraryBooks() {
        return libraryBooks;
    }

    function addBook(book) {
        libraryBooks.push(book);
    }

    function removeBook(ind) {
        libraryBooks.splice(ind,1)
    }

    function clearLibrary() {
        libraryBooks = [];
    }

    return {
        getLibraryBooks, addBook, removeBook, clearLibrary
    }

})();

const bookTable = document.querySelector('table');
const dialog = document.querySelector('dialog');
const tableBody = document.querySelector('tbody');

const allNameInput = Array.from(document.querySelectorAll('input[name]')); // Get all inputs with any name attribute
const allNames = allNameInput.map(elem=>elem.getAttribute('name'))
const errorMessage = Array.from(document.querySelectorAll('.error'));

displayLibrary();

function displayLibrary() {
    setTableHeader();
    renderForm();
    addBookToLibrary();
}

function getBookProperties() {
    const uniqueNames = allNames.filter((elem, index, array)=> array.indexOf(elem)===index)
    return uniqueNames;
}

// Set the table header with form input names
function setTableHeader() {
    const tableHeader = document.querySelector('thead')
    const headerRow = document.createElement('tr');
    for(let name of getBookProperties()) {
        const headerEl = document.createElement('th');
        headerEl.innerText = name;
        headerRow.appendChild(headerEl)
    }
    tableHeader.appendChild(headerRow);
}

// Clear the library
function clearLibrary() {
    myLibrary.clearLibrary();
    tableBody.innerHTML = "";
}

// Render modal dialog
function renderForm() {
    const clearBtn = document.querySelector('.clear');
    clearBtn.addEventListener('click', clearLibrary);

    const newBook = document.querySelector('.new-book')
    newBook.addEventListener('click', () => {
        clearErrors();
        dialog.showModal();
    })

    const closeForm = document.querySelector('.close-form');
    closeForm.addEventListener('click', () => {
        dialog.close();
        clearInputs();
    })
}


// Construct new book instances
function Book(arr) {
    for(let i =0; i<arr.length;i++) {
        this[allNames[i]] = arr[i].value.toLowerCase();
    }
}

// Set book to read or not read
Book.prototype.toggleRead = function() {
    if (this.read === "no" || this.read === "") {
        this.read = "yes"
    } else {
        this.read= "no";
    }
 };
 
// Add book to the library after form validation
function addBookToLibrary() {
    const submit = document.querySelector('input[type="submit"]');
  
    submit.addEventListener('click', (e)=> {
            e.preventDefault();
            if (formValidation(e)) {
                const newBook = new Book(allNameInput);
                myLibrary.addBook(newBook);
                clearInputs();
                displayBookRow();
        }
    })
}

// Validate form and display error messages
function formValidation() {

    const form = document.querySelector('form');

    let validInput = true;
    if(!form.checkValidity()) {
        validInput = false;
    }
    for (let [key,input] of Object.entries(allNameInput)) {
                errorMessage[key].innerText = input.validationMessage;
                    
                if ((input.getAttribute('name') === 'author' || input.getAttribute('name') === 'title') && !isNaN(parseInt(input.value))) {
                    errorMessage[key].innerText+='Please enter a string';
                    validInput = false;
                }
                if (input.value !=="" && input.getAttribute('name') === 'read' && input.value.toLowerCase()!=='yes' && input.value.toLowerCase()!=='no') {
                    errorMessage[key].innerText+='Please enter "yes" or "no"';
                    validInput = false;
                }           
            }

    return validInput;         
}

// Display book properties on table
function displayBookRow() {
    tableBody.innerHTML = "";
    for(let [key,value] of Object.entries(myLibrary.getLibraryBooks())) {
        let bookRow = bookTable.insertRow();
        displayBookPropertyValues(value, bookRow);
        createReadButton(key,bookRow)
        createRemoveButton(key,bookRow)
    }
}

function displayBookPropertyValues(book, row) {
    for (let name of allNames) {
        let bookData = row.insertCell();
        bookData.append(book[name]);
        tableBody.appendChild(row);
    }
}

// Create a read button for each book
function createReadButton(key, row) {
    const readButton = document.createElement('button');
    readButton.innerText = 'Read'
    row.insertCell().appendChild(readButton);
    readButton.dataset.index = key;
    readButton.addEventListener('click', (e) => {
        const currentBook = myLibrary.getLibraryBooks()[e.target.dataset.index]
        currentBook.toggleRead();
        updateReadProperty(row, currentBook);
     });
}

// Update read property on book
function updateReadProperty(row, book) {
    const tableCells = row.querySelectorAll('td');
    const readCellIndex = allNames.indexOf('read')
    tableCells.forEach((elem, index)=>{
        if(index===readCellIndex) {
            elem.innerText = book.read;
        }
    })
}

// Create a remove button for each book
function createRemoveButton(key, row) {
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove book'
    row.insertCell().appendChild(removeButton);

    removeButton.dataset.index = key;
    removeButton.addEventListener('click', (e)=> {
            const index = parseInt(e.target.dataset.index);
            myLibrary.removeBook(index)
            tableBody.removeChild(row)
    })
}

// Clear error messages on form
function clearErrors() {
    errorMessage.forEach(elem=>elem.innerText="")
}

// Clear input fields on the form
function clearInputs() {
    for(let i=0; i<allNameInput.length; i++) {
        allNameInput[i].value = "";
    }
} 

