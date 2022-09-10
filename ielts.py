from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from helpers import login_required

ielts = Flask(__name__)

ielts.config["TEMPLATES_AUTO_RELOAD"] = True
ielts.config["SESSION_PERMANENT"] = False
ielts.config["SESSION_TYPE"] = "filesystem"
Session(ielts)

# db = SQL("sqlite:///ielts.db")

@ielts.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"  # セキュリティ系
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@ielts.route("/practice", methods=["GET"])
# @login_required
def practice():
    return render_template("practice.html")
