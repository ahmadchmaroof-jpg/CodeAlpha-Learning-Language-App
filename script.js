// Database for the App
const lessonData = [
    { word: "Hola", translation: "Hello", options: ["Goodbye", "Hello", "Please"] },
    { word: "Gracias", translation: "Thank you", options: ["Sorry", "Thank you", "Yes"] },
    { word: "Por favor", translation: "Please", options: ["Please", "No", "Welcome"] },
    { word: "Adiós", translation: "Goodbye", options: ["Hello", "Goodbye", "Excuse me"] }
];

let currentIndex = 0;

// Tab Switching Logic
function openTab(evt, tabName) {
    let contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }
    let tabs = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    
    if(tabName === 'quiz-tab') loadQuiz();
}

// Flashcard Logic
function loadNextWord() {
    currentIndex = (currentIndex + 1) % lessonData.length;
    document.getElementById('word-text').innerText = lessonData[currentIndex].word;
    document.getElementById('translation-text').innerText = lessonData[currentIndex].translation;
    document.querySelector('.flip-card').classList.remove('is-flipped');
}

// Pronunciation (Speech Synthesis)
function playSound() {
    let text = document.getElementById('word-text').innerText;
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Set to Spanish
    window.speechSynthesis.speak(utterance);
}

// Quiz Logic
function loadQuiz() {
    const quizQ = lessonData[currentIndex];
    document.getElementById('quiz-q-word').innerText = quizQ.word;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = ''; // Clear old options
    document.getElementById('quiz-feedback').innerText = '';

    quizQ.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkQuizAnswer(opt, quizQ.translation);
        optionsDiv.appendChild(btn);
    });
}

function checkQuizAnswer(selected, correct) {
    const feedback = document.getElementById('quiz-feedback');
    if (selected === correct) {
        feedback.innerText = "✅ Excellent! Correct Answer.";
        feedback.style.color = "green";
    } else {
        feedback.innerText = "❌ Oops! Try again.";
        feedback.style.color = "red";
    }
}