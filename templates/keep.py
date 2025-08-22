# app.py
from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory, flash
from models import db, User, Visit, Download
from utils import hash_password, verify_password
from datetime import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'YOUR_SECRET_KEY'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Initialize DB
with app.app_context():
    db.create_all()

# ------------------- Landing Page -------------------
@app.route('/')
def landing():
    visit = Visit(page='landingPage', user_id=session.get('user_id'))
    db.session.add(visit)
    db.session.commit()
    return render_template('landingPage.html')

# ------------------- Login & Registration -------------------
@app.route('/auth/<role>', methods=['GET','POST'])
def auth(role):
    if role not in ['nurse','doctor']:
        return redirect(url_for('landing'))

    if request.method == 'POST':
        action = request.form.get('action')  # 'login' or 'register'
        email = request.form.get('email')
        password = request.form.get('password')
        name = request.form.get('name')  # for registration

        # -------- Registration --------
        if action == 'register':
            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                flash('Email already exists!', 'error')
                return redirect(request.url)

            new_user = User(
                name=name,
                email=email,
                password=hash_password(password),
                role=role
            )
            db.session.add(new_user)
            db.session.commit()
            flash('Registration successful! Please login.', 'success')
            return redirect(url_for('auth', role=role))

        # -------- Login --------
        elif action == 'login':
            user = User.query.filter_by(email=email, role=role).first()
            if user and verify_password(user.password, password):
                session['user_id'] = user.id
                session['user_role'] = user.role
                flash('Login successful!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid credentials', 'error')
                return redirect(request.url)

    return render_template(f'{role}-auth.html')

# ------------------- Dashboard -------------------
@app.route('/dashboard')
def dashboard():
    if not session.get('user_id'):
        return redirect(url_for('landing'))
    
    visit = Visit(page='dashboard', user_id=session.get('user_id'))
    db.session.add(visit)
    db.session.commit()

    return f"Welcome {session.get('user_role')}! You are logged in. <a href='/logout'>Logout</a>"

# ------------------- Logout -------------------
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('landing'))

# ------------------- Downloads -------------------
@app.route('/download/<path:filename>')
def download_file(filename):
    if not session.get('user_id'):
        flash('Login required to download files', 'error')
        return redirect(url_for('landing'))

    user_id = session['user_id']
    download = Download(
        user_id=user_id,
        file_name=filename,
        file_type=filename.split('.')[-1],
        downloaded_at=datetime.now()
    )
    db.session.add(download)
    db.session.commit()

    return send_from_directory('static/PDF-RESOURCE', filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
