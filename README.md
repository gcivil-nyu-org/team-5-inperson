
Staging

http://nycbasics-staging.eba-itqvcpc2.us-west-2.elasticbeanstalk.com/

![Travis_Build](https://img.shields.io/travis/com/gcivil-nyu-org/team-5-inperson/develop)

![Coverage](https://img.shields.io/coveralls/github/gcivil-nyu-org/team-5-inperson/develop)


Production

http://nycbasics-prod.eba-itqvcpc2.us-west-2.elasticbeanstalk.com/

![Travis_Build](https://img.shields.io/travis/com/gcivil-nyu-org/team-5-inperson/master)

![Coverage](https://img.shields.io/coveralls/github/gcivil-nyu-org/team-5-inperson/master)

# NYC Basics

## Guidelines
1. Always work in a venv

    ```virtualenv env```

    ```source env/bin/activate```

2. Remember to update requirements.txt

    ```pip freeze > requirements.txt```

3. Remember to add any library code to .gitignore file

4. To use requirements.txt

    ```pip install -r requirements.txt```

5. To run server

    ```cd backend```

    ```python manage.py runserver```

6. To run client

    ```cd frontend```

    ```npm install```

    ```npm start```

7. To run front end test

    ```cd frontend```

    ```npm run tests```

## Prerequisits

1. virtualenv

    ```pip install virtualenv```

