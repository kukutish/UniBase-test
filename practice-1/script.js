const errorTitle = document.querySelectorAll('.error-title-js');
const modalForm = document.getElementById('modal-form-js');
const submitButton = document.getElementById('submit-js');
const logoInput = document.getElementById('logo');
const logoLabel = document.getElementById('logo-label');
const modalWindow = document.getElementById('modal-window');
const buttonOpenModal  = document.getElementById('button-open-modal-js');

logoInput.addEventListener('change', (event) => {
    const image = event.target.files[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        logoLabel.style.backgroundImage = "url('" + e.target.result + "')";
      }
      reader.readAsDataURL(image);
    } else {
      logoLabel.style.backgroundImage = "url('./image/logo-photo.png')"
    }
})

submitButton.addEventListener('click', (event) => {
  let toggle = true;
  const formElements = document.querySelectorAll('.form-element-js');
  formElements.forEach((elem, id) =>{
    if(!elem.validity.valid){
      errorTitle[id].classList.remove('label-error__close')
      if(toggle) toggle = false;
    }
    else {
      if(!errorTitle[id].classList.contains('label-error__close')){
        errorTitle[id].classList.add('label-error__close')
      }
    }
  })
  toggle ? modalForm.submit() : event.preventDefault();
})


modalForm.addEventListener('reset', () => {
  modalWindow.style.display = 'none';
})

buttonOpenModal.addEventListener('click', ()=>{
  modalWindow.style.display = 'block';
  modalWindow.scrollTop = 0;
})
