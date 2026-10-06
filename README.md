# Educational Learning & Programming Platform

A web-based educational platform developed as a **university internship project** at the **University of Isfahan**.

The platform provides an interactive environment for students and teachers to create, manage, and participate in educational courses, practices, and exams. It also includes an integrated programming environment that allows users to write and execute code, as well as a dedicated web programming playground for HTML, CSS, and JavaScript.

---

## Overview

The application is designed around two main user roles:

* **Students** — enroll in courses, take exams and practices, track their progress, and work with programming exercises.
* **Teachers** — create and manage courses, exams, practices, levels, and educational content.

The frontend communicates with a backend REST API and uses Redux Toolkit for centralized application state management.

The project focuses on building a modular React application with reusable components, authenticated API communication, interactive educational workflows, and programming-oriented features.

---

## Key Features

### 👨‍🎓 Student & Teacher Roles

The platform supports different workflows for students and teachers.

#### Students can:

* Create an account and log in
* Browse available courses
* Enroll in courses
* Take exams
* Practice with interactive questions
* Track course and level progress
* View their scores
* Participate in web-based courses
* Complete programming exercises
* Use the integrated code editor
* Manage their profile

#### Teachers can:

* Create courses
* Create web-based courses
* Add course levels
* Create exams
* Create practices
* Create web practices
* Edit courses
* Manage educational content
* View enrolled students
* Review student scores and progress

---

# 📚 Course Management

The application provides a complete workflow for creating and consuming educational courses.

Teachers can create courses containing multiple levels, while students can enroll in courses and progress through their available levels.

Course-related functionality includes:

* Course creation
* Course editing
* Course details
* Course levels
* Student enrollment
* Student lists
* Course progress
* Course completion status
* Course score tracking
* Student course history

The frontend communicates with the backend through dedicated course-related REST endpoints.

---

# 🌐 Web Courses

The platform also supports a separate category of **web-based courses**.

Web courses provide a workflow specifically designed for web development education.

Supported functionality includes:

* Web course creation
* Web course editing
* Web course enrollment
* Web course levels
* Student progress tracking
* Student scores
* Web exams
* Web practices

Teachers can manage web courses separately from standard courses, while students can access and complete their assigned web-learning content.

---

# 📝 Exams

The application provides an interactive exam environment.

Students can:

* Start an exam
* Navigate through questions
* Select answers
* Complete questions interactively
* Track their progress
* Submit an exam
* Receive a final score

The exam interface maintains the selected answers using Redux state and communicates the final score to the backend.

A visual progress indicator shows the student's position within the exam.

---

# 🧩 Interactive Practice

In addition to exams, the platform provides a practice system designed for learning and immediate feedback.

Students can:

* Open a practice
* Navigate between questions
* Submit an answer
* Immediately determine whether the answer is correct
* Move to the next question after answering correctly
* Navigate back to previous questions

The practice workflow provides immediate visual feedback for correct and incorrect answers.

---

# 💻 Integrated Programming Environment

One of the major features of the project is an integrated browser-based programming environment.

The application provides a code editor based on **Ace Editor**, allowing users to write code directly inside the platform.

The editor includes:

* Syntax highlighting
* Line numbers
* Code indentation
* Basic autocompletion
* Live autocompletion
* Code snippets
* Multiple editor themes
* Adjustable editor layout

Available editor themes include:

* Monokai
* GitHub
* Tomorrow
* Twilight
* Xcode
* TextMate
* Solarized Dark
* Solarized Light
* Terminal

---

## Code Execution

The platform provides a **Run** action that sends the user's code to the backend compilation service.

The frontend communicates with:

```text
compile/compileCode
```

The request contains:

```text
language
code
```

The backend returns the execution result and whether an error occurred.

The interface then displays the result directly inside the programming environment.

The frontend currently provides programming options for:

* Python
* Java

The backend communication layer also contains support for PHP compilation.

---

# 🌐 Web Programming Playground

The application includes a dedicated environment for practicing web development.

Users can work with three editors simultaneously:

```text
HTML
CSS
JavaScript
```

The resulting webpage is rendered inside a sandboxed iframe.

The workflow is:

```text
HTML + CSS + JavaScript
          │
          ▼
      Run Code
          │
          ▼
     Generated Page
          │
          ▼
      Live Preview
```

This allows users to experiment with frontend development without leaving the platform.

---

# 👤 Authentication

Authentication is implemented through a dedicated authentication context and token-based API communication.

The application supports:

* User registration
* User login
* Student authentication
* Teacher authentication
* Access token storage
* Authenticated API requests
* Role-aware application workflows

Authentication state is managed through:

```text
authContext/
└── AuthContext.js
```

The access token is stored locally and supplied to protected API requests using a Bearer token.

---

# 👤 User Profiles

Users have dedicated profile pages containing personal and academic information.

The profile system supports information such as:

* Username
* First name
* Last name
* Email
* Student number
* Gender
* Birth date
* Country
* State
* City
* Address
* Biography
* User role

Students and teachers use different backend endpoints for retrieving and updating their profiles.

---

# 📊 Progress & Scores

