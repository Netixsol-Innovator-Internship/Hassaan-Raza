// Quiz data structure
const quizData = [
    {
        id: 'html-basics',
        title: 'HTML Basics',
        category: 'HTML',
        description: 'Test your knowledge of HTML fundamentals',
        image: 'assets/img/html.jpeg',
        featured: true,
        questions: [
            {
                id: 1,
                question: 'What does HTML stand for?',
                options: [
                    'Hyper Text Markup Language',
                    'High Tech Modern Language',
                    'Home Tool Markup Language',
                    'Hyperlink and Text Markup Language'
                ],
                correct: 0
            },
            {
                id: 2,
                question: 'Which HTML element is used for the largest heading?',
                options: ['<h6>', '<h1>', '<heading>', '<header>'],
                correct: 1
            },
            {
                id: 3,
                question: 'What is the correct HTML element for inserting a line break?',
                options: ['<break>', '<br>', '<lb>', '<newline>'],
                correct: 1
            },
            {
                id: 4,
                question: 'Which attribute is used to specify the URL of a link?',
                options: ['src', 'link', 'href', 'url'],
                correct: 2
            },
            {
                id: 5,
                question: 'What is the correct HTML for creating a hyperlink?',
                options: [
                    '<a url="http://www.example.com">Example</a>',
                    '<a href="http://www.example.com">Example</a>',
                    '<a>http://www.example.com</a>',
                    '<link>http://www.example.com</link>'
                ],
                correct: 1
            },
            {
                id: 6,
                question: 'Which HTML element defines the title of a document?',
                options: ['<meta>', '<title>', '<head>', '<header>'],
                correct: 1
            },
            {
                id: 7,
                question: 'What is the correct HTML for making a checkbox?',
                options: [
                    '<input type="check">',
                    '<input type="checkbox">',
                    '<checkbox>',
                    '<check>'
                ],
                correct: 1
            },
            {
                id: 8,
                question: 'Which HTML element is used to specify a footer for a document?',
                options: ['<bottom>', '<section>', '<footer>', '<foot>'],
                correct: 2
            },
            {
                id: 9,
                question: 'What is the correct HTML for inserting an image?',
                options: [
                    '<img href="image.gif" alt="MyImage">',
                    '<img src="image.gif" alt="MyImage">',
                    '<image src="image.gif" alt="MyImage">',
                    '<img alt="MyImage">image.gif</img>'
                ],
                correct: 1
            },
            {
                id: 10,
                question: 'Which HTML attribute specifies an alternate text for an image?',
                options: ['title', 'alt', 'src', 'longdesc'],
                correct: 1
            }
        ]
    },
    {
        id: 'css-fundamentals',
        title: 'CSS Fundamentals',
        category: 'CSS',
        description: 'Master the basics of CSS styling',
        image: 'assets/img/css.png',
        featured: true,
        questions: [
            {
                id: 1,
                question: 'What does CSS stand for?',
                options: [
                    'Creative Style Sheets',
                    'Cascading Style Sheets',
                    'Computer Style Sheets',
                    'Colorful Style Sheets'
                ],
                correct: 1
            },
            {
                id: 2,
                question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
                options: [
                    'In the <body> section',
                    'In the <head> section',
                    'At the end of the document',
                    'At the beginning of the document'
                ],
                correct: 1
            },
            {
                id: 3,
                question: 'Which HTML tag is used to define an internal style sheet?',
                options: ['<style>', '<css>', '<script>', '<link>'],
                correct: 0
            },
            {
                id: 4,
                question: 'Which CSS property is used to change the text color of an element?',
                options: ['text-color', 'fgcolor', 'color', 'font-color'],
                correct: 2
            },
            {
                id: 5,
                question: 'Which CSS property controls the text size?',
                options: ['font-style', 'text-size', 'font-size', 'text-style'],
                correct: 2
            },
            {
                id: 6,
                question: 'What is the correct CSS syntax for making all the <p> elements bold?',
                options: [
                    'p {text-size:bold;}',
                    'p {font-weight:bold;}',
                    '<p style="font-size:bold;">',
                    'p {font-style:bold;}'
                ],
                correct: 1
            },
            {
                id: 7,
                question: 'How do you display hyperlinks without an underline?',
                options: [
                    'a {text-decoration:none;}',
                    'a {underline:none;}',
                    'a {decoration:no-underline;}',
                    'a {text-decoration:no-underline;}'
                ],
                correct: 0
            },
            {
                id: 8,
                question: 'Which property is used to change the background color?',
                options: ['color', 'bgcolor', 'background-color', 'bg-color'],
                correct: 2
            },
            {
                id: 9,
                question: 'How do you make each word in a text start with a capital letter?',
                options: [
                    'text-transform:capitalize',
                    'text-style:capitalize',
                    'transform:capitalize',
                    'text-decoration:capitalize'
                ],
                correct: 0
            },
            {
                id: 10,
                question: 'Which CSS property is used to change the font of an element?',
                options: ['font-family', 'font-style', 'font-weight', 'font-size'],
                correct: 0
            }
        ]
    },
    {
        id: 'javascript-basics',
        title: 'JavaScript Basics',
        category: 'JavaScript',
        description: 'Learn JavaScript fundamentals and syntax',
        image: 'assets/img/js.png',
        featured: false,
        questions: [
            {
                id: 1,
                question: 'Inside which HTML element do we put the JavaScript?',
                options: ['<javascript>', '<js>', '<script>', '<scripting>'],
                correct: 2
            },
            {
                id: 2,
                question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
                options: [
                    '<script href="xxx.js">',
                    '<script name="xxx.js">',
                    '<script src="xxx.js">',
                    '<script file="xxx.js">'
                ],
                correct: 2
            },
            {
                id: 3,
                question: 'How do you write "Hello World" in an alert box?',
                options: [
                    'alertBox("Hello World");',
                    'msg("Hello World");',
                    'alert("Hello World");',
                    'msgBox("Hello World");'
                ],
                correct: 2
            },
            {
                id: 4,
                question: 'How do you create a function in JavaScript?',
                options: [
                    'function = myFunction() {}',
                    'function myFunction() {}',
                    'create myFunction() {}',
                    'function:myFunction() {}'
                ],
                correct: 1
            },
            {
                id: 5,
                question: 'How do you call a function named "myFunction"?',
                options: [
                    'call function myFunction()',
                    'call myFunction()',
                    'myFunction()',
                    'Call.myFunction()'
                ],
                correct: 2
            },
            {
                id: 6,
                question: 'How to write an IF statement in JavaScript?',
                options: [
                    'if i == 5 then',
                    'if i = 5 then',
                    'if (i == 5)',
                    'if i = 5'
                ],
                correct: 2
            },
            {
                id: 7,
                question: 'Which operator is used to assign a value to a variable?',
                options: ['*', '=', '-', 'x'],
                correct: 1
            },
            {
                id: 8,
                question: 'What will the following code return: Boolean(10 > 9)',
                options: ['true', 'false', 'NaN', 'undefined'],
                correct: 0
            },
            {
                id: 9,
                question: 'Is JavaScript case-sensitive?',
                options: ['No', 'Yes', 'Sometimes', 'Depends on the browser'],
                correct: 1
            },
            {
                id: 10,
                question: 'Which method can be used to find the length of a string?',
                options: ['length()', 'size()', 'length', 'getSize()'],
                correct: 2
            }
        ]
    },
    {
        id: 'react-fundamentals',
        title: 'React Fundamentals',
        category: 'React',
        description: 'Test your React knowledge and concepts',
        image: 'assets/img/react.jpeg',
        featured: true,
        questions: [
            {
                id: 1,
                question: 'What is React?',
                options: [
                    'A JavaScript library for building user interfaces',
                    'A database management system',
                    'A web server',
                    'A CSS framework'
                ],
                correct: 0
            },
            {
                id: 2,
                question: 'Which method in a React Component is called after the component is rendered for the first time?',
                options: [
                    'componentDidMount',
                    'componentDidUpdate',
                    'componentWillMount',
                    'componentWillUpdate'
                ],
                correct: 0
            },
            {
                id: 3,
                question: 'What is JSX?',
                options: [
                    'A JavaScript extension',
                    'A syntax extension for JavaScript',
                    'A CSS preprocessor',
                    'A database query language'
                ],
                correct: 1
            },
            {
                id: 4,
                question: 'How do you create a React component?',
                options: [
                    'React.createComponent()',
                    'new React.Component()',
                    'class MyComponent extends React.Component',
                    'React.component()'
                ],
                correct: 2
            },
            {
                id: 5,
                question: 'What is the correct way to update state in React?',
                options: [
                    'this.state = newState',
                    'this.setState(newState)',
                    'this.updateState(newState)',
                    'this.changeState(newState)'
                ],
                correct: 1
            },
            {
                id: 6,
                question: 'What are props in React?',
                options: [
                    'Properties passed to components',
                    'State variables',
                    'CSS classes',
                    'HTML attributes'
                ],
                correct: 0
            },
            {
                id: 7,
                question: 'Which hook is used to manage state in functional components?',
                options: ['useEffect', 'useState', 'useContext', 'useReducer'],
                correct: 1
            },
            {
                id: 8,
                question: 'What is the virtual DOM?',
                options: [
                    'A copy of the real DOM kept in memory',
                    'A new version of HTML',
                    'A CSS framework',
                    'A JavaScript library'
                ],
                correct: 0
            },
            {
                id: 9,
                question: 'How do you handle events in React?',
                options: [
                    'Using addEventListener',
                    'Using inline event handlers',
                    'Using SyntheticEvents',
                    'All of the above'
                ],
                correct: 2
            },
            {
                id: 10,
                question: 'What is the purpose of keys in React lists?',
                options: [
                    'To style list items',
                    'To help React identify which items have changed',
                    'To sort the list',
                    'To filter the list'
                ],
                correct: 1
            }
        ]
    },
    {
        id: 'web-development',
        title: 'Web Development Concepts',
        category: 'General',
        description: 'General web development knowledge and best practices',
        image: 'assets/img/cover.png',
        featured: false,
        questions: [
            {
                id: 1,
                question: 'What does HTTP stand for?',
                options: [
                    'HyperText Transfer Protocol',
                    'High Tech Transfer Protocol',
                    'HyperText Transport Protocol',
                    'Home Transfer Text Protocol'
                ],
                correct: 0
            },
            {
                id: 2,
                question: 'Which HTTP status code indicates a successful request?',
                options: ['404', '500', '200', '301'],
                correct: 2
            },
            {
                id: 3,
                question: 'What is the purpose of the DOCTYPE declaration?',
                options: [
                    'To specify the document type and version',
                    'To include CSS styles',
                    'To add JavaScript functionality',
                    'To create a database connection'
                ],
                correct: 0
            },
            {
                id: 4,
                question: 'What is responsive web design?',
                options: [
                    'Design that responds to user clicks',
                    'Design that adapts to different screen sizes',
                    'Design with fast loading times',
                    'Design with interactive elements'
                ],
                correct: 1
            },
            {
                id: 5,
                question: 'Which of the following is a CSS framework?',
                options: ['React', 'Bootstrap', 'Node.js', 'MongoDB'],
                correct: 1
            },
            {
                id: 6,
                question: 'What is the purpose of version control systems like Git?',
                options: [
                    'To track changes in code',
                    'To compile code',
                    'To run tests',
                    'To deploy applications'
                ],
                correct: 0
            },
            {
                id: 7,
                question: 'What is an API?',
                options: [
                    'Application Programming Interface',
                    'Automated Program Integration',
                    'Advanced Programming Instructions',
                    'Application Process Integration'
                ],
                correct: 0
            },
            {
                id: 8,
                question: 'Which of the following is a NoSQL database?',
                options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
                correct: 2
            },
            {
                id: 9,
                question: 'What is the purpose of minification in web development?',
                options: [
                    'To reduce file size',
                    'To add comments',
                    'To format code',
                    'To add functionality'
                ],
                correct: 0
            },
            {
                id: 10,
                question: 'What is CORS?',
                options: [
                    'Cross-Origin Resource Sharing',
                    'Cross-Origin Request Security',
                    'Common Origin Resource System',
                    'Cross-Origin Response Standard'
                ],
                correct: 0
            }
        ]
    }
];

