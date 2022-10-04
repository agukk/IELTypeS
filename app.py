#  from cs50 import SQL
# from crypt import methods
from flask import Flask, redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy #追加
from datetime import datetime #追加
import pytz
# from flask_session import Session
# from werkzeug.security import check_password_hash, generate_password_hash
# from helpers import login_required

app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# Session(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///post.db' #追加
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #追加
db = SQLAlchemy(app) #追加

class Post(db.Model): #追加
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(30), nullable=False)
    comment = db.Column(db.String(300), nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.now(pytz.timezone('Asia/Tokyo')))

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

@app.route("/idiom", methods=["GET"])
def idiom():
    return render_template("idiom.html")

@app.route("/word", methods=["GET"])
def word():
    return render_template("word.html")

@app.route("/essay", methods=["GET"])
def essay():
    return render_template("essay.html")

@app.route("/create", methods=['GET', 'POST'])
def create():
    if request.method == "POST":
        nickname = request.form.get('nickname')
        location = request.form.get('location')
        comment = request.form.get('comment')

        post = Post(nickname=nickname, location=location, comment=comment) # 追加

        db.session.add(post)
        db.session.commit()
        return redirect('/')
    else:
        return render_template("create.html")

@app.route("/post", methods=['GET', 'POST'])
def post():
    if request.method == 'GET':
        posts = Post.query.all()
        return render_template('post.html', posts=posts)