const noteEditor = document.querySelector('.note-editor');
const saveButton = noteEditor.querySelector('button');
const textarea = noteEditor.querySelector('textarea');
const noteList = document.querySelector('.notes-list ul');
const newNoteButton = document.getElementById('new-note-button');
const settingsLink = document.getElementById('settings-link');
const saveThemeBtn = document.getElementById('save-theme-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

let currentNote = '';
let notes = JSON.parse(localStorage.getItem('notes')) || [];

textarea.addEventListener('paste', handlePaste);
saveButton.addEventListener('click', saveNote);
newNoteButton.addEventListener('click', createNewNote);
settingsLink.addEventListener('click', showSettingsModal);
saveThemeBtn.addEventListener('click', saveTheme);
closeModalBtn.addEventListener('click', hideSettingsModal);

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
}

function saveTheme() {
  const themeSelect = document.getElementById('theme-select');
  const themeValue = themeSelect.value;
  localStorage.setItem('theme', themeValue);
  applyTheme(themeValue);
  hideSettingsModal();
}

function applyTheme(themeValue) {
  document.body.classList.toggle('dark-theme', themeValue === 'dark');
}

function handlePaste(event) {
  event.preventDefault();
  textarea.value = event.clipboardData.getData('text');
}

function saveNote() {
  const noteText = textarea.value.trim();
  if (noteText) {
    const note = {
      text: noteText,
      id: Date.now()
    };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    const noteListItem = document.createElement('li');
    noteListItem.textContent = noteText;
    noteListItem.dataset.id = note.id;
    noteList.appendChild(noteListItem);
    textarea.value = '';
  }
}

function createNewNote() {
  const noteListItem = document.createElement('li');
  noteListItem.textContent = '';
  noteList.appendChild(noteListItem);
  textarea.focus();
}

function showSettingsModal() {
  const settingsModal = document.getElementById('settings-modal');
  settingsModal.classList.add('show');
}

function hideSettingsModal() {
  const settingsModal = document.getElementById('settings-modal');
  settingsModal.classList.remove('show');
}

// Adicionei essa função para carregar as notas salvas no localStorage
function loadNotes() {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notes = JSON.parse(savedNotes);
    notes.forEach((note) => {
      const noteListItem = document.createElement('li');
      noteListItem.textContent = note.text;
      noteListItem.dataset.id = note.id;
      noteList.appendChild(noteListItem);
    });
  }
}

loadNotes();