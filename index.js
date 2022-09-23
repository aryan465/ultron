const os = require("os");
const { PythonShell } = require("python-shell")
const path = require('path')
const { shell } = require('electron')
const checkDiskSpace = require('check-disk-space')
const fs = require('fs')
const os_ut = require('os-utils')




var value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var myConfig = {
    "globals": {
        "font-family": "Roboto"
    },
    "graphset": [{
        "type": "area",
        "background-color": "rgb(0, 25, 31)",
        "utc": true,
        //   "title": {
        //     "y": "15px",
        //     "text": "Website Traffic Metrics",
        //     "background-color": "none",
        //     "font-color": "#05636c",
        //     "font-size": "24px",
        //     "height": "25px",
        //     "adjust-layout": true
        //   },
        "plotarea": {
            "margin-top": "10%",
            "margin-right": "dynamic",
            "margin-bottom": "dynamic",
            "margin-left": "dynamic",
            "adjust-layout": true
        },
        //   "labels": [{
        //       "text": "Visitors: %plot-2-value",
        //       "default-value": "",
        //       "color": "#8da0cb",
        //       "x": "20%",
        //       "y": 50,
        //       "width": 120,
        //       "text-align": "left",
        //       "bold": 0,
        //       "font-size": "14px",
        //       "font-weight": "bold"
        //     },
        //   ],
        "scale-x": {
            // "label": {
            //   "text": "Date Range",
            //   "font-size": "14px",
            //   "font-weight": "normal",
            //   "offset-x": "10%",
            //   "font-angle": 360
            // },
            "item": {
                "text-align": "center",
                "font-color": "#ffffff"
            },
            "zooming": 1,
            "max-labels": 13,
            "labels": [
                "0",
                "5",
                "10",
                "15",
                "20",
                "25",
                "30",
                "35",
                "40",
                "45",
                "50",
                "55",
                "60",
            ],
            "max-items": 13,
            "items-overlap": false,

        },

        "scale-y": {
            "values": "0:100:10",
            "item": {

                "font-color": "rgb(0, 25, 31)",
                "font-weight": "normal"
            },

        },
        "plot": {
            "line-width": 1,
            "marker": {
                "size": 1,
                "visible": false
            },
            // "tooltip": {
            //   "font-family": "Roboto",
            //   "font-size": "15px",
            //   "text": " %v% on %data-days",
            //   "text-align": "left",
            //   "border-radius": 5,
            //   "padding": 10
            // }
        },
        "series": [{
            "values": value,
            "data-days": [
                "0",
                "5",
                "10",
                "15",
                "20",
                "25",
                "30",
                "35",
                "40",
                "45",
                "50",
                "55",
                "60",

            ],
            "line-color": "rgb(14, 236, 199)",
            "aspect": "spline",
            "background-color": "#138b7b",
            "alpha-area": ".5",
            "font-family": "Roboto",
            "font-size": "14px",
            "text": "returns"
        },

        ]
    }]
};



const uploader = document.getElementById('uploader')
const input_file = document.getElementById('file')

uploader.addEventListener('click', () => {
    input_file.click()


})

input_file.addEventListener('change', () => {
    var file = input_file.files[0].path
    // console.log(input_file.files[0].path)

    const object = { "path": `${file}` }
    const content = JSON.stringify(object)

    fs.writeFileSync('./object.json', content, err => {
        if (err) {
            console.log(err)
        }
    })





    var terminal = document.getElementById('terminal_text')
    var args = {
        scriptpath: path.join(__dirname, 'recognizer.py'),
        // pythonpath : 'C:\\Users\\2019c\\AppData\\Local\\Programs\\Python\\Python37\\python.exe' 
    }

    var print_line = new PythonShell('recognizer.py', args);

    print_line.on('message', (event) => {

        terminal.innerHTML = event

    })

})

const c = document.querySelector('._c')
const d = document.querySelector('._d')
const e = document.querySelector('._e')
c.addEventListener('click', (e) => {
    shell.openPath('C:\\')

})
d.addEventListener('click', (e) => {
    shell.openPath('D:\\')

})
e.addEventListener('click', (e) => {
    shell.openPath('E:\\')

})



let timeDiv = document.getElementById('time');
let dateDiv = document.getElementById('date');
setInterval(() => {
    let date_time = new Date()
    let time = date_time.toLocaleTimeString();
    timeDiv.innerHTML = time;
    let date = date_time.getDate()

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let month = months[date_time.getMonth()]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 'Saturday']
    let day = days[date_time.getDay()];
    dateDiv.innerHTML = `${day}, ${date} ${month}`;

}, 1000);





var defaultCity = "Patna";
var city = defaultCity;
document.getElementById('city').innerHTML = city.charAt(0).toUpperCase() + city.slice(1);

