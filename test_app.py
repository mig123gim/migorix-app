import unittest
from app import app, db, Client, User
import os

class FlaskMiniCRMTestCase(unittest.TestCase):
    def setUp(self):
        # Ensure instance folder exists
        os.makedirs(app.instance_path, exist_ok=True)
        # Use test database
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'test_database.db')
        app.config['TESTING'] = True
        self.app = app.test_client()

        with app.app_context():
            db.create_all()
            # Create a test user
            if not User.query.filter_by(username='testuser').first():
                user = User(username='testuser')
                user.set_password('testpass')
                db.session.add(user)
                db.session.commit()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()
        # Remove test database
        test_db_path = os.path.join(app.instance_path, 'test_database.db')
        if os.path.exists(test_db_path):
            os.remove(test_db_path)

    def login(self, username, password):
        return self.app.post('/login', data=dict(username=username, password=password), follow_redirects=True)

    def logout(self):
        return self.app.get('/logout', follow_redirects=True)

    def test_login_page(self):
        rv = self.app.get('/login')
        self.assertEqual(rv.status_code, 200)
        self.assertIn('Вход'.encode('utf-8'), rv.data)

    def test_login_logout(self):
        rv = self.login('testuser', 'testpass')
        self.assertIn('Вы успешно вошли в систему'.encode('utf-8'), rv.data)
        rv = self.logout()
        self.assertIn('Вы вышли из системы'.encode('utf-8'), rv.data)

    def test_index_requires_login(self):
        rv = self.app.get('/')
        self.assertEqual(rv.status_code, 302)  # Redirect to login
        self.login('testuser', 'testpass')
        rv = self.app.get('/')
        self.assertEqual(rv.status_code, 200)
        self.assertIn('Клиенты'.encode('utf-8'), rv.data)

    def test_add_edit_delete_client(self):
        self.login('testuser', 'testpass')
        # Add client
        rv = self.app.post('/client/add', data=dict(name='Client1', email='client1@example.com', phone='1234567890'), follow_redirects=True)
        self.assertIn('Клиент добавлен'.encode('utf-8'), rv.data)

        with app.app_context():
            client = Client.query.filter_by(name='Client1').first()
            self.assertIsNotNone(client)
            client_id = client.id

        # Edit client
        rv = self.app.post(f'/client/edit/{client_id}', data=dict(name='Client1 Edited', email='client1edited@example.com', phone='0987654321'), follow_redirects=True)
        self.assertIn('Клиент обновлен'.encode('utf-8'), rv.data)

        with app.app_context():
            client = Client.query.get(client_id)
            self.assertEqual(client.name, 'Client1 Edited')

        # Delete client
        rv = self.app.post(f'/client/delete/{client_id}', follow_redirects=True)
        self.assertIn('Клиент удален'.encode('utf-8'), rv.data)

        with app.app_context():
            client = Client.query.get(client_id)
            self.assertIsNone(client)

if __name__ == '__main__':
    unittest.main()
