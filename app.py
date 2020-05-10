from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run()

@app.route('/api/anagrams/compare', methods=['POST'])
def compare():
    if request.method == 'POST':
        return 'hello world'

@app.route('/api/anagrams/find', methods=['POST'])
def find():
    if request.method == 'POST':
        return 'hello from the find function'