The application provides several mechanisms for tracking educational progress.

Students can view:

* Course progress
* Level progress
* Exam scores
* Practice activity
* Web course progress
* Web course scores

Teachers can also access information about enrolled students and their performance.

---

# 📁 File Management

The project includes components for handling uploaded educational files.

The frontend provides functionality for displaying and deleting uploaded files through the backend API.

This functionality can be used as part of the educational content management workflow.

---

# 🧠 State Management

The application uses **Redux Toolkit** for centralized state management.

The Redux store contains several slices:

```text
store/
├── attachedFiles.js
├── choices.js
├── course.js
├── levels.js
├── questions.js
├── selectedAnswers.js
├── users.js
└── webCourse.js
```

The state layer manages application data such as:

* Courses
* Web courses
* Levels
* Questions
* Choices
* Selected answers
* Users
* Uploaded files

This structure separates application state from individual UI components and simplifies state sharing across different pages.

---

# 🧱 Component-Based Architecture

The project follows a modular React architecture.

Reusable functionality is organized into separate components, while larger application workflows are implemented as pages.

### Main Components

```text
components/
├── Choice/
├── Cofee/
├── Course/
├── CreateCourse/
├── CreatePractice/
├── CreateWebCourse/
├── CreateWebPractice/
├── Editor/
├── EditProfile/
├── Header/
├── Level/
├── LevelShow/
├── LevelStatus/
├── MyCourses/
├── MyPractices/
├── Profile/
├── Question/
├── QuizeBlankSpace/
├── QuizeChoice/
├── Skeleton/
├── UploadedFile/
├── User/
├── WebCourse/
├── WhichExam/
├── WhichPractice/
└── ...
```

### Main Pages

```text
pages/
├── Compiler/
├── CourseDataShow/
├── CourseStatusShow/
├── CreateAccount/
├── EditCourse/
├── EditWebCourse/
├── Login/
├── MainContainer/
├── MainPage/
├── Practice/
├── PracticeWebLan/
├── ProfileStructure/
├── ShowCourse/
├── ShowWebCourse/
├── StudentWebCourseScore/
├── TakeExam/
├── TakePractice/
├── TakeWebExam/
├── TakeWebPractice/
└── WebCourseStatusShow/
```

This organization makes the application easier to maintain and allows individual educational workflows to be developed independently.

---

# 🧭 Routing

Client-side navigation is implemented using **React Router**.

The application contains routes for major workflows, including:

```text
/
 /login
 /createAccount
 /mainPage

 /profileStructure/profile
 /profileStructure/editProfile

 /profileStructure/createCourse
 /profileStructure/createWebCourse

 /profileStructure/createPractice
 /profileStructure/createWebPractice

 /profileStructure/myCourses
 /profileStructure/myPractices

 /practice
 /otherLan
 /webLan

 /editCourse/:courseId
 /editWebCourse/:courseId

 /showCourse/:courseId
 /showWebCourse/:courseId

 /takeExam/:levelId
 /takeWebExam/:courseId

 /takePractice/:levelId
 /takeWebPractice/:courseId

 /courseDataShow/:courseId
 /courseStatusShow/:courseId

 /webCourseStatusShow/:webCourseId

 /studentWebCourseScore/:studentId/:courseId
```

Dynamic route parameters are used for accessing specific courses, levels, and student results.

---

# 🔌 REST API Integration

The frontend communicates with the backend through **Axios**.

The API address is configured through:

```env
REACT_APP_API_ADDRESS
```

The application communicates with backend services for:

### Authentication

```text
auth/login/
auth/register/
```

### Courses

```text
courses/create
courses/getCourse/:courseId
courses/getCourseLevels/:courseId
courses/getExams
courses/getPractices
courses/getStudents/:courseId
courses/editCourse/:courseId
```

### Web Courses

```text
webCourses/create
webCourses/getCourse/:courseId
webCourses/getExams
webCourses/getPractices
webCourses/getStudents/:courseId
webCourses/check/:courseId
```

### Levels

```text
levels/addLevel/:courseId
levels/getLevelQuestions/:levelId
levels/getStudents/:levelId
levels/setScore/:levelId
```

### Students

```text
students/find
students/update
students/takeCourse
students/takeWebCourse
students/getTakenExams
students/getTakenPractices
students/getTakenWebExams
students/getTakenWebPractices
```

### Teachers

```text
teachers/find
teachers/update
teachers/getMyExams
teachers/getMyPractices
teachers/getMyWebExams
teachers/getMyWebPractices
```

### Code Execution

```text
compile/compileCode
```

### Uploaded Files

```text
uploadedFiles/:id
```

This API-driven architecture separates the frontend presentation layer from the backend business logic.

---

# 🎨 UI & Styling

The project uses a combination of:

* **Material UI**
* **Material UI Icons**
* **SCSS**
* **CSS Modules**
* **Styled Components**

CSS Modules are used extensively to keep component styles isolated and avoid unintended global styling conflicts.

Material UI components are used for interface elements such as:

* Progress indicators
* Loading indicators
* Notifications
* Icons
* Data presentation

---

