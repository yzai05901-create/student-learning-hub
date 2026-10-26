
/* ==================================
   1. SUBJECT DATA
================================== */

const subjects = [
    {
        id: "ai",
        name: "Artificial Intelligence",
        icon: "🤖",
        category: "Computer Science",
        description: "Learn AI concepts, intelligent agents, search algorithms, and machine learning.",
        topics: [
            "Introduction to Artificial Intelligence",
            "Intelligent Agents and PEAS",
            "BFS, DFS and A* Search",
            "Machine Learning Basics"
        ],
        explanation: "Artificial Intelligence (AI) is a field of computer science that develops systems capable of performing tasks that normally require human intelligence."
    },
    {
        id: "python",
        name: "Python Programming",
        icon: "🐍",
        category: "Programming",
        description: "Learn Python syntax, variables, loops, functions, and data structures.",
        topics: [
            "Variables and Data Types",
            "If-Else Statements",
            "Loops and Functions",
            "Lists and Dictionaries"
        ],
        explanation: "Python is a high-level programming language known for its readable syntax. It is widely used in AI, web development, automation, and data analysis."
    },
    {
        id: "web",
        name: "Web Development",
        icon: "🌐",
        category: "Development",
        description: "Build websites using HTML, CSS, JavaScript, and responsive design.",
        topics: [
            "HTML Page Structure",
            "CSS Styling and Layout",
            "JavaScript Fundamentals",
            "Responsive Web Design"
        ],
        explanation: "Web development is the process of creating websites. HTML provides structure, CSS controls appearance, and JavaScript adds interactivity."
    },
    {
        id: "math",
        name: "Mathematics",
        icon: "📐",
        category: "Mathematics",
        description: "Improve your understanding of algebra, equations, and mathematical concepts.",
        topics: [
            "Algebra Fundamentals",
            "Linear Equations",
            "Matrices and Determinants",
            "Functions and Graphs"
        ],
        explanation: "Mathematics helps us understand quantities, patterns, structures, and relationships. It is important in programming, AI, and data science."
    },
    {
        id: "dsa",
        name: "Data Structures",
        icon: "🧩",
        category: "Computer Science",
        description: "Understand arrays, stacks, queues, linked lists, trees, and algorithms.",
        topics: [
            "Arrays and Lists",
            "Stacks and Queues",
            "Linked Lists",
            "Searching and Sorting"
        ],
        explanation: "Data structures organize and store data so that a program can access and modify it efficiently."
    },
    {
        id: "database",
        name: "Database Systems",
        icon: "🗄️",
        category: "Computer Science",
        description: "Learn tables, SQL queries, relationships, and database fundamentals.",
        topics: [
            "Introduction to Databases",
            "Tables, Rows and Columns",
            "SQL SELECT Queries",
            "Primary and Foreign Keys"
        ],
        explanation: "A database is an organized collection of data. A database management system helps users store, retrieve, update, and manage information."
    }
];


/* ==================================
   2. STUDY NOTES DATA
================================== */

const notes = [
    {
        id: 1,
        subject: "Artificial Intelligence",
        topic: "What is Artificial Intelligence?",
        text: "AI is the ability of computer systems to perform tasks such as learning, reasoning, problem-solving, and understanding language.",
        category: "AI"
    },
    {
        id: 2,
        subject: "Python Programming",
        topic: "Python Variables",
        text: "A variable is a name used to refer to a value. Example: age = 20. Python automatically determines the data type.",
        category: "Python"
    },
    {
        id: 3,
        subject: "Web Development",
        topic: "HTML, CSS and JavaScript",
        text: "HTML creates the structure of a webpage. CSS styles the webpage. JavaScript makes the webpage interactive.",
        category: "Web"
    },
    {
        id: 4,
        subject: "Mathematics",
        topic: "Linear Equations",
        text: "A linear equation has variables with a maximum power of one. Example: 2x + 4 = 10. Subtract 4 and divide by 2 to get x = 3.",
        category: "Math"
    },
    {
        id: 5,
        subject: "Data Structures",
        topic: "What is a Stack?",
        text: "A stack follows LIFO: Last In, First Out. The last item added is the first item removed. Push adds an item and pop removes one.",
        category: "DSA"
    },
    {
        id: 6,
        subject: "Database Systems",
        topic: "What is a Database?",
        text: "A database stores organized information. SQL can be used to retrieve data. Example: SELECT * FROM Students;",
        category: "Database"
    }
];


