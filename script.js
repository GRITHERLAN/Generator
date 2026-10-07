// Lorem Ipsum Data
const loremParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."
];

// Email Generator Data
const emailNames = ['john', 'emma', 'michael', 'sophia', 'david', 'olivia', 'james', 'ava', 'robert', 'isabella', 'william', 'mia', 'richard', 'charlotte', 'joseph'];
const emailDomains = ['test.com', 'example.com', 'demo.org', 'sample.net', 'trial.io', 'staging.com', 'dev.org'];

// Password Generator Constants
const passwordLowercase = 'abcdefghijklmnopqrstuvwxyz';
const passwordUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const passwordNumbers = '0123456789';
const passwordSpecial = '!@#$%^&*';

// DOM Elements
const notification = document.getElementById('notification');

// Lorem Ipsum Elements
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const output = document.getElementById('output');
const paragraphsSelect = document.getElementById('paragraphs');
const charCounter = document.querySelector('.char-counter');

// Email Generator Elements
const generateEmailBtn = document.getElementById('generateEmailBtn');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const emailOutput = document.getElementById('emailOutput');
const emailCountSelect = document.getElementById('emailCount');
const emailCharCounter = document.querySelector('.email-counter');

// Password Generator Elements
const generatePasswordBtn = document.getElementById('generatePasswordBtn');
const copyPasswordBtn = document.getElementById('copyPasswordBtn');
const passwordOutput = document.getElementById('passwordOutput');
const passwordCharCounter = document.querySelector('.password-counter');
const passwordLengthSlider = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const passwordUppercaseCheckbox = document.getElementById('passwordUppercase');
const passwordLowercaseCheckbox = document.getElementById('passwordLowercase');
const passwordNumbersCheckbox = document.getElementById('passwordNumbers');
const passwordSymbolsCheckbox = document.getElementById('passwordSymbols');
const securityFill = document.getElementById('securityFill');
const securityText = document.getElementById('securityText');

// Event Listeners
generateBtn.addEventListener('click', generateLoremIpsum);
copyBtn.addEventListener('click', () => copyToClipboard(output, copyBtn));
output.addEventListener('input', () => updateCharCounter(output, charCounter));

generateEmailBtn.addEventListener('click', generateEmails);
copyEmailBtn.addEventListener('click', () => copyToClipboard(emailOutput, copyEmailBtn));
emailOutput.addEventListener('input', () => updateCharCounter(emailOutput, emailCharCounter));

generatePasswordBtn.addEventListener('click', generatePassword);
copyPasswordBtn.addEventListener('click', () => copyToClipboard(passwordOutput, copyPasswordBtn));
passwordOutput.addEventListener('input', () => {
    updateCharCounter(passwordOutput, passwordCharCounter);
    updateSecurityBar();
});

passwordLengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

passwordLengthSlider.addEventListener('change', generatePassword);
passwordUppercaseCheckbox.addEventListener('change', generatePassword);
passwordLowercaseCheckbox.addEventListener('change', generatePassword);
passwordNumbersCheckbox.addEventListener('change', generatePassword);
passwordSymbolsCheckbox.addEventListener('change', generatePassword);

// Lorem Ipsum Functions
function generateLoremIpsum() {
    const numParagraphs = parseInt(paragraphsSelect.value);
    let text = '';

    for (let i = 0; i < numParagraphs; i++) {
        const randomIndex = Math.floor(Math.random() * loremParagraphs.length);
        text += loremParagraphs[randomIndex];

        if (i < numParagraphs - 1) {
            text += '\n\n';
        }
    }

    output.value = text;
    copyBtn.style.display = 'block';
    updateCharCounter(output, charCounter);
}

