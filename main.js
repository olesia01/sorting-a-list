//База данных
let listData = [
  {
    name: 'Олег',
    surname: 'Иванович',
    lastname: 'Капустин',
    age: 18,
    hobby: 'Игры',
  },
  {
    name: 'Влад',
    surname: 'Пертво',
    lastname: 'Лебедев',
    age: 28,
    hobby: 'Танцы',
  },
  {
    name: 'Елена',
    surname: 'Васильевна',
    lastname: 'Орехова',
    age: 35,
    hobby: 'Пение',
  },
  {
    name: 'Петя',
    surname: 'Петров',
    lastname: 'Сорокин',
    age: 18,
    hobby: 'Спорт',
  },
]

let sortColumnFlag = 'fio',
    sortDirFlag = true

// создание элементов
const $app = document.getElementById('app'),
      $addForm = document.getElementById('app-form'),
      $nameInp = document.getElementById('app-form__name-input'),
      $surenameInp = document.getElementById('app-form__surename-input'),
      $lastnameInp = document.getElementById('app-form__lastname-input'),
      $ageInp = document.getElementById('app-form__age-input'),
      $hobbyInp = document.getElementById('app-form__hobby-input'),
      $sortFioBtn = document.getElementById('sort_fio'),
      $sortAgeBtn = document.getElementById('sort_age'),
      $table = document.createElement('table'),
      $tableHead = document.createElement('thead'),
      $tableBody = document.createElement('tbody'),

      $filtrForm = document.getElementById('filtr-fom'),
      $fioFiltrInput = document.getElementById('filtr-fom__fio-impur'),
      $hoddyFiltrInput = document.getElementById('filtr-fom__hobby-impur'),

      $tableHeadTR = document.createElement('tr'),
      $tableHeadThFIO = document.createElement('th'),
      $tableHeadThAge = document.createElement('th'),
      $tableHeadThBirthday = document.createElement('th'),
      $tableHeadThHobby = document.createElement('th')

$table.classList.add('table', 'table-dark')
$tableHeadThFIO.textContent = 'ФИО'
$tableHeadThAge.textContent = 'Возраст'
$tableHeadThBirthday.textContent = 'Год рождения'
$tableHeadThHobby.textContent = 'Хобби'

$tableHeadTR.append($tableHeadThFIO)
$tableHeadTR.append($tableHeadThAge)
$tableHeadTR.append($tableHeadThBirthday)
$tableHeadTR.append($tableHeadThHobby)

$tableHead.append($tableHeadTR)
$table.append($tableHead)
$table.append($tableBody)
$app.append($table)

function createUserTr(oneUser) {

  const $userTR = document.createElement('tr'),
        $userFIO = document.createElement('th'),
        $userAge = document.createElement('th'),
        $userBirthday = document.createElement('th'),
        $userHobby = document.createElement('th')

        $userFIO.textContent = oneUser.fio
        $userAge.textContent = oneUser.age
        $userBirthday.textContent = oneUser.birthday + ' ' + 'год рождения'
        $userHobby.textContent = oneUser.hobby

        $userTR.append($userFIO)
        $userTR.append($userAge)
        $userTR.append($userBirthday)
        $userTR.append($userHobby)

        $tableBody.append($userTR)

  return $userTR
}
//Фильтрация
function filter(arr, prop, value) {
  return arr.filter(function(oneUser) {
    if(oneUser[prop].includes(value.trim())) return true;
})
}

    // Функция рендр
function render(arrData) {

  $tableBody.innerHTML = '';
  let copyListData = [...arrData];
  //Подготовка

  for (const oneUser of copyListData) {
    oneUser.fio = oneUser.surname + ' ' + oneUser.name + ' ' + oneUser.lastname
    oneUser.birthday = 2022 - oneUser.age
  }

  //Сортировка
  copyListData = copyListData.sort(function(a, b) {
    let sort = a[sortColumnFlag] < b[sortColumnFlag]
    if(sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
    if(sort) {
      return -1
    }
  })
  //Фильтрация ФИО
  if($fioFiltrInput.value.trim() !== '') {
    copyListData =  filter(copyListData, 'fio', $fioFiltrInput.value)
  }
   //Фильтрация хобби
   if($hoddyFiltrInput.value.trim() !== '') {
    copyListData =  filter(copyListData, 'hobby', $hoddyFiltrInput.value)
  }

  //Отрисовка
  for (const oneUser of copyListData) {

    let $newTr = createUserTr(oneUser)

        $tableBody.append($newTr)
  }
}
render(listData)

//Добавление

$addForm.addEventListener('submit', function(event) {
  event.preventDefault()

  //Валидация
  if($nameInp.value.trim() == '') {
    alert('Имя не введено')
    return
  }
  if($surenameInp.value.trim() == '') {
    alert('Отчество не введено')
    return
  }
  if($lastnameInp.value.trim() == '') {
    alert('Фамилия не введена')
    return
  }
  if($ageInp.value.trim() == '') {
    alert('Возраст не введен')
    return
  }

  listData.push({
    name: $nameInp.value.trim(),
    surname: $surenameInp.value.trim(),
    lastname: $lastnameInp.value.trim(),
    age: parseInt($ageInp.value.trim()),
    hobby: $hobbyInp.value.trim(),
  })
  render(listData)
})

//Клики сортировки

$sortFioBtn.addEventListener('click', function() {
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag
  render(listData)
})

$sortAgeBtn.addEventListener('click', function() {
  sortColumnFlag = 'age'
  sortDirFlag = !sortDirFlag
  render(listData)
})

//Фильтр
$filtrForm.addEventListener('submit', function(event) {
  event.preventDefault()
})

$fioFiltrInput.addEventListener('input', function() {
  render(listData);
})

$hoddyFiltrInput.addEventListener('input', function() {
  render(listData);
})
