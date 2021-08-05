import pyttsx3
import datetime
import speech_recognition as sr
import wikipedia
import webbrowser
import os
import random
import smtplib
from googlesearch import search
import bs4
from bs4 import BeautifulSoup as soup
import requests
import json
import time
import sys

from apis import weather_api_key, youtube_api_key

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

chromePath = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
webbrowser.register("chrome", None, webbrowser.BackgroundBrowser(chromePath))


def speak(audio):
    engine.say(audio)
    engine.runAndWait()


def wishMe():
    hour = int(datetime.datetime.now().hour)
    if (hour >= 5 and hour < 12):
        speak("Good Morning Sir!")
    elif(hour >= 12 and hour < 17):
        speak("Good Afternoon Sir!")
    elif(hour >= 0 and hour < 5):
        speak("Hello Sir!")
    else:
        speak("Good Evening Sir!")

    speak("How can I help you?")


def takeCommand():
    """It takes microphone input from user and returns string output"""

    r = sr.Recognizer()
    with sr.Microphone() as source:
        # print("Listening.......")
        # sys.stdout.flush()
        r.pause_threshold = 0.7
        audio = r.listen(source)

    try:
        print("Recognizing......")

        sys.stdout.flush()
        query = r.recognize_google(audio, language='en-in')
        print(f"You said...... {query}\n")
        sys.stdout.flush()

    except:
        sys.stdout.flush()
        print("Say that again please.....")
        # sys.stdout.flush()
        # speak("Say that again please.....")
        return "None"
    return query