# 🛠️ Technology Stack

## Frontend

* **React 18**
* **JavaScript**
* **React Router 6**
* **SCSS / CSS Modules**

## State Management

* **Redux Toolkit**
* **React Redux**
* **React Context API**

## UI

* **Material UI**
* **Material UI Icons**
* **Styled Components**

## API Communication

* **Axios**
* REST API

## Programming Environment

* **Ace Editor**
* `react-ace`
* `ace-builds`

## Additional Libraries

* `react-datepicker` — date selection
* `react-password-checklist` — password validation
* `react-beautiful-dnd` — drag-and-drop interactions
* `react-string-replace` — dynamic question content
* `jwt-decode` — JWT handling
* `@mui/x-data-grid` — tabular data presentation

---

# 📂 Project Structure

```text
client/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── authContext/
│   │   └── AuthContext.js
│   │
│   ├── components/
│   │   ├── Choice/
│   │   ├── Course/
│   │   ├── CreateCourse/
│   │   ├── CreatePractice/
│   │   ├── CreateWebCourse/
│   │   ├── CreateWebPractice/
│   │   ├── Editor/
│   │   ├── EditProfile/
│   │   ├── Header/
│   │   ├── Level/
│   │   ├── LevelShow/
│   │   ├── LevelStatus/
│   │   ├── MyCourses/
│   │   ├── MyPractices/
│   │   ├── Profile/
│   │   ├── Question/
│   │   ├── Skeleton/
│   │   ├── UploadedFile/
│   │   ├── User/
│   │   ├── WebCourse/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Compiler/
│   │   ├── CourseDataShow/
│   │   ├── CourseStatusShow/
│   │   ├── CreateAccount/
│   │   ├── EditCourse/
│   │   ├── EditWebCourse/
│   │   ├── Login/
│   │   ├── MainContainer/
│   │   ├── MainPage/
│   │   ├── Practice/
│   │   ├── PracticeWebLan/
│   │   ├── ProfileStructure/
│   │   ├── ShowCourse/
│   │   ├── ShowWebCourse/
│   │   ├── StudentWebCourseScore/
│   │   ├── TakeExam/
│   │   ├── TakePractice/
│   │   ├── TakeWebExam/
│   │   ├── TakeWebPractice/
│   │   └── ...
│   │
│   ├── store/
│   │   ├── attachedFiles.js
│   │   ├── choices.js
│   │   ├── course.js
│   │   ├── levels.js
│   │   ├── questions.js
│   │   ├── selectedAnswers.js
│   │   ├── users.js
│   │   └── webCourse.js
│   │
│   ├── App.js
│   └── index.js
│
├── package.json
├── package-lock.json
└── ...
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* A running instance of the compatible backend API

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

---

## Environment Configuration

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_ADDRESS=http://localhost:8800/api/
```

The actual backend address may vary depending on the deployment environment.

> **Important:** Do not commit private credentials, API keys, tokens, or other sensitive configuration values to the repository.

---

## Run the Development Server

Start the React development server:

```bash
npm start
```

The application will be available through the local development server.

---

## Production Build

To create a production build:

```bash
npm run build
```

---

## Testing

The project is configured with React Testing Library and Jest through Create React App.

Run the test suite with:

```bash
npm test
```

---

# 🔄 Application Workflow

The overall learning workflow can be summarized as:

```text
                    ┌───────────────────┐
                    │   Authentication  │
                    └─────────┬─────────┘
                              │
                    ┌─────────▼─────────┐
                    │     Main Page     │
                    └─────────┬─────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
        Courses           Practices         Programming
            │                 │                 │
            ▼                 ▼                 ├──────────────┐
       Course Levels      Practice           │              │
            │             Questions          ▼              ▼
            ▼                               Web         Other
         Exams                              Practice    Languages
            │
            ▼
       Score / Progress
```

Teachers follow a separate content-management workflow:

```text
Teacher
   │
   ├── Create Course
   │      └── Add Levels
   │
   ├── Create Practice
   │
   ├── Create Web Course
   │      └── Add Web Content
   │
   ├── Create Web Practice
   │
   └── Monitor Students & Scores
```

---

# 🎓 Internship Project

This project was developed as part of a **university programming internship/workshop project at the University of Isfahan**.

The project provided practical experience in:

* React application development
* Component-based software architecture
* REST API integration
* Authentication and authorization workflows
* State management with Redux Toolkit
* Dynamic routing
* Educational application design
* Interactive exam and practice systems
* Code editor integration
* Frontend programming environments
* Asynchronous data handling
* Form validation
* Reusable UI component development

---

# 🔮 Future Improvements

Potential improvements for a production-ready version include:

* Migration to TypeScript
* Automated unit and integration tests
* Improved API error handling
* Centralized Axios configuration and interceptors
* Refresh-token authentication
* More granular role-based route protection
* Improved accessibility
* Enhanced mobile responsiveness
* Code splitting and lazy loading
* Improved security around authentication tokens
* More comprehensive form validation
* CI/CD integration
* API documentation
* Improved compiler error handling
* Persistent draft saving for course creation and code exercises

---
