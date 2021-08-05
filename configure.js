let choices = ['DOCUMENT','DOWNLOADS','MUSIC','CITY','WEATHER','YOUTUBE'];

let choice = 0;
let prev_choice;

prev_choice = choice;

let option_box = document.querySelector('.current-option_name')
setTimeout(()=>{
    option_box.innerHTML = choices[choice]
    changeClass(-1,choice)
})
const setChoice = (e)=>{
    temp = prev_choice
    choice = parseInt(e.id);
    prev_choice = choice;
    option_box.innerHTML = choices[choice];
    changeClass(temp, choice);

}

const changeClass = (prev, id)=>{
    if(prev!==-1){
    document.getElementById(prev.toString()).classList.remove('active');
    }
    document.getElementById((id).toString()).classList.add('active');

}