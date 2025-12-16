/**
 * API Handling Module
 * Replace BASE_URL with your actual API endpoint.
 * If you don't have a backend, this will fail.
 *
 * Expected API Structure:
 * GET /notes
 * POST /notes
 * PUT /notes/:id
 * DELETE /notes/:id
 */

// Placeholder URL - User needs to update this or I can use a local mock if requested.
// Since user provided a Postman link, I'll assume there is a real URL they want to use.
// For now, I'll use a placeholder that clearly indicates usage.
const BASE_URL = 'https://0d4c8194-63ba-411a-a5c5-405dfb919883.mock.pstmn.io/';

const api = {

  // Update a note
  async updateNote(id, note) {
    // try {
    //   const response = await fetch(`${BASE_URL}/notes/${id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(note)
    //   });
    //   return await response.json();
    // } catch (error) { ... }

    // Mock Response
    console.log('Updating note:', id, note);
    return new Promise(resolve => setTimeout(() => resolve({ id, ...note, updatedAt: new Date().toISOString() }), 500));
  },


};


// single res
export async function getAllNotes() {

  const res = await fetch(`${BASE_URL}notes`);

  return await res.json();
}


export async function createNote(note) {

  const req = await fetch(`${BASE_URL}notes` , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note)
  });
}

export async function deleteNote(id) {
  const req = await fetch(`${BASE_URL}notes/${id}`, {
    method: "DELETE",
  });
}


export async function updateNote(id , note) {

  const req = await fetch(`${BASE_URL}notes/${id}` , {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note)
  });
}


































