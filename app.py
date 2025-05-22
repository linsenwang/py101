from flask import Flask, request, jsonify, Response
from openai import OpenAI
import os
from flask_cors import CORS
from llmlib.models_omni_beta import LLMClient
from functools import partial

app = Flask(__name__)
CORS(app)

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

SYSTEM_PROMPT = "You are a helpful assistant."

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')

    def generate():
        stream = client.chat.completions.create(
            model="gemini-2.5-flash-preview-05-20",
            reasoning_effort="low",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            stream=True
        )
        for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    return Response(generate(), content_type='text/plain')

# 设置你的 OpenAI API 密钥
# openai.api_key = os.getenv("GEMINI_API_KEY")  # 建议用环境变量安全存储

# def chat():
#     data = request.get_json()
#     user_message = data.get('message', '')

#     try:
#         response = openai.ChatCompletion.create(
#             model="gemini-2.5-flash-preview-05-20",  # 或 "gpt-4"
#             base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant."},
#                 {"role": "user", "content": user_message}
#             ]
#         )
#         reply = response.choices[0].message['content'].strip()
#         return jsonify({'reply': reply})

#     except Exception as e:
#         print("OpenAI API Error:", e)
#         return jsonify({'reply': "Error communicating with AI."}), 500




# system = "You are a helpful assistant."

# @app.route('/chat', methods=['POST'])
# def chat():
#     client = LLMClient("gemini")
#     get_result = partial(client.generate, system=system, stream_output=True)

#     data = request.get_json()
#     user_message = data.get('message', '')

#     reply = get_result(user_message)
#     return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)
