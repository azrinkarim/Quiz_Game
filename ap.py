from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

questions = [
    {"question": "What is the capital of France?", "answer": "paris"},
    {"question": "What is 5 + 7?", "answer": "12"},
    {"question": "Which planet is known as the Red Planet?", "answer": "mars"},
    {"question": "Who is the president of the America ?", "answer": "trump"},
    {"question": "Who is the kamchore of the group ?", "answer": "rahi"},
     {"question": "Who is the first persident of the united state ?", "answer": "rahi"}
]

current_question = {}

@app.route("/question")
def get_question():
    global current_question
    current_question = random.choice(questions)
    return jsonify({"question": current_question["question"]})

@app.route("/answer", methods=["POST"])
def check_answer():
    data = request.get_json()
    user_answer = data["answer"].strip().lower()
    if user_answer == current_question["answer"]:
        return jsonify({"result": "✅ Correct!"})
    else:
        return jsonify({"result": "❌ Wrong. Try again!"})

if __name__ == "__main__":
    app.run(debug=True)
