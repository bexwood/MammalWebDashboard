import json
import datetime  
import re

def csProvdingImages(yearAgo):
    file = open('photo.json')
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

        if i["person_id"] not in lastYearScientists and yearAgo<date:
            lastYearScientists.append(i["person_id"])
            lastYear += 1 

    file.close()
    return allTime, lastYear

def csClassifyingImages(yearAgo):
    file = open('animal.json')
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
        if test1.match(i["timestamp"]) is not None:
            date = datetime.datetime.strptime(i["timestamp"], '%d/%m/%Y %H:%M') 
        elif test2.match(i["timestamp"]) is not None:
            date = datetime.datetime.strptime(i["timestamp"], '%Y-%m-%d %H:%M:%S') 

        if i["person_id"] not in lastYearScientists and yearAgo<date:
            lastYearScientists.append(i["person_id"])
            lastYear += 1 

    file.close()
    return allTime, lastYear

def isUploaded(yearAgo):
    file = open('photo.json')
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

        if i["sequence_num"] == 1 and yearAgo<date:
            lastYear += 1 
        

    file.close()
    return allTime, lastYear

def classificationEvents(yearAgo):
    file = open('animal.json')
    data = json.load(file)

    lastYear=0
    allTime=0

    for i in data:
        allTime +=1

        test1 = re.compile('.{2}/.{2}/.{4} .{2}:.{2}')
        test2 = re.compile('.{4}-.{2}-.{2} .{2}:.{2}:.{2}')
        if test1.match(i["timestamp"]) is not None:
            date = datetime.datetime.strptime(i["timestamp"], '%d/%m/%Y %H:%M') 
        elif test2.match(i["timestamp"]) is not None:
            date = datetime.datetime.strptime(i["timestamp"], '%Y-%m-%d %H:%M:%S') 

        if yearAgo<date:
            lastYear += 1 
        

    file.close()
    return allTime, lastYear



now = datetime.datetime.now()
year = datetime.timedelta(days = 365)
yearAgo = now-year

csProvidingAllTime, csProvidingLastYear = csProvdingImages(yearAgo)
csClassifyingAllTime, csClassifyingLastYear = csClassifyingImages(yearAgo)
isUploadedAllTime, isUploadedLastYear = csProvdingImages(yearAgo)
classificationEventsAllTime, classificationEventsLastYear = classificationEvents(yearAgo)

print("KPI 1a. All time:",csProvidingAllTime,"Last year:",csProvidingLastYear)
print("KPI 1b. All time:",csClassifyingAllTime,"Last year:",csClassifyingLastYear)
print("KPI 2b. All time:",isUploadedAllTime,"Last year:",isUploadedLastYear)
print("KPI 3a. All time:",classificationEventsAllTime,"Last year:",classificationEventsLastYear)

