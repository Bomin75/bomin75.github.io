const words = ["Bioinformatician", "Computer Science and Biology Student", "Software Engineer", "Web Developer"];
let currentIndex = 0;

function changeWord() {
    const wordElement = document.getElementById("occupation");
    wordElement.textContent = words[currentIndex];
    currentIndex = (currentIndex + 1) % words.length; // Loop back to the first word
}

setInterval(changeWord, 2500);

changeWord();

window.onload = function() {
    const scrollable = document.getElementById("scrollable-container");
    
    scrollable.scrollLeft = 1600;
};

const desc = document.getElementById("desc-popup");
const content = {"loretto-abbey": {"title": "Loretto Abbey CSS", "summary": "Toronto, ON, CA",
                                    "detail": ["Recognized as one of the TCDSB Top Scholars 22-23", "School Champion in Euclid Mathematics Contest",
                                        "School Champion in Canadian Senior Mathematics Contest", "Top 25% candidate in Canadian Senior Mathematics Contest",
                                        "A leader of a Korean Club", "A member of a Coding/Robotics Club"]},
                "tutoring1": {"title": "Tutoring", "summary": "Toronto, ON, CA", "detail": ["Taught a grade 9 student math and science",
                    "Solidified student's understanding on the course material and clarified confusions resulting in the increase of the student's grade from mid 80s to high 90s "]},
                "cs-utsc": {"title": "Computer Science SWE Specialist @ UTSC", "summary": "Scarborough, ON, CA<br />GPA: 4.0/4.0",
                    "detail": ["Received the University of Toronto International Scholar Award ($180K)", "Recognized as a University of Toronto Scholar ($7.5K)",
                        "Relevant Coursework: CSCA08 (A+), CSCA48 (A+), MATA31 (A+), MATA37 (A+), MATA22 (A+), MATB24 (A), CSCB07 (On going), CSCB09 (On going)"
                    ]},
                "create-utsc": {"title": "Front-End Developer @ C.R.E.A.T.E. UofT", "summary": "Scarborough, ON, CA",
                    "detail": ["Designed visually appealing and user-friendly UI with Figma", "Displayed data restored from the database on the website using React"]},
                "tutoring2": {"title": "Tutoring", "summary": "Toronto, ON, CA", "detail": ["Taught a grade 10 student math and science",
                    "Designed a personalized lesson plan resulting in the increase of the student's grades from high 40s to high 70s"]},
                "bio-utsc": {"title": "Molecular Biology Major @ UTSC", "summary": "Scarborough, ON, CA<br />GPA: 4.0/4.0",
                    "detail": ["Received the University of Toronto International Scholar Award ($180K)", "Recognized as a University of Toronto Scholar ($7.5K)",
                        "Relevant Coursework: BIOA01 (On going), BIOA02 (On going)"
                    ]},
                "research-sickkids": {"title": "Research Assistant @ Sickkids Hospital", "summary": "Toronto, ON, CA<br />Pomès Lab",
                    "detail": ["Prepared and ran molecular dynamics simulations of polypeptides that form ɑ-helices",
                        "Wrote a Python script to perform PCA for dimension reduction of MD dataset with more than 80 coordinate values",
                    "Derives a new metric of ɑ-helice distortions leveraging the combination of the existing metrics and clustering technique"]},
                "uoftapp-utsg": {"title": "Vice-President @ UofT APP", "summary": "Toronto, ON, CA",
                    "detail": ["Responsible for marketing of the club through social media", "Create posts to upload on UofT APP's official instagram page",
                        "Responsible for communicating with other clubs for collaboration"]},
                "ds3-utsc": {"title": "Social Media Manager @ DS3", "summary": "Scarborough, ON, CA", "detail": ["Responsible for managing DS3's social media",
                    "Work closely with marketing team"]}}

document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        $delete.addEventListener('click', () => {
            desc.style.display = "none";
        });
    });
});

function showDesc(object) {
    title = document.getElementById("desc-title");
    title.innerHTML = content[object.id]["title"];

    summary = document.getElementById("desc-summary");
    summary.innerHTML = content[object.id]["summary"];

    detail = document.getElementById("desc-detail");

    while (detail.firstChild) {
        detail.firstChild.remove();
    }

    content[object.id]["detail"].forEach(element => {
        li = document.createElement("li");
        li.innerHTML = element;
        detail.appendChild(li);
    });

    desc.style.zIndex = 1000;
    desc.style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.scrollable-item') || []).forEach(($item) => {
        $item.addEventListener('click', (event) => {
            const x = event.pageX;
            const y = event.pageY;

            desc.style.left = x + 15 + "px";
            desc.style.top = y + 15 + "px";

            console.log(x, y);

            showDesc($item);
        });
    });
});

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const header = document.getElementById(element.id + "Header");

    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

makeDraggable(document.getElementById("desc-popup"));

document.addEventListener('DOMContentLoaded', () => {
    navbar = document.querySelectorAll('.on-home');
    section = document.querySelectorAll('.section');
    
    for (let i = 0; i < navbar.length; i++) {
        console.log(i);
        console.log(navbar[i]);
        navbar[i].addEventListener('click', () => {
            window.scrollTo({
                top: section[i].getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        })
    }
});