// Features data
const features = [
    {
        icon: 'assets/img/ico-timer.png',
        title: 'Timed Quizzes',
        description: 'Challenge yourself with timed quizzes to test your speed and accuracy.'
    },
    {
        icon: 'assets/img/ico-timer.png',
        title: 'Multiple Categories',
        description: 'Choose from various categories including HTML, CSS, JavaScript, and more.'
    },
    {
        icon: 'assets/img/ico-timer.png',
        title: 'Progress Tracking',
        description: 'Track your progress and see how you improve over time.'
    }
];

// Application state
const appState = {
    currentUser: null,
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: [],
    quizTimer: null,
    quizStartTime: null,
    selectedCategory: 'All'
};

// User management
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

function saveUser(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    appState.currentUser = userData;
}

function getUserHistory() {
    const history = localStorage.getItem('quizHistory');
    return history ? JSON.parse(history) : [];
}

function saveQuizResult(result) {
    const history = getUserHistory();
    history.push(result);
    localStorage.setItem('quizHistory', JSON.stringify(history));
}

// Section management
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Show the requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Update header visibility
    const mainHeader = document.getElementById('main-header');
    const simpleHeader = document.getElementById('simple-header');
    
    if (['signup', 'signin', 'quiz', 'review-answers'].includes(sectionId)) {
        mainHeader.classList.add('hidden');
        simpleHeader.classList.remove('hidden');
    } else {
        mainHeader.classList.remove('hidden');
        simpleHeader.classList.add('hidden');
    }

    // Load section-specific content
    switch (sectionId) {
        case 'landing':
            writeFeatures();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'quiz-selection':
            loadQuizSelection();
            break;
        case 'quiz-results':
            loadQuizResults();
            break;
        case 'review-answers':
            loadReviewAnswers();
            break;
        case 'leaderboard':
            loadLeaderboard();
            break;
    }
}