/* ==================================
   3. SELECT HTML ELEMENTS
================================== */

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const sidebar = document.getElementById("sidebar");
const pageTitle = document.getElementById("pageTitle");

const homeSubjects = document.getElementById("homeSubjects");
const allSubjects = document.getElementById("allSubjects");
const notesGrid = document.getElementById("notesGrid");
const detailContent = document.getElementById("detailContent");


/* ==================================
   4. NAVIGATION
================================== */

function showPage(pageId) {
    const validPages = [
        "home",
        "subjects",
        "notes",
        "resources",
        "detail"
    ];

    if (!validPages.includes(pageId)) {
        pageId = "home";
    }

    pages.forEach(page => {
        page.classList.toggle(
            "active-page",
            page.id === pageId
        );
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === pageId
        );
    });

    const titles = {
        home: "Dashboard",
        subjects: "Explore Subjects",
        notes: "My Study Notes",
        resources: "Learning Resources",
        detail: "Subject Details"
    };

    pageTitle.textContent = titles[pageId] || "LearnSphere";
    sidebar.classList.remove("open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        showPage(link.dataset.page);
        history.replaceState(null, "", "#" + link.dataset.page);
    });
});

document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
        const destination = button.dataset.go;
        showPage(destination);
        history.replaceState(null, "", "#" + destination);
    });
});


/* ==================================
   5. CREATE SUBJECT CARDS
================================== */

function createSubjectCard(subject) {
    return `
        <article class="subject-card">
            <div class="subject-icon">${subject.icon}</div>

            <span class="tag">${subject.category}</span>

            <h3>${subject.name}</h3>

            <p>${subject.description}</p>

            <div class="card-footer">
                <span class="muted">${subject.topics.length} topics</span>

                <button
                    class="open-btn"
                    data-subject="${subject.id}">
                    Explore →
                </button>
            </div>
        </article>
    `;
}

function renderSubjects() {
    homeSubjects.innerHTML = subjects
        .slice(0, 3)
        .map(createSubjectCard)
        .join("");

    allSubjects.innerHTML = subjects
        .map(createSubjectCard)
        .join("");

    document.getElementById("subjectCount").textContent =
        subjects.length;
}


/* ==================================
   6. SUBJECT DETAILS
================================== */

function openSubject(subjectId) {
    const subject = subjects.find(
        item => item.id === subjectId
    );

    if (!subject) {
        return;
    }

    detailContent.innerHTML = `
        <div class="detail-panel">
            <div class="subject-icon">${subject.icon}</div>

            <span class="tag">${subject.category}</span>

            <h1>${subject.name}</h1>

            <p>${subject.description}</p>

            <h2>Topics to Study</h2>

            <ul>
                ${subject.topics.map(topic => `
                    <li>${topic}</li>
                `).join("")}
            </ul>

            <h2>Simple Explanation</h2>

            <p class="note-text">${subject.explanation}</p>

            <h2>Related Study Notes</h2>

            ${notes
                .filter(note => note.subject === subject.name)
                .map(note => `
                    <div class="note-card">
                        <h3>${note.topic}</h3>
                        <p>${note.text}</p>
                    </div>
                `).join("") || "<p>More notes will be added soon.</p>"}

            <button class="primary-btn" data-go="notes">
                Browse All Notes →
            </button>
        </div>
    `;

    showPage("detail");
    history.replaceState(null, "", "#detail");
}


/* ==================================
   7. SUBJECT SEARCH
================================== */

