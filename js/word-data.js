// Word Scramble Game Data
const WORD_DATA = {
    easy: [
        { word: 'cat', category: 'Animals', hint: 'A furry pet' },
        { word: 'dog', category: 'Animals', hint: 'Man\'s best friend' },
        { word: 'run', category: 'Sports', hint: 'Move fast' },
        { word: 'swim', category: 'Sports', hint: 'Move in water' },
        { word: 'tree', category: 'Nature', hint: 'Has leaves' },
        { word: 'rain', category: 'Weather', hint: 'Falls from sky' },
        { word: 'book', category: 'Objects', hint: 'Read me' },
        { word: 'star', category: 'Space', hint: 'Shines at night' },
        { word: 'fish', category: 'Animals', hint: 'Lives in water' },
        { word: 'bird', category: 'Animals', hint: 'Can fly' },
        { word: 'fire', category: 'Nature', hint: 'Hot and bright' },
        { word: 'snow', category: 'Weather', hint: 'Cold white flakes' },
        { word: 'cold', category: 'Weather', hint: 'Low temperature' },
        { word: 'dark', category: 'Light', hint: 'No light' },
        { word: 'blue', category: 'Colors', hint: 'Sky color' },
        { word: 'gold', category: 'Metals', hint: 'Valuable metal' },
        { word: 'milk', category: 'Food', hint: 'From cows' },
        { word: 'moon', category: 'Space', hint: 'Earth\'s satellite' },
        { word: 'wind', category: 'Weather', hint: 'Moving air' },
        { word: 'leaf', category: 'Nature', hint: 'From trees' },
    ],
    medium: [
        { word: 'apple', category: 'Food', hint: 'Red fruit' },
        { word: 'orange', category: 'Colors', hint: 'Between yellow and red' },
        { word: 'music', category: 'Arts', hint: 'Pleasant sounds' },
        { word: 'dance', category: 'Arts', hint: 'Move to rhythm' },
        { word: 'ocean', category: 'Nature', hint: 'Large water body' },
        { word: 'beach', category: 'Geography', hint: 'Sandy shore' },
        { word: 'flower', category: 'Nature', hint: 'Beautiful plant' },
        { word: 'friend', category: 'People', hint: 'Close companion' },
        { word: 'family', category: 'People', hint: 'Relatives' },
        { word: 'school', category: 'Places', hint: 'Place to learn' },
        { word: 'church', category: 'Places', hint: 'Place of worship' },
        { word: 'garden', category: 'Nature', hint: 'Plants grow here' },
        { word: 'picnic', category: 'Activities', hint: 'Outdoor meal' },
        { word: 'travel', category: 'Activities', hint: 'Go places' },
        { word: 'camera', category: 'Objects', hint: 'Takes pictures' },
        { word: 'pencil', category: 'Objects', hint: 'For writing' },
        { word: 'guitar', category: 'Music', hint: 'String instrument' },
        { word: 'castle', category: 'Architecture', hint: 'Medieval fort' },
        { word: 'prince', category: 'People', hint: 'Royal son' },
        { word: 'castle', category: 'Places', hint: 'Noble residence' },
        { word: 'jungle', category: 'Geography', hint: 'Dense forest' },
        { word: 'winter', category: 'Seasons', hint: 'Cold season' },
        { word: 'summer', category: 'Seasons', hint: 'Hot season' },
        { word: 'spring', category: 'Seasons', hint: 'Growing season' },
        { word: 'autumn', category: 'Seasons', hint: 'Harvest season' },
        { word: 'planet', category: 'Space', hint: 'Orbits star' },
        { word: 'island', category: 'Geography', hint: 'Land surrounded by water' },
        { word: 'forest', category: 'Geography', hint: 'Many trees' },
        { word: 'desert', category: 'Geography', hint: 'Sandy dry place' },
        { word: 'carpet', category: 'Objects', hint: 'Floor covering' },
    ],
    hard: [
        { word: 'butterfly', category: 'Animals', hint: 'Colorful flying insect' },
        { word: 'chocolate', category: 'Food', hint: 'Sweet brown treat' },
        { word: 'adventure', category: 'Activities', hint: 'Exciting journey' },
        { word: 'telescope', category: 'Objects', hint: 'For stargazing' },
        { word: 'computer', category: 'Technology', hint: 'Electronic device' },
        { word: 'elephant', category: 'Animals', hint: 'Large gray animal' },
        { word: 'dinosaur', category: 'Animals', hint: 'Ancient reptile' },
        { word: 'universe', category: 'Space', hint: 'All of existence' },
        { word: 'hospital', category: 'Places', hint: 'Medical facility' },
        { word: 'birthday', category: 'Celebrations', hint: 'Annual celebration' },
        { word: 'festival', category: 'Celebrations', hint: 'Large celebration' },
        { word: 'mountain', category: 'Geography', hint: 'Very tall landform' },
        { word: 'monument', category: 'Architecture', hint: 'Historic structure' },
        { word: 'treasure', category: 'Objects', hint: 'Valuable items' },
        { word: 'kingdom', category: 'Government', hint: 'Ruled by king' },
        { word: 'pirate', category: 'Professions', hint: 'Sea robber' },
        { word: 'painting', category: 'Arts', hint: 'Artistic work' },
        { word: 'sculpture', category: 'Arts', hint: 'Three-D art' },
        { word: 'cathedral', category: 'Architecture', hint: 'Large church' },
        { word: 'symphony', category: 'Music', hint: 'Large orchestra composition' },
        { word: 'character', category: 'Literature', hint: 'Fictional person' },
        { word: 'dialogue', category: 'Literature', hint: 'Conversation in story' },
        { word: 'narrative', category: 'Literature', hint: 'Story telling' },
        { word: 'paragraph', category: 'Writing', hint: 'Section of text' },
        { word: 'paragraph', category: 'Writing', hint: 'Section of text' },
        { word: 'magazine', category: 'Media', hint: 'Periodical publication' },
        { word: 'calendar', category: 'Objects', hint: 'Shows dates' },
        { word: 'platform', category: 'Objects', hint: 'Raised surface' },
        { word: 'waterfall', category: 'Nature', hint: 'Falling water' },
        { word: 'festival', category: 'Events', hint: 'Cultural celebration' },
        { word: 'champion', category: 'Sports', hint: 'Winner' },
        { word: 'hurricane', category: 'Weather', hint: 'Violent storm' },
        { word: 'language', category: 'Education', hint: 'System of communication' },
        { word: 'powerful', category: 'Adjectives', hint: 'Having great strength' },
        { word: 'treasure', category: 'Objects', hint: 'Valuable items' },
    ]
};

