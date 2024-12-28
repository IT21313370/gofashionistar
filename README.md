# React and Flask Application

This repository contains a React frontend and a Flask backend. Follow the instructions below to set up and run both applications locally.
Run databse.py and script.py in flask app to create database and add 1000 rows data to the database.

## Application Screenshot

Below is a screenshot of the application interface:

![Application Interface](https://raw.githubusercontent.com/IT21313370/gofashionistar/main/Screenshot%202024-12-28%20152819.png)
![Application Interface](https://github.com/IT21313370/gofashionistar/blob/main/Screenshot%202024-12-28%20152829.png)
![Application Interface](https://github.com/IT21313370/gofashionistar/blob/main/Screenshot%202024-12-28%20153652.png)
![Application Interface](https://github.com/IT21313370/gofashionistar/blob/main/Screenshot%202024-12-28%20152856.png)



## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (which includes npm): [Download Node.js](https://nodejs.org/)
- **Python 3.x**: [Download Python](https://www.python.org/)
- **Git**: [Download Git](https://github.com/IT21313370/gofashionistar.git)
- Pycharm (Flask)
- VS Code (React)

## Frontend: React Application

### Setup and Run

1. **Navigate to the React application directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   To handle legacy peer dependencies, run:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   This will create an optimized build in the `build` directory.

## Backend: Flask Application

### Setup and Run

1. **Navigate to the Flask application directory:**
   ```bash
   cd server
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set environment variables (optional):**
   - **Windows:**
     ```bash
     set FLASK_APP=app.py
     set FLASK_ENV=development
     ```
   - **macOS/Linux:**
     ```bash
     export FLASK_APP=app.py
     export FLASK_ENV=development
     ```

6. **Initialize the database:**
   If your application uses a database, ensure it's set up correctly. You might need to run migrations or create the database file.

7. **Start the Flask application:**
   ```bash
   flask run
   ```
   The backend will be accessible at `http://localhost:5000`.

## Running Both Applications Concurrently

To run both the React frontend and Flask backend simultaneously:

1. **Start the Flask backend:**
   Follow the steps in the [Backend: Flask Application](#backend-flask-application) section to start the backend.

2. **Open a new terminal and start the React frontend:**
   Follow the steps in the [Frontend: React Application](#frontend-react-application) section to start the frontend.

Ensure that the frontend makes API requests to the correct backend URL (e.g., `http://localhost:5000/api/...`). You might need to configure proxy settings or environment variables in the React application to facilitate this.

## Notes

- **Database Initialization:** If the database isn't created automatically, Run the database.py file and script.py files. It will create databse and add 1000 data rows to the database.

- **CORS Configuration:** Ensure that Cross-Origin Resource Sharing (CORS) is properly configured in your Flask application to allow the React frontend to communicate with it. You can use the `flask-cors` extension for this purpose.

- **Environment Variables:** Consider using a `.env` file to manage environment variables securely. Tools like `python-dotenv` can help load these variables into your Flask application.

For more detailed information on integrating React with Flask, consider referring to the following resources:

- [How to Serve a React-app With a Flask-Server](https://blog.ldtalentwork.com/2019/11/29/how-to-serve-a-reactapp-with-a-flask-server/)
- [How To Create a React + Flask Project](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project)
- [How to Connect ReactJS with Flask API](https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/)

By following these steps, you should be able to set up and run both the React frontend and Flask backend locally. If you encounter any issues, consult the documentation for each tool or seek assistance from the community.
