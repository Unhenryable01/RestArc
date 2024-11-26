// Remove any existing UI to avoid duplication
const existingBox = document.querySelector('#translation-tool');
if (existingBox) existingBox.remove();

// Create the main container
const toolBox = document.createElement('div');
toolBox.id = 'translation-tool';
Object.assign(toolBox.style, {
  position: 'fixed',
  top: '10px',
  right: '10px',
  width: '220px',
  padding: '10px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: '10000',
});

// Create the title
const title = document.createElement('div');
title.textContent = 'Input Text';
Object.assign(title.style, {
  marginBottom: '8px',
  fontWeight: 'bold',
});

// Create the input box
const inputBox = document.createElement('input');
Object.assign(inputBox.style, {
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px',
});
inputBox.placeholder = 'Enter text here';

// Create gender selection
const genderLabel = document.createElement('label');
genderLabel.textContent = 'Gender:';
Object.assign(genderLabel.style, { marginRight: '8px' });

const genderSelect = document.createElement('select');
const maleOption = document.createElement('option');
maleOption.value = 'male';
maleOption.textContent = 'Male';

const feminineOption = document.createElement('option');
feminineOption.value = 'feminine';
feminineOption.textContent = 'Feminine';

genderSelect.appendChild(maleOption);
genderSelect.appendChild(feminineOption);
Object.assign(genderSelect.style, {
  marginBottom: '8px',
  width: '100%',
  padding: '6px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc',
});

// Create the translate button
const translateButton = document.createElement('button');
translateButton.textContent = 'Translate';
Object.assign(translateButton.style, {
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});
translateButton.addEventListener('mouseenter', () => {
  translateButton.style.backgroundColor = '#45a049';
});
translateButton.addEventListener('mouseleave', () => {
  translateButton.style.backgroundColor = '#4CAF50';
});

// Create the delete button
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete Last Letter';
Object.assign(deleteButton.style, {
  width: '100%',
  padding: '8px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});
deleteButton.addEventListener('mouseenter', () => {
  deleteButton.style.backgroundColor = '#e53935';
});
deleteButton.addEventListener('mouseleave', () => {
  deleteButton.style.backgroundColor = '#f44336';
});

// Logic for the translate button
translateButton.addEventListener('click', () => {
  const text = inputBox.value.trim();
  if (!text) {
    alert('Please enter text to translate.');
    return;
  }

  // Determine the appropriate article based on gender selection
  const selectedGender = genderSelect.value;
  let article = '';
  if (selectedGender === 'male') {
    article = 'le';
  } else if (selectedGender === 'feminine') {
    article = 'la';
  }

  // Use the Groq API for translation
  fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'user',
          content: `Translate the following word into French with the correct article ("le" for masculine, "la" for feminine), and provide only the correct translation in the form of two words: "${text}". For example, "le poisson" or "la table". No additional explanation or information, just the two words.`,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const translatedWord = data.choices[0].message.content.trim();

      // Check if the translation starts with "le" or "la", and ensure only the correct one is used
      const finalTranslation = translatedWord.startsWith('le') || translatedWord.startsWith('la') ? translatedWord : `${article} ${translatedWord}`;

      // Place the translation into the input box
      inputBox.value = finalTranslation;

      // Assign the translation to the LanguageNut input box
      const targetInput = document.querySelector('#textInputChina');
      if (targetInput) {
        targetInput.value = finalTranslation;
      } else {
        alert('Could not find LanguageNut input field (id: textInputChina).');
      }
    })
    .catch((err) => console.error('Translation error:', err));
});

// Logic for the delete button
deleteButton.addEventListener('click', () => {
  const currentText = inputBox.value;
  inputBox.value = currentText.slice(0, -1); // Remove the last character
});

// Append elements to the container
toolBox.appendChild(title);
toolBox.appendChild(inputBox);
toolBox.appendChild(genderLabel);
toolBox.appendChild(genderSelect);
toolBox.appendChild(translateButton);
toolBox.appendChild(deleteButton);

// Append the container to the body
document.body.appendChild(toolBox);
