import { login, logout, signup } from './login.js'
import { updateSettings } from './updateSettings.js'
import { displayMap } from './mapbox.js'
import { bookTour } from './stripe.js'
import { showAlert } from './alerts.js'

const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form--login')
const sighUpForm = document.querySelector('.form--signup')
const logOutBtn = document.querySelector('.nav__el-logout')
const userDataForm = document.querySelector('.form-user-data')
const userPasswordForm = document.querySelector('.form-user-password')
const bookBtn = document.getElementById('book-tour')


console.log(mapBox)
if (mapBox) {
  console.log(mapBox)
  const locations = JSON.parse(mapBox.dataset.locations)
  displayMap(locations)

}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
  })
}

if (sighUpForm) {
  sighUpForm.addEventListener('submit', e => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value
    signup(name, email, password, passwordConfirm)
  })
}

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault()

    const form = new FormData()
    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    form.append('photo', document.getElementById('photo').files[0])
    updateSettings(form, 'data')
  })
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault()
    const passwordCurrent = document.getElementById('password-current').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value
    document.querySelector('.btn--save-password').textContent = 'Updating...'

    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password')

    document.querySelector('.btn--save-password').textContent = 'Save password'
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  })
}

if (logOutBtn) logOutBtn.addEventListener('click', logout)

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...'
    const tourId = e.target.dataset.tourId
    console.log(tourId)
    bookTour(tourId)
  })
}

  const alertMessage = document.querySelector('body').dataset.alertMessage
  if (alert && alertMessage) showAlert('success', alertMessage, 20)