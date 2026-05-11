from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
import os

os.makedirs(app.instance_path, exist_ok=True)
db_path = os.path.join(app.instance_path, "database.db")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(24)

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(20), nullable=True)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    if 'user_id' not in session:
        return redirect(url_for('login'))
@app.route('/clients')
def clients():
    clients = Client.query.all()
    return render_template('index.html', clients=clients)

from datetime import datetime
from flask import render_template

@app.route('/workspace')
def workspace():
    # Demo data for dashboard stats
    stats = {
        'clients': 128,
        'deals': 45,
        'tasks': 23,
        'revenue': '1 250 000'
    }

    # Demo data for Kanban columns
    deals_new = [
        {'title': 'Поставка оборудования', 'company': 'ООО "МеталлПром"', 'amount': 250000, 'date_created': datetime(2025, 5, 12)},
        {'title': 'Запчасти для станков', 'company': 'ИП Иванов И.И.', 'amount': 75000, 'date_created': datetime(2025, 5, 13)},
        {'title': 'Сырьё для производства', 'company': 'ООО "Сырьё+"', 'amount': 120000, 'date_created': datetime(2025, 5, 13)}
    ]
    deals_in_progress = [
        {'title': 'Поставка металла', 'company': 'ООО "МеталлПром"', 'amount': 300000, 'date_created': datetime(2025, 5, 10)},
        {'title': 'Комплектующие', 'company': 'ИП Петров П.П.', 'amount': 45000, 'date_created': datetime(2025, 5, 11)},
        {'title': 'Электроника', 'company': 'ООО "РадиоТех"', 'amount': 160000, 'date_created': datetime(2025, 5, 12)}
    ]
    deals_negotiation = [
        {'title': 'Долгосрочный контракт', 'company': 'ООО "СтройМатериалы"', 'amount': 500000, 'date_created': datetime(2025, 5, 15)},
        {'title': 'Поставка инструментов', 'company': 'ИП Смирнов А.А.', 'amount': 80000, 'date_created': datetime(2025, 5, 14)},
        {'title': 'Химическое сырьё', 'company': 'ООО "ХимПром"', 'amount': 220000, 'date_created': datetime(2025, 5, 16)}
    ]
    deals_done = [
        {'title': 'Бумага А4', 'company': 'ООО "Бумажный Мир"', 'amount': 25000, 'date_created': datetime(2025, 5, 9)},
        {'title': 'Краска и лак', 'company': 'ИП Цветков В.В.', 'amount': 60000, 'date_created': datetime(2025, 5, 8)},
        {'title': 'Крепёжные изделия', 'company': 'ООО "Крепёж"', 'amount': 35000, 'date_created': datetime(2025, 5, 7)}
    ]

    return render_template('kanban.html', stats=stats, deals_new=deals_new, deals_in_progress=deals_in_progress, deals_negotiation=deals_negotiation, deals_done=deals_done)

    clients = Client.query.all()
    return render_template('index.html', clients=clients)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            flash('Вы успешно вошли в систему', 'success')
            return redirect(url_for('workspace'))
        else:
            flash('Неверное имя пользователя или пароль', 'danger')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Вы вышли из системы', 'info')
    return redirect(url_for('login'))

@app.route('/client/add', methods=['GET', 'POST'])
def add_client():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        client = Client(name=name, email=email, phone=phone)
        db.session.add(client)
        db.session.commit()
        flash('Клиент добавлен', 'success')
        return redirect(url_for('index'))
    return render_template('add_client.html')

@app.route('/client/edit/<int:client_id>', methods=['GET', 'POST'])
def edit_client(client_id):
    if 'user_id' not in session:
        return redirect(url_for('login'))
    client = Client.query.get_or_404(client_id)
    if request.method == 'POST':
        client.name = request.form['name']
        client.email = request.form['email']
        client.phone = request.form['phone']
        db.session.commit()
        flash('Клиент обновлен', 'success')
        return redirect(url_for('index'))
    return render_template('edit_client.html', client=client)

@app.route('/client/delete/<int:client_id>', methods=['POST'])
def delete_client(client_id):
    if 'user_id' not in session:
        return redirect(url_for('login'))
    client = Client.query.get_or_404(client_id)
    db.session.delete(client)
    db.session.commit()

# Скрипт для создания пользователя admin с паролем admin123
if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == 'create_admin':
        with app.app_context():
            user = User.query.filter_by(username='admin').first()
            if not user:
                user = User(username='admin')
            user.set_password('admin123')
            db.session.add(user)
            db.session.commit()
            print('Пользователь admin создан или обновлен с паролем admin123')
        sys.exit(0)




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
