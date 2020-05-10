import re
from anagrams import orderAlphabetically
from anagrams import split


def tokenize(string):
    return string.split(' ')


def removePunctuation(string):
    punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
    cleanString = ''
    for char in string:
        if char not in punctuations:
            cleanString = cleanString + char

    return cleanString


def splitTokens(tokens):
    return [split(token) for token in tokens]


def orderTokens(splitTokens):
    for splitToken in splitTokens:
        orderAlphabetically(splitToken)


def joinSplitTokens(splitTokens):
    return ["".join(splitToken) for splitToken in splitTokens]


def findUniqueLetterCombos(tokens):
    splitTokenList = splitTokens(tokens)
    orderTokens(splitTokenList)

    joinedTokens = joinSplitTokens(splitTokenList)

    orderedTokenSet = list(set(joinedTokens))

    allAnagrams = []

    for i in range(len(orderedTokenSet)):
        tokenDict = {
            "pattern": orderedTokenSet[i],
            "anagrams": []
        }

        for j in range(len(tokens)):
            if joinedTokens[j] == orderedTokenSet[i]:
                tokenDict["anagrams"].append(tokens[j])
        allAnagrams.append(tokenDict)

    return allAnagrams


def findAnagrams(corpus):
    tokens = tokenize(removePunctuation(corpus))
    return findUniqueLetterCombos(tokens)