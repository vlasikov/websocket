const TOTAL_DAYS = 7;
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
  // доделать проверку на порт
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
    console.log('test');
    console.log(event);
    if(message == "192.168.1.1 - connected"){
      messagesList.innerHTML = '';
    }
    messagesList.innerHTML += '<li class="received"><span>Received:</span>' + message + '</li>';
    if(message == '192.168.1.1 - ws-client: new data'){
      post('client chat, socket.onmessage');
    }
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
    //messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + '</li>';  // Add the message to the messages list.
    messageField.value = '';                    // Clear out the message field.
    return false;
  };  

  function post() {
    var temp;
    var xhr = new XMLHttpRequest();             // Создаём объект xhr
    xhr.open("POST", "temp-post.php", true);    // Открываем асинхронное соединение
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// Отправляем кодировку
    xhr.send("Request data.txt");               // Отправляем POST-запрос
    xhr.onreadystatechange = function ()        // Ждём ответа от сервера
    {
      if (xhr.readyState == 4)                  // возвращает текущее состояние объекта(0-4)
      {
        if (xhr.status == 200)                  // код 200 (если страница не найдена вернет 404)
        {
          messagesList.innerHTML += xhr.responseText; // Выводим ответ сервера

          var file = xhr.responseText.split(';');
          console.log(file[0]);
          console.log('===================');
          console.log(file[1]);

          // парсим старые значения
          var value_old = file[0];
          value_old = value_old.replaceAll("'", '"');   // заменели кавычки
          fields_old = value_old.split('\n');           // файл в массив строк

          // парсим прогноз
          var value = file[1];
          value = value.replaceAll("'", '"');   // заменели кавычки
          fields = value.split('\n');           // файл в массив строк

          let arrVal = [];
          let arrVal2 = [];
          let arrLabel = [];

          console.log(fields.length-1);
          for(let i = 0; i< 72 - (fields.length-1); i++) {
            temp = JSON.parse(fields_old[47 -(72 - (fields.length-1))  +i]);
            arrVal.push(null);
            arrVal2.push(temp.value);
            arrLabel.push(temp.time);
          }

          for(let i = 0; i< fields.length-1; i++  ) {
            temp = JSON.parse(fields[i]);
            arrVal.push(temp.value);
            arrLabel.push(temp.time);
            if(i < 1){
              arrVal2.push(temp.value);
            }
          }

          myChart.data.labels = arrLabel;
          myChart.data.datasets[0].data = arrVal;
          myChart.data.datasets[1].data = arrVal2;
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
          label: 't `C, new;',                       //Метка
          data: [],                             //Данные
          borderColor: 'blue',                  //Цвет
          borderWidth: 2,                       //Толщина линии
          fill: false                           //Не заполнять под графиком
        },
        {
          label: 't `C, old;',                       //Метка
          data2: [],                            //Данные
          borderColor: 'red',                   //Цвет
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