// Authentication functions
function handleSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        joinDate: new Date().toISOString(),
        quizzesAttempted: 0,
        totalScore: 0
    };

    // Validation
    if (userData.password !== userData.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find(user => user.email === userData.email)) {
        alert('User with this email already exists!');
        return;
    }

    // Save user
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    saveUser(userData);
    
    updateAuthUI();
    showSection('quiz-selection');
}

function handleSignin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find(u => u.email === email && u.password === password);

    if (user) {
        saveUser(user);
        updateAuthUI();
        showSection('quiz-selection');
    } else {
        alert('Invalid email or password!');
    }
}

function handleGetStarted() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        showSection('quiz-selection');
    } else {
        showSection('signup');
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    appState.currentUser = null;
    updateAuthUI();
    showSection('landing');
}

function updateAuthUI() {
    const currentUser = getCurrentUser();
    const authButtons = document.getElementById('auth-buttons');
    const userAvatar = document.getElementById('user-avatar');

    if (currentUser) {
        authButtons.classList.add('hidden');
        userAvatar.classList.remove('hidden');
        userAvatar.innerHTML = `
            <div class="relative">
                <img class="rounded-full w-10 h-10 cursor-pointer" src="assets/img/user-r.png" alt="" onclick="toggleUserMenu()">
                <div id="user-menu" class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                    <a href="#" onclick="showSection('profile')" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</a>
                    <a href="#" onclick="logout()" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</a>
                </div>
            </div>
        `;
    } else {
        authButtons.classList.remove('hidden');
        userAvatar.classList.add('hidden');
    }
}

