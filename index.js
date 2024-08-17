import { displayQuestion, showNextQuestion, checkAndUpdateQuiz, showFinalResult } from './quizManager.js';

// Inicializa o quiz
window.onload = function() {
    checkAndUpdateQuiz();
};

// Evento para o botão de próxima pergunta
document.getElementById('next-question').addEventListener('click', showNextQuestion);

// Evento para o botão de encerrar quiz
document.getElementById('end-quiz').addEventListener('click', showFinalResult);



