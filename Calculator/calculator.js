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
        let result;

        if (input.includes('%')) {
            const numArray = input.split('*');
            if (numArray.length === 2) {
                const num1 = parseFloat(numArray[0].trim());
                const num2 = parseFloat(numArray[1].trim());
                result = (num1 * num2) / 100;
            } else {
                throw new Error('Invalid input');
            }
        } else if (input.includes('√')) {
            // Handle square root calculation
            const num = parseFloat(input.substring(1));
            if (!isNaN(num)) {
                result = Math.sqrt(num);
            } else {
                throw new Error('Invalid input');
            }
        } else if (input.includes('^')) {
            // Handle squaring
            const num = parseFloat(input);
            result = num * num;
        } else {
            // Evaluate the expression
            result = eval(input);
        }

        history += `${input} = ${result}\n`;
        document.getElementById('history').value = history;

        document.getElementById('input').value = result;
    } catch (error) {
        document.getElementById('input').value = 'Error';
    }
}
