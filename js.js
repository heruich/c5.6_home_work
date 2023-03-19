
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

function check(x) {
    if (isNaN(x)) {
        return;
    }
    return x;
}

//----------------------------------------------------------------------------------------------
function useRequest2(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
}
function displayResult2(apiData) {
    let cards = '';
    // console.log('start cards', cards);

    apiData.forEach(item => {
        const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
// btnNode.addEventListener('click', () => {
//     useRequest2('https://picsum.photos/v2/list/?limit=5', displayResult);
// })
//---------------------------------------------------------------------------------------------




function displayResult() {
    let cards = 'hi';

    const value = document.querySelector('input').value;
    // cards = value;

    const el2 = document.querySelector(".second").value;
    const el1 = document.querySelector(".first").value;

    // cards = el1+el2;
    // cards = check(el1);
    // Если число в первом input не попадает в диапазон от 1 до 10 или не является числом
    if ((check(el1)<1) || (check(el1)>10)){
        cards = `Номер страницы вне диапазона от 1 до 10`;
    }
    if ((check(el2)<1) || (check(el2)>10)){
        cards = `Лимит вне диапазона от 1 до 10`;
    }
    // Если и первый, и второй input не в диапазонах или не являются числами
    if (((check(el1)<1) || (check(el1)>10))&&((check(el2)<1) || (check(el2)>10))){
        cards = `Номер страницы и лимит вне диапазона от 1 до 10`;
    }

    // if ((el1<100 || el1>300)||(el2<100 || el2>300)){
    //     cards = 'одно из чисел вне диапазоне от 100 до 300';
    // }
    //
    if ((check(el1)>=1 && check(el1)<=10)&&(check(el2)>=1 && check(el2)<=10)){

        // fetch(`https://picsum.photos/v2/list?page=${check(el1)}&limit=${check(el2)}`)
        //     .then((response) => { return response.json(); })
        //     .then((data) => { console.log(data); })
        //     .catch(() => { console.log('error') });

        // cards = `запрос ушел`
        console.log(`запрос ушел`);

        useRequest2(`https://picsum.photos/v2/list?page=${check(el1)}&limit=${check(el2)}`, displayResult2);

    }


    // cards = el
    resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
     displayResult();
})