function toggleUserMenu() {
    const userMenu = document.getElementById('user-menu');
    userMenu.classList.toggle('hidden');
}

// Features rendering
function writeFeatures() {
    const container = document.getElementById('features-grid');
    if (!container) return;

    container.innerHTML = '';
    features.forEach(feature => {
        container.innerHTML += `
            <div class="flex flex-col gap-1 border rounded-lg border-[#DBE0E5] p-4">
                <div class="p-2">
                    <img class="dark:invert" src="${feature.icon}" alt="">
                </div>
                <div class="font-bold">
                    ${feature.title}
                </div>
                <div class="text-primary-l dark:text-gray-sh pb-4">
                    ${feature.description}
                </div>
            </div>
        `;
    });
}

// Profile functions
function loadProfile() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showSection('signin');
        return;
    }

    // Update profile information
    document.getElementById('profile-name').textContent = currentUser.fullName;
    document.getElementById('profile-info-name').textContent = currentUser.fullName;
    document.getElementById('profile-info-email').textContent = currentUser.email;
    document.getElementById('profile-joined').textContent = `Joined ${new Date(currentUser.joinDate).getFullYear()}`;

    // Load quiz history
    loadQuizHistory();
}

function loadQuizHistory() {
    const container = document.getElementById('quiz-history');
    if (!container) return;

    const history = getUserHistory();
    const currentUser = getCurrentUser();
    const userHistory = history.filter(h => h.userEmail === currentUser?.email);

    container.innerHTML = '';
    if (userHistory.length === 0) {
        container.innerHTML = `
            <div class="p-4 text-center text-primary-l dark:text-gray-sh">
                No quiz history found. Take a quiz to see your results here!
            </div>
        `;
        return;
    }

    userHistory.forEach(result => {
        container.innerHTML += `
            <div class="grid grid-cols-[1fr_1fr_1fr] text-sm border-b border-[#DBE0E5] p-3">
                <div>${result.quizTitle}</div>
                <div class="text-primary-l dark:text-gray-sh">${result.score}/${result.totalQuestions}</div>
                <div class="text-primary-l dark:text-gray-sh">${new Date(result.completedAt).toLocaleDateString()}</div>
            </div>
        `;
    });
}