// Email Generator Functions
function generateEmails() {
    const numEmails = parseInt(emailCountSelect.value);
    let emails = '';

    for (let i = 0; i < numEmails; i++) {
        const randomName = emailNames[Math.floor(Math.random() * emailNames.length)];
        const randomNumber = Math.floor(Math.random() * 9999);
        const randomDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
        const email = `${randomName}${randomNumber}@${randomDomain}`;

        emails += email;
        if (i < numEmails - 1) {
            emails += '\n';
        }
    }

    emailOutput.value = emails;
    copyEmailBtn.style.display = 'block';
    updateCharCounter(emailOutput, emailCharCounter);
}

// Password Generator Functions
function generatePassword() {
    const length = parseInt(passwordLengthSlider.value);

    // Validar que al menos una opción esté seleccionada
    if (!passwordUppercaseCheckbox.checked && !passwordLowercaseCheckbox.checked &&
        !passwordNumbersCheckbox.checked && !passwordSymbolsCheckbox.checked) {
        passwordOutput.value = '';
        copyPasswordBtn.style.display = 'none';
        updateSecurityBar();
        return;
    }

    let charPool = '';

    if (passwordUppercaseCheckbox.checked) charPool += passwordUppercase;
    if (passwordLowercaseCheckbox.checked) charPool += passwordLowercase;
    if (passwordNumbersCheckbox.checked) charPool += passwordNumbers;
    if (passwordSymbolsCheckbox.checked) charPool += passwordSpecial;

    let password = '';

    // Asegurar que cada tipo seleccionado esté representado al menos una vez
    if (passwordUppercaseCheckbox.checked) password += passwordUppercase[Math.floor(Math.random() * passwordUppercase.length)];
    if (passwordLowercaseCheckbox.checked) password += passwordLowercase[Math.floor(Math.random() * passwordLowercase.length)];
    if (passwordNumbersCheckbox.checked) password += passwordNumbers[Math.floor(Math.random() * passwordNumbers.length)];
    if (passwordSymbolsCheckbox.checked) password += passwordSpecial[Math.floor(Math.random() * passwordSpecial.length)];

    // Llenar el resto hasta alcanzar la longitud deseada
    for (let i = password.length; i < length; i++) {
        password += charPool[Math.floor(Math.random() * charPool.length)];
    }

    // Mezclar la contraseña
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    passwordOutput.value = password;
    copyPasswordBtn.style.display = 'block';
    updateCharCounter(passwordOutput, passwordCharCounter);
    updateSecurityBar();
}

function updateSecurityBar() {
    const password = passwordOutput.value;
    let security = 0;

    if (password.length === 0) {
        securityFill.style.width = '0%';
        securityText.textContent = 'Seguridad: -';
        return;
    }

    // Calcular seguridad basado en longitud
    security += Math.min((password.length / 20) * 40, 40);

    // Calcular seguridad basado en variedad de caracteres
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*]/.test(password);

    const varietyCount = (hasUppercase ? 1 : 0) + (hasLowercase ? 1 : 0) +
                         (hasNumbers ? 1 : 0) + (hasSymbols ? 1 : 0);

    security += varietyCount * 15;

    // Limitar a 100
    security = Math.min(security, 100);

    securityFill.style.width = security + '%';

    // Mostrar nivel de seguridad
    let level = '';
    if (security < 30) {
        level = 'Débil';
    } else if (security < 60) {
        level = 'Media';
    } else if (security < 85) {
        level = 'Fuerte';
    } else {
        level = 'Muy Fuerte';
    }

    securityText.textContent = `Seguridad: ${level}`;
}

// Common Functions
function copyToClipboard(textElement, button) {
    if (textElement.value.trim() === '') {
        return;
    }

    textElement.select();
    document.execCommand('copy');

    showNotification('¡Copiado!');
}

function updateCharCounter(textElement, counterElement) {
    const charCount = textElement.value.length;
    const text = charCount === 1 ? 'carácter' : 'caracteres';
    counterElement.textContent = `${charCount} ${text}`;
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        hideNotification();
    }, 2000);
}

function hideNotification() {
    notification.classList.remove('show');
}

// Generar una contraseña inicial al cargar
window.addEventListener('load', () => {
    generatePassword();
});
