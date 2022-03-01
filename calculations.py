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
    byMonth = [0,0,0,0,0,0,0,0,0,0,0,0]
    byMonthScientists = [[],[],[],[],[],[],[],[],[],[],[],[]]

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

        if i["person_id"] not in byMonthScientists[date.month-1] and yearAgo<date:
            byMonthScientists[date.month-1].append(i["person_id"])
            byMonth[date.month-1] += 1

    file.close()
    return allTime, lastYear, byMonth

def csClassifyingImages(yearAgo):
    file = open('animal.json')
    data = json.load(file)

    lastYear=0
    allTime=0
    allTimeScientists = []
    lastYearScientists = []
    byMonth = [0,0,0,0,0,0,0,0,0,0,0,0]
    byMonthScientists = [[],[],[],[],[],[],[],[],[],[],[],[]]

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
         
        if i["person_id"] not in byMonthScientists[date.month-1] and yearAgo<date:
            byMonthScientists[date.month-1].append(i["person_id"])
            byMonth[date.month-1] += 1

    file.close()
    return allTime, lastYear, byMonth

def isCameraDays(yearAgo):
    file = open('photo.json')
    data = json.load(file)

    lastYear=0
    allTime=0
    allTimeDates = []
    lastYearDates = []
    byMonth = [0,0,0,0,0,0,0,0,0,0,0,0]
    byMonthDates = [[],[],[],[],[],[],[],[],[],[],[],[]]

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
        
        if date not in byMonthDates[date.month-1] and yearAgo<date:
            byMonthDates[date.month-1].append(date)
            byMonth[date.month-1] += 1

    file.close()
    return allTime, lastYear, byMonth

def isUploaded(yearAgo):
    file = open('photo.json')
    data = json.load(file)

    lastYear=0
    allTime=0
    byMonth = [0,0,0,0,0,0,0,0,0,0,0,0]

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
            byMonth[date.month-1] += 1
        

    file.close()
    return allTime, lastYear, byMonth

def classificationEvents(yearAgo):
    file = open('animal.json')
    data = json.load(file)

    lastYear=0
    allTime=0
    byMonth = [0,0,0,0,0,0,0,0,0,0,0,0]

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
            byMonth[date.month-1] += 1

    file.close()
    return allTime, lastYear, byMonth

def classificationAnimals(yearAgo):
    file = open('animal.json')
    data = json.load(file)
    file = open('species.json')
    speciesFile = json.load(file)

    species = []

    for i in data:
        if not any(i["species"] in sublist for sublist in species):
            for j in speciesFile:
                if j["option_id"] == i["species"]:
                    break
            species.append([i["species"],1,j["option_name"]])
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

csProvidingAllTime, csProvidingLastYear, csProvidingByMonth = csProvdingImages(yearAgo)
csClassifyingAllTime, csClassifyingLastYear, csClassifyingByMonth  = csClassifyingImages(yearAgo)
isCameraDaysAllTimes, isCameraDaysLastYear, isCameraDaysByMonth = isCameraDays(yearAgo)
isUploadedAllTime, isUploadedLastYear, isUploadedByMonth = isUploaded(yearAgo)
classificationEventsAllTime, classificationEventsLastYear, classificationEventsByMonth = classificationEvents(yearAgo)
species, numberSpecies, numberAnimals = classificationAnimals(yearAgo)

print("KPI 1a. \nAll time:",csProvidingAllTime,"\nLast year:",csProvidingLastYear,"\nBy month:",csProvidingByMonth,"\n")
print("KPI 1b. \nAll time:",csClassifyingAllTime,"\nLast year:",csClassifyingLastYear,"\nBy month:",csClassifyingByMonth,"\n")
print("KPI 2a. \nAll time:",isCameraDaysAllTimes,"\nLast year:",isCameraDaysLastYear,"\nBy month:",isCameraDaysByMonth,"\n")
print("KPI 2b. \nAll time:",isUploadedAllTime,"\nLast year:",isUploadedLastYear,"\nBy month:",isUploadedByMonth,"\n")
print("KPI 3a. \nAll time:",classificationEventsAllTime,"\nLast year:",classificationEventsLastYear,"\nBy month:",classificationEventsByMonth,"\n")
print("KPI 3d. \nNumber of animals identified:",numberAnimals,"\nNumber of species identified:",numberSpecies,"\nAnimals identified by species:",species,"\n")