document.getElementById("subjectSearch")
    .addEventListener("input", event => {

        const query = event.target.value
            .trim()
            .toLowerCase();

        const filteredSubjects = subjects.filter(subject => {
            return (
                subject.name.toLowerCase().includes(query) ||
                subject.category.toLowerCase().includes(query) ||
                subject.description.toLowerCase().includes(query)
            );
        });

        allSubjects.innerHTML = filteredSubjects
            .map(createSubjectCard)
            .join("");

        document.getElementById("noSubjects").hidden =
            filteredSubjects.length !== 0;
    });


/* ==================================
   8. RENDER NOTES
================================== */

function renderNotes(searchQuery = "") {
    const query = searchQuery.trim().toLowerCase();

    const filteredNotes = notes.filter(note => {
        return (
            note.topic.toLowerCase().includes(query) ||
            note.subject.toLowerCase().includes(query) ||
            note.text.toLowerCase().includes(query)
        );
    });

    notesGrid.innerHTML = filteredNotes.map(note => {
        const isSaved = getSavedNotes().includes(note.id);

        return `
            <article class="note-card">
                <span class="tag">${note.category}</span>

                <h3>${note.topic}</h3>

                <p><strong>${note.subject}</strong></p>

                <p>${note.text}</p>

                <div class="card-footer">
                    <span class="muted">Study note</span>

                    <button
                        class="save-btn"
                        data-save="${note.id}">
                        ${isSaved ? "⭐ Saved" : "☆ Save Note"}
                    </button>
                </div>
            </article>
        `;
    }).join("");

    document.getElementById("noNotes").hidden =
        filteredNotes.length !== 0;
}

document.getElementById("noteSearch")
    .addEventListener("input", event => {
        renderNotes(event.target.value);
    });


/* ==================================
   9. SAVE FAVORITE NOTES
================================== */

function getSavedNotes() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("learnSphereSavedNotes") || "[]"
        );

        return Array.isArray(saved)
            ? saved.filter(id => Number.isInteger(id))
            : [];
    } catch (error) {
        return [];
    }
}

function toggleSavedNote(noteId) {
    let savedNotes = getSavedNotes();

    if (savedNotes.includes(noteId)) {
        savedNotes = savedNotes.filter(id => id !== noteId);
    } else {
        savedNotes.push(noteId);
    }

    try {
        localStorage.setItem(
            "learnSphereSavedNotes",
            JSON.stringify(savedNotes)
        );
    } catch (error) {
        alert("Your browser could not save this note.");
        return;
    }

    renderNotes(document.getElementById("noteSearch").value);
}


/* ==================================
   10. DARK MODE
================================== */

const themeBtn = document.getElementById("themeBtn");

function updateThemeButton() {
    themeBtn.textContent = document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
}

try {
    if (localStorage.getItem("learnSphereTheme") === "dark") {
        document.body.classList.add("dark");
    }
} catch (error) {
    // Continue with the default light theme.
}

updateThemeButton();

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const theme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    try {
        localStorage.setItem("learnSphereTheme", theme);
    } catch (error) {
        // Theme still works for the current page.
    }

    updateThemeButton();
});


/* ==================================
   11. MOBILE SIDEBAR
================================== */

document.getElementById("menuBtn").addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


/* ==================================
   12. HANDLE CARD BUTTONS
================================== */

document.addEventListener("click", event => {
    const subjectButton = event.target.closest("[data-subject]");

    if (subjectButton) {
        openSubject(subjectButton.dataset.subject);
        return;
    }

    const saveButton = event.target.closest("[data-save]");

    if (saveButton) {
        toggleSavedNote(Number(saveButton.dataset.save));
    }
});


/* ==================================
   13. START THE WEBSITE
================================== */

renderSubjects();
renderNotes();

const initialPage = window.location.hash.slice(1);

if (["home", "subjects", "notes", "resources"].includes(initialPage)) {
    showPage(initialPage);
} else {
    showPage("home");
}
