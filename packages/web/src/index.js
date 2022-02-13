require('./styles.scss');

const imageForm = document.querySelector('#imageForm');
const imageInput = document.querySelector('#imageInput');

imageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];

  const { url } = await fetch('/s3Url')
    .then((res) => res.json());

  console.log(file, url)
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: file,
  })
    .catch((err) => {
      const node = document.getElementById('result');
      node.innerHTML = 'Что-то пошло не так. Пожалуйста, попытайтесь еще раз!';
      console.log(err);
    });

  const imageUrl = url.split('?')[0];

  const result = document.getElementById('result');
  const img = document.createElement('img');
  img.src = imageUrl;
  const div = document.createElement('div');
  div.innerText = 'Вы можете скачать вашу картинку:'
  const a = document.createElement('a');
  a.href = imageUrl;
  a.innerText = 'download img';

  result.appendChild(img);
  result.appendChild(div);
  result.appendChild(a);
});
;
