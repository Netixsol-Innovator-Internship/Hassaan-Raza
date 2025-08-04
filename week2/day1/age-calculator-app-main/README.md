# 📅 Age Calculator App

A simple, responsive **Age Calculator** that takes a birth date and outputs the age in years, months, and days with validation and smooth animation.

🔗 **Live Demo**: [https://hassaan-week2-day1-age-calc.vercel.app/](https://hassaan-week2-day1-age-calc.vercel.app/)  

---

## 🚀 Features
- Responsive design for mobile and desktop.  
- Input validation (empty fields, valid day/month/year, future date prevention).  
- Leap year-aware date validation.  
- Animated result display.  
- Clear error messaging with visual cues.  

---

## 🛠️ Tech Stack
- HTML5  
- Tailwind CSS + custom CSS  
- Vanilla JavaScript  

---

## 💡 How It Works (`script.js`)

The core function `calculate_age()` performs:
1. **Resetting previous error states** (removes red indicators).  
2. **Fetching current date** and user input (day, month, year).  
3. **Validating inputs**:
   - Ensures no empty fields.  
   - Checks format ranges: day ∈ [1,31], month ∈ [1,12], year ≤ current year.  
   - Validates the combination (e.g., February with leap year logic, 30/31-day months).  
   - Disallows future birth dates.  
4. **Age computation**:
   - Subtracts user birth date from current date, adjusting for negative month/day deltas by borrowing appropriately.  
5. **UI update**: populates the result spans (`year-span`, `month-span`, `day-span`).

Helper functions:
- `checkDateFormat`, `checkMonthFormat`, `checkYearFormat`: range checks.  
- `formatErrorChecker`: aggregates format validation and shows specific messages.  
- `checkEmptyField`: flags missing inputs.  
- `validateDate`: ensures the day-month-year combination is calendar-valid (with leap-year logic).  
- `redErrorBox`: highlights all input labels/fields in red when any validation fails.

### Script (copy into `script.js`)
```javascript
function calculate_age() {
  // Reset error states
  document.getElementById('in_day').classList.remove('border-red-400');
  document.getElementById('in_month').classList.remove('border-red-400');
  document.getElementById('in_year').classList.remove('border-red-400');
  document.getElementById('lbl_day').classList.remove('text-red-400');
  document.getElementById('lbl_month').classList.remove('text-red-400');
  document.getElementById('lbl_year').classList.remove('text-red-400');

  document.getElementById('day_error').classList.add('hidden');
  document.getElementById('month_error').classList.add('hidden');
  document.getElementById('year_error').classList.add('hidden');

  // Get current date
  let current = new Date();
  let current_date = current.getDate();
  let current_month = current.getMonth() + 1;
  let current_year = current.getFullYear();

  // Get user input
  let user_date = document.getElementById('in_day').value;
  let user_month = document.getElementById('in_month').value;
  let user_year = document.getElementById('in_year').value;

  // Check for empty fields
  if (checkEmptyField(user_date, user_month, user_year)) {
    return false;
  }

  // Check formats
  if (!formatErrorChecker(user_date, user_month, user_year, current_year)) {
    return false;
  }

  // Convert to numbers
  user_date = Number(user_date);
  user_month = Number(user_month);
  user_year = Number(user_year);

  // Validate date (day/month/year combination)
  if (!validateDate(user_date, user_month, user_year)) {
    day_error = document.getElementById('day_error');
    day_error.innerText = "Must be a valid date";
    day_error.classList.remove('hidden');
    redErrorBox();
    return;
  }

  // Check if birth date is in the future
  if (user_year > current_year || 
      (user_year === current_year && user_month > current_month) || 
      (user_year === current_year && user_month === current_month && user_date > current_date)) {
    day_error = document.getElementBy_
