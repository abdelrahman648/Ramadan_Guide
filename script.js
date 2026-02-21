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