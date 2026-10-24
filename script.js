let books = [
    {
        id: 1,
        title: "Java Programming",
        author: "James Gosling",
        category: "Programming",
        status: "Available"
    },
    {
        id: 2,
        title: "Data Structures",
        author: "Seymour Lipschutz",
        category: "Computer Science",
        status: "Available"
    },
    {
        id: 3,
        title: "Machine Learning",
        author: "Tom Mitchell",
        category: "AI/ML",
        status: "Available"
    }
];

let students = [];

let transactions = [];


/* ---------------- BOOK MANAGEMENT ---------------- */

function displayBooks(list = books) {

    let table = document.getElementById("bookTable");

    table.innerHTML = "";

    list.forEach(book => {

        table.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.status}</td>

                <td>
                    <button class="delete-btn"
                    onclick="deleteBook(${book.id})">
                    Delete
                    </button>
                </td>
            </tr>
        `;
    });

    updateDashboard();
}


function addBook() {

    let title = document.getElementById("bookTitle").value;
    let author = document.getElementById("bookAuthor").value;
    let category = document.getElementById("bookCategory").value;

    if (title === "" || author === "" || category === "") {
        alert("Please fill all book details!");
        return;
    }

    let newBook = {

        id: books.length + 1,

        title: title,

        author: author,

        category: category,

        status: "Available"
    };

    books.push(newBook);

    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookCategory").value = "";

    displayBooks();

    alert("Book added successfully!");
}


function deleteBook(id) {

    books = books.filter(book => book.id !== id);

    displayBooks();
}


function searchBooks() {

    let search =
        document.getElementById("searchBook").value.toLowerCase();

    let result = books.filter(book =>

        book.title.toLowerCase().includes(search) ||

        book.author.toLowerCase().includes(search) ||

        book.category.toLowerCase().includes(search)

    );

    displayBooks(result);
}


/* ---------------- STUDENT MANAGEMENT ---------------- */

function addStudent() {

    let name =
        document.getElementById("studentName").value;

    let roll =
        document.getElementById("studentRoll").value;

    let course =
        document.getElementById("studentCourse").value;


    if (name === "" || roll === "" || course === "") {

        alert("Please fill all student details!");

        return;
    }


    let student = {

        id: students.length + 1,

        name: name,

        roll: roll,

        course: course

    };


    students.push(student);


    document.getElementById("studentName").value = "";

    document.getElementById("studentRoll").value = "";

    document.getElementById("studentCourse").value = "";


    displayStudents();

    alert("Student added successfully!");
}


function displayStudents() {

    let table =
        document.getElementById("studentTable");

    table.innerHTML = "";


    students.forEach(student => {

        table.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.roll}</td>

                <td>${student.course}</td>

                <td>

                    <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">

                    Delete

                    </button>

                </td>

            </tr>

        `;
    });


    updateDashboard();
}


function deleteStudent(id) {

    students =
        students.filter(student => student.id !== id);

    displayStudents();
}


/* ---------------- ISSUE BOOK ---------------- */

function issueBook() {

    let bookId =
        Number(document.getElementById("issueBookId").value);

    let studentId =
        Number(document.getElementById("issueStudentId").value);


    let book =
        books.find(book => book.id === bookId);

    let student =
        students.find(student => student.id === studentId);


    if (!book) {

        alert("Book not found!");

        return;
    }


    if (!student) {

        alert("Student not found!");

        return;
    }


    if (book.status === "Issued") {

        alert("This book is already issued!");

        return;
    }


    book.status = "Issued";


    let transaction = {

        bookId: bookId,

        studentId: studentId,

        date: new Date().toLocaleDateString(),

        status: "Issued"

    };


    transactions.push(transaction);


    document.getElementById("issueBookId").value = "";

    document.getElementById("issueStudentId").value = "";


    displayBooks();

    displayTransactions();


    alert("Book issued successfully!");
}


/* ---------------- RETURN BOOK ---------------- */

function returnBook(index) {

    let transaction = transactions[index];

    let book =
        books.find(book => book.id === transaction.bookId);


    if (book) {

        book.status = "Available";

    }


    transaction.status = "Returned";


    displayBooks();

    displayTransactions();

    alert("Book returned successfully!");
}


function displayTransactions() {

    let table =
        document.getElementById("issueTable");

    table.innerHTML = "";


    transactions.forEach((transaction, index) => {

        table.innerHTML += `

            <tr>

                <td>${transaction.bookId}</td>

                <td>${transaction.studentId}</td>

                <td>${transaction.date}</td>

                <td>${transaction.status}</td>

                <td>

                    ${
                        transaction.status === "Issued"

                        ?

                        `<button
                        class="return-btn"
                        onclick="returnBook(${index})">
                        Return
                        </button>`

                        :

                        "Completed"
                    }

                </td>

            </tr>

        `;

    });

}


/* ---------------- DASHBOARD ---------------- */

function updateDashboard() {

    document.getElementById("totalBooks").innerText =
        books.length;


    document.getElementById("availableBooks").innerText =

        books.filter(book =>
            book.status === "Available"
        ).length;


    document.getElementById("issuedBooks").innerText =

        books.filter(book =>
            book.status === "Issued"
        ).length;


    document.getElementById("totalStudents").innerText =
        students.length;

}


/* ---------------- INITIAL LOAD ---------------- */

displayBooks();

displayStudents();

displayTransactions();

updateDashboard();