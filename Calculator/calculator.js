let isHistoryVisible = false;
let history = '';

function toggleHistory() {
    const historyTextarea = document.getElementById('history');
    const historyButton = document.getElementById('history-button');

    if (isHistoryVisible) {
        historyTextarea.style.display = 'none';
        historyButton.innerText = 'H';
    } else {
        historyTextarea.style.display = 'block';
        historyButton.innerText = 'H';
    }

    isHistoryVisible = !isHistoryVisible;
}


function deleteLastCharacter() {
    const input = document.getElementById('input').value;
    document.getElementById('input').value = input.slice(0, -1);
}


function appendToInput(value) {
    document.getElementById('input').value += value;
}

function clearInput() {
    document.getElementById('input').value = '';
}

function clearHistory() {
    history = '';
    document.getElementById('history').value = history;
}

function calculateResult() {
    try {
        const input = document.getElementById('input').value;
        const result = eval(input);

        history += `${input} = ${result}\n`;
        document.getElementById('history').value = history;

        document.getElementById('input').value = result;
    } catch (error) {
        document.getElementById('input').value = 'Error';
    }
}
