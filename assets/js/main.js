import Application from './Application.js'

window.addEventListener('DOMContentLoaded', _ => new Application(), false)

let showbtn = document.getElementById('showbtn');
let hidebtn = document.getElementById('hidebtn');
let showbtn1 = document.getElementById('showbtn1');
let hidebtn1 = document.getElementById('hidebtn1');

let extraInfoAdd = document.getElementById('extraInfoAdd');
let extraInfoSub = document.getElementById('extraInfoSub');
extraInfoAdd.style.display = 'none';
extraInfoSub.style.display = 'none';
hidebtn.style.display = 'none'; 
hidebtn1.style.display = 'none'
hidebtn.addEventListener('click', function(){
    console.log('hidebtn');
    extraInfoAdd.style.display = 'none';
    showbtn.style.display = 'block';
    hidebtn.style.display = 'none';
})
hidebtn1.addEventListener('click', function(){
    console.log('hidebtn');
    extraInfoSub.style.display = 'none';
    showbtn1.style.display = 'block';
    hidebtn1.style.display = 'none';
})

showbtn.addEventListener('click', function(){
    console.log('showbtn');
    extraInfoAdd.style.display = 'block';
    hidebtn.style.display = "block";
    showbtn.style.display = 'none';
})

showbtn1.addEventListener('click', function(){
    console.log('showbtn');
    extraInfoSub.style.display = 'block';
    hidebtn1.style.display = "block";
    showbtn1.style.display = 'none';
})