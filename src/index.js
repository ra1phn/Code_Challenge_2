const form = document.querySelector('form');
const guestNameInput = document.getElementById('guestName');
const categorySelect = document.getElementById('category');
const tableBody = document.getElementById('tableBody');
const slotInfo = document.getElementById('slotInfo');
const undoContainer = document.getElementById('undoContainer');

// Store guests by category
const guestData = {
  family: [],
  friends: [],
  colleagues: []
};

// Temporarily store the last deleted guest
let recentlyDeleted = null;

// Capitalize the first letter of each word in the name
function capitalizeEachWord(name) {
  return name
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

// Update remaining slots info when category is selected
categorySelect.addEventListener('change', () => {
  const category = categorySelect.value;
  if (category && guestData[category]) {
    const remaining = 10 - guestData[category].length;
    slotInfo.textContent = `${remaining} remaining slot${remaining === 1 ? '' : 's'}`;
  } else {
    slotInfo.textContent = '';
  }
});


// Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const guestName = capitalizeEachWord(guestNameInput.value.trim());
  const category = categorySelect.value;

  if (!guestName || !category) {
    alert('Please enter a valid guest name and select a category.');
    return;
  }

  if (guestData[category].length >= 10) {
    alert(`The ${category} list is full. Only 10 guests allowed.`);
    return;
  }

  const guest = {
    name: guestName,
    category,
    rsvp: '',
    timeAdded: new Date().toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  guestData[category].push(guest);
  updateTable();
  form.reset();
  slotInfo.textContent = ''; // Clear slot info after submit
});

// Update the guest table based on current data
function updateTable() {
  tableBody.innerHTML = '';
  undoContainer.innerHTML = ''; // Clear undo if table is redrawn

  const allGuests = [];

  Object.keys(guestData).forEach(category => {
    guestData[category].forEach(guest => {
      allGuests.push({ ...guest });
    });
  });

  allGuests.forEach((guest, index) => {
    const row = document.createElement('tr');
    row.classList.add(`${guest.category}-row`);

    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="guest-name">${guest.name}</td>
      <td>${guest.timeAdded}</td>
      <td>${guest.category.charAt(0).toUpperCase() + guest.category.slice(1)}</td>
      <td>
        <select class="rsvpSelect">
          <option value="" disabled ${guest.rsvp === '' ? 'selected' : ''} hidden>Pending</option>
          <option value="Attending" ${guest.rsvp === 'Attending' ? 'selected' : ''}>Attending</option>
          <option value="Not Attending" ${guest.rsvp === 'Not Attending' ? 'selected' : ''}>Not Attending</option>
        </select>
      </td>
      <td>
        <button class="editBtn" type="button">Edit</button>
        <button class="deleteBtn" type="button">Delete</button>
      </td>
    `;

    // Handle RSVP changes
    row.querySelector('.rsvpSelect').addEventListener('change', function () {
      guest.rsvp = this.value;
    });

    // Handle guest deletion
    row.querySelector('.deleteBtn').addEventListener('click', function () {
      const index = guestData[guest.category].findIndex(g =>
        g.name === guest.name && g.timeAdded === guest.timeAdded
      );

      if (index !== -1) {
        recentlyDeleted = guestData[guest.category].splice(index, 1)[0];
        updateTable();
        showUndoOption();
      }
    });

    // Handle editing guest name
    row.querySelector('.editBtn').addEventListener('click', function () {
      const nameCell = row.querySelector('.guest-name');
      const oldName = nameCell.textContent;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = oldName;
      nameCell.textContent = '';
      nameCell.appendChild(input);
      input.focus();

      input.addEventListener('blur', () => {
        const newName = capitalizeEachWord(input.value.trim());
        if (newName) {
          nameCell.textContent = newName;
          guest.name = newName;
        } else {
          nameCell.textContent = oldName;
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') input.blur();
      });
    });

    tableBody.appendChild(row);
  });
}

// Show undo delete button
function showUndoOption() {
  if (!recentlyDeleted) return;

  const undoBtn = document.createElement('button');
  undoBtn.textContent = `Undo Delete: ${recentlyDeleted.name}`;
  undoBtn.addEventListener('click', () => {
    guestData[recentlyDeleted.category].push(recentlyDeleted);
    recentlyDeleted = null;
    updateTable();
  });

  undoContainer.appendChild(undoBtn);
}