function switchProfileTab(tabName) {
    const infoTab = document.getElementById('profile-info-tab');
    const activityTab = document.getElementById('profile-activity-tab');

    if (tabName === 'info') {
        infoTab.classList.remove('hidden');
        activityTab.classList.add('hidden');
    } else {
        infoTab.classList.add('hidden');
        activityTab.classList.remove('hidden');
    }
}

// Quiz selection functions
function loadQuizSelection() {
    writeQuizCategories();
    writeFeaturedQuizzes();
    writeAllQuizzes();
}

function writeQuizCategories() {
    const container = document.getElementById('quiz-type');
    if (!container) return;

    const categories = ['All', ...new Set(quizData.map(quiz => quiz.category))];
    
    container.innerHTML = '';
    categories.forEach(category => {
        const isActive = category === appState.selectedCategory;
        container.innerHTML += `
            <div onclick="filterQuizzes('${category}')" 
                 class="cursor-pointer text-sm font-medium px-5 py-2 text-left rounded-lg transition-colors duration-300 ${
                     isActive ? 'bg-secondary text-white' : 'bg-secondary-l hover:bg-secondary hover:text-white'
                 }">
                ${category}
            </div>
        `;
    });
}

function filterQuizzes(category) {
    appState.selectedCategory = category;
    writeQuizCategories();
    writeAllQuizzes();
}

function writeFeaturedQuizzes() {
    const container = document.getElementById('featured-quizzes');
    if (!container) return;

    const featuredQuizzes = quizData.filter(quiz => quiz.featured);
    
    container.innerHTML = '';
    featuredQuizzes.forEach(quiz => {
        container.innerHTML += `
            <div class="w-63 cursor-pointer hover:scale-105 transition-transform duration-300" onclick="startQuiz('${quiz.id}')">
                <div class="max-h-35 w-full object-cover overflow-hidden rounded-lg shadow">
                    <img src="${quiz.image}" alt="${quiz.title}">
                </div>
                <div class="py-3">
                    <div class="font-medium">${quiz.title}</div>
                    <div class="text-primary-l dark:text-gray-sh text-sm">${quiz.description}</div>
                </div>
            </div>
        `;
    });
}

function writeAllQuizzes() {
    const container = document.getElementById('all-quizzes');
    if (!container) return;

    let filteredQuizzes = quizData;
    if (appState.selectedCategory !== 'All') {
        filteredQuizzes = quizData.filter(quiz => quiz.category === appState.selectedCategory);
    }

    container.innerHTML = '';
    filteredQuizzes.forEach(quiz => {
        container.innerHTML += `
            <div onclick="startQuiz('${quiz.id}')" class="cursor-pointer flex flex-col sm:flex-row justify-between gap-2 sm:items-center p-3 hover:bg-secondary-l dark:hover:bg-gray-800 rounded-lg transition-colors duration-300">
                <div class="sm:self-start">
                    <div class="font-bold">${quiz.title}</div>
                    <div class="text-primary-l dark:text-gray-sh text-sm">${quiz.description}</div>
                    <div class="text-xs text-secondary font-medium mt-1">${quiz.category} • ${quiz.questions.length} Questions</div>
                </div>
                <div class="w-80 h-42 overflow-hidden rounded-lg shadow">
                    <img src="${quiz.image}" alt="${quiz.title}" class="w-full h-full object-cover">
                </div>
            </div>
        `;
    });
}

