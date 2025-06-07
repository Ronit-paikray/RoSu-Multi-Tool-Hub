// Multi Tool Hub - Premium Utilities
// All tools implemented with vanilla JavaScript

class MultiToolHub {
    constructor() {
        this.tools = [
            {
                id: 'image-converter',
                title: 'Image Converter',
                description: 'Convert between JPG, PNG, and WEBP formats',
                icon: '🖼️'
            },
            {
                id: 'image-compressor',
                title: 'Image Compressor',
                description: 'Compress image file size with quality control',
                icon: '📉'
            },
            {
                id: 'image-cropper',
                title: 'Image Cropper',
                description: 'Crop and resize images with preview',
                icon: '✂️'
            },
            {
                id: 'video-converter',
                title: 'Video Converter',
                description: 'Convert between MP4 and WebM formats',
                icon: '🎬'
            },
            {
                id: 'audio-converter',
                title: 'Audio Converter',
                description: 'Convert between MP3 and WAV formats',
                icon: '🎵'
            },
            {
                id: 'audio-trimmer',
                title: 'Audio Trimmer',
                description: 'Trim audio clips by time range',
                icon: '🎧'
            },
            {
                id: 'age-calculator',
                title: 'Age Calculator',
                description: 'Calculate exact age in years, months, and days',
                icon: '📅'
            },
            {
                id: 'emi-calculator',
                title: 'EMI Calculator',
                description: 'Calculate loan EMI and total interest',
                icon: '💰'
            },
            {
                id: 'sip-calculator',
                title: 'SIP Calculator',
                description: 'Calculate SIP returns and future value',
                icon: '📈'
            },
            {
                id: 'qr-generator',
                title: 'QR Code Generator',
                description: 'Generate QR codes for text or URLs',
                icon: '📱'
            },
            {
                id: 'password-generator',
                title: 'Password Generator',
                description: 'Generate secure passwords with options',
                icon: '🔐'
            },
            {
                id: 'word-counter',
                title: 'Word Counter',
                description: 'Count words, characters, and reading time',
                icon: '📝'
            },
            {
                id: 'base64-encoder',
                title: 'Base64 Encoder/Decoder',
                description: 'Encode and decode Base64 text',
                icon: '🔤'
            },
            {
                id: 'color-picker',
                title: 'Color Picker',
                description: 'Pick colors and get HEX, RGB, HSL values',
                icon: '🎨'
            },
            {
                id: 'text-to-speech',
                title: 'Text to Speech',
                description: 'Convert text to speech audio',
                icon: '🔊'
            },
            {
                id: 'speech-to-text',
                title: 'Speech to Text',
                description: 'Convert voice to text using microphone',
                icon: '🎤'
            },
            {
                id: 'json-formatter',
                title: 'JSON Formatter',
                description: 'Format and validate JSON data',
                icon: '📋'
            },
            {
                id: 'unit-converter',
                title: 'Unit Converter',
                description: 'Convert between different units',
                icon: '📏'
            },
            {
                id: 'bmi-calculator',
                title: 'BMI Calculator',
                description: 'Calculate Body Mass Index and category',
                icon: '⚖️'
            },
            {
                id: 'timer-stopwatch',
                title: 'Timer / Stopwatch',
                description: 'Timer and stopwatch functionality',
                icon: '⏱️'
            }
        ];

        this.currentTool = null;
        this.init();
    }

    init() {
        this.renderToolsGrid();
        this.setupEventListeners();
        this.setupIntersectionObserver();
    }

