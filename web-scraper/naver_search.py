import requests
from urllib.parse import quote
import pandas as pd
id = 'VQ_fveqYE8xB3AQF0LPq'
secret = 'HaDj6MFLXk'
headers = {
    'X-Naver-Client-Id':id,
    'X-Naver-Client-Secret':secret
}
f = open("list.txt",'r')
query_list= []
while True:
    line=f.readline()
    if not line : break
    query_list.append(line)
url_base = "https://openapi.namver.com/v1/search/local.json?query="
keyword = quote(query_list[0][:-1])
url = url_base+keyword
result = requests.get(url,headers=headers).json()
print(result)
