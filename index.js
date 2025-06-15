const form = document.querySelector('form');
const guestNameInput = document.getElementById('guestName');
const categorySelect = document.getElementById('category');

const familyTableBody = document.getElementById('familyTableBody');
const friendsTableBody = document.getElementById('friendsTableBody');
const colleaguesTableBody = document.getElementById('colleaguesTableBody');

// Guest data storage
let guestId = 1;
const guestData = {
  family: [],
  friends: [],
  colleagues: []
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const guestName = guestNameInput.value.trim();
  const category = categorySelect.value;

  // Basic validation
  if (!guestName || category === 'Choose Category') {
    alert('Please enter a valid guest name and select a category.');
    return;
  }

  // Check if category is full
  if (guestData[category].length >= 10) {
    alert(`The ${category} list is full. Only 10 guests allowed per category.`);
    return;
  }

  // Create guest object
  const guest = {
    name: guestName,
    rsvp: 'Pending',
    timeAdded: new Date().toLocaleString([], { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };

  // Add to the right category array
  guestData[category].push(guest);

  // Update table
  updateTable(category);

  // Clear form
  form.reset();
});

function updateTable(category) {
  let tableBody;

  switch (category) {
    case 'family':
      tableBody = familyTableBody;
      break;
    case 'friends':
      tableBody = friendsTableBody;
      break;
    case 'colleagues':
      tableBody = colleaguesTableBody;
      break;
    default:
      return;
  }

  // Clear and re-render
  tableBody.innerHTML = '';

  guestData[category].forEach(guest => {
    const row = document.createElement('tr');

    // In updateTable, update row template:
    row.innerHTML = `
      <td>${guest.timeAdded}</td>
      <td>${guest.name}</td>
      <td>
        <select class="rsvpSelect">
          <option value="Pending" disabled ${guest.rsvp === 'Pending' ? 'selected' : ''} hidden>Pending</option>
          <option value="Attending" ${guest.rsvp === 'Attending' ? 'selected' : ''}>Attending</option>
          <option value="Not Attending" ${guest.rsvp === 'Not Attending' ? 'selected' : ''}>Not Attending</option>
        </select>
      </td>
    `;

    const select = row.querySelector('.rsvpSelect');
    select.addEventListener('change', () => {
      guest.rsvp = select.value;
    });

    tableBody.appendChild(row);
  });
}