// Quiz functions
function startQuiz(quizId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showSection('signin');
        return;
    }

    const quiz = quizData.find(q => q.id === quizId);
    if (!quiz) return;

    appState.currentQuiz = quiz;
    appState.currentQuestionIndex = 0;
    appState.userAnswers = [];
    appState.quizStartTime = Date.now();

    showSection('quiz');
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    if (!appState.currentQuiz) return;

    const question = appState.currentQuiz.questions[appState.currentQuestionIndex];
    const totalQuestions = appState.currentQuiz.questions.length;

    // Update progress
    const progress = ((appState.currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = appState.currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = totalQuestions;

    // Update question
    document.getElementById('question').textContent = question.question;

    // Update options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionId = `option-${index}`;
        const isSelected = appState.userAnswers[appState.currentQuestionIndex] === index;
        
        optionsContainer.innerHTML += `
            <div class="cursor-pointer flex gap-3 p-4 border border-[#DBE0E5] rounded-lg w-full hover:bg-secondary-l dark:hover:bg-gray-800 transition-colors duration-300 ${isSelected ? 'bg-secondary-l dark:bg-gray-700' : ''}">
                <input class="w-5 bg-primary checked:bg-primary" type="radio" name="option" id="${optionId}" value="${index}" ${isSelected ? 'checked' : ''} onchange="selectAnswer(${index})">
                <label for="${optionId}" class="cursor-pointer flex-1">${option}</label>
            </div>
        `;
    });

    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.style.display = appState.currentQuestionIndex === 0 ? 'none' : 'block';
    nextBtn.textContent = appState.currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next';
}

function selectAnswer(answerIndex) {
    appState.userAnswers[appState.currentQuestionIndex] = answerIndex;
}

function previousQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    const totalQuestions = appState.currentQuiz.questions.length;
    
    if (appState.currentQuestionIndex < totalQuestions - 1) {
        appState.currentQuestionIndex++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    clearInterval(appState.quizTimer);
    
    // Calculate score
    let correctAnswers = 0;
    appState.currentQuiz.questions.forEach((question, index) => {
        if (appState.userAnswers[index] === question.correct) {
            correctAnswers++;
        }
    });

    const totalQuestions = appState.currentQuiz.questions.length;
    const score = correctAnswers;
    const percentage = Math.round((score / totalQuestions) * 100);
    const timeTaken = Math.round((Date.now() - appState.quizStartTime) / 1000);

    // Save result
    const currentUser = getCurrentUser();
    const result = {
        quizId: appState.currentQuiz.id,
        quizTitle: appState.currentQuiz.title,
        userEmail: currentUser.email,
        score: score,
        totalQuestions: totalQuestions,
        percentage: percentage,
        timeTaken: timeTaken,
        answers: appState.userAnswers,
        completedAt: new Date().toISOString()
    };

    saveQuizResult(result);
    appState.currentResult = result;
    
    showSection('quiz-results');
}

function loadQuizResults() {
    if (!appState.currentResult) return;

    const result = appState.currentResult;
    document.getElementById('final-score').textContent = `${result.score}/${result.totalQuestions}`;
    
    let message = '';
    if (result.percentage >= 80) {
        message = `Excellent work! You scored ${result.score} out of ${result.totalQuestions}. Your performance indicates a strong understanding of the subject matter. Keep up the excellent work!`;
    } else if (result.percentage >= 60) {
        message = `Good job! You scored ${result.score} out of ${result.totalQuestions}. You have a solid understanding of the material with room for improvement.`;
    } else {
        message = `You scored ${result.score} out of ${result.totalQuestions}. Don't worry, practice makes perfect! Review the material and try again.`;
    }
    
    document.getElementById('result-message').textContent = message;
}

function loadReviewAnswers() {
    if (!appState.currentQuiz || !appState.currentResult) return;

    const container = document.getElementById('review-questions');
    container.innerHTML = '';

    appState.currentQuiz.questions.forEach((question, index) => {
        const userAnswer = appState.userAnswers[index];
        const correctAnswer = question.correct;
        const isCorrect = userAnswer === correctAnswer;

        if (!isCorrect) {
            container.innerHTML += `
                <div class="flex flex-col gap-4 mb-6 p-4 border border-[#DBE0E5] rounded-lg">
                    <div class="font-bold text-lg">Question ${index + 1}</div>
                    <div id="rev-Question">${question.question}</div>
                    <div class="text-red-600 dark:text-red-400">Your answer: <span class="font-medium">${question.options[userAnswer] || 'Not answered'}</span></div>
                    <div class="text-green-600 dark:text-green-400">Correct answer: <span class="font-medium">${question.options[correctAnswer]}</span></div>
                </div>
            `;
        }
    });

    if (container.innerHTML === '') {
        container.innerHTML = `
            <div class="text-center p-8 text-green-600 dark:text-green-400">
                <h3 class="text-xl font-bold mb-2">Perfect Score!</h3>
                <p>You answered all questions correctly. Great job!</p>
            </div>
        `;
    }
}

