function getSelectedAnswers() {
    const answers= [];
    for (let i = 1; i <= 5; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected) answers.push(selected.value);
        else{
            alert(`Du må svare på spørsmål ${i}.`);
            return null;
        }
    }
    return answers;
}

function completedQuiz() {
    const answers = getSelectedAnswers();
    if (!answers) return; // Stop if not all questions were answered

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
        <div>
            <h2>Din teamrolle er: ${topRole}</h2>
            <p>Du valgte flest svar som samsvarer med rollen <strong>${topRole}</strong>.</p>
        </div>
    `;
    return false;
}