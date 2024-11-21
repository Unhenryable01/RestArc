// Remove any existing command interface if present
const existingInterface = document.querySelector('#command-interface-container');
if (existingInterface) {
  existingInterface.remove();
}

// Create a container to hold the input and button
const container = document.createElement('div');
container.id = 'command-interface-container';

// Style the container to overlay the page
Object.assign(container.style, {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: '10000',
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
});

// Create the text box for user input
const textBox = document.createElement('input');
Object.assign(textBox.style, {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '300px',
  marginBottom: '10px',
  display: 'block',
});
textBox.type = 'text';
textBox.placeholder = 'Enter JavaScript command here';

// Create the execute button
const button = document.createElement('button');
Object.assign(button.style, {
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
});
button.textContent = 'Execute';

// Add hover effect to the button
button.addEventListener('mouseenter', () => {
  button.style.backgroundColor = '#45a049';
});
button.addEventListener('mouseleave', () => {
  button.style.backgroundColor = '#4CAF50';
});

// Add click event to the button
button.addEventListener('click', () => {
  const command = textBox.value.trim();
  if (command) {
    try {
      const result = eval(command); // Execute the JavaScript entered in the text box
      console.log('Command executed successfully:', result);
    } catch (error) {
      console.error('Error executing command:', error);
    }
  } else {
    console.warn('No command entered.');
  }
});

// Append the text box and button to the container
container.appendChild(textBox);
container.appendChild(button);

// Append the container to the body
document.body.appendChild(container);
