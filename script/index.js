
// load lesson function
const loadLesson = () => {
  // lesson api
 const url = 'https://openapi.programming-hero.com/api/levels/all';

//  get the json of lessons
 fetch(url)
 .then(response => response.json())
 .then(lessons => displayLesson(lessons.data))
}

// display json function
const displayLesson = (lessons) => {
const lessonsContainer = document.getElementById('lesson-container');
lessonsContainer.innerHTML = '';

for(let lesson of lessons){
const btnDIV = document.createElement('div');
btnDIV.innerHTML = `
<button id="lesson-level-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary flex flex-row cursor-pointer lesson-btn">
         <i class="fa-solid fa-book-open"></i>
         <p>Lesson - ${lesson.level_no}</p>
      </button>
`;
lessonsContainer.appendChild(btnDIV)
}
}
// remove active class function
const removeActive = () => {
  const activeBtn = document.querySelectorAll('.active');
  activeBtn.forEach(btn => btn.classList.remove('active'))
}

// load word function
const loadWord = (id) => {
  wordSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
  .then(response => response.json())
  .then(words => {
    const clickBtn = document.getElementById(`lesson-level-${id}`);
    removeActive()
    clickBtn.classList.add('active')
    displayWords(words.data);
  }) 
}

const displayWords = (words) => {
  
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  if(words.length === 0){
    wordContainer.innerHTML = `
    <div class="text-center col-span-full space-y-2">
      <img class="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="text-xl text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <p class="text-4xl font-bangla">নেক্সট Lesson এ যান</p>
    </div>
    `;
    wordSpinner(false);
    return
  }



  words.forEach(word => {
    const card = document.createElement('div');
  card.classList.add('card', 'bg-white', 'pt-16', 'pb-10', 'px-10', 'text-center', 'space-y-2', 'shadow-sm');
  card.innerHTML = `
  <p class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</p>
      <p class="font-medium">Meaning /pronunciation</p>
      <div class="font-bangla text-xl text-gray-700" >"${word.meaning ?word.meaning  : 'অর্থ পাওয়া যায় নি'} / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'} "</div>

      <div class=" mt-10 flex justify-between items-center">

        <button onclick="loadWordDetails(${word.id})" class="btn bg-gray-100 text-gray-600">

        <i class="fa-solid fa-circle-info"></i>
        
        </button>

         <button class="btn bg-gray-100 text-gray-600">
         
        <i class="fa-solid fa-volume-high"></i>
         
         </button>
      </div>
  `

  wordContainer.appendChild(card);
  wordSpinner(false)
  });
  
}

const loadWordDetails = async (id) =>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const getUrl = await fetch(url);
  const data = await getUrl.json();
  showWordDetails(data.data);
}

// "word": "Zephyr",
// "meaning": "মৃদু বাতাস / হালকা হাওয়া",
// "pronunciation": "জেফার",
// "level": 5,
// "sentence": "A gentle zephyr made the leaves rustle.",
// "points": 5,
// "partsOfSpeech": "noun",
// "synonyms": [
// "breeze",
// "wind",
// "gust"
// ],
// "id": 50

const showWordDetails = (details) => {
  const detailsModal = document.getElementById('word_details');
  detailsModal.showModal();
  detailsModal.innerHTML = `
  <div class="modal-box space-y-4">
    <div>
      <p class="font-bangla font-bold text-xl"><span>${details.word}</span> <span>(<i class="fa-solid fa-microphone-lines"></i>${details.pronunciation})</span></p>
    </div>
    <div>
      <p class="font-bold">Meaning</p>
      <p class="font-bangla">${details.meaning}</p>
    </div>
    <div>
      <p class="font-bold">Example</p>
      <p class=" text-gray-600">${details.sentence}</p>
    </div>
    <div>
      <p class="font-bold font-bangla">সমার্থক শব্দ গুলো</p>
      <div class="flex gap-4">
          ${synonyms(details.synonyms)}
      </div>
    
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  `

  
}


const synonyms = (synArr) => {
  const htmlElmt = synArr.map(el => `<p class="font-medium text-gray-600 bg-gray-200 rounded-sm p-2">${el}</p>`)
  return htmlElmt.join(' ')
}

const wordSpinner = (status) => {
  if(status === true){
    document.getElementById('word-spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  } else{
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('word-spinner').classList.add('hidden');
  }
}
loadLesson()