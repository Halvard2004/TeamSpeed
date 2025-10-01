function getSelectedAnswers() {
    const answers = [];
    for (let i = 1; i <= 5; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) answers.push(selected.value);
        else {
            alert(`Du må svare på spørsmål ${i}.`);
            return null;
        }
    }
    return answers;
}

function completedQuiz() {
    const answers = getSelectedAnswers();
    const sassyComments = {
        "Leder": "Du elsker å ta kontroll – selv når ingen ba deg om det. Men hey, noen må jo sjefe rundt.",
        "Tenker": "Gratulerer, du er hjernen bak prosjektet – men pass på, ingen andre forstår helt hva du snakker om.",
        "Gjennomfører": "Du er den som faktisk får ting gjort. Synd ingen la merke til det fordi lederen tok æren.",
        "Støttespiller": "Du holder gruppa samlet med varme og forståelse. Og får null kred for det. Klassisk.",
        "Observatør": "Du sa lite, gjorde lite, men satt der med hevede øyenbryn som om du så på en dårlig realityserie. Respekt."
    };
    if (!answers) return; // Stop if not all questions were answered
    hideAllInTheEnd();
    // Count roles
    const roles = {};
    answers.forEach(role => {
        roles[role] = (roles[role] || 0) + 1;
    });

    // Find top role
    let topRole = null;
    let max = 0;
    for (let role in roles) {
        if (roles[role] > max) {
            max = roles[role];
            topRole = role;
        }
    }

    // Output result
    const answerHTML = document.getElementById('answer');
    answerHTML.innerHTML = `
        <div class = "result">
            <h2>Din teamrolle er: ${topRole}</h2>
            <p>Du valgte flest svar som samsvarer med rollen <strong>${topRole}</strong>.</p>
            <p><em>${sassyComments[topRole]}</em></p>
        </div>
    `;
    return false;
}

function changeClass(id) {
    const activeQuestion = document.getElementById("question" + id);
    activeQuestion.classList.add('active');
    lazyModel.inputs.thisQuestion = id;
    const prevActiveQuestion = document.getElementById("question" + lazyModel.inputs.prevQuestion);
    prevActiveQuestion.classList.remove('active');

    const prevButtonActive = document.getElementById("prevBtn");
    prevButtonActive.disabled = (id > 1) ? false : true;
    const nextButtonActive = document.getElementById("nextBtn");
    nextButtonActive.disabled = (id >= 5) ? true : false;
    updateCounter();
}

function updateCounter() {
    document.getElementById("step").textContent = lazyModel.inputs.thisQuestion;
}


function hideAllInTheEnd(){
    const prevActiveQuestion = document.getElementById("question" + 5);
    prevActiveQuestion.classList.remove('active');
    const navigation = document.getElementById("nav");
    navigation.classList.add('notActive');
    const submit = document.getElementById('submit');
    submit.classList.add('notActive');
}