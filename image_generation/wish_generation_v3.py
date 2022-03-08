from PIL import Image
from IPython.display import display
from ast import arguments
import threading
import random
import json
import csv

print('image generation script starting...')
print('Input must be divisable by 4')
while True: 
    Total_Stars = int(input("Please enter amount of images to generate: "))
    if Total_Stars % 4 == 0: 
        break

filename = input("Please enter csv file: ")

#Setup
traits = {}
order = []
fields = []
rows = []

#use CSV 
with open(filename, 'r') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile)
     
    # extracting field names through first row
    fields = next(csvreader)
 
    # extracting each data row one by one
    for row in csvreader:
        rows.append(row)

# print('Field names are:' + ', '.join(field for field in fields))

for row in rows:
    # parsing each column of a row 
    # 3 columns in row
    if row[0] not in traits:
        trait = {}
        trait['name'] = []
        trait['weight'] = []
        traits[row[0]] = trait
        order.append(row[0])
    traits[row[0]]['name'].append(row[1])
    traits[row[0]]['weight'].append(float(row[2]))

# print(traits)
# print(order)

#     #attributes
#         #Special or Non-Special () -- DONE
#         #Beard 
#         #mouth
#         #sunnies
#         #eyes
#         #hair
#         #Hairs
#         # no_attributes_special
#         # one_attributes_special 
#         # two_attributes_special
#         # no_hat_attributes_special
#         # Everything attribure

def createAttributes(): 
    attributes = []
    #choose number of layers will be in image
    #background
    attributes.append(random.choices(traits[order[0]]['name'], traits[order[0]]['weight']))
    #base_star
    attributes.append(random.choices(traits[order[1]]['name'], traits[order[1]]['weight']))
      
    isSpecial = random.choices(['special', 'non-special'], [5, 95])[0]
    if(isSpecial == 'special'):
        #Need to determine type of special
        typeSpecial = random.choice(['zeroAtt', 'oneAtt', 'twoAtt'])
        match typeSpecial: 
            case 'zeroAtt':
                attributes.append(random.choices(traits[order[9]]['name'], traits[order[9]]['weight']))
                return attributes
            case 'oneAtt': 
                #eyes
                attributes.append(random.choices(traits[order[5]]['name'], traits[order[5]]['weight']))
                attributes.append(random.choices(traits[order[10]]['name'], traits[order[10]]['weight']))
                return attributes
            case 'twoAtt': 
                if('hair' == random.choices(['hair', 'hat'])):
                    attributes.append(random.choices(traits[order[11]]['name'], traits[order[11]]['weight']))
                    attributes.append(random.choices(traits[order[8]]['name'], traits[order[8]]['weight']))
                else: 
                    attributes.append(random.choices(traits[order[11]]['name'], traits[order[11]]['weight']))
                    attributes.append(random.choices(traits[order[7]]['name'], traits[order[7]]['weight']))
                return attributes
    else:
    #Add special character shooting star
        special = False
        if random.randint(0, 10000) <= 3: #shooting star
            attributes.append('shootingstar')
        elif (random.randint(0, 10000) <= 5): #no_hat_special
            attributes.append(random.choices(traits[order[2]]['name'], traits[order[2]]['weight']))
            special = True

        #Layer 1: mouth & beard
        layer1 = random.choices(['mouth', 'both'], [60, 40])
        if layer1 == 'mouth': #mouth 
            attributes.append(random.choices(traits[order[3]]['name'], traits[order[3]]['weight']))
        else: #mounth & beard
            attributes.append(random.choices(traits[order[3]]['name'], traits[order[3]]['weight']))
            attributes.append(random.choices(traits[order[4]]['name'], traits[order[4]]['weight']))

        #Layer 2: sunnies & eyes
        layer2 = random.choices(['eyes', 'sunnies', 'both'], [40, 40, 20])
        if layer2 == 'eyes': #eyes 
            attributes.append(random.choices(traits[order[5]]['name'], traits[order[5]]['weight']))
        elif layer2 == 'sunnies': #sunnies
            attributes.append(random.choices(traits[order[6]]['name'], traits[order[6]]['weight']))
        else: #eyes & sunnies
            attributes.append(random.choices(traits[order[5]]['name'], traits[order[5]]['weight']))
            attributes.append(random.choices(traits[order[6]]['name'], traits[order[6]]['weight']))
        
        if not special: 
            #Layer3: hair and hats
            layer3 = random.choices(['hat', 'hair'], [50, 50])
            if layer3 == 'hat':
                attributes.append(random.choices(traits[order[7]]['name'], traits[order[7]]['weight']))
            else: 
                attributes.append(random.choices(traits[order[8]]['name'], traits[order[8]]['weight']))

    return attributes
print('Please wait, Creating attributes...')
def imageGen(numStars, startTokenId):
    stars = []
    for i in range(numStars):
        star = createAttributes()
        # print(star)
        stars.append(star)

    print('Please Wait, Creating output images...')

    tokenId = startTokenId
    for star in stars:
        layers = []
        #Open all the files
        for attribute in star: 
            layers.append(Image.open(f'./starAttributes/{attribute[0]}.png').convert('RGBA'))

        com = Image.alpha_composite(layers[0], layers[1])
        # layers.pop(0)
        # layers.pop(1)

        for layer in layers: 
            com = Image.alpha_composite(com, layer)

        rgb_im = com.convert('RGB')
        outputFile = str(tokenId) + ".png"
        print(outputFile)
        rgb_im.save("./output/" + outputFile)
        tokenId += 1
numberStar = int(Total_Stars / 4)
t1 = threading.Thread(target=imageGen, args=(numberStar, 0,))
t2 = threading.Thread(target=imageGen, args=(numberStar, numberStar,))
t3 = threading.Thread(target=imageGen, args=(numberStar, 2 * numberStar,))
t4 = threading.Thread(target=imageGen, args=(numberStar, 3 * numberStar,))


t1.start()
t2.start()
t3.start()
t4.start()

t1.join()
t2.join()
t3.join()
t4.join()
# Add JSON files for each 