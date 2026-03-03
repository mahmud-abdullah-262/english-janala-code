
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
<button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary flex flex-row cursor-pointer">
         <i class="fa-solid fa-book-open"></i>
         <p>Lesson - ${lesson.level_no}</p>
      </button>
`;
lessonsContainer.appendChild(btnDIV)
}
}


// load word function
const loadWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
  .then(response => response.json())
  .then(words => displayWords(words.data)) 
}


// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"


const displayWords = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  words.forEach(word => {
    const card = document.createElement('div');
  card.classList.add('card', 'bg-white', 'pt-16', 'pb-10', 'px-10', 'text-center', 'space-y-2', 'shadow-sm');
  card.innerHTML = `
  <p class="text-2xl font-bold">${word.word}</p>
      <p class="font-medium">Meaning /pronunciation</p>
      <div class="font-bangla text-xl text-gray-700" >"${word.meaning} / ${word.pronunciation} "</div>

      <div class=" mt-10 flex justify-between items-center">
        <button class="btn bg-gray-100 text-gray-600"><i class="fa-solid fa-circle-info"></i></button>
         <button class="btn bg-gray-100 text-gray-600"><i class="fa-solid fa-circle-info"></i></button>
      </div>
  `

  wordContainer.appendChild(card)
  });
  
}

loadLesson()