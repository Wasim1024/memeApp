import '@testing-library/jest-dom'

// Mock the DOM environment for tests
window.HTMLMediaElement.prototype.load = () => {}
window.HTMLMediaElement.prototype.play = () => {}
window.HTMLMediaElement.prototype.pause = () => {}
window.HTMLMediaElement.prototype.addTextTrack = () => {}
