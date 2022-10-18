from selenium.webdriver import  Chrome
from selenium.webdriver import  ChromeOptions
from bs4 import  BeautifulSoup

options=ChromeOptions()
options.headless=True
options.add_argument('--log-level=1')
user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
options.add_argument(f'user-agent={user_agent}')
driver = Chrome(executable_path='C:\Program Files (x86)\chromedriver.exe',options=options)

driver.get('https://pk.indeed.com/jobs?q=software+engineer&l=Rawalpindi&from=searchOnHP&redirected=1&vjk=2de5d9aeb7cfc8a4')

soup= BeautifulSoup(driver.page_source,'lxml')
print(soup.find('div',{'id':'mosaic-provider-jobcards'}))
driver.quit()

