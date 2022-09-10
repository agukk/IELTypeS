from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from helpers import login_required

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# db = SQL("sqlite:///ielts.db")

@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"  # セキュリティ系
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
# @login_required
def index():
    return render_template("index.html")

@app.route("/guide", methods=["GET"])
# @login_required
def guide():
    return render_template("guide.html")

@app.route("/practice", methods=["GET"])
# TODO: 後で作る
# @login_required
def practice():
    return render_template("practice.html")
