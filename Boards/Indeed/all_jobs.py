
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

def getHTML(topic,location):
    try:
        baseURL = f"https://pk.indeed.com/jobs?q={topic}&l={location}";
        driver.get(baseURL)
        soup = BeautifulSoup(driver.page_source, 'lxml')
        return soup
    except:
        return 0

def get_JobTitle(container):
    try:
        anchor = container.find('h2', class_="jobTitle").findNext()
        span = anchor.findNext()
        return span.text
    except:
        return ''

def get_Link(container):
    try:
        anchor = container.find('h2', class_="jobTitle").findNext()
        return anchor['href']
    except:
        return ''

def get_CompanyName(container):
    try:
        return container.find("span", class_="companyName").text
    except:
        return ''

def get_Salary(container):
    try:
        return container.find("div",class_="salaryOnly").find("div",{"class":"salary-snippet-container"}).findNext().text
    except:
        return ''

def get_JobType(container):
    try:
        check=container.find("div",class_="salaryOnly").find("div",{"class":"salary-snippet-container"})
        if check:
            return check.find_next_sibling("div").findNext().text
        else:
            return container.find("div",class_="salaryOnly").find("div",class_="metadata").findNext().text
    except:
        return ''
def get_Location(container):
    try:
        return container.find("div",class_="companyLocation").text
    except:
        return ''

def get_Date(container):
    try:
        return container.find("span",class_="date",text=True).text
    except:
        return ''

def get_Desc(container):
    try:
        return container.find("div",class_="job-snippet").text
    except:
        return ''


def parseHTML(HTML):
    JobsArray=[]

    if HTML != 0:
        mainDiv=HTML.find("div",{"id":"mosaic-jobcards"})
        li=mainDiv.find("ul").findAll('li',recursive=False)
        for Job in li:
            real=Job.find('div',class_='slider_container')
            if real:
                try:
                    # Getting Job Title, Company Name, Location, Salary, Type,Link
                    resultContent=real.find('td',class_="resultContent")
                    # Getting Desc, Date
                    resultContent1 = real.find('tr', class_="underShelfFooter")
                    data = {
                        'title':get_JobTitle(resultContent) ,
                        'companyName': get_CompanyName(resultContent),
                        'location': get_Location(resultContent),
                        'type': get_JobType(resultContent),
                        'salary': get_Salary(resultContent),
                        'desc': get_Desc(resultContent1),
                        'date': get_Date(resultContent1),
                        'link': get_Link(resultContent)
                    }
                    JobsArray.append(data)
                except:
                    continue
            else:
                continue

        return JobsArray
    else:
        return 0

def Main(topic,location):
    HTML=getHTML(topic,location)
    return parseHTML(HTML)



