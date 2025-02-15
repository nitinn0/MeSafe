from flask import Flask, request, redirect, url_for, render_template
import os
import subprocess

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'

# Allowed file extensions
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'jpg', '.jpg', 'png', 'webp'}

# Ensure the upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def upload_form():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file uploaded!", 400

    file = request.files['file']

    if file.filename == '':
        return "No file selected!", 400

    if file and allowed_file(file.filename):
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Run the Python script to check the file
        result = subprocess.run(['python3', 'main.py', file_path], capture_output=True, text=True)

        return f"Output: {result.stdout} <br> Error: {result.stderr}"

    return "Invalid file type. Please upload an MP4, AVI, JPG,Webp, or PNG file."

if __name__ == '__main__':
    app.run(debug=True)
