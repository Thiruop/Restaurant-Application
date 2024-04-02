import express from 'express';
import request from 'supertest';
import {
  Login,
  Registration,
  Worker,
} from '../Controller/authController.js'; 
import { Member, Admin, Partner, Owner } from '../Models/schema.js'; 
import { hashPassword, comparePassword } from '../Utils/passwordUtil.js'; 
import { createJWT } from '../Utils/tokenUtil.js'; 

describe('Login Endpoint', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  test('Login with valid credentials should return status 200 and a token', async () => {
    
    const userData = {
      email: 'test@example.com',
      password: 'password123',
    };
    Member.findOne = jest.fn().mockResolvedValue({
      email: userData.email,
      password: 'hashed_password',
    });
    const createJwtMock = jest
      .spyOn(global, 'createJWT')
      .mockReturnValue('mocked_token');

   
    const response = await request(app)
      .post('/login')
      .send(userData);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'mocked_token');
    expect(response.body).toHaveProperty('message', 'Login Succesfull!');

    // Restore mock
    createJwtMock.mockRestore();
  });

  // Add more test cases for invalid credentials, error scenarios, etc.
});

describe('Registration Endpoint', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  test('Register with valid data should return status 200 and a token', async () => {
    // Mock user data and operations
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirm_password: 'password123',
      location: 'New York',
    };
    Member.findOne = jest.fn().mockReturnValue(null); // Mock to simulate no existing user
    hashPassword = jest.fn().mockResolvedValue('hashed_password'); // Mock hashPassword function
    Member.create = jest.fn().mockResolvedValue({
      name: userData.name,
      email: userData.email,
      password: 'hashed_password',
      location: userData.location,
    });
    createJWT = jest.fn().mockReturnValue('mocked_token'); // Mock createJWT function

    // Send registration request
    const response = await request(app)
      .post('/register')
      .send(userData);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'mocked_token');
    expect(response.body).toHaveProperty(
      'message',
      'User registered successfully'
    );

    // Restore mocks
    hashPassword.mockRestore();
    createJWT.mockRestore();
  });

  // Add more test cases for invalid data, existing user, error scenarios, etc.
});

describe('Worker Endpoint', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  test('Worker with Admin role should return status 200 and user data', async () => {
    // Mock request body with Admin role
    const userData = {
      email: 'admin@example.com',
      password: 'password123',
      role: 'Admin',
    };

    // Mock database operation for Admin
    Admin.findOne = jest.fn().mockResolvedValue({
      email: userData.email,
      role: 'Admin',
      /* other user data */
    });

    // Send worker request
    const response = await request(app)
      .post('/worker')
      .send(userData);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    // Add more assertions as needed
  });

  // Add more test cases for other roles, error scenarios, etc.
});
