# NYC Basics

## Staging Environment

https://nycbasics5.ga/ or [here](http://nycbasics-staging-env.eba-gvsq4xxk.us-west-2.elasticbeanstalk.com/)

![Travis_Build](https://img.shields.io/travis/com/gcivil-nyu-org/team-5-inperson/develop)
![Coverage](https://img.shields.io/coveralls/github/gcivil-nyu-org/team-5-inperson/develop)


## Production Environment

http://nycbasics5prod.ml/ or [here](http://nycbasics-prod-env.eba-s8mf4mpn.us-west-2.elasticbeanstalk.com/)


![Travis_Build](https://img.shields.io/travis/com/gcivil-nyu-org/team-5-inperson/master)
![Coverage](https://img.shields.io/coveralls/github/gcivil-nyu-org/team-5-inperson/master)

---

## Developer Guidelines
1. Always work in a venv

    ```virtualenv env```

    ```source env/bin/activate```

2. Remember to update requirements.txt

    ```pip freeze > requirements.txt```

3. To use requirements.txt

    ```pip install -r requirements.txt```

4. To run frontend node

    ```cd frontend```

    ```npm install```

    ```npm run watch```

5. To run backend django

    ```cd backend```

    ```python manage.py runserver```

6. To run backend test

    ```cd backend```

    ```python -m coverage run manage.py test```

    ```coverage html```

7. To run frontend test

    ```cd backend/frontend```

    ```npm run tests```

8. Check black and flake8 before all commits

    ```python -m black .```

    ```python -m flake8 .```