const fetchWeather = () => {
    const weather_api_key = "2ce34c528cc2adc7b41a5ce23b292abd"
    fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${weather_api_key}&q=${city}`)
        .then(
            response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    alert("Enter a valid city")
                }

            }
        )
        .catch(
            error => {
                console.log("catch", error);
            }
        )
        .then(weather => {
            if (weather !== undefined) {
                data = weather
                let y = data['main']
                let temp = parseInt(y['temp']) - 273.15
                let temperature = temp.toFixed(1)
                let feel = parseInt(y["feels_like"]) - 273.15
                let feels_like = feel.toFixed(1)
                let humid = y['humidity']
                let press = ((parseInt(y['pressure'])).toFixed(4)) / 1000
                let iconCode = data['weather'][0]['icon']
                let desc = data['weather'][0]['description']
                let time_now = new Date().getHours()
                temp = document.getElementById("temp")
                temp.innerHTML = `${temperature} <span style="font-size: medium;">&#176C</span> &nbsp <span
    style="font-size: small;">feels like</span>&nbsp
    <span style="font-size: medium;">${feels_like} &#176C</span>`
                description = document.getElementById('desc')
                desc = desc.charAt(0).toUpperCase() + desc.slice(1);
                description.innerHTML = desc;
                pressure = document.getElementById("pressure");
                humidity = document.getElementById("humidity");
                pressure.innerHTML = `Pressure : ${press} Bar`;
                humidity.innerHTML = `Humidity : ${humid} %`;
                let iconSrc = "http://openweathermap.org/img/w/" + iconCode + ".png"
                document.getElementById("wicon").src = iconSrc;

                // prev code for weather icon
                // if (desc === "Fog") {
                //     document.getElementById("wicon").src = "./weather-icons/fog.png"
                // }
                // else if (desc === "Clear sky") {
                //     if (time_now >= 7 && time_now < 18) {
                //         document.getElementById("wicon").src = "./weather-icons/sunny.png"
                //     }
                //     else {
                //         document.getElementById("wicon").src = "./weather-icons/moon.png"
                //     }
                // }

            }
            else {
                city = defaultCity;
                document.getElementById('city').innerHTML = defaultCity.charAt(0).toUpperCase() + defaultCity.slice(1);

                fetchWeather();
            }
        })
}

const openInput = () => {
    document.getElementById("cityQuery").classList.add('open');
    document.getElementById('search-box').classList.add('open-box');
    document.getElementById('cross').classList.add('show');
    document.getElementById('open-icon').classList.add('close-icon');
    document.getElementById('search_icon').classList.add('open-search');
}

const closeInput = () => {
    document.getElementById("cityQuery").classList.remove('open');
    document.getElementById('search-box').classList.remove('open-box');
    document.getElementById('cross').classList.remove('show');
    document.getElementById('open-icon').classList.remove('close-icon');
    document.getElementById('search_icon').classList.remove('open-search');
}

const setCity = () => {
    let cityQuery = document.getElementById('cityQuery');
    city = cityQuery.value;
    setTimeout(fetchWeather(), 0);
    document.getElementById('city').innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
    cityQuery.value = "";
    closeInput();
}


//// Rendering ram
const fetch_ram = () => {
    let freemem = 100 - (100 * os.freemem() / os.totalmem()).toFixed(0);

    let circle = document.getElementById('circle');
    let percentage = document.getElementById('circle-percent')
    let html = percentage.innerHTML.replace('%', "")
    circle.classList.remove(`p${html}`)
    circle.classList.add(`p${freemem.toString()}`)
    percentage.innerHTML = freemem + '%'
}



/// Disk space fetcher and renderer
const diskSpaceFetcher = () => {
    checkDiskSpace('C:/').then((space) => {
        var box = document.querySelector('.C')
        box.style.height = `${100 - space.free * 100 / space.size}%`
    })
    checkDiskSpace('D:/').then((space) => {
        var box = document.querySelector('.D')
        box.style.height = `${100 - space.free * 100 / space.size}%`
    })
    checkDiskSpace('E:/').then((space) => {
        var box = document.querySelector('.E')
        box.style.height = `${100 - space.free * 100 / space.size}%`
    })
}



/// the timeout for instant loading functions
setTimeout(() => {
    fetchWeather();
    fetch_ram();
    diskSpaceFetcher();
    let json = require('./todo.json');
    renderTodos(json)

}, 0)


///Set intervals 
setInterval(() => {
    fetch_ram();

    os_ut.cpuUsage(function (e) {

        if (value.length == 12) {
            _ = value.shift()
        }

        val = parseInt((e * 100).toFixed(2))
        value.push(val)



    });
    zingchart.render({
        id: 'myChart',
        data: myConfig,
        height: '50%',
        width: '100%'
    });

}, 1000)


