const screen = document.querySelector(".screen");
const modalBtn = document.getElementById("modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
let titleForm = document.getElementById("title");
let authorForm = document.getElementById("author");
let pagesForm = document.getElementById("pages");
let readForm = document.getElementById("read");
let submitBtn = document.getElementById("submit");


let myLibrary = [];

modalBtn.onclick = function() {
    modal.style.display = "block";
};
closeBtn.onclick = function() {
    modal.style.display = "none";
};
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};


function render(arr) {
    let strCard = "";
    arr.forEach((item, index) => {
        strCard +=
            `<div class="card">
       <h3>
       ${item.title}
       </h3>
       <h4>
       Author: ${item.author}
       </h4>
       <h5>
       pages: ${item.pages} <br>
       <button data-read-${index}> ${item.read} </button>
       </h5>
       <button data-${index} class="delete">delete this book</button>
       </div>
       `;
    })
    screen.innerHTML = strCard;;
    arr.forEach((item, index) => {
        const deleteBtn = document.querySelector(`[data-${index}]`)
        deleteBtn.addEventListener("click", function() {
            deleteBook(`${index}`)
        })
    })

    arr.forEach((item, index) => {
        const readBtn = document.querySelector(`[data-read-${index}]`)
        readBtn.addEventListener("click", function() {
            changeBooktoRead(`${index}`);
        })
    })

    localStorage.setItem("myLibrary", JSON.stringify(arr));

};

function changeBooktoRead(index) {
    if (myLibrary[index]["read"] === "read") {
        myLibrary[index]["read"] = "not read"
    } else if (myLibrary[index]["read"] !== "read") {
        myLibrary[index]["read"] = "read"
    }
    render(myLibrary)
};

function deleteBook(index) {
    myLibrary.splice(index, 1);
    console.log("delete function called");
    render(myLibrary)



}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `
                                    This $ { this.title }
                                    is written by $ { this.author }, it has $ { this.pages }
                                    pages, and I have $ { this.read }
                                    it.
                                    `;
    };
}


submitBtn.addEventListener("click", function() {
    if (!hasRequiredValues()) {
        return
    } else {
        let readUnread = ""
        if (read.checked) {
            readUnread = "read"
        } else { readUnread = "not read" }
        let book = new Book(titleForm.value, authorForm.value, pagesForm.value, readUnread)
        addBookToLibrary(book)
        modal.style.display = "none";
        render(myLibrary);
        clear()
    }
});

function hasRequiredValues() {
    if (titleForm.value === "" || authorForm.value === "") {
        alert("please fill out title and author")
        return false;
    } else { return true };
}

function clear() {
    titleForm.value = "";
    authorForm.value = "";
    pagesForm.value = "";
}

function addBookToLibrary(newBook) {
    if (myLibrary.find(item => item.title === newBook.title)) {
        alert("that book is already in your library")
        return myLibrary;
    } else {
        myLibrary.push(newBook);
        return myLibrary;
    }
}

let loadedLibraryFromStorage = localStorage.getItem("myLibrary")
if (loadedLibraryFromStorage && loadedLibraryFromStorage.length) {
    myLibrary = JSON.parse(loadedLibraryFromStorage)
} else {
    const Book1 = new Book("Bible", "God", 899, "read");
    const h3 = document.getElementsByTagName("h3");
    addBookToLibrary(Book1);
}

render(myLibrary)