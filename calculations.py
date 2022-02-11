import json
import datetime  
import re

now = datetime.datetime.now()
year = datetime.timedelta(days = 365)

f = open('data.json')
data = json.load(f)
lastYear=0
allTime=0
allTimeScientists = []
lastYearScientists = []
missed =  0

for i in data:
    
    if i["person_id"] not in allTimeScientists:
        allTimeScientists.append(i["person_id"])
        allTime += 1

    test1 = re.compile('.{2}/.{2}/.{4} .{2}:.{2}')
    test2 = re.compile('.{4}-.{2}-.{2} .{2}:.{2}:.{2}')
    if test1.match(i["taken"]) is not None:
        date = datetime.datetime.strptime(i["taken"], '%d/%m/%Y %H:%M') 
    elif test2.match(i["taken"]) is not None:
        date = datetime.datetime.strptime(i["taken"], '%Y-%m-%d %H:%M:%S') 
    else:
        missed +=1
        pass
    if i["person_id"] not in lastYearScientists and now-year>date:
        lastYearScientists.append(i["person_id"])
        lastYear += 1 

print(allTime, lastYear, missed)
    

f.close()