function loadLeaderboard() {
    const container = document.getElementById('leaderboard-content');
    if (!container) return;

    const history = getUserHistory();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Calculate user statistics
    const userStats = users.map(user => {
        const userHistory = history.filter(h => h.userEmail === user.email);
        const totalQuizzes = userHistory.length;
        const totalScore = userHistory.reduce((sum, h) => sum + h.score, 0);
        const totalPossible = userHistory.reduce((sum, h) => sum + h.totalQuestions, 0);
        const averagePercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

        return {
            name: user.fullName,
            email: user.email,
            totalQuizzes,
            totalScore,
            totalPossible,
            averagePercentage
        };
    }).filter(stat => stat.totalQuizzes > 0)
      .sort((a, b) => b.averagePercentage - a.averagePercentage);

    container.innerHTML = '';
    
    if (userStats.length === 0) {
        container.innerHTML = `
            <div class="text-center p-8 text-primary-l dark:text-gray-sh">
                <h3 class="text-xl font-bold mb-2">No Data Available</h3>
                <p>Complete some quizzes to see the leaderboard!</p>
            </div>
        `;
        return;
    }

    // Create leaderboard header
    container.innerHTML += `
        <div class="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 text-sm font-bold border border-[#DBE0E5] p-4 rounded-t-lg bg-secondary-l">
            <div>Rank</div>
            <div>Name</div>
            <div>Quizzes</div>
            <div>Total Score</div>
            <div>Average</div>
        </div>
    `;

    // Create leaderboard entries
    userStats.forEach((stat, index) => {
        const rankIcon = index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
        
        container.innerHTML += `
            <div class="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 text-sm border border-[#DBE0E5] border-t-0 p-4 ${index === userStats.length - 1 ? 'rounded-b-lg' : ''}">
                <div class="font-bold">${rankIcon}</div>
                <div>${stat.name}</div>
                <div class="text-primary-l dark:text-gray-sh">${stat.totalQuizzes}</div>
                <div class="text-primary-l dark:text-gray-sh">${stat.totalScore}/${stat.totalPossible}</div>
                <div class="font-medium ${stat.averagePercentage >= 80 ? 'text-green-600' : stat.averagePercentage >= 60 ? 'text-yellow-600' : 'text-red-600'}">${stat.averagePercentage}%</div>
            </div>
        `;
    });
}

// Timer functions
function startTimer() {
    let seconds = 0;
    
    appState.quizTimer = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        document.getElementById('timer-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('timer-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('timer-seconds').textContent = secs.toString().padStart(2, '0');
    }, 1000);
}

// Dark mode functionality
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const themeIconLight = document.getElementById('theme-icon-light');

    // Check for saved user preference or use system preference
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!localStorage.getItem('color-theme') && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeIconLight.classList.remove('hidden');
        themeIconDark.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        themeIconDark.classList.remove('hidden');
        themeIconLight.classList.add('hidden');
    }

    themeToggle.addEventListener('click', () => {
        // Toggle icons
        themeIconDark.classList.toggle('hidden');
        themeIconLight.classList.toggle('hidden');

        // Toggle dark class on html element
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Form event listeners
function initForms() {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (signinForm) {
        signinForm.addEventListener('submit', handleSignin);
    }
}

// Initialize the application
function init() {
    initDarkMode();
    initMobileMenu();
    initForms();
    
    // Set initial user state
    appState.currentUser = getCurrentUser();
    updateAuthUI();
    
    // Show landing page by default
    showSection('landing');
    
    // Close user menu when clicking outside
    document.addEventListener('click', (event) => {
        const userMenu = document.getElementById('user-menu');
        const userAvatar = document.getElementById('user-avatar');
        
        if (userMenu && !userMenu.classList.contains('hidden') && 
            !userAvatar.contains(event.target)) {
            userMenu.classList.add('hidden');
        }
    });
}

// Load the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
