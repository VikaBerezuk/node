require('./styles.scss');

const imageForm = document.querySelector('#imageForm');
const imageInput = document.querySelector('#imageInput');

imageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];
  const formDada = new FormData();
  formDada.append('file', file);
  await fetch(file.name, {
    method: 'POST',
    body: formDada,
  })
    .then((res) => res.json())
    .then((data)=> {
      if(data.length === 1) {
        const result = document.getElementById('result');
        const a = document.createElement('a');
        a.href = data[0].href;
        a.innerText = `download file`;
        result.appendChild(a);
      } else {
        const result = document.getElementById('result');
        const img = document.createElement('img');
        img.src = data[0].href;
        const div = document.createElement('div');
        div.innerText = 'Вы можете скачать вашу картинку:'
        result.appendChild(img);
        result.appendChild(div);

        data.forEach((item) => {
          const a = document.createElement('a');
          a.href = item.href;
          a.innerText = ` ${item.size} download img`;
          result.appendChild(a);
        })
      }
    })
    .catch((err) => {
      const node = document.getElementById('result');
      node.innerHTML = 'Что-то пошло не так. Пожалуйста, попытайтесь еще раз!';
      console.log(err);
    });
});
