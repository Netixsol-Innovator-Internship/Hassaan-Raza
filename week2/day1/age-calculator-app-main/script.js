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
      day_error = document.getElementById('day_error');
      day_error.innerText = "Must be in the past";
      day_error.classList.remove('hidden');
      redErrorBox();
      return;
    }

    // Calculate age
    let age_year = current_year - user_year;
    let age_month = current_month - user_month;
    let age_day = current_date - user_date;

    // Handle negative months/days
    if (age_month < 0 || (age_month === 0 && age_day < 0)) {
      age_year--;
      age_month += 12;
    }
    if (age_day < 0) {
      let daysInLastMonth = new Date(current_year, current_month - 1, 0).getDate();
      age_day += daysInLastMonth;
      age_month--;
    }

    // Update the UI
    document.getElementById('year-span').innerText = age_year;
    document.getElementById('month-span').innerText = age_month;
    document.getElementById('day-span').innerText = age_day;
  }

  function checkDateFormat(date) {
    date = Number(date);
    return (date >= 1 && date <= 31);
  }

  function checkMonthFormat(m) {
    m = Number(m);
    return (m >= 1 && m <= 12);
  }

  function checkYearFormat(y, current_y) {
    y = Number(y);
    return (y >= 1 && y <= current_y);
  }

  function formatErrorChecker(d, m, y, c_year) {
    let dayValid = checkDateFormat(d);
    let monthValid = checkMonthFormat(m);
    let yearValid = checkYearFormat(y, c_year);
    
    if (dayValid && monthValid && yearValid) {
      return true;
    }
    else {
      if (!dayValid) {
        day_error = document.getElementById('day_error');
        day_error.innerText = "Must be a valid day";
        day_error.classList.remove('hidden');
        redErrorBox();
      }

      if (!monthValid) {
        month_error = document.getElementById('month_error');
        month_error.innerText = "Must be a valid month";
        month_error.classList.remove('hidden');
        redErrorBox();
      }
      if (!yearValid) {
        year_error = document.getElementById('year_error');
        year_error.innerText = "Must be a valid year";
        year_error.classList.remove('hidden');
        redErrorBox();
      }
      return false;
    }
  }

  function checkEmptyField(d, m, y) {
    if (d === "" || m === "" || y === "") {
      if (d === "") {
        day_error = document.getElementById('day_error');
        day_error.innerText = "This field is required";
        day_error.classList.remove('hidden');
        redErrorBox();
      }

      if (m === "") {
        month_error = document.getElementById('month_error');
        month_error.innerText = "This field is required";
        month_error.classList.remove('hidden');
        redErrorBox();
      }

      if (y === "") {
        year_error = document.getElementById('year_error');
        year_error.innerText = "This field is required";
        year_error.classList.remove('hidden');
        redErrorBox();
      }
      return true;
    }
    return false;
  }

  function redErrorBox() {
    document.getElementById('in_day').classList.add('border-red-400');
    document.getElementById('in_month').classList.add('border-red-400');
    document.getElementById('in_year').classList.add('border-red-400');

    document.getElementById('lbl_day').classList.add('text-red-400');
    document.getElementById('lbl_month').classList.add('text-red-400');
    document.getElementById('lbl_year').classList.add('text-red-400');
  }

  function validateDate(d, m, y) {
    d = Number(d);
    m = Number(m);
    y = Number(y);

    // Check if month has 31 days
    const is31DayMonth = [1, 3, 5, 7, 8, 10, 12].includes(m);
    // Check if month has 30 days
    const is30DayMonth = [4, 6, 9, 11].includes(m);

    // February check
    if (m === 2) {
      // Leap year check for February
      const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
      if (isLeapYear && d > 29) {
        return false;
      }
      if (!isLeapYear && d > 28) {
        return false;
      }
    }
    // 30-day month check
    else if (is30DayMonth && d > 30) {
      return false;
    }
    // 31-day month check is implicit
    return true;
  }