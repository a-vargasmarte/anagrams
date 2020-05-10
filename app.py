from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/anagrams/compare', methods=['POST'])
def compare():
    if request.method == 'POST':
        print(request.form)
        return request.form

@app.route('/api/anagrams/find', methods=['POST'])
def find():
    if request.method == 'POST':
        return 'hello from the find function'


if __name__ == '__main__':
    app.debug = True
    app.run()