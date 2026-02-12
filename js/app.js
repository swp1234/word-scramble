// Word Scramble Game App
class WordScrambleGame {
    constructor() {
        this.difficulty = 'mixed';
        this.currentWord = null;
        this.selectedLetters = [];
        this.score = 0;
        this.level = 1;
        this.combo = 0;
        this.bestCombo = 0;
        this.lives = 3;
        this.timeLeft = 30;
        this.totalTimeLeft = 30;
        this.gameActive = false;
        this.wordsCorrect = 0;
        this.wordIndex = 0;
        this.wordsPerLevel = 10;
        this.timerInterval = null;
        this.usedHints = {};
        this.startTime = 0;

        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        // Screens
        this.introScreen = document.getElementById('intro-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.gameoverScreen = document.getElementById('gameover-screen');

        // Game elements
        this.levelDisplay = document.getElementById('level-display');
        this.scoreDisplay = document.getElementById('score-display');
        this.comboDisplay = document.getElementById('combo-display');
        this.lifeDisplay = document.getElementById('life-display');
        this.categoryBadge = document.getElementById('category-badge');
        this.scrambledWord = document.getElementById('scrambled-word');
        this.answerDisplay = document.getElementById('answer-display');
        this.timerText = document.getElementById('timer-text');
        this.timerFill = document.getElementById('timer-fill');

        // Buttons
        this.startBtn = document.getElementById('start-btn');
        this.submitBtn = document.getElementById('submit-btn');
        this.skipBtn = document.getElementById('skip-btn');
        this.continueBtn = document.getElementById('continue-btn');
        this.retryBtn = document.getElementById('retry-btn');
        this.homeBtn = document.getElementById('home-btn');
        this.homeBtn2 = document.getElementById('home-btn2');
        this.hintFirstLetterBtn = document.getElementById('hint-first-letter');
        this.hintCategoryBtn = document.getElementById('hint-category');
        this.hintClearBtn = document.getElementById('hint-clear');
        this.premiumAnalysisBtn = document.getElementById('premium-analysis-btn');

        // Language
        this.langToggle = document.getElementById('lang-toggle');
        this.langMenu = document.getElementById('lang-menu');
        this.langOptions = document.querySelectorAll('.lang-option');

        // Modal
        this.premiumModal = document.getElementById('premium-modal');
        this.premiumClose = document.getElementById('premium-close');
        this.closePremiumBtn = document.getElementById('close-premium-btn');
        this.premiumBody = document.getElementById('premium-body');

        // Difficulty buttons
        this.difficultyBtns = document.querySelectorAll('.difficulty-btn');

        // Results
        this.finalScore = document.getElementById('final-score');
        this.correctCount = document.getElementById('correct-count');
        this.bestComboDisplay = document.getElementById('best-combo');
        this.gameoverScore = document.getElementById('gameover-score');
        this.gameoverCorrect = document.getElementById('gameover-correct');
        this.gameoverCombo = document.getElementById('gameover-combo');
    }

    initEventListeners() {
        // Start game
        this.startBtn.addEventListener('click', () => this.selectDifficulty());

        // Difficulty selection
        this.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.difficulty = e.target.dataset.difficulty;
                this.startGame();
            });
        });

        // Game buttons
        this.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.skipBtn.addEventListener('click', () => this.skipWord());
        this.hintFirstLetterBtn.addEventListener('click', () => this.showHintFirstLetter());
        this.hintCategoryBtn.addEventListener('click', () => this.showHintCategory());
        this.hintClearBtn.addEventListener('click', () => this.clearAnswer());

        // Result buttons
        this.continueBtn.addEventListener('click', () => this.nextLevel());
        this.retryBtn.addEventListener('click', () => this.resetGame());
        this.homeBtn.addEventListener('click', () => this.goHome());
        this.homeBtn2.addEventListener('click', () => this.goHome());

        // Premium
        this.premiumAnalysisBtn.addEventListener('click', () => this.showPremiumAnalysis());
        this.premiumClose.addEventListener('click', () => this.closePremiumModal());
        this.closePremiumBtn.addEventListener('click', () => this.closePremiumModal());

        // Language
        this.langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.langMenu.classList.toggle('hidden');
        });

        this.langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = e.target.dataset.lang;
                i18n.setLanguage(lang);
                this.langMenu.classList.add('hidden');
            });
        });

        document.addEventListener('click', (e) => {
            if (!this.langMenu.contains(e.target) && e.target !== this.langToggle) {
                this.langMenu.classList.add('hidden');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(e) {
        // Don't intercept when modal or lang menu is open
        if (!this.premiumModal.classList.contains('hidden')) return;

        // Enter to submit answer (during gameplay)
        if (e.key === 'Enter' && this.gameActive) {
            e.preventDefault();
            if (this.selectedLetters.length > 0) {
                this.submitAnswer();
            }
            return;
        }

        // Escape or Backspace to clear answer (during gameplay)
        if ((e.key === 'Escape' || e.key === 'Backspace') && this.gameActive) {
            e.preventDefault();
            if (e.key === 'Backspace' && this.selectedLetters.length > 0) {
                // Remove last letter
                this.removeLetter(this.selectedLetters.length - 1);
            } else if (e.key === 'Escape') {
                this.clearAnswer();
            }
            return;
        }

        // Number keys 1-9 to select letter buttons by index (during gameplay)
        if (this.gameActive && /^[1-9]$/.test(e.key)) {
            const index = parseInt(e.key) - 1;
            const buttons = this.scrambledWord.querySelectorAll('.letter-btn:not(:disabled)');
            if (index < buttons.length) {
                e.preventDefault();
                this.selectLetter(buttons[index]);
            }
            return;
        }

        // Letter keys to select matching letter (during gameplay)
        if (this.gameActive && /^[a-zA-Z]$/.test(e.key)) {
            const letter = e.key.toLowerCase();
            const buttons = this.scrambledWord.querySelectorAll('.letter-btn:not(:disabled)');
            for (const btn of buttons) {
                if (btn.dataset.letter === letter) {
                    e.preventDefault();
                    this.selectLetter(btn);
                    return;
                }
            }
            return;
        }
    }

    selectDifficulty() {
        this.introScreen.classList.remove('active');
        // Difficulty buttons are shown, user selects one
    }

    startGame() {
        this.introScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.gameScreen.classList.add('active');
        this.gameActive = true;
        this.wordIndex = 0;
        this.nextWord();

        // GA4 tracking
        if (window.gtag) {
            gtag('event', 'game_start', {
                'difficulty': this.difficulty
            });
        }
    }

    nextWord() {
        this.wordIndex++;
        if (this.wordIndex > this.wordsPerLevel) {
            this.endLevel();
            return;
        }

        this.currentWord = getWordByDifficulty(this.difficulty);
        this.selectedLetters = [];
        this.timeLeft = 30;
        this.totalTimeLeft = 30;
        this.usedHints = {};
        this.startTime = Date.now();

        this.displayWord();
        this.startTimer();
        this.updateUI();
    }

    displayWord() {
        this.scrambledWord.innerHTML = '';
        const letters = this.currentWord.scrambled.split('');

        letters.forEach((letter, index) => {
            const btn = document.createElement('button');
            btn.className = 'letter-btn';
            btn.textContent = letter.toUpperCase();
            btn.dataset.letter = letter.toLowerCase();
            btn.dataset.index = index;
            btn.addEventListener('click', () => this.selectLetter(btn));
            this.scrambledWord.appendChild(btn);
        });

        this.categoryBadge.textContent = this.currentWord.category;
        this.updateAnswerDisplay();
    }

    selectLetter(btn) {
        btn.disabled = true;
        this.selectedLetters.push({
            letter: btn.dataset.letter,
            button: btn
        });
        this.updateAnswerDisplay();
    }

    updateAnswerDisplay() {
        this.answerDisplay.innerHTML = '';

        if (this.selectedLetters.length === 0) {
            this.answerDisplay.innerHTML = '<span style="color: var(--text-secondary); font-size: 12px;">Select letters...</span>';
            return;
        }

        this.selectedLetters.forEach((item, index) => {
            const letterDiv = document.createElement('div');
            letterDiv.className = 'answer-letter';
            letterDiv.textContent = item.letter.toUpperCase();
            letterDiv.addEventListener('click', () => this.removeLetter(index));
            this.answerDisplay.appendChild(letterDiv);
        });
    }

    removeLetter(index) {
        const item = this.selectedLetters[index];
        item.button.disabled = false;
        this.selectedLetters.splice(index, 1);
        this.updateAnswerDisplay();
    }

    clearAnswer() {
        this.selectedLetters.forEach(item => {
            item.button.disabled = false;
        });
        this.selectedLetters = [];
        this.updateAnswerDisplay();
    }

    submitAnswer() {
        const answer = this.selectedLetters.map(item => item.letter).join('');

        if (answer === this.currentWord.word) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

    correctAnswer() {
        const timeBonus = Math.max(this.timeLeft, 0);
        const lengthBonus = this.currentWord.word.length;
        const comboBonus = Math.max(1, 1 + this.combo * 0.1);
        const points = Math.floor(timeBonus * lengthBonus * comboBonus);

        this.score += points;
        this.combo++;
        this.wordsCorrect++;
        this.bestCombo = Math.max(this.bestCombo, this.combo);

        this.showFeedback(true, points);
        this.clearTimer();
        setTimeout(() => this.nextWord(), 1000);

        // GA4 tracking
        if (window.gtag) {
            gtag('event', 'word_correct', {
                'score': points,
                'combo': this.combo
            });
        }
    }

    wrongAnswer() {
        this.lives--;
        this.combo = 0;

        this.showFeedback(false);
        this.clearTimer();

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            setTimeout(() => this.nextWord(), 1000);
        }

        // GA4 tracking
        if (window.gtag) {
            gtag('event', 'word_wrong', {
                'lives_left': this.lives
            });
        }
    }

    skipWord() {
        this.combo = 0;
        this.clearTimer();
        setTimeout(() => this.nextWord(), 500);
    }

    showHintFirstLetter() {
        if (this.usedHints.firstLetter) return;
        this.usedHints.firstLetter = true;
        this.hintFirstLetterBtn.disabled = true;
        alert(`First letter: ${this.currentWord.word[0].toUpperCase()}`);
    }

    showHintCategory() {
        if (this.usedHints.category) return;
        this.usedHints.category = true;
        this.hintCategoryBtn.disabled = true;
        // Category is already shown in the badge
    }

    showFeedback(isCorrect, points = 0) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 16px 32px;
            background: ${isCorrect ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
            color: white;
            border-radius: 12px;
            font-weight: 700;
            font-size: 18px;
            z-index: 500;
            animation: slideDown 0.3s ease;
        `;
        feedback.textContent = isCorrect ? `+${points}` : 'Wrong!';
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 1000);
    }

    startTimer() {
        this.clearTimer();
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();

            if (this.timeLeft <= 0) {
                this.timeExpired();
            }
        }, 100);
    }

    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimer() {
        this.timerText.textContent = Math.ceil(this.timeLeft);
        const circumference = 283;
        const percentage = Math.max(0, this.timeLeft / 30);
        this.timerFill.style.strokeDashoffset = circumference * (1 - percentage);

        if (this.timeLeft <= 5) {
            this.timerFill.style.stroke = 'url(#timerGradient)';
        }
    }

    timeExpired() {
        this.clearTimer();
        this.wrongAnswer();
    }

    endLevel() {
        this.gameActive = false;
        this.clearTimer();
        this.gameScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.resultScreen.classList.add('active');

        this.finalScore.textContent = this.score;
        this.correctCount.textContent = this.wordsCorrect;
        this.bestComboDisplay.textContent = this.bestCombo;

        // GA4 tracking
        if (window.gtag) {
            gtag('event', 'level_complete', {
                'level': this.level,
                'score': this.score,
                'correct': this.wordsCorrect
            });
        }
    }

    gameOver() {
        this.gameActive = false;
        this.clearTimer();
        this.gameScreen.classList.add('hidden');
        this.gameoverScreen.classList.remove('hidden');
        this.gameoverScreen.classList.add('active');

        this.gameoverScore.textContent = this.score;
        this.gameoverCorrect.textContent = this.wordsCorrect;
        this.gameoverCombo.textContent = this.bestCombo;

        // GA4 tracking
        if (window.gtag) {
            gtag('event', 'game_over', {
                'level': this.level,
                'score': this.score,
                'correct': this.wordsCorrect
            });
        }
    }

    nextLevel() {
        this.level++;
        this.combo = 0;
        this.lives = 3;
        this.wordIndex = 0;
        this.wordsCorrect = 0;
        this.resultScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.gameScreen.classList.add('active');
        this.gameActive = true;
        this.nextWord();
    }

    resetGame() {
        this.difficulty = 'mixed';
        this.score = 0;
        this.level = 1;
        this.combo = 0;
        this.bestCombo = 0;
        this.lives = 3;
        this.wordIndex = 0;
        this.wordsCorrect = 0;
        this.gameoverScreen.classList.add('hidden');
        this.introScreen.classList.remove('hidden');
        this.introScreen.classList.add('active');
    }

    goHome() {
        window.location.href = 'https://dopabrain.com/portal/';
    }

    showPremiumAnalysis() {
        const analysis = this.generateAnalysis();
        this.premiumBody.innerHTML = analysis;
        this.premiumModal.classList.remove('hidden');

        // GA4 tracking
        if (window.gtag) {
            gtag('event', 'view_analysis', {
                'score': this.score
            });
        }
    }

    generateAnalysis() {
        const accuracy = this.wordsCorrect > 0 ? (this.wordsCorrect / this.wordIndex * 100).toFixed(1) : 0;
        const avgTime = this.wordsCorrect > 0 ? (30 - (this.score / this.wordsCorrect / 10)).toFixed(1) : 0;
        const performanceType = this.getPerformanceType(accuracy);
        const strengths = this.getStrengths(this.bestCombo, accuracy);
        const improvements = this.getImprovements();

        return `
            <h4>${i18n.t('premium.reactionType')}</h4>
            <p>${performanceType}</p>

            <h4>${i18n.t('premium.personalityTraits')}</h4>
            <p>${strengths}</p>

            <h4>${i18n.t('premium.dataAnalysis')}</h4>
            <p>${i18n.t('premium.averageTime')}: ${avgTime}s</p>
            <p>Accuracy: ${accuracy}%</p>
            <p>Best Combo: ${this.bestCombo}</p>

            <h4>${i18n.t('premium.improvement')}</h4>
            <p>${improvements}</p>
        `;
    }

    getPerformanceType(accuracy) {
        if (accuracy >= 80) return 'Linguistic Master - Excellent word recognition skills!';
        if (accuracy >= 60) return 'Word Solver - Good vocabulary and quick thinking!';
        if (accuracy >= 40) return 'Word Hunter - Improving word skills!';
        return 'Word Learner - Keep practicing to improve!';
    }

    getStrengths(combo, accuracy) {
        const strengths = [];
        if (combo >= 5) strengths.push('Excellent focus');
        if (accuracy >= 60) strengths.push('Strong vocabulary');
        if (this.score > 1000) strengths.push('Quick thinking');
        return strengths.length > 0 ? strengths.join(', ') : 'Keep improving!';
    }

    getImprovements() {
        return i18n.t('premium.improvementSuggestion');
    }

    closePremiumModal() {
        this.premiumModal.classList.add('hidden');
    }

    updateUI() {
        this.levelDisplay.textContent = this.level;
        this.scoreDisplay.textContent = this.score;
        this.comboDisplay.textContent = this.combo;

        let hearts = '';
        for (let i = 0; i < this.lives; i++) {
            hearts += '❤️';
        }
        this.lifeDisplay.innerHTML = `<span>${hearts}</span>`;
    }
}

// Initialize app
let game;

async function initApp() {
    // Hide loader
    const loader = document.getElementById('app-loader');

    // Initialize i18n
    try {
        await i18n.init();
    } catch (e) {
        console.warn('i18n init failed:', e);
    }

    // Hide loader after 500ms
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 300);
        }
    }, 500);

    // Initialize game
    game = new WordScrambleGame();
    game.updateUI();

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('sw.js');
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    }
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Add CSS gradient for timer
document.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('svg');
    if (svg) {
        const defs = document.createElement('defs');
        const gradient = document.createElement('linearGradient');
        gradient.id = 'timerGradient';
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElement('stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:#e056fd;stop-opacity:1');

        const stop2 = document.createElement('stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:#f78dff;stop-opacity:1');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
        });
    }
});