if __name__ == "__main__":

    wishMe()
    while True:
        print("Listening......")
        sys.stdout.flush()
        query = takeCommand().lower()

        # Logic

        if('thank you' in query):
            speak("You are welcome sir")

        elif('introduce yourself' in query):
            speak("I am your assisstant, Jarvis. I am here to help you")

        elif('work' in query):
            speak("What is the todo")
            print("Listening.....")
            sys.stdout.flush()
            todo = takeCommand().lower()
            print("TODO -", todo)
            sys.stdout.flush()
            speak("added")
            break

        elif 'wikipedia' in query:
            speak("Searching Wikipedia....")
            query = query.replace("wikipedia", "")
            try:
                results = wikipedia.summary(query, sentences=3)
                print(results)
                sys.stdout.flush()
                speak("According to Wikipedia")
                speak(results)

            except Exception as e:
                print(e)
                sys.stdout.flush()
                speak(e)

        elif 'search google' in query:
            speak("What do you want me to search?")
            print("Listening.....")
            sys.stdout.flush()
            gs = takeCommand().lower()

            speak("Searching Google...")
            arr = list(search(gs, tld='co.in', lang='en',
                              num=5, start=0, stop=5, pause=1.2))
            clone_arr = list()

            for i in range(len(arr)):
                clone_arr.append(f"{i+1}. " + arr[i])

            google_outs = ''
            google_outs += "<br>".join(clone_arr)
            print(google_outs+"<br>"*2 + "Listening....")

            sys.stdout.flush()

            # time.sleep(1.5)

            speak("Do you want me to open any of these??")

            cmd = takeCommand().lower()
            if (cmd == 'no'):
                pass
            elif('first' in cmd):
                webbrowser.get('chrome').open(arr[0])
                speak("Opening...")
            elif('second' in cmd):
                webbrowser.get('chrome').open(arr[1])
                speak("Opening...")
            elif('third' in cmd):
                webbrowser.get('chrome').open(arr[2])
                speak("Opening...")
            elif('fourth' in cmd):
                webbrowser.get('chrome').open(arr[3])
                speak("Opening...")
            elif('fifth' in cmd):
                webbrowser.get('chrome').open(arr[4])
                speak("Opening...")

        elif 'search youtube' in query:
            speak("What do you want to search?")
            print("Listening.....")
            sys.stdout.flush()
            you_query = takeCommand().lower()

            base_url = 'https://www.googleapis.com/youtube/v3/search'

            para = {
                'part': 'snippet',
                'q': f"{you_query}",
                'key': youtube_api_key
            }

            req = requests.get(base_url, params=para).json()

            ids = list()
            titles = list()
            youtube_outs = ''
            i = 0
            num = 0
            while(i < 5):
                try:

                    ids.append((req['items'][i]['id']['videoId']))
                    titles.append(
                        f"{num+1}. {req['items'][i]['snippet']['title']}")
                    i += 1
                    num += 1
                except:
                    i += 1

            youtube_outs += "<br>".join(titles)
            print(youtube_outs+"<br>"*2 + "Listening....")
            sys.stdout.flush()
            base_video_url = 'https://www.youtube.com/watch?v='
            speak("Should I open any of them?")

            cmd = takeCommand().lower()
            if (cmd == 'no'):
                pass
            elif('first' in cmd):
                webbrowser.get('chrome').open(base_video_url+ids[0])
                speak("Opening...")
            elif('second' in cmd):
                webbrowser.get('chrome').open(base_video_url+ids[1])
                speak("Opening....")
            elif('third' in cmd):
                webbrowser.get('chrome').open(base_video_url+ids[2])
                speak("Opening...")
            elif('fourth' in cmd):
                webbrowser.get('chrome').open(base_video_url+ids[3])
                speak("Opening...")
            elif('last' in cmd):
                webbrowser.get('chrome').open(base_video_url+ids[4])
                speak("Opening...")

        elif("news" in query):
            speak("What's the topic?")
            print("Listening.....")
            sys.stdout.flush()
            news_query = takeCommand().lower()
            search_url = f'https://www.indiatoday.in/topic/{news_query}'

            page = requests.get(search_url)

            soup_page = soup(page.text, 'html.parser')

            divs = list()

            for index, div in enumerate(soup_page.find_all('div', class_='views-field views-field-php-2')):
                news = div.find('span', class_="field-content")
                divs.append(f"{index+1}. {news.text}")

            speech_rate = 175
            engine.setProperty('rate', speech_rate)
            news_string = ''
            try:
                news_string += "<br>".join(divs[:2])
                print(news_string)
                sys.stdout.flush()
                time.sleep(0.45)

                for i in range(2):
                    speak(divs[i])

            except:
                print("Sorry, I couldn't find sufficient news on that topic!")

                speak("Sorry, I couldn't find sufficient news on that topic!")
                sys.stdout.flush()
            default_rate = 200
            engine.setProperty('rate', default_rate)

        elif 'play a song' in query:
            music_dir = "D:\\SD Card\\songs"
            songs = os.listdir(music_dir)
            n = len(songs)
            i = random.choice(list(range(n)))
            print(songs[i])
            sys.stdout.flush()
            speak("Playing from your directory")
            os.startfile(os.path.join(music_dir, songs[i]))

        elif 'play music' in query:
            music_dir = "D:\\SD Card\\songs"
            songs = os.listdir(music_dir)
            n = len(songs)
            i = random.choice(list(range(n)))
            print(songs[i])
            sys.stdout.flush()
            speak("Playing from your directory")
            os.startfile(os.path.join(music_dir, songs[i]))

        elif 'play' in query:
            music_dir = "D:\\SD Card\\songs"
            songs = os.listdir(music_dir)
            query = query.replace("play ", "")
            n = len(songs)
            played = False

            for i in range(n):
                if query in songs[i].lower():
                    print(songs[i])
                    sys.stdout.flush()
                    os.startfile(os.path.join(music_dir, songs[i]))
                    speak(f"Playing {query}")
                    played = True
                    break
            if(played == False):
                speak("I couldn't find that song.")

        elif 'time' in query:
            strTime = datetime.datetime.now().strftime("%I:%p:%M")
            # print(strTime)
            speak(f"Sir, the time is {strTime} minute")

        elif 'date' in query:
            fDate = datetime.datetime.now()
            day = fDate.strftime("%A")
            dat = fDate.strftime("%d:%B:%Y")

            speak(f"Sir, the date is {dat} and day is {day} ")

        elif 'open' in query:
            query = query.replace("open", "")
            speak(f"Opening {query}")
            webbrowser.get('chrome').open(f"{query}.com")

        elif 'weather' in query:
            base_url = "http://api.openweathermap.org/data/2.5/weather?"
            speak("Please tell your city.")
            print("Listening.....")
            sys.stdout.flush()
            city_name = takeCommand().lower()
            complete_url = base_url + "appid=" + weather_api_key + "&q=" + city_name
            response = requests.get(complete_url)
            data = response.json()

            if data['cod'] == '404':
                speak("I can't find your city")

            else:
                y = data['main']
                temp = int(y['temp']) - 273.15
                temperature = round(temp, 1)
                weath = data['weather'][0]['description']
                humid = y['humidity']
                pressure = round((int(y['pressure'])/1000), 2)
                degree = u"\N{DEGREE SIGN}"
                sys.stdout.flush()
                print(
                    f"Temperature : {temperature} &#176C <br>Pressure : {pressure} Bar <br> Humidity : {humid} % <br> Description = {weath}")

                sys.stdout.flush()
                if 'sky' in weath:
                    weath = weath.replace(' sky', '')
                    speak(
                        f"Sir, the current tempertaure is {temperature} degree celsius and the sky is {weath}.")

                elif weath[len(weath)-1] == 's':
                    speak(
                        f"Sir, the current tempertaure is {temperature} degree celsius and the weather is {weath[:len(weath)-1]}y.")

                else:
                    speak(
                        f"Sir, the current tempertaure is {temperature} degree celsius and the weather is {weath}y.")

        elif 'terminate' in query:
            hr = int(datetime.datetime.now().hour)
            if(hr > 5 and hr < 21):
                speak("Have a nice day sir!")
            else:
                speak("Good Night sir")
            break