setInterval(() => {
    fetchWeather();
    diskSpaceFetcher();
}, 900000)






//// Activating backend
const image = document.querySelector('.logo')
image.addEventListener('click', () => {
    backend();
})


/// Manually adding todos 
const todo_form = document.getElementById('todo_form')
todo_form.addEventListener('submit', (e) => {
    e.preventDefault();

    let work = document.getElementById('work');


    let trimmed_todo = work.value.trim()

    if (trimmed_todo !== '') {
        let json = require('./todo.json');
        addTodo(json, trimmed_todo)
        renderTodos(json)
    }
    work.value = "";
})


//// Todo delete function ///
const deleteTodo = (ev) => {
    let json = require('./todo.json');
    target_id = ev.id;
    for (let index = 0; index < json.length - 1; index++) {
        if (json[index].id == target_id) {

            json.splice(index, 1)

            break;
        }
    }
    fs.writeFileSync('./todo.json', JSON.stringify(json), err => {
        console.log(err);
    })
    let todo_box = document.getElementById('todo');

    let data = ""
    json.map((doc, id) => {
        if (id !== json.length - 1) {
            data += `<div id="todo_items" class=${!doc.done || "done"} ><div style='flex:1' class="done-todo">${doc.Text}</div><img id= 'c${doc.id}' src='images/checked.png' onclick="checkTodo(this);"  style='width:15px; height:15px; cursor:pointer ' /><img id=${doc.id}  onclick="deleteTodo(this);" src='/images/delete.png' style='width:15px; height:15px; cursor:pointer; margin-left:12px; margin-right:3px ' /></div>`
        }
    })
    todo_box.innerHTML = data


}

/// Todo striker function ///
const checkTodo = (ev) => {
    let json = require('./todo.json');
    target_id = ev.id.slice(1,)
    for (let index = 0; index < json.length - 1; index++) {
        if (json[index].id == target_id) {

            json[index].done = !json[index].done;


            break;
        }
    }
    fs.writeFileSync('./todo.json', JSON.stringify(json), err => {
        console.log(err);
    })
    let todo_box = document.getElementById('todo');

    let data = ""
    json.map((doc, id) => {
        if (id !== json.length - 1) {
            data += `<div id="todo_items" class=${!doc.done || "done"} ><div style='flex:1' class"done-todo">${doc.Text}</div><img id= 'c${doc.id}' src='/imageschecked.png' onclick="checkTodo(this);"  style='width:15px; height:15px; cursor:pointer ' /><img id=${doc.id}  onclick="deleteTodo(this);" src='delete.png' style='width:15px; height:15px; cursor:pointer; margin-left:12px; margin-right:3px ' /></div>`
        }
    })
    todo_box.innerHTML = data
}


/// Todo rendering function ////
function renderTodos(json) {


    let todo_box = document.getElementById('todo');

    let data = ""
    json.map((doc, id) => {

        if (id !== json.length - 1) {
            data += `<div id="todo_items" class=${!doc.done || "done"} ><div style='flex:1' class="done-todo">${doc.Text}</div><img id= 'c${doc.id}' src='images/checked.png' onclick="checkTodo(this);"  style='width:15px; height:15px; cursor:pointer ' /><img id=${doc.id}  onclick="deleteTodo(this);" src='delete.png' style='width:15px; height:15px; cursor:pointer; margin-left:12px; margin-right:3px ' /></div>`

        }
    })
    todo_box.innerHTML = data

}

/// Todo Adder Function ////
function addTodo(json, text) {
    let count = json.pop()

    let date = new Date();
    let date_val = date.toLocaleDateString('en-GB');
    let tym = date.toLocaleTimeString();
    let count_value = count.count + 1

    const todo = { "Text": text, "timestamp": tym, "date": date_val, "done": false, "id": count_value }
    json.push({ "count": count_value })
    json.unshift(todo)
    fs.writeFileSync('./todo.json', JSON.stringify(json), err => {
        console.log(err);
    })
}



/// The Fuction to call python backend file ///
function backend() {

    var terminal = document.getElementById('terminal_text')
    var args = {
        scriptpath: path.join(__dirname, 'backend.py'),
        pythonpath: 'C:\\Users\\2019c\\AppData\\Local\\Programs\\Python\\Python37\\python.exe'
    }

    var print_line = new PythonShell('backend.py', args);

    print_line.on('message', (event) => {

        if (event.slice(0, 4) === "TODO") {
            let json = require('./todo.json');
            addTodo(json, event.slice(6,).trim())
            renderTodos(json)
        }
        else {
            terminal.innerHTML = event
        }

    })
}

