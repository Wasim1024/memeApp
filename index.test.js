import { jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { catsData } from './data.js';

// Mock the DOM elements
document.body.innerHTML = `
    <div id="emotion-radios"></div>
    <div class="gifs-check">
        <input type="checkbox" id="gifs-only-option">
    </div>
    <button id="get-image-btn"></button>
    <div id="meme-modal">
        <button id="meme-modal-close-btn">X</button>
        <div id="meme-modal-inner"></div>
    </div>
`;

// Import the functions after setting up the DOM
const indexModule = require('./index.js');

describe('Meme Picker Functionality', () => {
    beforeEach(() => {
        // Clear any previous modifications
        document.body.innerHTML = `
            <div id="emotion-radios"></div>
            <div class="gifs-check">
                <input type="checkbox" id="gifs-only-option">
            </div>
            <button id="get-image-btn"></button>
            <div id="meme-modal">
                <button id="meme-modal-close-btn">X</button>
                <div id="meme-modal-inner"></div>
            </div>
        `;
    });

    test('getEmotionsArray returns unique emotions', () => {
        const result = indexModule.getEmotionsArray(catsData);
        const uniqueEmotions = [...new Set(result)];
        expect(result).toEqual(uniqueEmotions);
    });

    test('radio buttons are rendered correctly', () => {
        indexModule.renderEmotionsRadios(catsData);
        const radioContainer = document.getElementById('emotion-radios');
        const radioButtons = radioContainer.querySelectorAll('input[type="radio"]');
        expect(radioButtons.length).toBeGreaterThan(0);
    });

    test('getMatchingCatsArray filters by emotion', () => {
        // Setup
        indexModule.renderEmotionsRadios(catsData);
        const firstRadio = document.querySelector('input[type="radio"]');
        firstRadio.checked = true;
        
        // Test
        const result = indexModule.getMatchingCatsArray();
        expect(result.length).toBeGreaterThan(0);
        result.forEach(cat => {
            expect(cat.emotionTags).toContain(firstRadio.value);
        });
    });

    test('getMatchingCatsArray filters GIFs when checkbox is checked', () => {
        // Setup
        indexModule.renderEmotionsRadios(catsData);
        const firstRadio = document.querySelector('input[type="radio"]');
        firstRadio.checked = true;
        const gifsOnlyCheckbox = document.getElementById('gifs-only-option');
        gifsOnlyCheckbox.checked = true;
        
        // Test
        const result = indexModule.getMatchingCatsArray();
        expect(result.length).toBeGreaterThan(0);
        result.forEach(cat => {
            expect(cat.isGif).toBe(true);
            expect(cat.emotionTags).toContain(firstRadio.value);
        });
    });

    test('modal opens and closes correctly', () => {
        const modal = document.getElementById('meme-modal');
        const closeBtn = document.getElementById('meme-modal-close-btn');
        
        // Test opening
        indexModule.renderCat();
        expect(modal.style.display).toBe('flex');
        
        // Test closing
        closeBtn.click();
        setTimeout(() => {
            expect(modal.style.display).toBe('none');
        }, 300);
    });
});
