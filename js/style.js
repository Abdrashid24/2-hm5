window.onload = function(){
    if(localStorage['active_user']!=null){
        document.getElementById('header-name').textContent = localStorage['active_user'];
    $('.header-name').css('display', 'block');
    $('.header-cab').css('display', 'block');
    $('.header-logout').css('display', 'block');
    $('.header-log').css('display', 'none');
    $('.header-reg').css('display', 'none');
    }
}
function regist() {
    let name = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    let passwordRepeat= $('#passwordRepeat').val();
    let name_length = $('#name').val().length;
    let password_length = $('#password').val().length;
    if (name_length < 2) {
        document.getElementById('error').textContent = "Ошибка: Введите имя больше двух символов";
    }
    else if (password_length < 8) {
        document.getElementById('error').textContent = "Ошибка: Введите пароль больше восьми символов";
    }
    else if (password != passwordRepeat) {
        document.getElementById('error').textContent = "Ошибка: Пароли не совпадают";
    }
    else if(localStorage.getItem(name)==null){
        let new_user = {
            user_name: name,
            user_password: password
        }
        document.getElementById('error').textContent = " ";
        localStorage.setItem(new_user.user_name, JSON.stringify(new_user));
        localStorage.setItem(new_user.user_password, JSON.stringify(new_user));
        localStorage.setItem("active_user", new_user.user_name)
        // localStorage.setItem("active_password", new_user.user_password)
        document.getElementById('info').textContent = "Новый пользователь добавлен";
        document.getElementById('header-name').textContent = localStorage['active_user'];
        $('.header-name').css('display', 'block');
        $('.header-cab').css('display', 'block');
        $('.header-logout').css('display', 'block');
        $('.header-log').css('display', 'none');
        $('.header-reg').css('display', 'none');
    }
    else{
        document.getElementById('error').textContent = " ";
        document.getElementById('info').textContent = "Такой пользователь уже есть!";
    }
}
function log() {
    let namelog = document.getElementById('namelog').value;
    let passwordlog = document.getElementById('passwordlog').value;
    console.log(localStorage.getItem(passwordlog));
    let user_object = localStorage.getItem(namelog);
    let user = JSON.parse(user_object);
    console.log(user.user_password);
    if(localStorage.getItem(namelog) != null && user.user_password == passwordlog){
        alert('Вы вошли')
        localStorage.setItem("active_user", namelog)
        // localStorage.setItem("active_password", passwordlog)
        document.getElementById('header-name').textContent = localStorage['active_user']
        $('.header-name').css('display', 'block');
        $('.header-cab').css('display', 'block');
        $('.header-logout').css('display', 'block');
        $('.header-log').css('display', 'none');
        $('.header-reg').css('display', 'none');
    }
    else{
        document.getElementById('error').textContent = "Ошибка: такого пользователя нет";
    }
}

function logout() {
    localStorage.removeItem('active_user')
    document.getElementById("header-name").textContent = ' '
    $('.header-log').css('display', 'block');
    $('.header-reg').css('display', 'block');
    $('.header-name').css('display', 'none');
    $('.header-cab').css('display', 'none');
    $('.header-logout').css('display', 'none');
}
function input() {
    $('.profile-form').css('display', 'block');
    $('.profile-change__input').css('display', 'none');
}
function change() {
    let changePassword = document.getElementById('changePassword').value;
    let changePassword_length = $('#changePassword').val().length;
    if (changePassword_length < 8) {
        document.getElementById('error').textContent = "Ошибка: Введите пароль больше восьми символов";
    }
    else{
        let changePassword = document.getElementById('changePassword').value;
        let a = {
            user_name: localStorage.getItem('active_user'),
            user_password: changePassword

        }
        localStorage.setItem(a.user_password, JSON.stringify(a));
        document.getElementById('error').textContent = "Вы поменяли пароль, не забудьте его";

    }

}




let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    if(localStorage['active_user']!=null){


    localStorage.setItem('time', +new Date);
    date_rew = new Date(parseInt(localStorage.getItem('time')));

    

    let commentName = localStorage['active_user'];
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);
    saveComments();
    showComments();
    }
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments(){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `<p class="cm-time"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="cm-name" role="alert">${item.name}</p>`;
        out += `<p class="cm-body" role="alert">${item.body}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

// function comment() {
//     let commentText = document.getElementById('cm-input__1').value;
//     let commentName= localStorage['active_user'];
 
//     if(localStorage['active_user'] != null) {
//         localStorage.setItem('time', +new Date);
//         date_rew = new Date(parseInt(localStorage.getItem('time')));
//         let comment = {
//             user_name: commentName,
//             user_text: commentText
//         }
//         localStorage.setItem(comment.user_text, JSON.stringify(comment));


//         cmBlock=document.getElementById('cm-block');
//         let out ='';
//         out+="<div class='cm-name' id='commentName'></div>"
//         out+="<div class='cm-text' id='commentText'></div>"
//         out+="<div class='cm-error' id='commentError'></div>"
//         cmBlock.innerHTML=out

//         document.getElementById('commentName').textContent = localStorage['active_user'];
//         document.getElementById('commentText').textContent = comment.user_text;
//         document.getElementById('commentDate').textContent = date_rew;
//         document.getElementById("commentError").textContent = "";
//     }else {
//         document.getElementById("cm-error").textContent = "Необходимо авторизация"
//     }

// }