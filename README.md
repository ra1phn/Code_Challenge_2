# Code_Challenge_2#

## 🥳 Event Guest List Manager

This project is a dynamic web app built with JavaScript, HTML, and CSS that allows you to manage an event guest list in real-time — all without page refreshes.

---

### Learning Goals

- Build a fully interactive guest list manager
- Use `event.preventDefault()` to stop page reload on form submission
- Update the DOM dynamically with JavaScript
- Structure code using HTML, CSS, and JS best practices

---

### App Structure

| File          | Purpose                              |
|---------------|--------------------------------------|
| `index.html`  | Basic HTML layout                    |
| `style.css`   | All custom styling and responsive UI |
| `src/index.js`| JS logic for interactivity           |

---

### Features Implemented

#### Core Features

- **Add a guest** by typing their name and clicking "Submit"
- **Display guest name** in a styled list with:
  - RSVP status toggle (Attending / Not Attending)
  - Guest category tag (Friend / Family / Colleague)
  - Time the guest was added
  - "Edit" button to change name
  - "Remove" button to delete guest
- **Limit guest list to 10 people**  
  - Automatically disables the form once the limit is reached
  - Shows an alert if a user tries to exceed it
- **Remaining Slots Counter**
  - Starts at 1, not 0
  - Displays: `x remaining slots`

---

### 🖌️ UI & Styling

- Elegant card-style layout using soft blue-themed color palette
- Responsive table-style list with hover effects
- Color-coded guest tags.
- Smooth interactions with buttons and form inputs
- Reduced container height from 373px to 450px width while keeping a clean aspect ratio

---

### 📋 Example Interaction

>  You enter: `Susan`  
>  Choose: `Family`  
>  List shows:  
```
1. Susan — Family — Attending — [📝 Edit] [❌ Remove]  
   Added: 10:32 AM  
```

>  Click "Attending" to toggle  
```
Alice — Not Attending
```

>  Edit her name to `Alicia`

>  Guest count updates  
```
7 remaining slots
```

>  Add 11th guest →  
```
⚠️ Alert: Guest limit reached! You can only add up to 10 people.
```

---

###  Testing Strategy

Manual browser testing was used to confirm functionality:
- Console logging during development
- Input validations
- Limit checks
- Edge cases (empty input, editing while full, etc.)

---

###  Stretch Features Completed

- Categorize guests by type (Friend, Family, Colleague)
- Display time of guest addition
- Edit button for guest names
- Remaining slots counter (starts at 1, not 0)
- Disabled form when limit is hit
- Stylish, responsive design

---

### Submission

Code is pushed to GitHub and ready for deployment or presentation.

---

### Author

Ralph Njuguna  
Moringa School | Fullstack Student  
GitHub: [@ra1phn](https://github.com/ra1phn)

---