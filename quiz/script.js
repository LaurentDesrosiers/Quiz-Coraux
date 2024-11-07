const quizData = {
    fr: [
        {
            question: "Quelle est la principale couleur des coraux ?",
            a: "Bleu",
            b: "Vert",
            c: "Rouge",
            d: "Jaune",
            correct: "c"
        },
        {
            question: "Les coraux sont des...",
            a: "Animaux",
            b: "Plantes",
            c: "Champignons",
            d: "Minéraux",
            correct: "a"
        }
        // Ajoute d'autres questions en français...
    ],
    en: [
        {
            question: "What is the main color of corals?",
            a: "Blue",
            b: "Green",
            c: "Red",
            d: "Yellow",
            correct: "c"
        },
        {
            question: "Corals are...",
            a: "Animals",
            b: "Plants",
            c: "Fungi",
            d: "Minerals",
            correct: "a"
        }
        // Ajoute d'autres questions en anglais...
    ]
};

let currentLanguage = 'fr';
let currentQuestionIndex = 0;
let score = 0;

const languageSelect = document.getElementById("language-select");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
const submitButton = document.getElementById("submit");
const quizContainer = document.getElementById("quiz-container");
const startContainer = document.getElementById("start-container");
const quizElement = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const quizTitle = document.getElementById("quiz-title");

// Fonction pour charger la question actuelle
function loadQuiz() {
    const currentQuizData = quizData[currentLanguage][currentQuestionIndex];
    quizElement.innerHTML = `
        <h2>${currentQuizData.question}</h2>
        <label><input type="radio" name="answer" value="a"> ${currentQuizData.a}</label><br>
        <label><input type="radio" name="answer" value="b"> ${currentQuizData.b}</label><br>
        <label><input type="radio" name="answer" value="c"> ${currentQuizData.c}</label><br>
        <label><input type="radio" name="answer" value="d"> ${currentQuizData.d}</label>
    `;
}

// Fonction pour obtenir la réponse sélectionnée
function getSelectedAnswer() {
    const answers = document.getElementsByName("answer");
    let selectedAnswer;
    answers.forEach(answer => {
        if (answer.checked) {
            selectedAnswer = answer.value;
        }
    });
    return selectedAnswer;
}

// Fonction pour afficher le résultat final
function showResult() {
    quizElement.innerHTML = "";
    resultContainer.innerHTML = currentLanguage === 'fr'
        ? `Vous avez obtenu ${score} sur ${quizData[currentLanguage].length} questions correctes.`
        : `You scored ${score} out of ${quizData[currentLanguage].length} questions correctly.`;
    submitButton.style.display = "none";
    restartButton.style.display = "block"; // Affiche le bouton de redémarrage
}

// Fonction pour démarrer le quiz
function startQuiz() {
    currentLanguage = languageSelect.value;
    startContainer.style.display = "none"; // Cache l'écran d'accueil
    quizContainer.style.display = "block"; // Affiche le quiz
    quizTitle.textContent = currentLanguage === 'fr' ? "Quiz sur les coraux" : "Coral Quiz";
    submitButton.textContent = currentLanguage === 'fr' ? "Valider" : "Submit";
    restartButton.textContent = currentLanguage === 'fr' ? "Recommencer" : "Restart";
    loadQuiz(); // Charge la première question
}

// Fonction pour réinitialiser le quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.innerHTML = "";
    submitButton.style.display = "block"; // Réaffiche le bouton Valider
    restartButton.style.display = "none"; // Cache le bouton Recommencer
    loadQuiz(); // Recharge la première question
}

// Événements pour le démarrage et la validation des réponses
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", () => {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentLanguage][currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData[currentLanguage].length) {
            loadQuiz();
        } else {
            showResult();
        }
    } else {
        alert(currentLanguage === 'fr' ? "Veuillez sélectionner une réponse." : "Please select an answer.");
    }
});
restartButton.addEventListener("click", restartQuiz);
