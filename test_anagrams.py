import unittest
import re
from anagrams import split
from anagrams import trimAndLower
from anagrams import orderAlphabetically
from anagrams import joinCharacters
from anagrams import isAnagram


class TestIsAnagram(unittest.TestCase):
    def test_trimmed(self):
        # tests that there are no white spaces when passing a string to trimAndLower
        testString = '\n\n\n \t\t\t \v\v \f\f \r\r This is a string with spaces \n\n\n \t\t\t \v\v \f\f \r\r'
        trimmed = trimAndLower(testString)

        self.assertFalse(bool(re.search('\s', trimmed)))

    def test_lowered(self):
        # tests that string is lower case after passing to trimAndLower function
        testString = 'HI BILLY MAYS HERE'
        lowered = trimAndLower(testString)

        self.assertTrue(lowered.islower())

    def test_orderAlphabetically(self):
        # tests that list of characters is sorted after string is passed to orderAlphabetically function
        charList = ['z', 'd', 'a', 'b', 'g']
        comparisonList = ['a', 'b', 'd', 'g', 'z']
        sortedChars = orderAlphabetically(charList)

        for i in range(0, len(comparisonList)):
            self.assertEqual(charList[i], comparisonList[i])

    def test_joinCharacters(self):
        # tests that list of characters joins into string after being passed into joinCharacters
        charList = ['t', 'o', 'g', 'e', 't', 'h', 'e', 'r']
        joined = joinCharacters(charList)
        comparisonJoin = 'together'
        self.assertEqual(joined, comparisonJoin)

    def test_split(self):
        # tests that string passed onto split function becomes a list
        text = 'This is a string that will soon be split'
        separate = split(text)
        self.assertTrue(type(separate) is list)

    def test_anagram(self):
        # Tests strings of varying length w/ or w/o whitespaces
        self.assertTrue(isAnagram('horse', 'shore'))
        self.assertFalse(isAnagram('horse', 'shores'))
        self.assertTrue(isAnagram('rail safety', 'safety rail'))
        self.assertTrue(isAnagram('whooooo trailing spaces',
                                  '   whooooo trailing spaces    '))
