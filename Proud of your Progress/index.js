document.addEventListener('DOMContentLoaded', () => {

  const cardForm = document.getElementById('cardForm');
  const modal = document.getElementById('modal');
  const certificateContent = document.getElementById('certificateContent');
  const closeModal = document.querySelector('.close');
  const downloadCertificate = document.createElement('button');
  downloadCertificate.classList.add("download-btn");
  
  // Hide the modal initially
  modal.style.display = 'none';
  
  cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // 🚨 Get input values
    const studentNameInput = document.getElementById('studentName');
    const personalMessageInput = document.getElementById('personalMessage');
    const courseNameInput = document.getElementById('courseName'); 
  
    const studentName = studentNameInput.value;
    const personalMessage = personalMessageInput.value;
    const courseName = courseNameInput ? courseNameInput.value : "a course"; // Fallback to "a course" if no input
  
    if (studentName.trim() === '' || personalMessage.trim() === '') {
      alert('Please fill in all fields');
      return;
    } 
  
    // 🚨 Generate certificate content dynamically
    certificateContent.innerHTML = `
      <h1>Certificate of Achievement</h1>
      <p>This is to certify that</p>
      <h2>${studentName}</h2>
      <p>has almost completed the</p>
      <h3>${courseName} Course.</h3>
      <p>with legendary perseverance and world-class bad-assery for never giving up 🏆</p>
      <br>
      <img src="./logo.png" height="150px" width="400px" alt="Logo"/>
      <p>${personalMessage}</p>
    `;

    // Bonus Feature 🟧: Make a PDF from the HTML
    // Downloads the generated cerificate as a PDF file
    downloadCertificate.innerText = `Download Certificate`;
    downloadCertificate.addEventListener('click', () => {
      var certificateCustomizer = {
        margin:       1,
        filename:     `${studentName}'s ${courseName} certificate.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
      };  
  
      html2pdf().from(certificateContent).set(certificateCustomizer).save();
    });
    modal.appendChild(downloadCertificate); // Adds the download button to the modal window
    
    //  Display the modal
    modal.style.display = 'block';

    // Clear the form inputs
    studentNameInput.value = '';
    personalMessageInput.value = '';
    if(courseNameInput) courseNameInput.value = '';
  });

  //  🚨 Close the modal when the close button is clicked
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.removeChild(downloadCertificate);
  });
});
  