    renderToolsGrid() {
        const grid = document.getElementById('toolsGrid');
        grid.innerHTML = this.tools.map(tool => `
            <div class="tool-card" data-tool-id="${tool.id}">
                <div class="tool-icon" style="font-size: 2.5rem; margin-bottom: 1rem;">${tool.icon}</div>
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <button class="btn">Open Tool</button>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Tool card clicks
        document.addEventListener('click', (e) => {
            const toolCard = e.target.closest('.tool-card');
            if (toolCard) {
                const toolId = toolCard.dataset.toolId;
                this.openTool(toolId);
            }
        });

        // Modal close
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Modal background click
        document.getElementById('toolModal').addEventListener('click', (e) => {
            if (e.target.id === 'toolModal') {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentTool) {
                this.closeModal();
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });

        document.querySelectorAll('.tool-card').forEach(card => {
            observer.observe(card);
        });
    }

    openTool(toolId) {
        const tool = this.tools.find(t => t.id === toolId);
        if (!tool) return;

        this.currentTool = toolId;
        document.getElementById('modalTitle').textContent = tool.title;
        document.getElementById('modalBody').innerHTML = this.getToolContent(toolId);
        document.getElementById('toolModal').style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Initialize tool-specific functionality
        this.initializeTool(toolId);
    }

    closeModal() {
        document.getElementById('toolModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentTool = null;
    }

    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'block';
    }

    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }

    getToolContent(toolId) {
        switch (toolId) {
            case 'image-converter':
                return `
                    <div class="file-upload" onclick="document.getElementById('imageConverterInput').click()">
                        <input type="file" id="imageConverterInput" accept="image/*">
                        <p>📁 Click to upload image</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Convert to:</label>
                        <select class="form-select" id="imageFormat">
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WEBP</option>
                        </select>
                    </div>
                    <button class="btn" id="convertImage">Convert Image</button>
                    <div id="imageResult" class="result-display" style="display: none;"></div>
                `;

            case 'image-compressor':
                return `
                    <div class="file-upload" onclick="document.getElementById('imageCompressorInput').click()">
                        <input type="file" id="imageCompressorInput" accept="image/*">
                        <p>📁 Click to upload image</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Quality (0.1 - 1.0):</label>
                        <input type="range" class="form-input" id="imageQuality" min="0.1" max="1" step="0.1" value="0.8">
                        <span id="qualityValue">0.8</span>
                    </div>
                    <button class="btn" id="compressImage">Compress Image</button>
                    <div id="compressionResult" class="result-display" style="display: none;"></div>
                `;

            case 'image-cropper':
                return `
                    <div class="file-upload" onclick="document.getElementById('imageCropperInput').click()">
                        <input type="file" id="imageCropperInput" accept="image/*">
                        <p>📁 Click to upload image</p>
                    </div>
                    <canvas id="cropCanvas" style="display: none; max-width: 100%; border: 2px solid var(--accent-gold);"></canvas>
                    <div id="cropControls" style="display: none;">
                        <div class="flex gap-1 mt-1">
                            <button class="btn" id="cropImage">Crop Image</button>
                            <button class="btn btn-secondary" id="resetCrop">Reset</button>
                        </div>
                    </div>
                    <div id="cropResult" class="result-display" style="display: none;"></div>
                `;

            case 'video-converter':
                return `
                    <div class="file-upload" onclick="document.getElementById('videoConverterInput').click()">
                        <input type="file" id="videoConverterInput" accept="video/*">
                        <p>📁 Click to upload video</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Convert to:</label>
                        <select class="form-select" id="videoFormat">
                            <option value="mp4">MP4</option>
                            <option value="webm">WebM</option>
                        </select>
                    </div>
                    <button class="btn" id="convertVideo">Convert Video</button>
                    <div id="videoResult" class="result-display" style="display: none;"></div>
                `;

            case 'audio-converter':
                return `
                    <div class="file-upload" onclick="document.getElementById('audioConverterInput').click()">
                        <input type="file" id="audioConverterInput" accept="audio/*">
                        <p>📁 Click to upload audio</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Convert to:</label>
                        <select class="form-select" id="audioFormat">
                            <option value="mp3">MP3</option>
                            <option value="wav">WAV</option>
                        </select>
                    </div>
                    <button class="btn" id="convertAudio">Convert Audio</button>
                    <div id="audioResult" class="result-display" style="display: none;"></div>
                `;

            case 'audio-trimmer':
                return `
                    <div class="file-upload" onclick="document.getElementById('audioTrimmerInput').click()">
                        <input type="file" id="audioTrimmerInput" accept="audio/*">
                        <p>📁 Click to upload audio</p>
                    </div>
                    <audio id="audioPlayer" controls style="width: 100%; margin: 1rem 0; display: none;"></audio>
                    <div id="trimControls" style="display: none;">
                        <div class="form-group">
                            <label class="form-label">Start Time (seconds):</label>
                            <input type="number" class="form-input" id="startTime" min="0" step="0.1" value="0">
                        </div>
                        <div class="form-group">
                            <label class="form-label">End Time (seconds):</label>
                            <input type="number" class="form-input" id="endTime" min="0" step="0.1">
                        </div>
                        <button class="btn" id="trimAudio">Trim Audio</button>
                    </div>
                    <div id="trimResult" class="result-display" style="display: none;"></div>
                `;

            case 'age-calculator':
                return `
                    <div class="form-group">
                        <label class="form-label">Date of Birth:</label>
                        <input type="date" class="form-input" id="birthDate">
                    </div>
                    <button class="btn" id="calculateAge">Calculate Age</button>
                    <div id="ageResult" class="result-display" style="display: none;"></div>
                `;

            case 'emi-calculator':
                return `
                    <div class="form-group">
                        <label class="form-label">Loan Amount (₹):</label>
                        <input type="number" class="form-input" id="loanAmount" placeholder="500000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Interest Rate (% per annum):</label>
                        <input type="number" class="form-input" id="interestRate" placeholder="8.5" step="0.1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Loan Tenure (years):</label>
                        <input type="number" class="form-input" id="loanTenure" placeholder="20">
                    </div>
                    <button class="btn" id="calculateEMI">Calculate EMI</button>
                    <div id="emiResult" class="result-display" style="display: none;"></div>
                `;

            case 'sip-calculator':
                return `
                    <div class="form-group">
                        <label class="form-label">Monthly Investment (₹):</label>
                        <input type="number" class="form-input" id="monthlyInvestment" placeholder="5000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Expected Annual Return (%):</label>
                        <input type="number" class="form-input" id="annualReturn" placeholder="12" step="0.1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Investment Period (years):</label>
                        <input type="number" class="form-input" id="investmentPeriod" placeholder="10">
                    </div>
                    <button class="btn" id="calculateSIP">Calculate SIP</button>
                    <div id="sipResult" class="result-display" style="display: none;"></div>
                `;

            case 'qr-generator':
                return `
                    <div class="form-group">
                        <label class="form-label">Enter Text or URL:</label>
                        <textarea class="form-input" id="qrText" rows="3" placeholder="Enter text or URL to generate QR code"></textarea>
                    </div>
                    <button class="btn" id="generateQR">Generate QR Code</button>
                    <div id="qrResult" class="result-display" style="display: none;">
                        <canvas id="qrCanvas"></canvas>
                        <br><button class="btn btn-secondary mt-1" id="downloadQR">Download QR Code</button>
                    </div>
                `;

            case 'password-generator':
                return `
                    <div class="form-group">
                        <label class="form-label">Password Length:</label>
                        <input type="range" class="form-input" id="passwordLength" min="4" max="50" value="12">
                        <span id="lengthValue">12</span>
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            <input type="checkbox" id="includeUppercase" checked> Include Uppercase
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            <input type="checkbox" id="includeLowercase" checked> Include Lowercase
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            <input type="checkbox" id="includeNumbers" checked> Include Numbers
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            <input type="checkbox" id="includeSymbols"> Include Symbols
                        </label>
                    </div>
                    <button class="btn" id="generatePassword">Generate Password</button>
                    <div id="passwordResult" class="result-display" style="display: none;">
                        <input type="text" class="form-input" id="generatedPassword" readonly>
                        <button class="btn btn-secondary mt-1" id="copyPassword">Copy Password</button>
                    </div>
                `;

            case 'word-counter':
                return `
                    <div class="form-group">
                        <label class="form-label">Enter your text:</label>
                        <textarea class="form-input" id="textInput" rows="8" placeholder="Start typing to see live word count..."></textarea>
                    </div>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number" id="wordCount">0</div>
                            <div class="stat-label">Words</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number" id="charCount">0</div>
                            <div class="stat-label">Characters</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number" id="charCountNoSpaces">0</div>
                            <div class="stat-label">Char (No Spaces)</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number" id="readingTime">0</div>
                            <div class="stat-label">Reading Time (min)</div>
                        </div>
                    </div>
                `;

            case 'base64-encoder':
                return `
                    <div class="form-group">
                        <label class="form-label">Plain Text:</label>
                        <textarea class="form-input" id="plainText" rows="4" placeholder="Enter text to encode"></textarea>
                    </div>
                    <div class="flex gap-1 mb-2">
                        <button class="btn" id="encodeBase64">Encode to Base64</button>
                        <button class="btn btn-secondary" id="decodeBase64">Decode from Base64</button>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Base64 Text:</label>
                        <textarea class="form-input" id="base64Text" rows="4" placeholder="Base64 encoded text will appear here"></textarea>
                    </div>
                    <div class="flex gap-1">
                        <button class="btn btn-secondary" id="copyPlainText">Copy Plain Text</button>
                        <button class="btn btn-secondary" id="copyBase64Text">Copy Base64</button>
                    </div>
                `;

            case 'color-picker':
                return `
                    <div class="form-group text-center">
                        <input type="color" id="colorInput" value="#FFD700" style="width: 100px; height: 100px; border: none; border-radius: 8px; cursor: pointer;">
                    </div>
                    <div class="result-display">
                        <div class="form-group">
                            <label class="form-label">HEX:</label>
                            <input type="text" class="form-input" id="hexValue" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">RGB:</label>
                            <input type="text" class="form-input" id="rgbValue" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">HSL:</label>
                            <input type="text" class="form-input" id="hslValue" readonly>
                        </div>
                        <button class="btn btn-secondary" id="copyColorValues">Copy All Values</button>
                    </div>
                `;

            case 'text-to-speech':
                return `
                    <div class="form-group">
                        <label class="form-label">Enter text to speak:</label>
                        <textarea class="form-input" id="ttsText" rows="5" placeholder="Enter text to convert to speech"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Voice:</label>
                        <select class="form-select" id="voiceSelect"></select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Speed:</label>
                        <input type="range" class="form-input" id="speechRate" min="0.5" max="2" step="0.1" value="1">
                        <span id="rateValue">1</span>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Pitch:</label>
                        <input type="range" class="form-input" id="speechPitch" min="0" max="2" step="0.1" value="1">
                        <span id="pitchValue">1</span>
                    </div>
                    <div class="flex gap-1">
                        <button class="btn" id="speakText">🔊 Speak</button>
                        <button class="btn btn-secondary" id="stopSpeaking">⏹️ Stop</button>
                    </div>
                `;

            case 'speech-to-text':
                return `
                    <div class="text-center mb-2">
                        <button class="btn" id="startListening">🎤 Start Listening</button>
                        <button class="btn btn-secondary" id="stopListening" disabled>⏹️ Stop</button>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Recognized Text:</label>
                        <textarea class="form-input" id="recognizedText" rows="8" placeholder="Speak into your microphone..."></textarea>
                    </div>
                    <div class="flex gap-1">
                        <button class="btn btn-secondary" id="clearText">Clear</button>
                        <button class="btn btn-secondary" id="copyRecognizedText">Copy Text</button>
                    </div>
                    <div id="listeningStatus" class="mt-1 text-center" style="color: var(--accent-gold);"></div>
                `;

            case 'json-formatter':
                return `
                    <div class="form-group">
                        <label class="form-label">JSON Input:</label>
                        <textarea class="form-input" id="jsonInput" rows="8" placeholder="Paste your JSON here..."></textarea>
                    </div>
                    <div class="flex gap-1 mb-2">
                        <button class="btn" id="formatJSON">Format JSON</button>
                        <button class="btn btn-secondary" id="minifyJSON">Minify JSON</button>
                        <button class="btn btn-secondary" id="validateJSON">Validate JSON</button>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Formatted Output:</label>
                        <textarea class="form-input" id="jsonOutput" rows="8" readonly></textarea>
                    </div>
                    <div id="jsonValidation" class="mt-1"></div>
                `;

            case 'unit-converter':
                return `
                    <div class="form-group">
                        <label class="form-label">Category:</label>
                        <select class="form-select" id="unitCategory">
                            <option value="length">Length</option>
                            <option value="weight">Weight</option>
                            <option value="temperature">Temperature</option>
                            <option value="volume">Volume</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">From:</label>
                        <select class="form-select" id="fromUnit"></select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">To:</label>
                        <select class="form-select" id="toUnit"></select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Value:</label>
                        <input type="number" class="form-input" id="unitValue" placeholder="Enter value" step="any">
                    </div>
                    <div class="result-display">
                        <div class="result-title">Result:</div>
                        <div id="conversionResult" style="font-size: 1.5rem; color: var(--accent-gold);"></div>
                    </div>
                `;

            case 'bmi-calculator':
                return `
                    <div class="form-group">
                        <label class="form-label">Weight (kg):</label>
                        <input type="number" class="form-input" id="weight" placeholder="70" step="0.1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Height (cm):</label>
                        <input type="number" class="form-input" id="height" placeholder="175" step="0.1">
                    </div>
                    <button class="btn" id="calculateBMI">Calculate BMI</button>
                    <div id="bmiResult" class="result-display" style="display: none;">
                        <div class="result-title">Your BMI Results:</div>
                        <div id="bmiValue" style="font-size: 2rem; color: var(--accent-gold); text-align: center; margin: 1rem 0;"></div>
                        <div id="bmiCategory" style="text-align: center; font-size: 1.2rem; margin-bottom: 1rem;"></div>
                        <div id="bmiDescription"></div>
                    </div>
                `;

            case 'timer-stopwatch':
                return `
                    <div class="text-center mb-2">
                        <button class="btn" id="timerMode">Timer</button>
                        <button class="btn btn-secondary" id="stopwatchMode">Stopwatch</button>
                    </div>
                    
                    <div id="timerSection">
                        <div class="form-group">
                            <label class="form-label">Set Timer (HH:MM:SS):</label>
                            <div class="flex gap-1">
                                <input type="number" class="form-input" id="timerHours" min="0" max="23" value="0" placeholder="HH">
                                <input type="number" class="form-input" id="timerMinutes" min="0" max="59" value="5" placeholder="MM">
                                <input type="number" class="form-input" id="timerSeconds" min="0" max="59" value="0" placeholder="SS">
                            </div>
                        </div>
                    </div>
                    
                    <div class="timer-display" id="timeDisplay">00:00:00</div>
                    
                    <div class="text-center">
                        <div class="flex gap-1 justify-center">
                            <button class="btn" id="startTimer">▶️ Start</button>
                            <button class="btn btn-secondary" id="pauseTimer">⏸️ Pause</button>
                            <button class="btn btn-secondary" id="resetTimer">🔄 Reset</button>
                        </div>
                    </div>
                    
                    <div id="timerAlert" class="mt-2 text-center" style="color: var(--accent-gold);"></div>
                `;

            default:
                return '<p>Tool not found</p>';
        }
    }

    initializeTool(toolId) {
        switch (toolId) {
            case 'image-converter':
                this.initImageConverter();
                break;
            case 'image-compressor':
                this.initImageCompressor();
                break;
            case 'image-cropper':
                this.initImageCropper();
                break;
            case 'video-converter':
                this.initVideoConverter();
                break;
            case 'audio-converter':
                this.initAudioConverter();
                break;
            case 'audio-trimmer':
                this.initAudioTrimmer();
                break;
            case 'age-calculator':
                this.initAgeCalculator();
                break;
            case 'emi-calculator':
                this.initEMICalculator();
                break;
            case 'sip-calculator':
                this.initSIPCalculator();
                break;
            case 'qr-generator':
                this.initQRGenerator();
                break;
            case 'password-generator':
                this.initPasswordGenerator();
                break;
            case 'word-counter':
                this.initWordCounter();
                break;
            case 'base64-encoder':
                this.initBase64Encoder();
                break;
            case 'color-picker':
                this.initColorPicker();
                break;
            case 'text-to-speech':
                this.initTextToSpeech();
                break;
            case 'speech-to-text':
                this.initSpeechToText();
                break;
            case 'json-formatter':
                this.initJSONFormatter();
                break;
            case 'unit-converter':
                this.initUnitConverter();
                break;
            case 'bmi-calculator':
                this.initBMICalculator();
                break;
            case 'timer-stopwatch':
                this.initTimerStopwatch();
                break;
        }
    }

    // Image Converter Implementation
    initImageConverter() {
        const input = document.getElementById('imageConverterInput');
        const convertBtn = document.getElementById('convertImage');
        const formatSelect = document.getElementById('imageFormat');
        const result = document.getElementById('imageResult');

        input.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                convertBtn.disabled = false;
            }
        });

        convertBtn.addEventListener('click', () => {
            const file = input.files[0];
            if (!file) return;

            this.showLoading();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const format = formatSelect.value;
                const mimeType = `image/${format}`;
                const quality = format === 'jpeg' ? 0.9 : undefined;

                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `converted.${format}`;

                    result.innerHTML = `
                        <div class="result-title">Conversion Complete!</div>
                        <p>Original: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                        <p>Converted: ${format.toUpperCase()} (${(blob.size / 1024 / 1024).toFixed(2)} MB)</p>
                        <button class="btn mt-1" onclick="this.previousElementSibling.previousElementSibling.previousElementSibling.click()">Download Converted Image</button>
                    `;
                    result.appendChild(link);
                    result.style.display = 'block';
                    this.hideLoading();
                }, mimeType, quality);
            };

            img.src = URL.createObjectURL(file);
        });
    }

    // Image Compressor Implementation
    initImageCompressor() {
        const input = document.getElementById('imageCompressorInput');
        const qualitySlider = document.getElementById('imageQuality');
        const qualityValue = document.getElementById('qualityValue');
        const compressBtn = document.getElementById('compressImage');
        const result = document.getElementById('compressionResult');

        qualitySlider.addEventListener('input', (e) => {
            qualityValue.textContent = e.target.value;
        });

        input.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                compressBtn.disabled = false;
            }
        });

        compressBtn.addEventListener('click', () => {
            const file = input.files[0];
            if (!file) return;

            this.showLoading();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const quality = parseFloat(qualitySlider.value);
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `compressed_${file.name}`;

                    const compressionRatio = ((file.size - blob.size) / file.size * 100).toFixed(1);

                    result.innerHTML = `
                        <div class="result-title">Compression Complete!</div>
                        <p>Original Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p>Compressed Size: ${(blob.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p>Compression: ${compressionRatio}% reduction</p>
                        <button class="btn mt-1" onclick="this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.click()">Download Compressed Image</button>
                    `;
                    result.appendChild(link);
                    result.style.display = 'block';
                    this.hideLoading();
                }, 'image/jpeg', quality);
            };

            img.src = URL.createObjectURL(file);
        });
    }

    // Image Cropper Implementation
    initImageCropper() {
        const input = document.getElementById('imageCropperInput');
        const canvas = document.getElementById('cropCanvas');
        const ctx = canvas.getContext('2d');
        const controls = document.getElementById('cropControls');
        const cropBtn = document.getElementById('cropImage');
        const resetBtn = document.getElementById('resetCrop');
        const result = document.getElementById('cropResult');

        let img = null;
        let isDrawing = false;
        let startX, startY, endX, endY;

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            img = new Image();
            img.onload = () => {
                canvas.width = Math.min(img.width, 600);
                canvas.height = (img.height * canvas.width) / img.width;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.style.display = 'block';
                controls.style.display = 'block';
            };
            img.src = URL.createObjectURL(file);
        });

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            endX = e.clientX - rect.left;
            endY = e.clientY - rect.top;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.strokeRect(startX, startY, endX - startX, endY - startY);
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        cropBtn.addEventListener('click', () => {
            if (!img || !startX || !endX) return;

            const scaleX = img.width / canvas.width;
            const scaleY = img.height / canvas.height;

            const cropX = Math.min(startX, endX) * scaleX;
            const cropY = Math.min(startY, endY) * scaleY;
            const cropWidth = Math.abs(endX - startX) * scaleX;
            const cropHeight = Math.abs(endY - startY) * scaleY;

            const cropCanvas = document.createElement('canvas');
            const cropCtx = cropCanvas.getContext('2d');
            cropCanvas.width = cropWidth;
            cropCanvas.height = cropHeight;

            cropCtx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            cropCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'cropped_image.png';

                result.innerHTML = `
                    <div class="result-title">Image Cropped Successfully!</div>
                    <img src="${url}" style="max-width: 100%; border-radius: 8px; margin: 1rem 0;">
                    <br><button class="btn" onclick="this.previousElementSibling.previousElementSibling.previousElementSibling.click()">Download Cropped Image</button>
                `;
                result.appendChild(link);
                result.style.display = 'block';
            });
        });

        resetBtn.addEventListener('click', () => {
            if (img) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                startX = startY = endX = endY = null;
            }
        });
    }

    // Video Converter Implementation (Limited by browser capabilities)
    initVideoConverter() {
        const input = document.getElementById('videoConverterInput');
        const convertBtn = document.getElementById('convertVideo');
        const formatSelect = document.getElementById('videoFormat');
        const result = document.getElementById('videoResult');

        input.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                convertBtn.disabled = false;
            }
        });

        convertBtn.addEventListener('click', () => {
            const file = input.files[0];
            if (!file) return;

            // Note: True video conversion requires server-side processing
            // This is a simplified demonstration
            result.innerHTML = `
                <div class="result-title">Video Conversion Note</div>
                <p>Browser-based video conversion is limited. For full conversion capabilities, server-side processing is required.</p>
                <p>Original file: ${file.name}</p>
                <p>Target format: ${formatSelect.value.toUpperCase()}</p>
                <video controls style="width: 100%; margin: 1rem 0;">
                    <source src="${URL.createObjectURL(file)}" type="${file.type}">
                </video>
            `;
            result.style.display = 'block';
        });
    }

    // Audio Converter Implementation
    initAudioConverter() {
        const input = document.getElementById('audioConverterInput');
        const convertBtn = document.getElementById('convertAudio');
        const formatSelect = document.getElementById('audioFormat');
        const result = document.getElementById('audioResult');

        input.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                convertBtn.disabled = false;
            }
        });

        convertBtn.addEventListener('click', async () => {
            const file = input.files[0];
            if (!file) return;

            this.showLoading();

            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const arrayBuffer = await file.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                // Create a new audio buffer for conversion
                const offlineContext = new OfflineAudioContext(
                    audioBuffer.numberOfChannels,
                    audioBuffer.length,
                    audioBuffer.sampleRate
                );

                const source = offlineContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(offlineContext.destination);
                source.start();

                const renderedBuffer = await offlineContext.startRendering();
                
                // Convert to WAV (simplified)
                const wav = this.audioBufferToWav(renderedBuffer);
                const blob = new Blob([wav], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `converted.${formatSelect.value}`;

                result.innerHTML = `
                    <div class="result-title">Audio Conversion Complete!</div>
                    <p>Original: ${file.name}</p>
                    <p>Converted to: ${formatSelect.value.toUpperCase()}</p>
                    <audio controls style="width: 100%; margin: 1rem 0;">
                        <source src="${url}" type="audio/wav">
                    </audio>
                    <br><button class="btn" onclick="this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.click()">Download Converted Audio</button>
                `;
                result.appendChild(link);
                result.style.display = 'block';
            } catch (error) {
                result.innerHTML = `
                    <div class="result-title">Conversion Error</div>
                    <p>Error converting audio: ${error.message}</p>
                `;
                result.style.display = 'block';
            }

            this.hideLoading();
        });
    }

    // Audio Trimmer Implementation
    initAudioTrimmer() {
        const input = document.getElementById('audioTrimmerInput');
        const player = document.getElementById('audioPlayer');
        const controls = document.getElementById('trimControls');
        const startTimeInput = document.getElementById('startTime');
        const endTimeInput = document.getElementById('endTime');
        const trimBtn = document.getElementById('trimAudio');
        const result = document.getElementById('trimResult');

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            player.src = URL.createObjectURL(file);
            player.style.display = 'block';
            controls.style.display = 'block';

            player.addEventListener('loadedmetadata', () => {
                endTimeInput.value = player.duration;
                endTimeInput.max = player.duration;
                startTimeInput.max = player.duration;
            });
        });

        trimBtn.addEventListener('click', async () => {
            const file = input.files[0];
            if (!file) return;

            const startTime = parseFloat(startTimeInput.value);
            const endTime = parseFloat(endTimeInput.value);

            if (startTime >= endTime) {
                alert('Start time must be less than end time');
                return;
            }

            this.showLoading();

            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const arrayBuffer = await file.arrayBuffer();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                const sampleRate = audioBuffer.sampleRate;
                const startSample = Math.floor(startTime * sampleRate);
                const endSample = Math.floor(endTime * sampleRate);
                const trimmedLength = endSample - startSample;

                const trimmedBuffer = audioContext.createBuffer(
                    audioBuffer.numberOfChannels,
                    trimmedLength,
                    sampleRate
                );

                for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                    const channelData = audioBuffer.getChannelData(channel);
                    const trimmedData = trimmedBuffer.getChannelData(channel);
                    for (let i = 0; i < trimmedLength; i++) {
                        trimmedData[i] = channelData[startSample + i];
                    }
                }

                const wav = this.audioBufferToWav(trimmedBuffer);
                const blob = new Blob([wav], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'trimmed_audio.wav';

                result.innerHTML = `
                    <div class="result-title">Audio Trimmed Successfully!</div>
                    <p>Trimmed from ${startTime}s to ${endTime}s</p>
                    <audio controls style="width: 100%; margin: 1rem 0;">
                        <source src="${url}" type="audio/wav">
                    </audio>
                    <br><button class="btn" onclick="this.previousElementSibling.previousElementSibling.previousElementSibling.click()">Download Trimmed Audio</button>
                `;
                result.appendChild(link);
                result.style.display = 'block';
            } catch (error) {
                result.innerHTML = `
                    <div class="result-title">Trimming Error</div>
                    <p>Error trimming audio: ${error.message}</p>
                `;
                result.style.display = 'block';
            }

            this.hideLoading();
        });
    }

    // Helper function to convert AudioBuffer to WAV
    audioBufferToWav(buffer) {
        const numChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const format = 1; // PCM
        const bitDepth = 16;

        const bytesPerSample = bitDepth / 8;
        const blockAlign = numChannels * bytesPerSample;

        const buffer32 = [];
        for (let channel = 0; channel < numChannels; channel++) {
            buffer32.push(buffer.getChannelData(channel));
        }

        const length = buffer32[0].length;
        const arrayBuffer = new ArrayBuffer(44 + length * numChannels * bytesPerSample);
        const view = new DataView(arrayBuffer);

        // WAV header
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + length * numChannels * bytesPerSample, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, format, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * blockAlign, true);
        view.setUint16(32, blockAlign, true);
        view.setUint16(34, bitDepth, true);
        writeString(36, 'data');
        view.setUint32(40, length * numChannels * bytesPerSample, true);

        // Convert float samples to 16-bit PCM
        let offset = 44;
        for (let i = 0; i < length; i++) {
            for (let channel = 0; channel < numChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, buffer32[channel][i]));
                view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
                offset += 2;
            }
        }

        return arrayBuffer;
    }

    // Age Calculator Implementation
    initAgeCalculator() {
        const birthDateInput = document.getElementById('birthDate');
        const calculateBtn = document.getElementById('calculateAge');
        const result = document.getElementById('ageResult');

        calculateBtn.addEventListener('click', () => {
            const birthDate = new Date(birthDateInput.value);
            if (!birthDateInput.value) {
                alert('Please select your birth date');
                return;
            }

            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();

            if (days < 0) {
                months--;
                days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            }

            if (months < 0) {
                age--;
                months += 12;
            }

            const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
            const totalWeeks = Math.floor(totalDays / 7);
            const totalMonths = age * 12 + months;

            result.innerHTML = `
                <div class="result-title">Your Age Details</div>
                <div style="text-align: center; margin: 2rem 0;">
                    <div style="font-size: 2.5rem; color: var(--accent-gold); font-weight: bold;">
                        ${age} Years, ${months} Months, ${days} Days
                    </div>
                </div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">${totalDays}</div>
                        <div class="stat-label">Total Days</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${totalWeeks}</div>
                        <div class="stat-label">Total Weeks</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${totalMonths}</div>
                        <div class="stat-label">Total Months</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${age}</div>
                        <div class="stat-label">Years</div>
                    </div>
                </div>
            `;
            result.style.display = 'block';
        });
    }

    // EMI Calculator Implementation
    initEMICalculator() {
        const loanAmountInput = document.getElementById('loanAmount');
        const interestRateInput = document.getElementById('interestRate');
        const loanTenureInput = document.getElementById('loanTenure');
        const calculateBtn = document.getElementById('calculateEMI');
        const result = document.getElementById('emiResult');

        calculateBtn.addEventListener('click', () => {
            const principal = parseFloat(loanAmountInput.value);
            const annualRate = parseFloat(interestRateInput.value);
            const tenure = parseFloat(loanTenureInput.value);

            if (!principal || !annualRate || !tenure) {
                alert('Please fill all fields');
                return;
            }

            const monthlyRate = annualRate / 12 / 100;
            const numPayments = tenure * 12;

            const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

            const totalAmount = emi * numPayments;
            const totalInterest = totalAmount - principal;

            result.innerHTML = `
                <div class="result-title">EMI Calculation Results</div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">₹${emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="stat-label">Monthly EMI</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">₹${totalAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="stat-label">Total Payment</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">₹${totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="stat-label">Total Interest</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">₹${principal.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="stat-label">Principal</div>
                    </div>
                </div>
                <div style="margin-top: 2rem;">
                    <h4 style="color: var(--accent-gold);">Loan Summary:</h4>
                    <p>• Loan Amount: ₹${principal.toLocaleString('en-IN')}</p>
                    <p>• Interest Rate: ${annualRate}% per annum</p>
                    <p>• Loan Tenure: ${tenure} years (${numPayments} months)</p>
                    <p>• Interest Percentage: ${((totalInterest/principal)*100).toFixed(1)}% of principal</p>
                </div>
            `;
            result.style.display = 'block';
        });
    }

    // SIP Calculator Implementation
    initSIPCalculator() {
        const monthlyInvestmentInput = document.getElementById('monthlyInvestment');
        const annualReturnInput = document.getElementById('annualReturn');
        const investmentPeriodInput = document.getElementById('investmentPeriod');
        const calculateBtn = document.getElementById('calculateSIP');
        const result = document.getElementById('sipResult');

        calculateBtn.addEventListener('click', () => {
            const monthlyInvestment = parseFloat(monthlyInvestmentInput.value);
            const annualReturn = parseFloat(annualReturnInput.value);
            const years = parseFloat(investmentPeriodInput.value);

            if (!monthlyInvestment || !annualReturn || !years) {
                alert('Please fill all fields');
                return;
            }

            const monthlyRate = annualReturn / 12 / 100;
            const numPayments = years * 12;
            const totalInvested = monthlyInvestment * numPayments;

            // Future Value of SIP formula
            const futureValue = monthlyInvestment * 
                ((Math.pow(1 + monthlyRate, numPayments) - 1) / monthlyRate) * 
                (1 + monthlyRate);

            const totalReturns = futureValue - totalInvested;

            result.innerHTML = `
                <div class="result-title">SIP Calculation Results</div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">₹${futureValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="stat-label">Future Value</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">₹${totalInvested.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="stat-label">Total Invested</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">₹${totalReturns.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                        <div class="stat-label">Total Returns</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${((totalReturns/totalInvested)*100).toFixed(1)}%</div>
                        <div class="stat-label">Return Percentage</div>
                    </div>
                </div>
                <div style="margin-top: 2rem;">
                    <h4 style="color: var(--accent-gold);">Investment Summary:</h4>
                    <p>• Monthly Investment: ₹${monthlyInvestment.toLocaleString('en-IN')}</p>
                    <p>• Expected Annual Return: ${annualReturn}%</p>
                    <p>• Investment Period: ${years} years (${numPayments} months)</p>
                    <p>• Wealth Multiplier: ${(futureValue/totalInvested).toFixed(2)}x</p>
                </div>
            `;
            result.style.display = 'block';
        });
    }

    // QR Code Generator Implementation
    initQRGenerator() {
        const textInput = document.getElementById('qrText');
        const generateBtn = document.getElementById('generateQR');
        const result = document.getElementById('qrResult');
        const canvas = document.getElementById('qrCanvas');
        const downloadBtn = document.getElementById('downloadQR');

        generateBtn.addEventListener('click', () => {
            const text = textInput.value.trim();
            if (!text) {
                alert('Please enter text or URL');
                return;
            }

            // Simple QR Code generation using canvas
            this.generateQRCode(text, canvas);
            result.style.display = 'block';
        });

        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }

    generateQRCode(text, canvas) {
        // Simplified QR code generation (basic implementation)
        const ctx = canvas.getContext('2d');
        const size = 200;
        canvas.width = size;
        canvas.height = size;

        // Fill background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);

        // Generate simple pattern based on text
        ctx.fillStyle = '#000000';
        const cellSize = size / 25;
        
        for (let i = 0; i < 25; i++) {
            for (let j = 0; j < 25; j++) {
                const hash = this.simpleHash(text + i + j);
                if (hash % 2 === 0) {
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                }
            }
        }

        // Add finder patterns (corners)
        this.drawFinderPattern(ctx, 0, 0, cellSize);
        this.drawFinderPattern(ctx, 18 * cellSize, 0, cellSize);
        this.drawFinderPattern(ctx, 0, 18 * cellSize, cellSize);
    }

    drawFinderPattern(ctx, x, y, cellSize) {
        ctx.fillStyle = '#000000';
        // Outer square
        ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    // Password Generator Implementation
    initPasswordGenerator() {
        const lengthSlider = document.getElementById('passwordLength');
        const lengthValue = document.getElementById('lengthValue');
        const uppercaseCheck = document.getElementById('includeUppercase');
        const lowercaseCheck = document.getElementById('includeLowercase');
        const numbersCheck = document.getElementById('includeNumbers');
        const symbolsCheck = document.getElementById('includeSymbols');
        const generateBtn = document.getElementById('generatePassword');
        const result = document.getElementById('passwordResult');
        const passwordInput = document.getElementById('generatedPassword');
        const copyBtn = document.getElementById('copyPassword');

        lengthSlider.addEventListener('input', (e) => {
            lengthValue.textContent = e.target.value;
        });

        generateBtn.addEventListener('click', () => {
            const length = parseInt(lengthSlider.value);
            let charset = '';

            if (uppercaseCheck.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (lowercaseCheck.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (numbersCheck.checked) charset += '0123456789';
            if (symbolsCheck.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

            if (!charset) {
                alert('Please select at least one character type');
                return;
            }

            let password = '';
            for (let i = 0; i < length; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }

            passwordInput.value = password;
            result.style.display = 'block';
        });

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(passwordInput.value);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy Password';
                }, 2000);
            } catch (err) {
                passwordInput.select();
                document.execCommand('copy');
            }
        });
    }

    // Word Counter Implementation
    initWordCounter() {
        const textInput = document.getElementById('textInput');
        const wordCount = document.getElementById('wordCount');
        const charCount = document.getElementById('charCount');
        const charCountNoSpaces = document.getElementById('charCountNoSpaces');
        const readingTime = document.getElementById('readingTime');

        const updateCounts = () => {
            const text = textInput.value;
            const words = text.trim() ? text.trim().split(/\s+/).length : 0;
            const characters = text.length;
            const charactersNoSpaces = text.replace(/\s/g, '').length;
            const avgWordsPerMinute = 200;
            const reading = Math.ceil(words / avgWordsPerMinute);

            wordCount.textContent = words;
            charCount.textContent = characters;
            charCountNoSpaces.textContent = charactersNoSpaces;
            readingTime.textContent = reading;
        };

        textInput.addEventListener('input', updateCounts);
        updateCounts(); // Initial count
    }

    // Base64 Encoder/Decoder Implementation
    initBase64Encoder() {
        const plainTextInput = document.getElementById('plainText');
        const base64TextInput = document.getElementById('base64Text');
        const encodeBtn = document.getElementById('encodeBase64');
        const decodeBtn = document.getElementById('decodeBase64');
        const copyPlainBtn = document.getElementById('copyPlainText');
        const copyBase64Btn = document.getElementById('copyBase64Text');

        encodeBtn.addEventListener('click', () => {
            const plainText = plainTextInput.value;
            if (!plainText) {
                alert('Please enter text to encode');
                return;
            }

            try {
                const encoded = btoa(unescape(encodeURIComponent(plainText)));
                base64TextInput.value = encoded;
            } catch (error) {
                alert('Error encoding text: ' + error.message);
            }
        });

        decodeBtn.addEventListener('click', () => {
            const base64Text = base64TextInput.value;
            if (!base64Text) {
                alert('Please enter Base64 text to decode');
                return;
            }

            try {
                const decoded = decodeURIComponent(escape(atob(base64Text)));
                plainTextInput.value = decoded;
            } catch (error) {
                alert('Error decoding Base64: Invalid format');
            }
        });

        copyPlainBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(plainTextInput.value);
                copyPlainBtn.textContent = 'Copied!';
                setTimeout(() => copyPlainBtn.textContent = 'Copy Plain Text', 2000);
            } catch (err) {
                plainTextInput.select();
                document.execCommand('copy');
            }
        });

        copyBase64Btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(base64TextInput.value);
                copyBase64Btn.textContent = 'Copied!';
                setTimeout(() => copyBase64Btn.textContent = 'Copy Base64', 2000);
            } catch (err) {
                base64TextInput.select();
                document.execCommand('copy');
            }
        });
    }

    // Color Picker Implementation
    initColorPicker() {
        const colorInput = document.getElementById('colorInput');
        const hexValue = document.getElementById('hexValue');
        const rgbValue = document.getElementById('rgbValue');
        const hslValue = document.getElementById('hslValue');
        const copyBtn = document.getElementById('copyColorValues');

        const updateColorValues = (color) => {
            const hex = color;
            const rgb = this.hexToRgb(hex);
            const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

            hexValue.value = hex;
            rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            hslValue.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        };

        colorInput.addEventListener('input', (e) => {
            updateColorValues(e.target.value);
        });

        copyBtn.addEventListener('click', async () => {
            const colorValues = `HEX: ${hexValue.value}\nRGB: ${rgbValue.value}\nHSL: ${hslValue.value}`;
            try {
                await navigator.clipboard.writeText(colorValues);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy All Values', 2000);
            } catch (err) {
                alert('Color values copied to clipboard:\n' + colorValues);
            }
        });

        // Initialize with default color
        updateColorValues(colorInput.value);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    // Text to Speech Implementation
    initTextToSpeech() {
        const textInput = document.getElementById('ttsText');
        const voiceSelect = document.getElementById('voiceSelect');
        const rateSlider = document.getElementById('speechRate');
        const rateValue = document.getElementById('rateValue');
        const pitchSlider = document.getElementById('speechPitch');
        const pitchValue = document.getElementById('pitchValue');
        const speakBtn = document.getElementById('speakText');
        const stopBtn = document.getElementById('stopSpeaking');

        let voices = [];
        let utterance = null;

        const populateVoices = () => {
            voices = speechSynthesis.getVoices();
            voiceSelect.innerHTML = voices.map((voice, index) => 
                `<option value="${index}">${voice.name} (${voice.lang})</option>`
            ).join('');
        };

        speechSynthesis.addEventListener('voiceschanged', populateVoices);
        populateVoices();

        rateSlider.addEventListener('input', (e) => {
            rateValue.textContent = e.target.value;
        });

        pitchSlider.addEventListener('input', (e) => {
            pitchValue.textContent = e.target.value;
        });

        speakBtn.addEventListener('click', () => {
            const text = textInput.value.trim();
            if (!text) {
                alert('Please enter text to speak');
                return;
            }

            speechSynthesis.cancel(); // Stop any ongoing speech

            utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = voices[parseInt(voiceSelect.value)];
            utterance.rate = parseFloat(rateSlider.value);
            utterance.pitch = parseFloat(pitchSlider.value);

            utterance.onstart = () => {
                speakBtn.disabled = true;
                stopBtn.disabled = false;
            };

            utterance.onend = () => {
                speakBtn.disabled = false;
                stopBtn.disabled = true;
            };

            speechSynthesis.speak(utterance);
        });

        stopBtn.addEventListener('click', () => {
            speechSynthesis.cancel();
            speakBtn.disabled = false;
            stopBtn.disabled = true;
        });
    }

    // Speech to Text Implementation
    initSpeechToText() {
        const startBtn = document.getElementById('startListening');
        const stopBtn = document.getElementById('stopListening');
        const textArea = document.getElementById('recognizedText');
        const clearBtn = document.getElementById('clearText');
        const copyBtn = document.getElementById('copyRecognizedText');
        const status = document.getElementById('listeningStatus');

        let recognition = null;

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                startBtn.disabled = true;
                stopBtn.disabled = false;
                status.textContent = '🎤 Listening...';
            };

            recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }

                textArea.value = textArea.value + finalTranscript;
                status.textContent = interimTranscript ? `Interim: ${interimTranscript}` : '🎤 Listening...';
            };

            recognition.onend = () => {
                startBtn.disabled = false;
                stopBtn.disabled = true;
                status.textContent = 'Click "Start Listening" to begin';
            };

            recognition.onerror = (event) => {
                status.textContent = `Error: ${event.error}`;
                startBtn.disabled = false;
                stopBtn.disabled = true;
            };

            startBtn.addEventListener('click', () => {
                recognition.start();
            });

            stopBtn.addEventListener('click', () => {
                recognition.stop();
            });
        } else {
            status.textContent = 'Speech Recognition not supported in this browser';
            startBtn.disabled = true;
        }

        clearBtn.addEventListener('click', () => {
            textArea.value = '';
        });

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(textArea.value);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy Text', 2000);
            } catch (err) {
                textArea.select();
                document.execCommand('copy');
            }
        });
    }

    // JSON Formatter Implementation
    initJSONFormatter() {
        const inputArea = document.getElementById('jsonInput');
        const outputArea = document.getElementById('jsonOutput');
        const formatBtn = document.getElementById('formatJSON');
        const minifyBtn = document.getElementById('minifyJSON');
        const validateBtn = document.getElementById('validateJSON');
        const validation = document.getElementById('jsonValidation');

        formatBtn.addEventListener('click', () => {
            try {
                const json = JSON.parse(inputArea.value);
                outputArea.value = JSON.stringify(json, null, 2);
                validation.innerHTML = '<p style="color: var(--accent-gold);">✅ Valid JSON - Formatted successfully</p>';
            } catch (error) {
                validation.innerHTML = `<p style="color: #ff6b6b;">❌ Invalid JSON: ${error.message}</p>`;
            }
        });

        minifyBtn.addEventListener('click', () => {
            try {
                const json = JSON.parse(inputArea.value);
                outputArea.value = JSON.stringify(json);
                validation.innerHTML = '<p style="color: var(--accent-gold);">✅ Valid JSON - Minified successfully</p>';
            } catch (error) {
                validation.innerHTML = `<p style="color: #ff6b6b;">❌ Invalid JSON: ${error.message}</p>`;
            }
        });

        validateBtn.addEventListener('click', () => {
            try {
                JSON.parse(inputArea.value);
                validation.innerHTML = '<p style="color: var(--accent-gold);">✅ Valid JSON</p>';
            } catch (error) {
                validation.innerHTML = `<p style="color: #ff6b6b;">❌ Invalid JSON: ${error.message}</p>`;
            }
        });
    }

    // Unit Converter Implementation
    initUnitConverter() {
        const categorySelect = document.getElementById('unitCategory');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const valueInput = document.getElementById('unitValue');
        const result = document.getElementById('conversionResult');

        const units = {
            length: {
                meter: 1,
                kilometer: 1000,
                centimeter: 0.01,
                millimeter: 0.001,
                inch: 0.0254,
                foot: 0.3048,
                yard: 0.9144,
                mile: 1609.34
            },
            weight: {
                kilogram: 1,
                gram: 0.001,
                pound: 0.453592,
                ounce: 0.0283495,
                ton: 1000
            },
            temperature: {
                celsius: (c) => c,
                fahrenheit: (f) => (f - 32) * 5/9,
                kelvin: (k) => k - 273.15
            },
            volume: {
                liter: 1,
                milliliter: 0.001,
                gallon: 3.78541,
                quart: 0.946353,
                pint: 0.473176,
                cup: 0.236588
            }
        };

        const populateUnits = () => {
            const category = categorySelect.value;
            const unitNames = Object.keys(units[category]);
            
            fromUnitSelect.innerHTML = unitNames.map(unit => 
                `<option value="${unit}">${unit.charAt(0).toUpperCase() + unit.slice(1)}</option>`
            ).join('');
            
            toUnitSelect.innerHTML = unitNames.map(unit => 
                `<option value="${unit}">${unit.charAt(0).toUpperCase() + unit.slice(1)}</option>`
            ).join('');
        };

        const convert = () => {
            const value = parseFloat(valueInput.value);
            if (isNaN(value)) {
                result.textContent = '';
                return;
            }

            const category = categorySelect.value;
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;

            let convertedValue;

            if (category === 'temperature') {
                // Special handling for temperature
                let celsius;
                if (fromUnit === 'celsius') celsius = value;
                else if (fromUnit === 'fahrenheit') celsius = (value - 32) * 5/9;
                else if (fromUnit === 'kelvin') celsius = value - 273.15;

                if (toUnit === 'celsius') convertedValue = celsius;
                else if (toUnit === 'fahrenheit') convertedValue = celsius * 9/5 + 32;
                else if (toUnit === 'kelvin') convertedValue = celsius + 273.15;
            } else {
                // Standard conversion
                const baseValue = value * units[category][fromUnit];
                convertedValue = baseValue / units[category][toUnit];
            }

            result.textContent = `${convertedValue.toFixed(6)} ${toUnit}`;
        };

        categorySelect.addEventListener('change', populateUnits);
        fromUnitSelect.addEventListener('change', convert);
        toUnitSelect.addEventListener('change', convert);
        valueInput.addEventListener('input', convert);

        populateUnits();
    }

    // BMI Calculator Implementation
    initBMICalculator() {
        const weightInput = document.getElementById('weight');
        const heightInput = document.getElementById('height');
        const calculateBtn = document.getElementById('calculateBMI');
        const result = document.getElementById('bmiResult');
        const bmiValue = document.getElementById('bmiValue');
        const bmiCategory = document.getElementById('bmiCategory');
        const bmiDescription = document.getElementById('bmiDescription');

        calculateBtn.addEventListener('click', () => {
            const weight = parseFloat(weightInput.value);
            const height = parseFloat(heightInput.value);

            if (!weight || !height) {
                alert('Please enter both weight and height');
                return;
            }

            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);

            let category, description, color;

            if (bmi < 18.5) {
                category = 'Underweight';
                description = 'You are below the healthy weight range. Consider consulting a healthcare provider.';
                color = '#74C0FC';
            } else if (bmi < 25) {
                category = 'Normal Weight';
                description = 'You are within the healthy weight range. Maintain your current lifestyle!';
                color = 'var(--accent-gold)';
            } else if (bmi < 30) {
                category = 'Overweight';
                description = 'You are above the healthy weight range. Consider a balanced diet and exercise.';
                color = '#FFB347';
            } else {
                category = 'Obese';
                description = 'You are significantly above the healthy weight range. Please consult a healthcare provider.';
                color = '#FF6B6B';
            }

            bmiValue.textContent = bmi.toFixed(1);
            bmiValue.style.color = color;
            bmiCategory.textContent = category;
            bmiCategory.style.color = color;
            bmiDescription.textContent = description;

            result.style.display = 'block';
        });
    }

    // Timer/Stopwatch Implementation
    initTimerStopwatch() {
        const timerModeBtn = document.getElementById('timerMode');
        const stopwatchModeBtn = document.getElementById('stopwatchMode');
        const timerSection = document.getElementById('timerSection');
        const hoursInput = document.getElementById('timerHours');
        const minutesInput = document.getElementById('timerMinutes');
        const secondsInput = document.getElementById('timerSeconds');
        const display = document.getElementById('timeDisplay');
        const startBtn = document.getElementById('startTimer');
        const pauseBtn = document.getElementById('pauseTimer');
        const resetBtn = document.getElementById('resetTimer');
        const alert = document.getElementById('timerAlert');

        let interval = null;
        let time = 0; // seconds
        let isTimer = true;
        let isRunning = false;

        const formatTime = (seconds) => {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        const updateDisplay = () => {
            display.textContent = formatTime(time);
        };

        const switchMode = (timer) => {
            clearInterval(interval);
            interval = null;
            isRunning = false;
            isTimer = timer;
            time = 0;
            updateDisplay();
            alert.textContent = '';

            if (timer) {
                timerModeBtn.className = 'btn';
                stopwatchModeBtn.className = 'btn btn-secondary';
                timerSection.style.display = 'block';
                startBtn.textContent = '▶️ Start Timer';
            } else {
                timerModeBtn.className = 'btn btn-secondary';
                stopwatchModeBtn.className = 'btn';
                timerSection.style.display = 'none';
                startBtn.textContent = '▶️ Start Stopwatch';
            }
        };

        timerModeBtn.addEventListener('click', () => switchMode(true));
        stopwatchModeBtn.addEventListener('click', () => switchMode(false));

        startBtn.addEventListener('click', () => {
            if (isRunning) return;

            if (isTimer && time === 0) {
                const hours = parseInt(hoursInput.value) || 0;
                const minutes = parseInt(minutesInput.value) || 0;
                const seconds = parseInt(secondsInput.value) || 0;
                time = hours * 3600 + minutes * 60 + seconds;

                if (time === 0) {
                    alert.textContent = 'Please set a time for the timer';
                    return;
                }
            }

            isRunning = true;
            alert.textContent = '';

            interval = setInterval(() => {
                if (isTimer) {
                    time--;
                    if (time <= 0) {
                        clearInterval(interval);
                        time = 0;
                        isRunning = false;
                        alert.textContent = '⏰ Timer finished!';
                        // Play notification sound if available
                        try {
                            new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmQdBSuM1fDJfiwGJHfH8N2QQAoUXrTp66hXFApGn+DwvmMeBSuM1fDJfywGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDJfywGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSuM1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTq66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAGJHbH8N2QQAoTXrTp66hXFApGn+DwvmQeBSum1fDYfyAG==').play();
                        } catch (e) {}
                    }
                } else {
                    time++;
                }
                updateDisplay();
            }, 1000);
        });

        pauseBtn.addEventListener('click', () => {
            if (!isRunning) return;
            clearInterval(interval);
            isRunning = false;
        });

        resetBtn.addEventListener('click', () => {
            clearInterval(interval);
            time = 0;
            isRunning = false;
            updateDisplay();
            alert.textContent = '';
        });

        // Initialize
        switchMode(true);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new MultiToolHub();
});
