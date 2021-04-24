export default {
  randomNumber (min = 0, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Add your helper functions here to be available on the window[namespace]
}