from flask import Flask, render_template, request, make_response, jsonify
from anagrams import isAnagram
from findAnagrams import findAnagrams

app = Flask(__name__)

if ENV == 'dev':
    app.debug = True
else:
    app.debug  = False


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/anagrams/compare', methods=['POST'])
def compare():
    if request.method == 'POST':
        data = request.get_json()
        if data['firstWord'] == '' or data['secondWord'] == '':
            return render_template('index.html', message='Please enter both words!') 

        else:
            return  jsonify(isAnagram(data['firstWord'], data['secondWord']))

@app.route('/api/anagrams/find', methods=['POST'])
def find():
    if request.method == 'POST':
        return make_response(jsonify(findAnagrams(request.form['corpus'])), 200)
        


if __name__ == '__main__':
    app.run()