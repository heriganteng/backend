//REGISTER

fetch('http://localhost:4000/api/v1/auth/register', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: {
    data: {
      displayName: 'Heru Purnomo',
      email: 'heru.purnomo@gmail.com',
      password: 'Doughnut3942',
      role: 'mahasiswa'
    }
  }
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });

// LOGIN

fetch('http://localhost:4000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    authorization: 'Bearer undefined'
  },
  body: {
    data: {
      email: 'susantoh41@gmail.com',
      password: 'Doughnut3942'
    }
  }
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });

// GET ALL USER
fetch('http://localhost:4000/api/v1/user', {
  method: 'GET',
  headers: {}
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });

// GET ONE USER BY ID
fetch('http://localhost:4000/api/v1/user/1', {
  method: 'GET',
  headers: {}
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
