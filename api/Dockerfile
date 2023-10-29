FROM python:3.8.18-alpine3.18

WORKDIR /app

EXPOSE 5050

COPY Pipfile* ./

RUN pip install pipenv
RUN pipenv requirements > requirements.txt
RUN pip install -r requirements.txt

COPY main.py .env.local ./

CMD [ "python", "main.py" ]