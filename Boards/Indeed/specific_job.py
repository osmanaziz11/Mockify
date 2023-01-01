# import modules
from selenium import webdriver
from selenium.webdriver import  ChromeOptions
from selenium.webdriver import  Chrome
import selenium
from bs4 import  BeautifulSoup
import os


# Selenium Configuration
options=ChromeOptions()
options.headless=True
options.add_argument('--log-level=1')
user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
options.add_argument(f'user-agent={user_agent}')
driver = Chrome(executable_path='C:\Program Files (x86)\chromedriver.exe',options=options)

# Fetch HTML Content from the given link
def getHTML(url):
    try:
        baseURL = f"https://pk.indeed.com{url}";
        driver.get(baseURL)
        soup = BeautifulSoup(driver.page_source, 'lxml')
        return soup
    except:
        return 0

def parseHTML(HTML):
    if HTML != 0:
        try:
            mainDiv = HTML.find("div", {"id": "jobDescriptionText"}).text
            return mainDiv
        except:
            return 0


def Main(url):
    HTML=getHTML(url)
    return parseHTML(HTML)
