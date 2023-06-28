from flask import render_template

def not_found_error():
    return render_template("not_found.html")