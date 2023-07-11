from flask import Flask, render_template, redirect
from helpers import register_student, fetch_students, fetch_student_details, add_student_detail, remove_student_detail, submit_student_details, remove_student_data, import_student_data
from errors import not_found_error

current_student = {}
current_detail = {}

app = Flask(__name__)

@app.route("/")
def index():
    return redirect("/list")

@app.route("/list")
def list():
    return render_template("list.html")

@app.route("/view")
def view():
    return render_template("view.html")

@app.route("/create")
def create():
    return render_template("create.html")

@app.route("/edit")
def edit():
    return render_template("edit.html")

@app.route("/student")
def student():
    return render_template("student.html")

@app.route("/student_detail")
def student_detail():
    return render_template("student_detail.html")

@app.route("/register", methods=["POST"])
def register():
    return register_student()

@app.route("/add_detail", methods=["POST"])
def add_detail():
   return add_student_detail()

@app.route("/remove_detail", methods=["POST"])
def remove_detail():
   return remove_student_detail()

@app.route("/submit_details", methods=["POST"])
def submit_details():
    return submit_student_details()

@app.route("/get_students", methods=["POST"])
def get_students():
    return fetch_students()

@app.route("/get_details", methods=["POST"])
def get_details():
    return fetch_student_details()

@app.route("/remove_student", methods=["POST"])
def remove_student():
    return remove_student_data()

@app.route("/import_records", methods=["POST"])
def import_records():
    return import_student_data()

@app.errorhandler(404)
def error_404(error):
    return not_found_error()