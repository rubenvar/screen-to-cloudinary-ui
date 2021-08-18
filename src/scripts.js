const form = document.querySelector('form');
// const displayResult = document.getElementById('display-result');

function processInput(formInput) {
  const formData = new FormData(formInput);
  const res = {};
  [...formData.entries()].forEach(([key, value]) => {
    if (key === 'width' || key === 'height') {
      return (res[key] = +value);
    }
    return (res[key] = value);
  });
  return res;
}

async function postData(config) {
  const res = await fetch(config.lambdaEndpoint, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(config),
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const config = processInput(form);

  postData(config)
    .then((res) => {
      console.log('🚧 returned!!');
      console.log(res);
    })
    .catch((er) => {
      console.log('🚧 some error!');
      console.log(er);
    });
});
