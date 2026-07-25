// التعامل مع النوافذ المنبثقة
function openModal(id) {
    document.getElementById(id).classList.add('active');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
}

// --- نظام التسبيح ---
let count = 0;
function incrementCounter() {
    count++;
    document.getElementById('counter-btn').innerText = count;
}
function resetCounter() {
    count = 0;
    document.getElementById('counter-btn').innerText = count;
}
function addCustomZekr() {
    const input = document.getElementById('custom-zekr');
    if(input.value.trim() !== "") {
        const select = document.getElementById('zekr-select');
        const option = document.createElement('option');
        option.text = input.value;
        select.add(option);
        select.selectedIndex = select.options.length - 1;
        input.value = "";
        resetCounter();
    }
}

// --- نظام التقييم ---
const questionsList = [
    "الصلوات الخمس في وقتها؟",
    "صلاة الضحى، السنن القبلية والبعدية، التراويح، الوتر؟",
    "الورد القرآني؟",
    "غض البصر؟",
    "ترك السوشيال ميديا وقت العبادة؟",
    "إخراج صدقة؟",
    "الكلمة الطيبة وطاعة الوالدين؟",
    "تجنب الغضب؟",
    "ترك سماع الأغاني؟",
    "صلة الرحم؟",
    "التسبيح والذكر؟",
    "سماع درس ديني بنية معرفة والتقرب من الله؟"
];

let currentQ = 0;
let yesCount = 0;
let missedItemsArr = [];

function startQuiz() {
    document.getElementById('quiz-intro').classList.remove('active');
    document.getElementById('quiz-question').classList.add('active');
    updateQuestionUI();
}

function updateQuestionUI() {
    document.getElementById('q-counter').innerText = `سؤال ${currentQ + 1} من ${questionsList.length}`;
    document.getElementById('q-text').innerText = questionsList[currentQ];
}

function answerQuiz(isYes) {
    if(isYes) {
        yesCount++;
    } else {
        missedItemsArr.push(questionsList[currentQ]);
    }
    
    currentQ++;
    if(currentQ < questionsList.length) {
        updateQuestionUI();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-question').classList.remove('active');
    document.getElementById('quiz-result').classList.add('active');
    
    let percentage = (yesCount / questionsList.length) * 100;
    let resultBox = document.getElementById('result-box');
    let missedList = document.getElementById('missed-items');
    
    // تفريغ القائمة
    missedList.innerHTML = '';
    
    if(missedItemsArr.length > 0) {
        missedItemsArr.forEach(item => {
            let li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-exclamation-circle" style="color:#e74c3c"></i> ${item}`;
            missedList.appendChild(li);
        });
        document.getElementById('missed-items-container').style.display = 'block';
    } else {
        document.getElementById('missed-items-container').style.display = 'none';
    }

    resultBox.className = 'result-box'; // reset classes

    if (percentage < 50) {
        resultBox.classList.add('res-low');
        resultBox.innerHTML = "ربنا يتقبل محاولتك، لسه قدامك فرصة جديدة للتعويض!<br><br>ردد هذا الدعاء:<br><strong>'اللهم أعني على ذكرك وشكرك وحسن عبادتك'</strong>";
    } else if (percentage <= 80) {
        resultBox.classList.add('res-mid');
        resultBox.innerHTML = "أداء رائع! أنت على الطريق الصحيح، حاول تركز بكرة على السنن أكثر.<br>تقبل الله منك ✨";
    } else {
        resultBox.classList.add('res-high');
        resultBox.innerHTML = "ما شاء الله! يوم مليء بالبركة، أسأل الله أن يكتبك من المعتوقين من النار 🌟";
        createStars();
    }
}

function resetQuiz() {
    currentQ = 0;
    yesCount = 0;
    missedItemsArr = [];
    document.getElementById('quiz-result').classList.remove('active');
    document.getElementById('quiz-intro').classList.add('active');
}

// إنشاء نجوم تتساقط عند التقييم العالي
function createStars() {
    for(let i=0; i<30; i++) {
        let star = document.createElement('i');
        star.classList.add('fas', 'fa-star', 'star-anim');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(star);
        
        // إزالة النجمة بعد انتهاء الحركة
        setTimeout(() => { star.remove(); }, 4000);
    }
}
// --- وظيفة التبديل بين أزرار الأذكار والسنن ---
function showTab(tabName) {
    // إخفاء كل المحتويات
    let contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active-content');
    });

    // إزالة تفعيل كل الأزرار
    let buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active-tab');
    });

    // إظهار المحتوى المطلوب وتفعيل زره
    document.getElementById('tab-' + tabName).classList.add('active-content');
    document.querySelector('.' + tabName + '-btn').classList.add('active-tab');
}
/* ============================================================
   مشغل الصوت الخاص بدروس أحكام التجويد
   ============================================================ */
function initTajweedAudioPlayers() {
    const players = document.querySelectorAll('.tw-audio-player');
    players.forEach(function (player) {
        const src = player.getAttribute('data-src');
        const audio = new Audio(src);
        audio.preload = 'metadata';

        const playBtn = player.querySelector('.tw-audio-playpause');
        const progress = player.querySelector('.tw-audio-progress');
        const progressBar = player.querySelector('.tw-audio-progress-bar');
        const timeLabel = player.querySelector('.tw-audio-time');
        const volumeInput = player.querySelector('.tw-audio-volume');
        const volumeBtn = player.querySelector('.tw-audio-volume-btn');
        const speedSelect = player.querySelector('.tw-audio-speed');

        function formatTime(sec) {
            if (!isFinite(sec) || isNaN(sec)) return '0:00';
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        }

        audio.addEventListener('loadedmetadata', function () {
            timeLabel.textContent = `${formatTime(0)} / ${formatTime(audio.duration)}`;
        });

        audio.addEventListener('timeupdate', function () {
            const pct = (audio.currentTime / audio.duration) * 100 || 0;
            progressBar.style.width = pct + '%';
            timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        });

        audio.addEventListener('ended', function () {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        });

        playBtn.addEventListener('click', function () {
            if (audio.paused) {
                document.querySelectorAll('.tw-audio-player audio-instance').forEach(() => {});
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        progress.addEventListener('click', function (e) {
            const rect = progress.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const ratio = clickX / rect.width;
            if (isFinite(audio.duration)) {
                audio.currentTime = ratio * audio.duration;
            }
        });

        if (volumeInput) {
            volumeInput.addEventListener('input', function () {
                audio.volume = volumeInput.value;
                if (volumeBtn) {
                    volumeBtn.innerHTML = audio.volume == 0
                        ? '<i class="fas fa-volume-mute"></i>'
                        : '<i class="fas fa-volume-up"></i>';
                }
            });
        }

        if (speedSelect) {
            speedSelect.addEventListener('change', function () {
                audio.playbackRate = parseFloat(speedSelect.value);
            });
        }
    });
}

if (document.querySelector('.tw-audio-player')) {
    document.addEventListener('DOMContentLoaded', initTajweedAudioPlayers);
}
