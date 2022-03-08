from PIL import Image
from IPython.display import display
from ast import arguments
import random
import json
import csv



print('image generation script starting...')
Total_Stars = input("Please enter amount of images to generate: ")
print("You entered: " + Total_Stars)

#Setup
background = []
background_weights = []

base_star = []
base_star_weights = []

eyes = []
eyes_weights = []

mouth = []
mouth_weights = [] 

sunnies = []
sunnies_weights = []

hat = []
hat_weights = []

hair = []
hair_weights = []

facial_hair = []
facial_hair_weights = []

no_attributes_special = []
no_attributes_special_weights = []

one_attributes_special = []
one_attributes_special_weights = []

two_attributes_special = []
two_attributes_special_weights = []

no_hat_attributes_special = []
no_hat_attributes_special_weights = []

fields = []
rows = []
filename = 'attributes.csv'
#use CSV 
with open(filename, 'r') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile)
     
    # extracting field names through first row
    fields = next(csvreader)
 
    # extracting each data row one by one
    for row in csvreader:
        rows.append(row)

print('Field names are:' + ', '.join(field for field in fields))


for row in rows[:5]:
    # parsing each column of a row 
    # 3 columns in row
    if row[0] == 'background' :
        background.append(row[1])
        background_weights.append(row[2])
    elif row[0] == 'base star':
        base_star.append(row[1])
        base_star_weights.append(row[2])
    elif row[0] == 'mouth':
        mouth.append(row[1])
        mouth_weights.append(row[2])
    elif row[0] == 'facial hair':
        facial_hair.append(row[1])
        facial_hair.append(row[2])
    elif row[0] == 'eyes':
        eyes.append(row[1])
        eyes_weights.append(row[2])
    elif row[0] == 'sunnies':
        sunnies.append(row[1])
        sunnies.append(row[2])
    elif row[0] == 'hair': 
        hair.append(row[1])
        hair_weights.append(row[2])
    elif row[0] == 'hat':
        hat.append(row[1])
        hat.append(row[2])
    elif row[0] == 'no_attributes_special':
        no_attributes_special.append(row[1])
        no_attributes_special_weights.append(row[2])
    elif row[0] == 'one_attributes_special':
        one_attributes_special.append(row[1])
        one_attributes_special_weights.append(row[2])
    elif row[0] == 'two_attributes_special':
        two_attributes_special.append(row[1])
        two_attributes_special_weights.append(row[2])
    elif row[0] == 'no_hat_attributes_special':
        no_hat_attributes_special.append(row[1])
        no_hat_attributes_special_weights.append(row[2])


traits = []
#Create an array of image attributes (attributes)

def returnAttributes(attributes): 
    if attributes in traits: 
        return createAttributes()
    else: 
        return attributes


def createAttributes(): 
    attributes = []
    #choose number of layers will be in image
    attributes.append(random.choices(background, background_weights)[0])
    attributes.append(random.choices(base_star, base_star_weights)[0])

    #attributes
        #Special or Non-Special () -- DONE
        #Beard 
        #mouth
        #sunnies
        #eyes
        #hair
        #Hairs
        
    isSpecial = random.choices(['special', 'non-special'], [5, 95])[0]
    if(isSpecial == 'special'):
        #Need to determine type of special
        typeSpecial = random.choice('zeroAtt', 'eyeAtt', 'twoAtt')
        match typeSpecial: 
            case 'zeroAtt':
                attributes.append(random.choices(no_attributes_special, no_attributes_special_weights)[0])
                return returnAttributes(attributes)
            case 'eyeAtt': 
                attributes.append(random.choices(one_attributes_special, one_attributes_special_weights)[0])
                attributes.append(random.choices(eyes, eyes_weights)[0])
                return returnAttributes(attributes)
            case 'twoAtt': 
                if('hair' == random.choice('hair', 'hat')):
                    attributes.append(random.choices(two_attributes_special, two_attributes_special_weights)[0])
                    attributes.append(random.choices(hair, hair_weights)[0])
                else: 
                    attributes.append(random.choices(two_attributes_special, two_attributes_special_weights)[0])
                    attributes.append(random.choices(hat, hat_weights)[0])
                return returnAttributes(attributes)
    else:
        #Add special character shooting star
        special = False
        if random.randint(0, 99) <= 3: #shooting star
            attributes.append('shooting_star')
        elif (random.randint(0, 99) <= 5): #no hat special
            attributes.append(random.choices(no_hat_attributes_special, no_hat_attributes_special_weights)[0])
            special = True

        #Layer 1: mouth & beard
        layer1 = random.choices(['mouth', 'both'], [60, 40])[0]
        if layer1 == 'mouth': #mouth 
            attributes.append(random.choices(mouth, mouth_weights)[0])
        else: #mounth & beard
            attributes.append(random.choices(mouth, mouth_weights)[0])
            attributes.append(random.choices(facial_hair, facial_hair_weights)[0])

        #Layer 2: sunnies & eyes
        layer2 = random.choices(['eyes', 'sunnies', 'both'], [40, 40, 20])[0]
        if layer2 == 'eyes': #eyes 
            attributes.append(random.choices(eyes, eyes_weights)[0])
        elif layer2 == 'sunnies': #sunnies
            attributes.append(random.choices(sunnies, sunnies_weights)[0])
        else: #eyes & sunnies
            attributes.append(random.choices(eyes, eyes_weights)[0])
            attributes.append(random.choices(sunnies, sunnies_weights)[0])
        
        if not special: 
            #Layer3: hair and hats
            layer3 = random.choices(['hat', 'hair', 'both'], [40, 40, 20])[0]
            if layer3 == 'hat':
                attributes.append(random.choices(hat, hat_weights)[0])
            elif layer3 == 'hair': 
                attributes.append(random.choices(hair, hair_weights)[0])
            else: 
                attributes.append(random.choices(hat, hat_weights)[0])
                attributes.append(random.choices(hair, hair_weights)[0])

    return returnAttributes(attributes)
print('Please Wait, Stars are being created...')
for i in Total_Stars: 
    newStar = createAttributes()
    traits.append(newStar)

#Add token Ids
i = 0
for item in traits:
    item['tokenId'] = i 
    i = i + 1
print('Please Wait, Creating output images...')
for item in traits:
    layers = []
    #Open all the files
    for attribute in item: 
        layers.append(Image.open(f'./starAttributes/{item[attribute]}.png').convert('RGBA')) 

    com = Image.alpha_compostie(layers[0], layers[1])
    layers.pop(0)
    layers.pop(1)

    for layer in layers : 
        com = Image.alpha_compostie(com, layer)

    rgb_im = com.convert('RGB')
    file_name = str(item['tokenId'] + ".png")
    rgb_im.save("./output/" + file_name)


#Add Json Files


# #iterate over the traits array and create all the images
# #Place everything into Json File