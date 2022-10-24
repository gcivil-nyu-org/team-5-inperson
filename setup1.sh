# start venv
virtualenv env
source env/bin/activate

# install dependencies
cd backend
pip install -r requirements.txt
cd frontend
npm install

# start frontend
npm start
