var fields;
window.onload = function() {
  // Get references to elements on the page.
  var form          = document.getElementById('message-form');
  var messageField  = document.getElementById('message');
  var messagesList  = document.getElementById('messages');
  var socketStatus  = document.getElementById('status');
  var closeBtn      = document.getElementById('close');
  var testBtn       = document.getElementById('test');
  var ctx           = document.getElementById("myChart");

  // Create a new WebSocket.
  var socket = new WebSocket('ws://vlasikovvlasikov.asuscomm.com:8000');

  // Handle any errors that occur.
  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
  };

  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
    socketStatus.className = 'open';
  };

  // Handle messages sent by the server.
  socket.onmessage = function(event) {
    var message = event.data;
    messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>';
    post('client chat, socket.onmessage');
  };

  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Disconnected from WebSocket.';
    socketStatus.className = 'closed';
  };

  // Send a message when the form is submitted.
  form.onsubmit = function(e) {
    e.preventDefault();
    var message = messageField.value;           // Retrieve the message from the textarea.
    socket.send(message);                       // Send the message through the WebSocket.
    messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + '</li>';  // Add the message to the messages list.
    messageField.value = '';                    // Clear out the message field.
    return false;
  };  

  function post() {
    var temp;
    var xhr = new XMLHttpRequest();             // Создаём объект xhr
    xhr.open("POST", "post.php", true);         // Открываем асинхронное соединение
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// Отправляем кодировку
    xhr.send("Request data.txt");               // Отправляем POST-запрос
    xhr.onreadystatechange = function ()        // Ждём ответа от сервера
    {
      if (xhr.readyState == 4)                  // возвращает текущее состояние объекта(0-4)
      {
        if (xhr.status == 200)                  // код 200 (если страница не найдена вернет 404)
        {
          messagesList.innerHTML = xhr.responseText; // Выводим ответ сервера

          var value = xhr.responseText;
          value = value.replaceAll("'", '"');   // заменели кавычки
          fields = value.split('\n');           // файл в массив строк

          let arrVal = [];
          for (let i = 0; i< fields.length-1; i++  ) {
            temp = JSON.parse(fields[i]);
            // console.log(temp);
            // console.log(temp.value);
            arrVal.push(temp.value);
          }

          myChart.data.labels = arrVal;
          myChart.data.datasets[0].data = arrVal;
          myChart.update();
        }
      }
    }
  }

  testBtn.onclick = function(e) {
    e.preventDefault();
    console.log('click testBtn');
    post('client: chat, testBtn.onclick');
    return false;
  };

  // Close the WebSocket connection when the close button is clicked.
  closeBtn.onclick = function(e) {
    e.preventDefault();
    console.log('closeBtn');
    socket.close();                             // Close the WebSocket.
    return false;
  };

  // Готовим диаграмму
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],                               //Подписи оси x
      datasets: [
        {
          label: 'f(x)',                        //Метка
          data: [],                             //Данные
          borderColor: 'blue',                  //Цвет
          borderWidth: 2,                       //Толщина линии
          fill: false                           //Не заполнять под графиком
        }
        //Можно добавить другие графики
      ]
    },
    options: {
      responsive: false,                        //Вписывать в размер canvas
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }]
      }
    }
  });

  post('client chat, start');                   //Заполняем данными
  myChart.update();                             //Обновляем
};

  // //Готовим диаграмму
  // function Diagram() {
  //   var ctx = document.getElementById("myChart");
  //   var myChart = new Chart(ctx, {
  //       type: 'line',
  //       data: {
  //           labels: [], //Подписи оси x
  //           datasets: [
  //               {
  //                   label: 'f(x)', //Метка
  //                   data: [], //Данные
  //                   borderColor: 'blue', //Цвет
  //                   borderWidth: 2, //Толщина линии
  //                   fill: false //Не заполнять под графиком
  //               }
  //               //Можно добавить другие графики
  //           ]
  //       },
  //       options: {
  //           responsive: false, //Вписывать в размер canvas
  //           scales: {
  //               xAxes: [{
  //                   display: true
  //               }],
  //               yAxes: [{
  //                   display: true
  //               }]
  //           }
  //       }
  //   });
  //   //Заполняем данными
  //   for (var x = 0.0; x <= 2 * Math.PI; x += Math.PI / 10) {
  //       myChart.data.labels.push('' + x.toFixed(2));
  //       myChart.data.datasets[0].data.push(f(x).toFixed(2));
  //   }

  //   myChart.data.labels.push('sad' + 4);
  //   myChart.data.datasets[0].data.push(f(4).toFixed(2));

  //   //console.log(fields[1]);
  //   //Обновляем
  //   myChart.update();

  //   function f(x) { //Вычисление нужной функции
  //       return Math.sin(x);
  //   }
  // };
