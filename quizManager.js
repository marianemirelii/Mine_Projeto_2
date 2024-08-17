let currentQuestionIndex = 0; // Índice da pergunta atual
let score = 0; // Pontuação do usuário
let questions = []; // Perguntas do quiz

// Função para exibir a pergunta e as opções
export function displayQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    if (!questionElement || !optionsElement) {
        console.error('Elementos do DOM não encontrados.');
        return;
    }

    // Verificação para garantir que o array de perguntas não está vazio
    if (questions.length === 0) {
        console.error('Nenhuma pergunta disponível.');
        questionElement.innerText = 'Nenhuma pergunta disponível no momento.';
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    // Verificação para garantir que a pergunta atual existe
    if (!currentQuestion) {
        console.error('Pergunta atual é indefinida.');
        questionElement.innerText = 'Erro ao carregar a pergunta.';
        return;
    }

    questionElement.innerText = currentQuestion.question;

    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerText = option;
        li.addEventListener('click', () => checkAnswer(index));
        optionsElement.appendChild(li);
    });

    document.getElementById('status').innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
}

// Função para verificar a resposta
export function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;

    if (isCorrect) {
        score++;
        document.querySelectorAll('#options li')[selectedIndex].classList.add('correct');
    } else {
        document.querySelectorAll('#options li')[selectedIndex].classList.add('incorrect');
    }

    // Exibe o botão de próxima pergunta ou de encerrar quiz
    if (currentQuestionIndex < questions.length - 1) {
        document.getElementById('next-question').style.display = 'block';
    } else {
        document.getElementById('next-question').style.display = 'none';
        document.getElementById('end-quiz').style.display = 'block';
    }
}

// Função para exibir a próxima pergunta
export function showNextQuestion() {
    currentQuestionIndex++;

    // Esconde o botão de próxima pergunta
    document.getElementById('next-question').style.display = 'none';

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showFinalResult();
    }
}

// Função para exibir o resultado final
export function showFinalResult() {
    const resultElement = document.getElementById('result');
    resultElement.innerText = `Você acertou ${score} de ${questions.length} perguntas!`;
    resultElement.style.display = 'block';

    // Esconde a questão e as opções
    document.getElementById('question').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('status').style.display = 'none';

    // Esconde o botão de encerrar quiz
    document.getElementById('end-quiz').style.display = 'none';
}

// Função para verificar e atualizar o quiz com novas perguntas
export function checkAndUpdateQuiz() {
    const today = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
    const lastQuizDate = localStorage.getItem('quizDate');

    if (lastQuizDate !== today) {
        localStorage.setItem('quizDate', today);

        // Atualize as perguntas com uma nova série
        questions = getNewQuestionsForToday(); // Função para obter novas perguntas
        currentQuestionIndex = 0;
        score = 0;
    }

    displayQuestion();
}

// Função para obter novas perguntas para o dia
function getNewQuestionsForToday() {
    const allQuestions = [
        {
            question: "Qual é a estrutura básica de um loop em JavaScript?",
            options: ["for (i = 0; i < 10; i++)", "while (i < 10)", "loop (i = 0; i < 10)", "foreach (i in 10)"],
            correctAnswer: 0
        },
        {
            question: "Como declarar uma variável em JavaScript?",
            options: ["var x;", "let x;", "const x;", "Todas as opções acima"],
            correctAnswer: 3
        },
        {
            question: "O que significa HTML?",
            options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            correctAnswer: 0
        },
        {
            question: "Qual linguagem é usada para estilizar páginas da web?",
            options: ["HTML", "CSS", "JavaScript"],
            correctAnswer: 1
        },
        {
            question: "Qual é a função do JavaScript?",
            options: ["Adicionar estilos à página", "Estruturar o conteúdo", "Adicionar interatividade"],
            correctAnswer: 2
        },
        {
            question: "Qual é a forma correta de declarar uma variável que pode ser alterada em JavaScript?",
            options: ["const nome", "var nome", "let nome", "immutable nome"],
            correctAnswer: 2
        },
        {
            question: "Como você cria um array em JavaScript?",
            options: ["let arr = [1, 2, 3];", "let arr = (1, 2, 3);", "let arr = {1, 2, 3};", "let arr = new Array (1, 2, 3);"],
            correctAnswer: 0
        },
        {
            question: "Qual método é usado para remover o último item de um array?",
            options: ["pop()", "shift()", "push()", "splice()"],
            correctAnswer: 0
        },
        {
            question: "Qual método JavaScript é usado para selecionar um elemento pelo seu ID?",
            options: ["querySelector()", "getElementsByClassName()", "getElementById()", "querySelectorAll()"],
            correctAnswer: 2
        },
        {
            question: "Qual é a saída do código console.log('5' + 1)?",
            options: ["NaN", "51", "6", "15"],
            correctAnswer: 1
        },
        {
            question: "Como acessar o segundo item de um array em JavaScript?",
            options: ["array[2]", "array[0]", "array.get(2)", "array[1]"],
            correctAnswer: 3
        },
        {
            question: "Qual é o resultado da expressão 'false + 1' em JavaScript?",
            options: ["1", "false", "NaN", "true"],
            correctAnswer: 0
        },
        {
            question: "Qual é o propósito do método 'Array.prototype.forEach'?",
            options: ["Adicionar um item ao início de um array", "Iterar sobre cada item de um array e executar uma função para cada um", "Ordenar os itens de um array", "Encontrar um item específico em um array"],
            correctAnswer: 1
        },
        {
            question: "Qual é o resultado da expressão `3 * '5'` em JavaScript?",
            options: ["'35'", "15", "NaN", "35"],
            correctAnswer: 1
        },
        {
            question: "Qual é a diferença entre let e const em JavaScript?",
            options: ["let e const têm o mesmo comportamento e podem ser usados de forma intercambiável.", "let cria uma variável global, enquanto const cria uma variável local.", "let cria uma variável que pode ser redeclarada, enquanto const não pode ser redeclarada.", "let cria uma variável cujo valor pode ser alterado, enquanto const cria uma variável cujo valor não pode ser alterado depois de definido"],
            correctAnswer: 3
        },
        // Adicione mais perguntas conforme necessário
    ];

    // Embaralhar as perguntas e selecionar as 5 primeiras
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, 5);
}
