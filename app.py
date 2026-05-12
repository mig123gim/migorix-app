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
class Deal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(150), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    date_created = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)

with app.app_context():
    db.create_all()


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
    stats = {}
    stats['clients'] = Client.query.count()
    stats['deals'] = Deal.query.count()
    stats['tasks'] = 23  # Пока заглушка
    stats['revenue'] = db.session.query(db.func.sum(Deal.amount)).scalar() or 0

    deals_by_status = {
        'new': Deal.query.filter_by(status='new').all(),
        'in_progress': Deal.query.filter_by(status='in_progress').all(),
        'negotiation': Deal.query.filter_by(status='negotiation').all(),
        'done': Deal.query.filter_by(status='done').all()
    }

    return render_template('kanban.html', stats=stats, deals_by_status=deals_by_status)


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


@app.route('/deals/add', methods=['GET', 'POST'])
def add_deal():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    if request.method == 'POST':
        title = request.form['title']
        company = request.form['company']
        amount = request.form['amount']
        date_created = request.form['date_created']
        status = request.form['status']
        deal = Deal(title=title, company=company, amount=amount, date_created=date_created, status=status)
        db.session.add(deal)
        db.session.commit()
        flash('Сделка добавлена', 'success')
        return redirect(url_for('workspace'))
    return render_template('add_deal.html')


@app.route('/deals/<int:deal_id>/edit', methods=['GET', 'POST'])
def edit_deal(deal_id):
    if 'user_id' not in session:
        return redirect(url_for('login'))
    deal = Deal.query.get_or_404(deal_id)
    if request.method == 'POST':
        deal.title = request.form['title']
        deal.company = request.form['company']
        deal.amount = request.form['amount']
        deal.date_created = request.form['date_created']
        deal.status = request.form['status']
        db.session.commit()
        flash('Сделка обновлена', 'success')
        return redirect(url_for('workspace'))
    return render_template('edit_deal.html', deal=deal)


@app.route('/deals/<int:deal_id>/delete', methods=['POST'])
def delete_deal(deal_id):
    if 'user_id' not in session:
        return redirect(url_for('login'))
    deal = Deal.query.get_or_404(deal_id)
    db.session.delete(deal)
    db.session.commit()
    flash('Сделка удалена', 'success')
    return redirect(url_for('workspace'))


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
