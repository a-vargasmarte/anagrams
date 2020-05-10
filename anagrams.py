#!/usr/bin/env python
# coding: utf-8

import re


def trimAndLower(word):
    trimmed = re.sub(r'\s+', '', word)
    lowered = trimmed.lower()
    return lowered


def split(word):
    return [char for char in word if word.isalpha()]


def orderAlphabetically(characterList):
    characterList.sort()


def joinCharacters(characterList):
    return "".join(characterList)


def isAnagram(baseWord, comparisonWord):
    if type(baseWord) not in [str] or type(comparisonWord) not in [str]:
        raise TypeError("Words must be of type string")

    baseSplit = split(trimAndLower(baseWord))
    comparisonSplit = split(trimAndLower(comparisonWord))

    orderAlphabetically(baseSplit)

    orderAlphabetically(comparisonSplit)

    baseJoin = joinCharacters(baseSplit)
    compareJoin = joinCharacters(comparisonSplit)

    if baseJoin == compareJoin:
        return True
    else:
        return False
