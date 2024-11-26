// Find the div by ID
var messageContainer = document.getElementById('chatContainer');

// Check if the div exists
if (chatContainer) {
    // Create an iframe element
    var iframe = document.createElement('iframe');
    
    // Set the iframe source to chatgpt.com
    iframe.src = 'https://talkai.info/chat/';
    
    // Set the iframe width and height (you can adjust these values)
    iframe.width = '100%';
    iframe.height = '500px'; // You can adjust the height as needed
    
    // Clear the existing content of the div
    messageContainer.innerHTML = '';
    
    // Append the iframe to the div
    messageContainer.appendChild(iframe);
} else {
    console.log('Div with id "chatContainer" not found');
}
