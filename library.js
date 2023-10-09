let myLibrary = [];
const bookTable = document.querySelector('table');
const dialog = document.querySelector('dialog');
const tableBody = document.querySelector('tbody');
let allNameInput = Array.from(document.querySelectorAll('input[name]'));
let allNames = [];
for (let i=0; i<allNameInput.length; i++) {
    allNames.push(allNameInput[i].getAttribute('name'))
}

function Book(arr) {
    for(let i =0; i<arr.length;i++) {
        this[allNames[i]] = arr[i].value;
    }
    this.readCount = 0;
    this.hasRead = false;

}
// Book.prototype.toggleRead = function(event) {
//     if (this.readCount===0) {
//         event.target.readCount=1;
//         event.target.hasRead=true;
//     }
//     else {
//         event.target.readCount=0;
//         event.target.hasRead=false;
//     }
//     myLibrary[event.target.dataset.index].read = event.target.hasRead;
// }



Book.prototype.toggleRead = function() {
    if (this.readCount === 0) {
        this.readCount = 1;
        this.hasRead = true;
    } else {
        this.readCount = 0;
        this.hasRead = false;
    }
 };
 

function addBookToLibrary() {
    const submit = document.querySelector('input[type="submit"]');
    submit.addEventListener('click',(e)=> {
        e.preventDefault();
        let allInputs = Array.from(document.querySelectorAll('input:not([type=submit])'));
        const newBook = new Book(allInputs);
        myLibrary.push(newBook);

        displayBook();
        clearInputs();
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



function clearLibrary() {
    myLibrary = [];
    tableBody.innerHTML = "";
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', clearLibrary);

const newBook = document.querySelector('.new-book')

newBook.addEventListener('click', () => {
    dialog.showModal();
})

const closeForm = document.querySelector('.close-form');

closeForm.addEventListener('click', () => {
    dialog.close();
})


setTableHeader();

// Display each book in the table
function displayBook() {
    tableBody.innerHTML = "";
    for(let [key,book] of Object.entries(myLibrary)) {
        let bookRow = bookTable.insertRow();

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove book'
        bookRow.insertCell().appendChild(removeButton);

        const readButton = document.createElement('button');
        readButton.innerText = 'Read'
        bookRow.insertCell().appendChild(readButton);
        readButton.dataset.index = key;
        readButton.addEventListener('click', (e) => {
            myLibrary[e.target.dataset.index].toggleRead();
            displayBook();
         });
         


        removeButton.dataset.index = key;
        removeButton.addEventListener('click', (e)=> {
            const index = parseInt(e.target.dataset.index);
            myLibrary.splice(index, 1)
            tableBody.removeChild(bookRow)
        })
        for (let name of allNames) {
            console.log(name)
            let bookData = bookRow.insertCell();
            bookData.append(book[name]);
            tableBody.appendChild(bookRow);
        }

    }
}

function clearInputs() {
    for(let i=0; i<allNameInput.length; i++) {
        allNameInput[i].value = "";
    }
} 
addBookToLibrary();
