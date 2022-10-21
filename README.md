![Travis_Build](https://img.shields.io/travis/com/gcivil-nyu-org/team-5-inperson/develop)

[![Coverage Status](https://coveralls.io/repos/github/gcivil-nyu-org/team-5-inperson/badge.svg?branch=develop)](https://coveralls.io/github/gcivil-nyu-org/team-5-inperson?branch=develop)

# NYC Basics

## Guidelines
1. Always work in a venv

    ```virtualenv env```

    ```source env/bin/activate```

2. To update requirements.txt

    ```pip freeze > requirements.txt```

3. Remember to add .env file in ```\backend\frontend``` dir if the map doesn't load.

4. To build frontend

    ```cd backend/frontend```

    ```npm install```

    ```npm start```

5. To run backend

    ```cd backend```

    ```pip install -r requirements.txt```

    ```python manage.py runserver```

6. To run front end test

    ```cd backend/frontend```

    ```npm run test```

