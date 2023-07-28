const addButton = document.querySelector("#add");

function saveLocal() {
  const allTextArea = document.querySelectorAll(".textarea");
  let notes = [];
  allTextArea.forEach((element) => {
    return notes.push(element.value);
  });
  localStorage.setItem("Notes", JSON.stringify(notes));
}

function createNewNote(text = "", time = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  const html = `<div class="operation">
    <div class="time-stamp"></div>
    <div>
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
  </div>

  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="textarea ${text ? "hidden" : ""}"></textarea>`;
  note.insertAdjacentHTML("afterbegin", html);

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector(".textarea");
  const timeStamp = note.querySelector(".time-stamp");
  let date = new Date("July 21, 1983 01:15:00");
  timeStamp.innerHTML = time;
  mainDiv.innerHTML = text;
  textarea.value = text;

  deleteButton.addEventListener("click", () => {
    note.remove();
    saveLocal();
  });

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("change", (e) => {
    const value = e.target.value;
    mainDiv.innerHTML = value;

    saveLocal();
  });
  document.body.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem("Notes"));

if (notes) {
  notes.forEach((element) => {
    createNewNote(element, 0);
  });
}

addButton.addEventListener("click", () => createNewNote());
