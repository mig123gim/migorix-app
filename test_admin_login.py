import unittest
from app import app

class AdminLoginTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_admin_login(self):
        rv = self.app.post('/login', data=dict(username='admin', password='admin123'), follow_redirects=True)
        self.assertIn('Вы успешно вошли в систему'.encode('utf-8'), rv.data)

if __name__ == '__main__':
    unittest.main()
