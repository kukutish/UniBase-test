const errorTitle = document.querySelectorAll('.error-title-js');
const modalForm = document.getElementById('modal-form-js');
const submitButton = document.getElementById('submit-js');
const logoInput = document.getElementById('logo');
const logoLabel = document.getElementById('logo-label');
const modalWindow = document.getElementById('modal-window');
const buttonOpenModal  = document.getElementById('button-open-modal-js');
const elementModalForm = document.getElementById('modal-window-form-js');
const formElements = document.querySelectorAll('.form-element-js');

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

  if(toggle){
    modalForm.submit()
  }else{
    event.preventDefault();
    elementModalForm.scrollIntoView({ behavior: 'smooth' });
  }
})


function closeForm() {
  elementModalForm.classList.add('close-modal');
  setTimeout(()=>{
    modalWindow.style.display = 'none';
  }, 300)
  errorTitle.forEach(elem => {
    elem.classList.add('label-error__close')
  })
}

modalForm.addEventListener('reset', () => {
  closeForm()
})

modalWindow.addEventListener('click', (evt)=>{
  if(!evt.target.closest('#modal-window-form-js')){
    closeForm()
  }
})


buttonOpenModal.addEventListener('click', ()=>{
  modalWindow.style.display = 'block';
  modalWindow.scrollTop = 0
  setTimeout(()=>{
    elementModalForm.classList.remove('close-modal');
  }, 300)
})
