from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from helpers import login_required

team = Flask(__name__)

team.config["TEMPLATES_AUTO_RELOAD"] = True
team.config["SESSION_PERMANENT"] = False
team.config["SESSION_TYPE"] = "filesystem"
Session(team)

# db = SQL("sqlite:///team.db")

@team.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"  # セキュリティ系
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@team.route("/practice", methods=["GET"])
# @login_required
def practice():
    return render_template("practice.html")
