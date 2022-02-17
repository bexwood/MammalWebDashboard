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

def isCameraDays(yearAgo):
    file = open('photo.json')
    data = json.load(file)

    lastYear=0
    allTime=0
    allTimeDates = []
    lastYearDates = []

    for i in data:
        test1 = re.compile('.{2}/.{2}/.{4} .{2}:.{2}')
        test2 = re.compile('.{4}-.{2}-.{2} .{2}:.{2}:.{2}')
        if test1.match(i["taken"]) is not None:
            date = datetime.datetime.strptime(i["taken"], '%d/%m/%Y %H:%M') 
        elif test2.match(i["taken"]) is not None:
            date = datetime.datetime.strptime(i["taken"], '%Y-%m-%d %H:%M:%S') 

        if date not in allTimeDates:
            allTimeDates.append(date)
            allTime += 1
        
        if date not in lastYearDates and yearAgo<date:
            lastYearDates.append(date)
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

def classificationAnimals(yearAgo):
    file = open('animal.json')
    data = json.load(file)

    species = []

    for i in data:
        if not any(i["species"] in sublist for sublist in species):
            species.append([i["species"],1])
        else:
            for sublist in species:
                if sublist[0] == i["species"]:
                    sublist[1] += 1
                    break 
        
    file.close()
    species = sorted(species,key=lambda sublist: sublist[0])
    numberSpecies = len(species)

    numberAnimals = 0
    for sublist in species:
        numberAnimals = numberAnimals + sublist[1]

    return species, numberSpecies, numberAnimals



now = datetime.datetime.now()
year = datetime.timedelta(days = 365)
yearAgo = now-year

csProvidingAllTime, csProvidingLastYear = csProvdingImages(yearAgo)
csClassifyingAllTime, csClassifyingLastYear = csClassifyingImages(yearAgo)
isCameraDaysAllTimes, isCameraDaysLastYear = isCameraDays(yearAgo)
isUploadedAllTime, isUploadedLastYear = isUploaded(yearAgo)
classificationEventsAllTime, classificationEventsLastYear = classificationEvents(yearAgo)
species, numberSpecies, numberAnimals = classificationAnimals(yearAgo)

print("KPI 1a. \nAll time:",csProvidingAllTime,"\nLast year:",csProvidingLastYear,"\n")
print("KPI 1b. \nAll time:",csClassifyingAllTime,"\nLast year:",csClassifyingLastYear,"\n")
print("KPI 2a. \nAll time:",isCameraDaysAllTimes,"\nLast year:",isCameraDaysLastYear,"\n")
print("KPI 2b. \nAll time:",isUploadedAllTime,"\nLast year:",isUploadedLastYear,"\n")
print("KPI 3a. \nAll time:",classificationEventsAllTime,"\nLast year:",classificationEventsLastYear,"\n")
print("KPI 3d. \nNumber of animals identified:",numberAnimals,"\nNumber of species identified:",numberSpecies,"\nAnimals identified by species:",species,"\n")