// Scramble a word
function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const scrambled = arr.join('');
    // Make sure the scrambled word is different from original
    if (scrambled === word) {
        return scrambleWord(word);
    }
    return scrambled;
}

// Get random word from difficulty
function getRandomWord(difficulty = 'mixed') {
    let wordList = [];

    if (difficulty === 'mixed') {
        wordList = [
            ...WORD_DATA.easy,
            ...WORD_DATA.medium,
            ...WORD_DATA.hard
        ];
    } else if (WORD_DATA[difficulty]) {
        wordList = WORD_DATA[difficulty];
    } else {
        wordList = WORD_DATA.medium;
    }

    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    return {
        ...randomWord,
        scrambled: scrambleWord(randomWord.word)
    };
}

// Get word by difficulty
function getWordByDifficulty(difficulty) {
    const difficultyMap = {
        'easy': () => WORD_DATA.easy[Math.floor(Math.random() * WORD_DATA.easy.length)],
        'medium': () => WORD_DATA.medium[Math.floor(Math.random() * WORD_DATA.medium.length)],
        'hard': () => WORD_DATA.hard[Math.floor(Math.random() * WORD_DATA.hard.length)],
        'mixed': () => getRandomWord('mixed')
    };

    const wordObj = difficultyMap[difficulty] ? difficultyMap[difficulty]() : WORD_DATA.medium[Math.floor(Math.random() * WORD_DATA.medium.length)];
    return {
        ...wordObj,
        scrambled: scrambleWord(wordObj.word)
    };
}
