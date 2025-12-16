// App Logic
import {getAllNotes , createNote , deleteNote , updateNote} from "./apiCalling.js";
// State
let notes = [];
let noteToDeleteId = null;

// DOM Elements
const notesGrid = document.getElementById('notes-grid');
const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const openCreateModalBtn = document.getElementById('open-create-modal');

// Modals
const createModal = document.getElementById('create-modal');
const updateModal = document.getElementById('update-modal');
const deleteModal = document.getElementById('delete-modal');

// Forms
const createForm = document.getElementById('create-note-form');
const updateForm = document.getElementById('update-note-form');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderNotes();
  setupEventListeners();
});

function setupEventListeners() {
  // Modal Toggles
  openCreateModalBtn.addEventListener('click', () => openModal(createModal));

  // Close Modals (X buttons and Cancel buttons)
  document.querySelectorAll('.close-modal, .close-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
       const modal = e.target.closest('.modal-overlay');
       closeModal(modal);
    });
  });

  // Close on outside click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target);
    }
  });

  // Forms
  createForm.addEventListener('submit', handleCreateNote);
  updateForm.addEventListener('submit', handleUpdateNote);
  confirmDeleteBtn.addEventListener('click', handleDeleteNote);
}

// Actions
async function fetchAndRenderNotes() {
  showLoading(true);
  try {
    const data = await getAllNotes();
    notes = data.notes; // Assuming API returns { notes: [] }
    renderNotes();
  } catch (error) {
    console.error('Failed to load notes', error);
    // Show error toast or message
  } finally {
    showLoading(false);
  }
}

async function handleCreateNote($event) {
  $event.preventDefault();
  const formData   = new FormData(createForm);
  const newNote = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  try {

    await createNote(newNote);

    // Re-fetch to be safe and consistent with data source
    await fetchAndRenderNotes();

    closeModal(createModal);
    createForm.reset();
  } catch (error) {
    console.error('Failed to create note', error);
  }
}

async function handleUpdateNote(e) {
  e.preventDefault();
  const formData = new FormData(updateForm);
  const id = formData.get('id');
  const updatedNote = {
    title: formData.get('title'),
    content: formData.get('content')
  };


  try {
    await updateNote(id, updatedNote);
    await fetchAndRenderNotes();
    closeModal(updateModal);
  } catch (error) {
    console.error('Failed to update note', error);
  }
}

async function handleDeleteNote() {
  if (!noteToDeleteId) return;

  try {
    await deleteNote(noteToDeleteId);
    await fetchAndRenderNotes();
    closeModal(deleteModal);
    noteToDeleteId = null;
  } catch (error) {
    console.error('Failed to delete note', error);
  }
}

// UI Functions
function renderNotes() {
  notesGrid.innerHTML = '';

  if (notes.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  notes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
      <h3 class="note-title">${escapeHtml(note.title)}</h3>
      <p class="note-content">${escapeHtml(note.content)}</p>
      <div class="note-footer">
        <span class="note-date">${formatDate(note.createdAt || note.updatedAt)}</span>
        <div class="note-actions">
          <button class="btn-icon edit-btn" data-id="${note.id}" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-sm">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          <button class="btn-icon delete-btn" data-id="${note.id}" title="Delete">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-sm">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    `;

    // Attach event listeners to buttons
    const editBtn = card.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => openUpdateModal(note));

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => openDeleteModal(note.id, note.title));

    notesGrid.appendChild(card);
  });
}

function openModal(modal) {
  modal.classList.remove('hidden');
}

function closeModal(modal) {
  modal.classList.add('hidden');
}

function openUpdateModal(note) {
  document.getElementById('update-id').value = note.id;
  document.getElementById('update-title').value = note.title;
  document.getElementById('update-content').value = note.content;
  openModal(updateModal);
}

function openDeleteModal(id, title) {
  noteToDeleteId = id;
  document.getElementById('delete-note-title').textContent = title || 'Untitled Note';
  openModal(deleteModal);
}

function showLoading(isLoading) {
  if (isLoading) {
    loadingState.classList.remove('hidden');
    notesGrid.classList.add('hidden');
    emptyState.classList.add('hidden');
  } else {
    loadingState.classList.add('hidden');
    notesGrid.classList.remove('hidden');
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
