import json
import datetime  
import re

def csProvdingImages(now, year):
    file = open('data.json')
    data = json.load(file)

    lastYear=0
    allTime=0
    allTimeScientists = []
    lastYearScientists = []

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

        if i["person_id"] not in lastYearScientists and now-year>date:
            lastYearScientists.append(i["person_id"])
            lastYear += 1 

    file.close()
    return allTime, lastYear


def isUploaded(now, year):
    file = open('data.json')
    data = json.load(file)

    lastYear=0
    allTime=0

    for i in data:
        if i["sequence_num"] == 1:
            allTime +=1

        test1 = re.compile('.{2}/.{2}/.{4} .{2}:.{2}')
        test2 = re.compile('.{4}-.{2}-.{2} .{2}:.{2}:.{2}')
        if test1.match(i["taken"]) is not None:
            date = datetime.datetime.strptime(i["taken"], '%d/%m/%Y %H:%M') 
        elif test2.match(i["taken"]) is not None:
            date = datetime.datetime.strptime(i["taken"], '%Y-%m-%d %H:%M:%S') 

        if i["sequence_num"] == 1 and now-year>date:
            lastYear += 1 
        

    file.close()
    return allTime, lastYear



now = datetime.datetime.now()
year = datetime.timedelta(days = 365)

csProvidingAllTime, csProvidingLastYear = csProvdingImages(now, year)
isUploadedAllTime, isUploadedLastYear = csProvdingImages(now, year)

print("KPI 1a. All time:",csProvidingAllTime,"Last year:",csProvidingLastYear)
print("KPI 2b. All time:",isUploadedAllTime,"Last year:",isUploadedLastYear)

